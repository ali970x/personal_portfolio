import type { Metadata } from "next";
import { Portfolio } from "./portfolio";

export const metadata: Metadata = {
  title: "Ali Majed Dandash — Full-Stack Product Engineer",
  description:
    "Full-stack product engineer building practical mobile, web, and backend systems with Flutter, Node.js, TypeScript, PostgreSQL, Firebase, and Supabase.",
};

export default function Home() {
  return <Portfolio />;
}
