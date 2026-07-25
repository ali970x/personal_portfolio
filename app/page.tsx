import type { Metadata } from "next";
import { Portfolio } from "./portfolio";

export const metadata: Metadata = {
  title: "Ali Majed Dandash — Full-Stack & Product Systems Engineer",
  description:
    "Full-stack and product systems engineer independently building reliable digital products across web, mobile, backend, data, and cloud.",
};

export default function Home() {
  return <Portfolio />;
}
