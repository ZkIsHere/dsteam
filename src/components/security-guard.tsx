import { useEffect } from "react";

const REDIRECT_URL = "https://www.google.com";

export function SecurityGuard() {
  useEffect(() => {
    let cleanupDetector: (() => void) | undefined;

    async function initDetector() {
      const { default: detector } = await import("devtools-detector");

      const listener = (isOpen: boolean) => {
        if (isOpen) {
          window.location.replace(REDIRECT_URL);
        }
      };

      detector.addListener(listener);
      detector.setDetectDelay(1000);
      detector.launch();

      cleanupDetector = () => {
        detector.removeListener(listener);
        detector.stop();
      };
    }

    void initDetector();

    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrlOrMeta = event.ctrlKey || event.metaKey;

      const isForbidden =
        // F12 — mở DevTools
        event.key === "F12" ||
        // Ctrl/Cmd + Shift + I/J/C/K — Elements, Console, Inspect, Network
        (ctrlOrMeta && event.shiftKey && ["i", "j", "c", "k"].includes(key)) ||
        // Ctrl/Cmd + U — xem source
        (ctrlOrMeta && key === "u") ||
        // Ctrl/Cmd + S — lưu trang
        (ctrlOrMeta && key === "s") ||
        // Ctrl/Cmd + P — in trang
        (ctrlOrMeta && key === "p");

      if (isForbidden) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cleanupDetector?.();
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
