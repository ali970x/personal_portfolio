import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../app/globals.css";
import AdminPage from "../../app/admin/page";
import { Portfolio } from "../../app/portfolio";

const root = document.getElementById("root");
if (!root) throw new Error("Static site root is missing.");

const isAdmin = window.location.pathname.replace(/\/+$/, "") === "/admin";

createRoot(root).render(
  <StrictMode>{isAdmin ? <AdminPage /> : <Portfolio />}</StrictMode>,
);
