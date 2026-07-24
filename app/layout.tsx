import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ali-dandash.openai.site"),
  title: {
    default: "Ali Majed Dandash — Software Engineer",
    template: "%s · Ali Majed Dandash",
  },
  description:
    "Backend-minded software engineer building scalable systems and complete digital products.",
  icons: {
    icon: "/assets/portrait/ali-dandash.png",
    shortcut: "/assets/portrait/ali-dandash.png",
  },
  openGraph: {
    title: "Ali Majed Dandash — Software Engineer",
    description:
      "Secure systems. Scalable architecture. Reliable digital products.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Ali Majed Dandash — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Majed Dandash — Software Engineer",
    description:
      "Secure systems. Scalable architecture. Reliable digital products.",
    images: ["/og.png"],
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
