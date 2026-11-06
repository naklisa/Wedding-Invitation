"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MailOpen, Sparkles } from "lucide-react";
import { weddingConfig } from "../lib/config";

interface CoverProps {
  onOpen: () => void;
  isOpen: boolean;
  initialGuestName?: string;
}

export default function Cover({ onOpen, isOpen, initialGuestName }: CoverProps) {
  const [guestName, setGuestName] = useState<string>(initialGuestName || "Tamu Undangan");

  useEffect(() => {
    if (initialGuestName) {
      setGuestName(initialGuestName);
      return;
    }
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to") || params.get("nama") || params.get("guest");
      if (to) {
        setGuestName(to);
      }
    }
  }, [initialGuestName]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#2b1820] transition-all duration-1000 ease-in-out ${
        isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Background Image with Deep Cinematic Vignette */}
      <div className="absolute inset-0">
        <Image
          src="/images/couple-cover.jpg"
          alt="Dinda & Fidyan Prewedding"
          fill
          priority
          className="object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24131a] via-[#3a202a]/80 to-[#1f0e15]/90" />
      </div>

      {/* Decorative Gold Filigree Corner Borders */}
      <div className="absolute top-3 left-3 w-32 h-32 opacity-40 pointer-events-none">
        <Image
          src="/ornaments/floral-corner.svg"
          alt="Filigree"
          width={128}
          height={128}
          className="w-full h-full transform rotate-180 filter drop-shadow-[0_0_8px_rgba(234,194,101,0.4)]"
        />
      </div>
      <div className="absolute bottom-3 right-3 w-32 h-32 opacity-40 pointer-events-none">
        <Image
          src="/ornaments/floral-corner.svg"
          alt="Filigree"
          width={128}
          height={128}
          className="w-full h-full filter drop-shadow-[0_0_8px_rgba(234,194,101,0.4)]"
        />
      </div>

      {/* Subtle Inner Gold Double Frame */}
      <div className="absolute inset-4 sm:inset-6 rounded-3xl border border-gold-300/20 pointer-events-none">
        <div className="absolute inset-1.5 rounded-[22px] border border-gold-300/10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full max-w-md w-full px-6 py-10 text-center text-white">
        {/* Top: The Wedding Of & Wax Seal */}
        <div className="animate-fade-in pt-3 space-y-3">
          <p className="font-cinzel text-xs uppercase tracking-[0.4em] text-gold-300 font-semibold drop-shadow">
            The Wedding Of
          </p>
          <div className="w-16 h-16 mx-auto drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]">
            <Image
              src="/ornaments/wax-seal.svg"
              alt="Seal"
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Center: Couple Names & Royal Flourish */}
        <div className="space-y-4 my-auto">
          <div className="space-y-1">
            <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-wide text-gold-gradient drop-shadow-lg">
              Dinda &amp; Fidyan
            </h1>
            <p className="font-script text-2xl text-gold-200/90 drop-shadow">
              Lina Dinda Aulia &amp; Fidyan Aolani
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
            <p className="font-cinzel text-xs tracking-[0.3em] text-gold-300 font-medium">
              {weddingConfig.event.dateShort}
            </p>
            <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          </div>
        </div>

        {/* Bottom: Guest Card & Luxury Shimmer Button */}
        <div className="w-full max-w-xs space-y-4 pb-4">
          <div className="luxury-card rounded-2xl py-4 px-5 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-60" />
            
            <p className="text-[10px] uppercase tracking-widest text-gold-200/80 mb-1 font-cinzel">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2 className="font-serif text-lg font-semibold text-white capitalize drop-shadow truncate">
              {guestName}
            </h2>
          </div>

          <button
            onClick={onOpen}
            className="w-full relative group overflow-hidden rounded-full py-3.5 px-6 font-medium text-xs text-[#2b1820] shadow-[0_10px_25px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95 bg-gradient-to-r from-[#fff5d6] via-[#e5bc54] to-[#caa03b] hover:brightness-110 border border-white/40"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold tracking-wider font-cinzel uppercase text-[11px]">
              <MailOpen className="h-4 w-4" />
              <span>Buka Undangan</span>
              <Sparkles className="h-3.5 w-3.5 opacity-80" />
            </span>
          </button>

          <p className="text-[10px] text-mauve-200/70 tracking-wider">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </div>
      </div>
    </div>
  );
}
