import Image from "next/image";
import { Music, Heart } from "lucide-react";
import { weddingConfig } from "../lib/config";

export default function Closing() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col justify-between items-center text-center text-white px-6 pt-16 pb-28 overflow-hidden">
      {/* 1. Full-Bleed Background Photo (Foto Terakhir Dinda & Fidyan Tanpa Bingkai) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/couple-closing.jpg"
          alt="Dinda & Fidyan Closing Background"
          fill
          priority
          className="object-cover object-top scale-105"
        />
        {/* Deep cinematic gradient overlay so closing text is perfectly legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a11] via-[#24131a]/80 to-[#2b1820]" />
        
        {/* Subtle Damask Pattern Texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "url('/ornaments/pattern-damask.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Decorative Gold Filigree Corners */}
      <div className="absolute bottom-2 left-2 w-28 h-28 opacity-45 pointer-events-none z-10">
        <Image
          src="/ornaments/floral-corner.svg"
          alt="Corner"
          width={112}
          height={112}
          className="w-full h-full transform scale-x-[-1] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        />
      </div>
      <div className="absolute bottom-2 right-2 w-28 h-28 opacity-45 pointer-events-none z-10">
        <Image
          src="/ornaments/floral-corner.svg"
          alt="Corner"
          width={112}
          height={112}
          className="w-full h-full filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        />
      </div>

      {/* Top: Royal Gunungan Crest */}
      <div className="relative z-10 pt-2 space-y-2">
        <div className="w-36 sm:w-44 mx-auto filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]">
          <Image
            src="/ornaments/gunungan-crest.svg"
            alt="Gunungan Crest"
            width={160}
            height={80}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Center: Gratitude & Turut Mengundang */}
      <div className="relative z-10 my-auto space-y-6 max-w-sm">
        {/* Gratitude Card */}
        <div className="luxury-card rounded-3xl p-6 sm:p-7 border border-gold-300/35 shadow-2xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-80" />

          <p className="text-xs sm:text-[13px] text-mauve-100 font-light leading-relaxed">
            Merupakan suatu kebahagiaan dan kehormatan yang teramat besar bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami berdua.
          </p>

          <div className="pt-2 border-t border-gold-300/20 space-y-1">
            <p className="text-[11px] uppercase tracking-widest text-gold-gradient font-cinzel font-semibold">
              Turut Mengundang
            </p>
            <p className="font-serif text-sm sm:text-base text-white font-medium">
              {weddingConfig.familyClosing}
            </p>
          </div>
        </div>

        {/* Monogram Seal & Names */}
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto drop-shadow-[0_4px_16px_rgba(212,175,55,0.5)]">
            <Image
              src="/ornaments/wax-seal.svg"
              alt="Seal"
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-gold-gradient tracking-wide drop-shadow">
            Dinda &amp; Fidyan
          </h2>
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold-300">
            {weddingConfig.event.dateShort}
          </p>
        </div>
      </div>

      {/* Bottom: Music Credit & Copyright */}
      <div className="relative z-10 pt-4 space-y-2.5 text-[11px] text-mauve-200/90 font-light">
        <div className="flex items-center justify-center gap-1.5 text-gold-300">
          <Music className="h-3.5 w-3.5" />
          <span className="font-medium text-gold-200">
            Romantic &amp; Emotional Cinematic Instrumental
          </span>
        </div>
        <p className="tracking-widest uppercase font-cinzel text-[10px] text-mauve-300/70">
          &copy; 2025 The Wedding of Dinda &amp; Fidyan. All Rights Reserved.
        </p>
      </div>
    </section>
  );
}
