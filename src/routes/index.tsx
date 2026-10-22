import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Cover } from "@/components/wedding/Cover";
import { Hero } from "@/components/wedding/Hero";
import { Envelope } from "@/components/wedding/Envelope";
import { Music } from "@/components/wedding/Music";
import { Dates } from "@/components/wedding/Dates";
import { Closing, Countdown, Gallery, Story, Venue } from "@/components/wedding/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhyaani Weds Vinotha — Wedding Invitation" },
      { name: "description", content: "Join us for the wedding of Dhyaani & Vinotha at The Royal Mahal, Vayalur, Trichy — 21 & 22 November 2026." },
      { property: "og:title", content: "Dhyaani Weds Vinotha" },
      { property: "og:description", content: "Reception 21 Nov · Muhurtham 22 Nov 2026 at The Royal Mahal, Trichy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  const [datesRevealed, setDatesRevealed] = useState(false);

  const open = () => {
    setOpened(true);
    setTimeout(() => setCoverGone(true), 2600);
  };

  useEffect(() => {
    document.body.style.overflow = coverGone ? "" : "hidden";
  }, [coverGone]);

  return (
    <main className="relative">
      {!coverGone && <Cover onOpen={open} />}
      <Hero active={opened} />
      <Music start={opened} />
      <Dates onRevealed={() => setDatesRevealed(true)} />
      {datesRevealed && <Countdown />}
      <Envelope />
      <Story />
      <Venue />
      <Gallery />
      <Closing />
    </main>
  );
}
