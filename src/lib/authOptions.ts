import sendOnboardingEmail from "@/app/actions/send-onboarding-email";
import MagicLinkEmail from "@/emails/magic-link-email";
import EmailProvider from "next-auth/providers/email";
import { siteConfig } from "@/config/site";
import { resend } from "./email";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),

      EmailProvider({
        sendVerificationRequest: async ({ identifier, url, provider }) => {
          const user = await prisma.user.findUnique({
            where: {
              email: identifier,
            },
            select: {
              name: true,
              emailVerified: true,
            },
          });
  
          const userVerified = user?.emailVerified ? true : false;
          const authSubject = userVerified
            ? `Sign-in link for ${siteConfig.name}`
            : "Activate your account";
  
          try {
            const result = await resend.emails.send({
              from: "Projectx App <onboarding@resend.dev>",
              to:
                process.env.NODE_ENV === "development"
                  ? "delivered@resend.dev"
                  : identifier,
              subject: authSubject,
              react: MagicLinkEmail({
                firstName: user?.name as string,
                actionUrl: url,
                mailType: userVerified ? "login" : "register",
                siteName: siteConfig.name,
              }),
              // Set this to prevent Gmail from threading emails.
              // More info: https://resend.com/changelog/custom-email-headers
              headers: {
                "X-Entity-Ref-ID": new Date().getTime() + "",
              },
            });
  
            // console.log(result)
          } catch (error) {
            throw new Error("Failed to send verification email.");
          }
        },
      }),
    ],
    callbacks: {
      async session({ token, session }) {
        if (token) {
          session.user.id = token.id;
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.picture;
        }
  
        return session;
      },
      async jwt({ token, user }) {
        const dbUser = await prisma.user.findFirst({
          where: {
            email: token.email,
          },
        });
  
        if (dbUser && !dbUser.onboardingEmailSent) {
          // Ensure email and name are not null before sending
          if (dbUser.email && dbUser.name) {
            await sendOnboardingEmail(dbUser.email, dbUser.name);
  
            await prisma.user.update({
              where: { email: dbUser.email },
              data: { onboardingEmailSent: true },
            });
  
            console.log(`Onboarding email sent to ${dbUser.email}`);
          } else {
            console.log(
              `User email or name is null for user with email: ${token.email}`,
            );
          }
        }
  
        if (!dbUser) {
          if (user) {
            token.id = user.id!;
            token.email = user.email!;
            token.name = user.name!;
            // Add other necessary token assignments
          }
          return token;
        }
  
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          
          picture: dbUser.image,
        };
      },
    },
  };