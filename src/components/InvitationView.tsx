"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Cover from "./Cover";
import Hero from "./Hero";
import Couple from "./Couple";
import Event from "./Event";
import Countdown from "./Countdown";
import Gallery from "./Gallery";
import Story from "./Story";
import Gift from "./Gift";
import Rsvp from "./Rsvp";
import Closing from "./Closing";
import FloatingNav from "./FloatingNav";
import FallingPetals from "./FallingPetals";

interface InvitationViewProps {
  initialGuestName?: string;
}

export default function InvitationView({ initialGuestName }: InvitationViewProps) {
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/background.mp3");
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsCoverOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio autoplay prevented", err));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error", err));
    }
  };

  return (
    <main className="min-h-screen bg-[#14080e] flex justify-center text-white relative selection:bg-gold-500 selection:text-[#14080e] overflow-x-hidden">
      {/* Floating Petals / Particles (Magical Luxury Life Effect) */}
      <FallingPetals />

      {/* Opening Cover Screen */}
      <Cover
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
        initialGuestName={initialGuestName}
      />

      {/* Main Content (Mobile-First Centered Container with Rich Texture & Layered Ornaments) */}
      <div className="w-full max-w-md min-h-screen bg-[#2b1820] shadow-[0_0_90px_rgba(0,0,0,0.95)] relative overflow-hidden flex flex-col border-x border-gold-300/20">
        {/* Layer 1: Seamless Luxury Damask Texture Background across the whole page (Anti-Flat) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 z-0"
          style={{
            backgroundImage: "url('/ornaments/pattern-damask.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "110px 110px",
          }}
        />

        {/* Layer 2: Ambient Radial Glow Spotlights */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold-400/8 blur-[110px] pointer-events-none" />
        <div className="absolute top-[45%] left-0 w-80 h-80 rounded-full bg-mauve-500/12 blur-[100px] pointer-events-none" />
        <div className="absolute top-[75%] right-0 w-80 h-80 rounded-full bg-gold-400/8 blur-[100px] pointer-events-none" />

        {/* Layer 3: Continuous Creeping Side Botanical Vines (Left & Right Margins) */}
        <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-12 pointer-events-none z-10 opacity-35 overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/ornaments/side-vines.svg')",
              backgroundRepeat: "repeat-y",
              backgroundSize: "40px auto",
              backgroundPosition: "left top",
            }}
          />
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-10 sm:w-12 pointer-events-none z-10 opacity-35 overflow-hidden">
          <div
            className="w-full h-full transform scale-x-[-1]"
            style={{
              backgroundImage: "url('/ornaments/side-vines.svg')",
              backgroundRepeat: "repeat-y",
              backgroundSize: "40px auto",
              backgroundPosition: "left top",
            }}
          />
        </div>

        {/* Layer 4: Sections */}
        <div className="relative z-10 flex flex-col">
          {/* Section 1: Hero with Full-Bleed Background Photo Dinda & Fidyan */}
          <Hero />

          {/* Section 2: Kedua Mempelai with Royal Tiara Crowns */}
          <Couple />

          {/* Symmetrical Royal Divider Between Sections */}
          <div className="flex justify-center py-4 opacity-80">
            <Image
              src="/ornaments/royal-divider.svg"
              alt="Divider"
              width={160}
              height={45}
              className="filter drop-shadow-[0_2px_6px_rgba(212,175,55,0.4)]"
            />
          </div>

          {/* Section 3: Rangkaian Acara (Akad & Resepsi) */}
          <Event />

          {/* Section 4: Hitung Mundur */}
          <Countdown />

          {/* Symmetrical Royal Divider */}
          <div className="flex justify-center py-4 opacity-80">
            <Image
              src="/ornaments/royal-divider.svg"
              alt="Divider"
              width={160}
              height={45}
              className="filter drop-shadow-[0_2px_6px_rgba(212,175,55,0.4)]"
            />
          </div>

          {/* Section 5: Galeri Momen */}
          <Gallery />

          {/* Section 6: Kisah Cinta */}
          <Story />

          {/* Section 7: Tanda Kasih / Kado */}
          <Gift />

          {/* Section 8: RSVP & Buku Tamu */}
          <Rsvp initialGuestName={initialGuestName} />

          {/* Section 9: Closing with Full-Bleed Background Photo Dinda & Fidyan */}
          <Closing />
        </div>

        {/* Floating Actions (Only visible after opening) */}
        {isCoverOpen && (
          <FloatingNav isPlaying={isPlaying} onToggleMusic={toggleMusic} />
        )}
      </div>
    </main>
  );
}
