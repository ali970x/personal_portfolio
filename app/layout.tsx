import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ali Majed Dandash — Full-Stack & Product Systems Engineer",
    template: "%s · Ali Majed Dandash",
  },
  description:
    "Full-stack and product systems engineer independently building complete products across web, mobile, APIs, data, cloud, and operations.",
  icons: {
    icon: "/assets/portrait/ali-dandash.png",
    shortcut: "/assets/portrait/ali-dandash.png",
  },
  openGraph: {
    title: "Ali Majed Dandash — Full-Stack & Product Systems Engineer",
    description:
      "I independently design and build complete product systems from business rules and data to web, mobile, backend, and deployment.",
    type: "website",
    images: [
      {
        url: "/og-v3.png",
        width: 1536,
        height: 1024,
        alt: "Ali Majed Dandash — Full-Stack and Product Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Majed Dandash — Full-Stack & Product Systems Engineer",
    description:
      "Independent full-stack engineering across product, API, business logic, data, web, and mobile.",
    images: ["/og-v3.png"],
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
