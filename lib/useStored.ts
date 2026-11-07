"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * State that persists in the visitor's browser (localStorage).
 * Notes, highlights, plan progress and the prayer journal stay on the
 * visitor's own device; nothing is sent anywhere.
 */
export function useStored<T>(key: string, initial: T): [T, (next: T | ((prev: T) => T)) => void, boolean] {
  const storageKey = "tlh:" + key;
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      /* storage unavailable: keep defaults */
    }
    setLoaded(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue !== null) {
        try { setValue(JSON.parse(e.newValue) as T); } catch { /* ignore */ }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try { window.localStorage.setItem(storageKey, JSON.stringify(resolved)); } catch { /* ignore */ }
        return resolved;
      });
    },
    [storageKey],
  );

  return [value, update, loaded];
}
