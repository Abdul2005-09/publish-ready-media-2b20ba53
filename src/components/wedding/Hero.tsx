import { useEffect, useRef } from "react";
import video from "@/assets/wedding-video.mp4.asset.json";
import fallbackVideo from "@/assets/wedding-video.webm.asset.json";
import poster from "@/assets/wedding-video-poster.jpg.asset.json";

export function Hero({ active }: { active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!active) {
      v.pause();
      return;
    }
    v.muted = true;
    let visible = false;
    const play = () => {
      if (visible) v.play().catch(() => {});
    };
    v.addEventListener("canplay", play);
    const io = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
      if (visible) play();
      else v.pause();
    });
    io.observe(v);
    return () => {
      io.disconnect();
      v.removeEventListener("canplay", play);
    };
  }, [active]);
  return (
    <section className="wedding-video relative isolate flex h-[88svh] min-h-[560px] items-center justify-center overflow-hidden md:h-screen">
      <video
        ref={ref}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          if (v.videoWidth && v.videoHeight) {
            v.parentElement?.style.setProperty("--video-aspect", `${v.videoWidth} / ${v.videoHeight}`);
          }
        }}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        poster={poster.url}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        aria-hidden
      >
        <source src={video.url} type="video/mp4" />
        <source src={fallbackVideo.url} type="video/webm" />
      </video>
    </section>
  );
}
