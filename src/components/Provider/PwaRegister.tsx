"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator
    ) {
      // next-pwa handles service worker registration automatically when register: true.
      // We can monitor controller changes here or log registration status.
      navigator.serviceWorker.ready.then((registration) => {
        console.log("PWA Service Worker is active and ready: ", registration.scope);
      }).catch((error) => {
        console.error("PWA Service Worker ready check failed: ", error);
      });
    }
  }, []);

  return null;
}
