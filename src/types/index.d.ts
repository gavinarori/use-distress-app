import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

export type SiteConfig = {
    name: string
    description: string
    url: any
    ogImage: string
    mailSupport: string
    links: {
      twitter: string
      github: string
    }
  }