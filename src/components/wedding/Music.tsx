import { useEffect, useRef, useState } from "react";
import music from "@/assets/wedding-music.m4a.asset.json";

// Background soundtrack (extracted from the wedding video). Starts on the visitor's
// first interaction (mobile autoplay rules); the button only toggles ON/OFF.
export function Music({ start }: { start: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (start) ref.current?.play().then(() => setOn(true)).catch(() => {});
  }, [start]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setOn(true)).catch(() => {});
    else {
      a.pause();
      setOn(false);
    }
  };

  return (
    <>
      <audio ref={ref} src={music.url} loop preload="auto" />
      {start && (
        <button
          type="button"
          onClick={toggle}
          aria-label={on ? "Turn music off" : "Turn music on"}
          className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-xl text-primary-foreground shadow-paper ring-2 ring-gold"
        >
          {on ? "♫" : <span className="opacity-60 line-through">♫</span>}
        </button>
      )}
    </>
  );
}
