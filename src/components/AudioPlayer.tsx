"use client";

import { useState, useEffect, useRef } from "react";
import { Disc3, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function AudioPlayer({ isPlaying, onToggle }: AudioPlayerProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-mauve-950/80 text-white shadow-xl backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95"
    >
      {isPlaying ? (
        <Disc3 className="h-6 w-6 text-gold-300 animate-spin-slow" />
      ) : (
        <VolumeX className="h-5 w-5 text-gray-300" />
      )}
    </button>
  );
}
