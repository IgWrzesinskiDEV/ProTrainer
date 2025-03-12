"use client";

import { useEffect, type RefObject } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: Handler,
  exceptionalSelectors: string[] = []
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // Check if clicking ref's element or descendent elements
      if (!ref?.current || ref.current.contains(target)) {
        return;
      }

      // Check if clicking exceptional elements
      for (const selector of exceptionalSelectors) {
        if ((target as HTMLElement).closest(selector)) {
          return;
        }
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, exceptionalSelectors]);
}
