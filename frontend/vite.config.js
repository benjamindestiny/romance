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

      // Web manifest - tells browsers about your app
      manifest: {
        // Human-readable name when installing
        name: "Romance - Couple Understanding",
        // Short name shown on home screen
        short_name: "Romance",
        // Description in app store/browser
        description:
          "A relationship & quiz-based experience to know more about your spouse and your spouse to also know more about you",
        // Color of browser UI on Android
        theme_color: "#ff4d6d",
        // Background while app is loading
        background_color: "#ffffff",
        // How to display: "standalone" = looks like native app (no URL bar)
        display: "standalone",
        // First page to load when user opens app
        start_url: "/",
        // App orientation
        orientation: "portrait-primary",
        // Icons for different devices
        icons: [
          {
            src: "/icons/rom.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
            // Used as app icon on Android home screen
          },
          {
            src: "/icons/rom.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
            // maskable = adapts to different device shapes
          },
        ],
        // Recommended pages for offline browsing
        screenshots: [
          {
            src: "/icons/rom.png",
            sizes: "192x192",
            type: "image/png",
            // Shown in install prompts
          },
        ],
      },

      // Service worker configuration
      workbox: {
        // Strategies for different file types
        runtimeCaching: [
          // Cache API responses for 1 hour
          // Offline users see cached data
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
          // Cache fonts indefinitely (rarely change)
          {
            urlPattern: /^https:\/\/fonts\..*\.com\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts-cache",
            },
          },
        ],
      },

      // Development options
      devOptions: {
        // In dev mode, see SW updates live
        enabled: false,
      },
    }),
  ],

  // Build configuration
  build: {
    // Generate sourcemaps for debugging deployed app
    sourcemap: false,
    // Minify code for smaller bundle
    minify: "terser",
  },
});
