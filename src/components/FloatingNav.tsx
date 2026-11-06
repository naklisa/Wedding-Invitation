"use client";

import { useState } from "react";
import { MessageCircle, Menu, X, Disc3, VolumeX, Heart, Calendar, Image as ImageIcon, Gift, Send } from "lucide-react";

interface FloatingNavProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
}

export default function FloatingNav({ isPlaying, onToggleMusic }: FloatingNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Mempelai", href: "#mempelai", icon: Heart },
    { label: "Acara", href: "#acara", icon: Calendar },
    { label: "Galeri", href: "#galeri", icon: ImageIcon },
    { label: "Kisah", href: "#kisah", icon: Heart },
    { label: "Tanda Kasih", href: "#kado", icon: Gift },
    { label: "RSVP & Doa", href: "#rsvp", icon: Send },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const shareToWhatsapp = () => {
    const text = encodeURIComponent(
      "Halo! Kami mengundang Anda untuk menghadiri pernikahan Lina Dinda Aulia & Fidyan Aolani: " +
        (typeof window !== "undefined" ? window.location.href : "")
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Navigation Modal */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl glass-card p-5 border border-white/25 shadow-2xl space-y-4 text-center text-white bg-mauve-950/95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-cinzel text-xs uppercase tracking-widest text-gold-300">
                Menu Undangan
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-1 text-mauve-200 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 p-2.5 text-xs text-white transition-all border border-white/10"
                  >
                    <Icon className="h-3.5 w-3.5 text-gold-300" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating Buttons Stack */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-2.5 items-center">
        {/* WhatsApp Share / Chat */}
        <button
          onClick={shareToWhatsapp}
          aria-label="Bagikan ke WhatsApp"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 active:scale-95 transition-all"
        >
          <MessageCircle className="h-5 w-5" />
        </button>

        {/* Menu Navigation */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Buka Menu"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-mauve-900/90 text-white shadow-xl backdrop-blur-md border border-white/20 hover:bg-mauve-800 active:scale-95 transition-all"
        >
          <Menu className="h-5 w-5 text-mauve-100" />
        </button>

        {/* Music Player */}
        <button
          onClick={onToggleMusic}
          aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-mauve-900/90 text-white shadow-xl backdrop-blur-md border border-white/20 hover:bg-mauve-800 active:scale-95 transition-all"
        >
          {isPlaying ? (
            <Disc3 className="h-5 w-5 text-gold-300 animate-spin-slow" />
          ) : (
            <VolumeX className="h-5 w-5 text-mauve-300" />
          )}
        </button>
      </div>
    </>
  );
}
