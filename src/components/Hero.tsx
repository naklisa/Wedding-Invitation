import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { weddingConfig } from "../lib/config";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between items-center text-center text-white px-6 py-12 overflow-hidden">
      {/* 1. Full-Bleed Background Photo (Foto Pertama Dinda & Fidyan Tanpa Bingkai) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/couple-cover.jpg"
          alt="Dinda & Fidyan Background"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Cinematic Multi-stop Dark Vignette Overlay so text is crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f0e15]/85 via-[#2b1820]/60 to-[#2b1820]" />
        
        {/* Subtle Damask Texture Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url('/ornaments/pattern-damask.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Decorative Golden Filigree Corners */}
      <div className="absolute top-2 left-2 w-28 h-28 opacity-45 pointer-events-none z-10">
        <Image
          src="/ornaments/floral-corner.svg"
          alt="Corner"
          width={112}
          height={112}
          className="w-full h-full transform rotate-180 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        />
      </div>
      <div className="absolute top-2 right-2 w-28 h-28 opacity-45 pointer-events-none z-10">
        <Image
          src="/ornaments/floral-corner.svg"
          alt="Corner"
          width={112}
          height={112}
          className="w-full h-full filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        />
      </div>

      {/* Top: Gunungan / Royal Crest */}
      <div className="relative z-10 pt-4 space-y-2">
        <div className="w-40 sm:w-48 mx-auto filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.5)]">
          <Image
            src="/ornaments/gunungan-crest.svg"
            alt="Gunungan Crest"
            width={180}
            height={90}
            className="w-full h-auto"
          />
        </div>
        <p className="font-cinzel text-xs uppercase tracking-[0.4em] text-gold-300 font-semibold drop-shadow">
          Walimatul &apos;Urs
        </p>
      </div>

      {/* Center: Couple Names & Bismillah */}
      <div className="relative z-10 my-auto space-y-4 max-w-sm">
        <div className="space-y-1">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold-200/90 font-medium">
            The Wedding of
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-gold-gradient drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Dinda &amp; Fidyan
          </h1>
          <p className="font-script text-2xl sm:text-3xl text-gold-200 drop-shadow">
            Lina Dinda Aulia &amp; Fidyan Aolani
          </p>
        </div>

        {/* Divider with small jewel */}
        <div className="flex items-center justify-center gap-3 py-1">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <span className="font-cinzel text-xs tracking-[0.3em] text-gold-300 font-semibold">
            {weddingConfig.event.dateShort}
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>

        {/* Bismillah Calligraphy */}
        <div className="pt-2">
          <p className="font-serif text-2xl sm:text-3xl text-gold-gradient tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Ayat Card with Frosted Depth */}
        <div className="luxury-card rounded-2xl p-4 sm:p-5 space-y-2.5 relative overflow-hidden border border-gold-300/35 shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-80" />
          <p className="text-xs sm:text-[13px] text-mauve-100 leading-relaxed font-light italic">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p className="text-[11px] font-semibold tracking-widest text-gold-gradient font-cinzel">
            — QS. Ar-Rum : 21 —
          </p>
        </div>
      </div>

      {/* Bottom: Animated Scroll Indicator */}
      <div className="relative z-10 pt-4 pb-2 flex flex-col items-center gap-1 opacity-80 animate-bounce-slow">
        <span className="font-cinzel text-[10px] tracking-[0.25em] text-gold-300 uppercase">
          Gulir ke Bawah
        </span>
        <ChevronDown className="h-4 w-4 text-gold-300" />
      </div>
    </section>
  );
}
