import type { Metadata } from "next";
import { Portfolio } from "./portfolio";

export const metadata: Metadata = {
  title: "Ali Majed Dandash — Software Engineer",
  description:
    "Software engineer building secure, scalable systems and reliable digital products across mobile, web, backend, and cloud.",
};

export default function Home() {
  return <Portfolio />;
}
