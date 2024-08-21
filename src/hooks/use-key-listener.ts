import { useCallback, useEffect } from "react";

type KeyboardEventKeys = {
  [K in keyof WindowEventMap]: WindowEventMap[K] extends KeyboardEvent
    ? K
    : never;
}[keyof WindowEventMap];

export function useKeyListener(
  key: string,
  callback: () => void,
  event: KeyboardEventKeys = "keydown",
) {
  const memoed = useCallback(() => {
    callback();
  }, [callback]);

  useEffect(() => {
    if (!key) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === key) {
        memoed();
      }
    }
    window.addEventListener(event, handleKeyDown);

    return () => {
      window.removeEventListener(event, handleKeyDown);
    };
  }, [memoed, key, event]);
}
