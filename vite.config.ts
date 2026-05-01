import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import sitemap from "vite-plugin-sitemap";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    sitemap({
      hostname: "https://profileopener.netlify.app",
 dynamicRoutes: [
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/best-linkedin-tools",
  "/blog/find-ceo-email-linkedin",
  "/blog/linkedin-account-safety",
  "/blog/linkedin-search-filters-recruiters",
  "/blog/open-multiple-linkedin-profiles",
  "/blog/linkedin-vs-email-outreach",
],
    } as any),
    {
      name: "html-transform",
      transformIndexHtml(html: string) {
        return html.replace(
          "</head>",
          `  <meta name="google-site-verification" content="Uk3At5gc6OYWMn1zmULpfwsM7qycNYAYt_HFoC2_tFw" />\n  </head>`
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));