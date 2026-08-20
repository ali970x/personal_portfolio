import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ali Majed Dandash — Full-Stack Product Engineer",
    template: "%s · Ali Majed Dandash",
  },
  description:
    "Full-stack product engineer building practical mobile, web, and backend systems with Flutter, Node.js, TypeScript, PostgreSQL, Firebase, and Supabase.",
  icons: {
    icon: "/assets/portrait/ali-dandash.png",
    shortcut: "/assets/portrait/ali-dandash.png",
  },
  openGraph: {
    url: "/",
    title: "Ali Majed Dandash — Full-Stack Product Engineer",
    description:
      "I build practical product systems across mobile, web, backend APIs, data, testing, and deployment.",
    type: "website",
    images: [
      {
        url: "/og-cinema.png?v=20260820",
        width: 1536,
        height: 1024,
        alt: "Ali Majed Dandash — Full-Stack Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Majed Dandash — Full-Stack Product Engineer",
    description:
      "Practical full-stack engineering across mobile, web, APIs, data, testing, and deployment.",
    images: ["/og-cinema.png?v=20260820"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
try {
  var theme = localStorage.getItem('portfolio-theme');
  if (theme !== 'dark' && theme !== 'light') theme = 'dark';
  document.documentElement.dataset.theme = theme;
} catch (_) {
  document.documentElement.dataset.theme = 'dark';
}
            `.trim(),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
