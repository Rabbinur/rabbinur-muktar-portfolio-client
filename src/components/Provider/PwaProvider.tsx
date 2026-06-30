"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PwaContextType {
  isInstallable: boolean;
  isStandalone: boolean;
  isAlreadyInstalled: boolean;
  isNativeSupported: boolean;
  installApp: () => Promise<void>;
}

const PwaContext = createContext<PwaContextType>({
  isInstallable: false,
  isStandalone: false,
  isAlreadyInstalled: false,
  isNativeSupported: false,
  installApp: async () => {},
});

export const usePwa = () => useContext(PwaContext);

export default function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false);
  const [isNativeSupported, setIsNativeSupported] = useState(false);

  useEffect(() => {
    // Check if browser natively supports installation prompt
    setIsNativeSupported("onbeforeinstallprompt" in window);

    // Check if running in standalone mode (installed app window)
    const checkStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(checkStandalone);

    // Check if already installed in localStorage
    if (localStorage.getItem("pwa_installed") === "true") {
      setIsAlreadyInstalled(true);
    }

    // Double check with navigator API if supported
    if ("navigator" in window && "getInstalledRelatedApps" in navigator) {
      (navigator as any).getInstalledRelatedApps()
        .then((relatedApps: any[]) => {
          if (relatedApps && relatedApps.length > 0) {
            setIsAlreadyInstalled(true);
            localStorage.setItem("pwa_installed", "true");
          }
        })
        .catch((err: any) => console.log("Failed to check installed apps: ", err));
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If already installed, hide prompt button
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
      setIsStandalone(true);
      setIsAlreadyInstalled(true);
      localStorage.setItem("pwa_installed", "true");
      console.log("App installed successfully");
      
      // Track installation count in database
      fetch("/api/install", { method: "POST" }).catch((err) =>
        console.error("Failed to track PWA install: ", err)
      );
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
    } catch (err) {
      console.error("Error prompting installation: ", err);
    } finally {
      // Clear prompt since it can only be used once
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <PwaContext.Provider
      value={{
        isInstallable,
        isStandalone,
        isAlreadyInstalled,
        isNativeSupported,
        installApp,
      }}
    >
      {children}
    </PwaContext.Provider>
  );
}
