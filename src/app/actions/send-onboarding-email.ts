import WelcomeEmail from "@/emails/welcome-email";
import { prisma } from '@/lib/prisma';
import { resend } from "@/lib/email";

async function sendOnboardingEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: "Distress app <onboarding@resend.dev>",
      to: email,
      subject: "Unlock the Future fast responses with Distress!",
      react: WelcomeEmail({
        name: name || "Valued User",
        email: email,
      }),
      headers: {
        "X-Entity-Ref-ID": new Date().getTime() + "",
      },
    });

    // Update the onboardingEmailSent flag for the user
    await prisma.user.update({
      where: { email },
      data: { onboardingEmailSent: true },
    });
  } catch (error:any) {
    console.error("Error sending onboarding email:", error);
    throw new Error("Failed to send onboarding email.", error);
  }
}

export default sendOnboardingEmail;
