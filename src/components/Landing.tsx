import { useState } from "react";
import type { View } from "../lib/progress";
import AppNav from "./AppNav";

const VIDEOS = [
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
    label: "Golden Hour",
  },
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
    label: "Still Water",
  },
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4",
    label: "Deep Woods",
  },
  {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4",
    label: "Quiet Dawn",
  },
];

const OVERLAY_PNG =
  "https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png";

const DARK_MODE_INDEX = 2;
const DEEP_COLOR = "#182c41";

export default function Landing({
  onNavigate,
  streak,
}: {
  onNavigate: (v: View) => void;
  streak: number;
}) {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [email, setEmail] = useState("");

  const dark = activeVideo === DARK_MODE_INDEX;
  const contentColor = dark ? DEEP_COLOR : "#ffffff";

  const switchVideo = (index: number) => {
    if (index === activeVideo || isTransitioning) return;
    setIsTransitioning(true);
    setActiveVideo(index);
    window.setTimeout(() => setIsTransitioning(false), 1000);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background videos */}
      <div className="absolute inset-0 z-0">
        {VIDEOS.map((video, i) => (
          <video
            key={video.src}
            src={video.src}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === activeVideo ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Transparent overlay */}
      <div className="absolute inset-0 z-[1] train-bob">
        <img src={OVERLAY_PNG} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Front layer */}
      <div className="absolute inset-0 z-[2] flex flex-col">
        <AppNav onNavigate={onNavigate} variant="overlay" streak={streak} />

        {/* Hero content */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 pt-8 pb-8 text-center">
          {/* Badge */}
          <div
            className="liquid-glass rounded-full px-5 py-2 font-body text-[13px] sm:text-sm"
            style={{ color: contentColor, transition: "color 700ms" }}
          >
            {streak > 0
              ? `${streak}‑day streak alive — keep it burning`
              : "India's 60-day coding challenge — begin today"}
          </div>

          {/* Heading */}
          <h1
            className="mt-6 max-w-4xl leading-[1.1] text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]"
            style={{ color: contentColor, transition: "color 700ms" }}
          >
            Build in public,
            <br />
            <span className="italic">every single day.</span>
          </h1>

          {/* Subtext */}
          <p
            className="mt-6 max-w-xl font-body text-sm leading-relaxed sm:text-base"
            style={{ color: contentColor, opacity: 0.85, transition: "color 700ms" }}
          >
            Pick a track, ship something daily, and keep your streak alive by sharing a
            GitHub commit and a LinkedIn post — visible to recruiters, undeniable to yourself.
          </p>

          {/* Email pill */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) onNavigate("activity");
            }}
            className="liquid-glass mt-9 w-full max-w-[320px] sm:max-w-sm rounded-full flex items-center gap-1 p-1.5 pl-6"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your college email"
              className="font-body flex-1 min-w-0 bg-transparent text-sm outline-none placeholder-white/50"
              style={{ color: contentColor, transition: "color 700ms" }}
            />
            <button
              type="submit"
              className="font-body rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              Start Day 1
            </button>
          </form>

          {/* Video switcher */}
          <div className="mt-8 flex items-center gap-4 sm:gap-6">
            {VIDEOS.map((video, i) => (
              <button
                key={video.label}
                onClick={() => switchVideo(i)}
                disabled={isTransitioning}
                className={`font-body pb-1 text-xs sm:text-sm tracking-wide transition-all duration-300 border-b-2 ${
                  i === activeVideo
                    ? "border-current"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
                style={{ color: contentColor, transition: "color 700ms, opacity 300ms" }}
              >
                {video.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="px-6 pb-6 font-body text-xs sm:text-sm">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-white/70">
            <span>5,000+ Builders</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span>3 Tracks</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span>60 Days</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span>Proof of work</span>
          </div>
        </div>
      </div>
    </section>
  );
}