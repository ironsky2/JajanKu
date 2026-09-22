"use client";

import { useEffect } from "react";
import { useMarketStore } from "@/stores/useMarketStore";

export function StoreInitializer({ children }: { children: React.ReactNode }) {
  const initializeStore = useMarketStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();

    // Register service worker if available
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // service worker registration ignored in dev or unsupported
      });
    }
  }, [initializeStore]);

  return <>{children}</>;
}
