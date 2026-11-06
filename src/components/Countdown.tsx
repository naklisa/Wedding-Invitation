"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageSquareHeart, Sparkles } from "lucide-react";
import { weddingConfig } from "../lib/config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingConfig.event.dateISO).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToRsvp = () => {
    const el = document.getElementById("rsvp");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative px-6 py-14 text-center text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gold-400/10 blur-[80px] pointer-events-none" />

      <div className="max-w-md mx-auto space-y-7 relative z-10">
        {/* Royal Divider Top */}
        <div className="flex justify-center">
          <Image
            src="/ornaments/royal-divider.svg"
            alt="Divider"
            width={140}
            height={40}
            className="filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
          />
        </div>

        {/* Script title */}
        <div className="space-y-1">
          <p className="font-cinzel text-xs uppercase tracking-[0.35em] text-gold-300 font-semibold">
            Save The Date
          </p>
          <h3 className="font-script text-4xl sm:text-5xl text-gold-gradient drop-shadow">
            Menuju Hari Bahagia
          </h3>
        </div>

        {/* 4 Luxury Countdown Dials */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-sm mx-auto">
          {[
            { label: "Hari", value: timeLeft.days },
            { label: "Jam", value: timeLeft.hours },
            { label: "Menit", value: timeLeft.minutes },
            { label: "Detik", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="luxury-card rounded-2xl py-4 px-2 flex flex-col items-center justify-center border border-gold-300/35 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-80" />
              
              <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider drop-shadow">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold-200 mt-1.5 font-cinzel font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* RSVP button */}
        <div className="pt-2 space-y-3">
          <p className="text-xs text-mauve-100 font-light max-w-xs mx-auto leading-relaxed">
            Tekan tombol di bawah ini untuk mengirimkan ucapan doa restu dan konfirmasi kehadiran.
          </p>
          <button
            onClick={scrollToRsvp}
            className="inline-flex items-center gap-2 rounded-full py-3.5 px-7 font-medium text-xs text-[#2b1820] shadow-[0_10px_25px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95 bg-gradient-to-r from-[#fff5d6] via-[#e5bc54] to-[#caa03b] hover:brightness-110 border border-white/40 uppercase tracking-wider font-cinzel font-semibold"
          >
            <MessageSquareHeart className="h-4 w-4" />
            <span>Konfirmasi &amp; Kirim Ucapan</span>
            <Sparkles className="h-3.5 w-3.5 opacity-80" />
          </button>
        </div>
      </div>
    </section>
  );
}
