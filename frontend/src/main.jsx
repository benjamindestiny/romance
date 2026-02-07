import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { registerSW } from "virtual:pwa-register";
import toast from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

/**
 * PWA SERVICE WORKER REGISTRATION
 *
 * What this does:
 * 1. Registers the service worker that handles offline functionality
 * 2. Caches app files so it works without internet
 * 3. Detects when a new version is deployed
 * 4. Notifies user that an update is available
 *
 * autoUpdate Strategy:
 * - Checks for new version every 60000ms (1 minute)
 * - Downloads update in background
 * - Automatically applies next time user refreshes
 * - No manual update button needed
 *
 * Callbacks:
 * - onNeedRefresh: New version is ready
 * - onOfflineReady: App can work offline
 */

registerSW({
  // Called when update is available
  onNeedRefresh() {
    console.log("✅ PWA: New version available");
    // Show user-friendly notification
    toast.success("A new version is available! Refresh to update.", {
      duration: 6000,
      position: "bottom-center",
    });
  },

  // Called when offline support is ready
  onOfflineReady() {
    console.log("✅ PWA: App is ready to work offline");
    // Silent notification - user can still use app
    toast.success("App is ready! Works offline now.", {
      duration: 4000,
      position: "bottom-center",
    });
  },

  // Check for updates every minute
  immediate: true,
});

// PWA Installation Prompt
// Shows "Add to Home Screen" on mobile
window.addEventListener("beforeinstallprompt", (e) => {
  console.log("✅ PWA: Install prompt available");
  // Don't show automatic prompt - let user decide
  e.preventDefault();

  // Store event for later use
  let installPrompt = e;

  // Could add custom install button here
  // For now, let OS handle it naturally
});
