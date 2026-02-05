import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Romance",
        short_name: "Romance",
        description: "A relationship & quiz-based experience to know more about your spouse and your spouse to also know more about you",
        theme_color: "#ff4d6d",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/rom.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/rom.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
});
