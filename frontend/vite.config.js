import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

/**
 * VITE CONFIG - Build & PWA Setup
 *
 * Why VitePWA?
 * - Automatically generates service worker
 * - Creates web app manifest
 * - Handles offline caching
 * - Auto-updates on new deployment
 *
 * registerType: "autoUpdate" means:
 * - When new version is built, app automatically updates
 * - Users don't need to manually refresh
 * - Better UX for deployed apps
 */

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Auto-update strategy: best for public apps
      // Users get latest version seamlessly
      registerType: "autoUpdate",

      // What files to include in service worker cache
      includeAssets: ["favicon.svg", "robots.txt", "/icons/rom.png"],

      manifest: {
        name: "My_Romance - Couple Understanding",
        short_name: "Romance",
        description:
          "A relationship & quiz-based experience to know more about your spouse and your spouse to also know more about you",
        theme_color: "#ff4d6d",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/icons/rom.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/rom.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        screenshots: [
          {
            src: "/icons/rom.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },

      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/localhost:3000\/api\/.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\..*\.com\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts-cache",
            },
          },
        ],
      },

      devOptions: {
        // In dev mode, see SW updates live
        enabled: false,
      },
    }),
  ],

  build: {
    sourcemap: false,
    minify: "terser",
  },
});
