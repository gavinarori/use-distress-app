import { SiteConfig } from "../types/index";


const site_url = process.env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Distress App",
  description:
    "Your Pocket Companion in Crisis. Instantly connect with emergency services, access vital resources, and receive immediate support during challenging situations. Empowering you with safety at your fingertips.",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/gavinogwanwa",
    github: "https://github.com/gavinarori",
  },
  mailSupport: "christer@sailsdock.com",
};