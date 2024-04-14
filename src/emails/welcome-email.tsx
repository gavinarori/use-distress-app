/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import Footer from "./components/footer";

export default function WelcomeEmail({
  name,
  email 
}: {
  name: string | null;
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Distress </Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8"></Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Welcome to Distress
            </Heading>

            <Text className="text-sm leading-6 text-black">
              Thank you for joining us{name && `, ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              I'm Gavin Arori, the creator of Distress- Excited to have you on
              board!
            </Text>
            <Text className="text-sm leading-6 text-black">
              Here's what you can start doing:
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Send your first{" "}
              <Link
                href="https://Projectx.com/dashboard"
                className="font-medium text-blue-600 no-underline"
              >
                distress message
              </Link>
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Manage your{" "}
              <Link
                href="https://Projectx.com/dashboard"
                className="font-medium text-blue-600 no-underline"
              >
                relocation safety places
              </Link>
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Connect with us on{" "}
              <Link
                href="https://discord.gg/wadg6fNX"
                className="font-medium text-blue-600 no-underline"
              >
                Twitter
              </Link>
            </Text>
            <Text className="text-sm leading-6 text-black">
              If you have any questions or feedback, feel free to reach out.
              We're here to help!
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              Gavin from Distress
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}