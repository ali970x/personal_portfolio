import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ali Majed Dandash — Systems & Product Engineer",
    template: "%s · Ali Majed Dandash",
  },
  description:
    "Backend-minded product engineer building complete systems across mobile, web, APIs, data, cloud, and operations.",
  icons: {
    icon: "/assets/portrait/ali-dandash.png",
    shortcut: "/assets/portrait/ali-dandash.png",
  },
  openGraph: {
    title: "Ali Majed Dandash — Systems & Product Engineer",
    description:
      "I model the business, secure the flows, structure the data, and ship the whole product.",
    type: "website",
    images: [
      {
        url: "/og-v2.png",
        width: 1536,
        height: 1024,
        alt: "Ali Majed Dandash — Systems and Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Majed Dandash — Systems & Product Engineer",
    description:
      "Backend-minded engineering across product, API, business logic, and data.",
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
