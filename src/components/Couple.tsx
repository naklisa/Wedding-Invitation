import Image from "next/image";
import { Instagram } from "lucide-react";
import { weddingConfig } from "../lib/config";

export default function Couple() {
  const { bride, groom } = weddingConfig;

  return (
    <section id="mempelai" className="relative px-6 py-14 text-center text-white">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-mauve-400/10 blur-[90px] pointer-events-none" />

      <div className="max-w-md mx-auto space-y-16 relative z-10">
        {/* Section Intro */}
        <div className="space-y-1">
          <p className="font-cinzel text-xs uppercase tracking-[0.35em] text-gold-300 font-medium">
            Maha Suci Allah
          </p>
          <h2 className="font-script text-4xl sm:text-5xl text-gold-gradient">
            Kedua Mempelai
          </h2>
          <p className="text-xs text-mauve-200/90 font-light max-w-xs mx-auto leading-relaxed">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan pernikahan putra-putri kami:
          </p>
        </div>

        {/* Mempelai Wanita (The Bride) */}
        <div className="space-y-5 flex flex-col items-center">
          {/* Arch Tiara Crown */}
          <div className="w-40 -mb-4 z-20 pointer-events-none filter drop-shadow-[0_4px_8px_rgba(212,175,55,0.4)]">
            <Image
              src="/ornaments/arch-filigree.svg"
              alt="Arch Crown"
              width={160}
              height={50}
              className="w-full h-auto"
            />
          </div>

          {/* Royal Arch Frame */}
          <div className="royal-arch-frame relative w-52 h-72 bg-gradient-to-b from-[#3d222c] to-[#1f0e15] p-2">
            <div className="relative w-full h-full rounded-[230px_230px_10px_10px] overflow-hidden">
              <Image
                src={bride.photo}
                alt={bride.fullName}
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2 pt-1 max-w-xs">
            <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold-300 font-semibold">
              The Bride
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-gold-gradient">
              {bride.fullName}
            </h3>
            <p className="text-xs text-mauve-100 font-light leading-relaxed">
              {bride.relation}{" "}
              <span className="font-medium text-white">{bride.fatherName}</span>
              <br />&amp; <span className="font-medium text-white">{bride.motherName}</span>
            </p>
          </div>

          <a
            href={`https://instagram.com/${bride.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full glass-pill px-4 py-1.5 text-xs text-mauve-100 hover:text-white transition-all shadow-md group"
          >
            <Instagram className="h-3.5 w-3.5 text-gold-300 group-hover:scale-110 transition-transform" />
            <span>@{bride.instagram}</span>
          </a>
        </div>

        {/* Divider Flourish & Ampersand */}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <div className="w-10 h-10 rounded-full border border-gold-300/40 flex items-center justify-center bg-black/30 shadow">
            <span className="font-serif italic text-2xl text-gold-gradient">&amp;</span>
          </div>
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>

        {/* Mempelai Pria (The Groom) */}
        <div className="space-y-5 flex flex-col items-center">
          {/* Arch Tiara Crown */}
          <div className="w-40 -mb-4 z-20 pointer-events-none filter drop-shadow-[0_4px_8px_rgba(212,175,55,0.4)]">
            <Image
              src="/ornaments/arch-filigree.svg"
              alt="Arch Crown"
              width={160}
              height={50}
              className="w-full h-auto"
            />
          </div>

          {/* Royal Arch Frame */}
          <div className="royal-arch-frame relative w-52 h-72 bg-gradient-to-b from-[#3d222c] to-[#1f0e15] p-2">
            <div className="relative w-full h-full rounded-[230px_230px_10px_10px] overflow-hidden">
              <Image
                src={groom.photo}
                alt={groom.fullName}
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2 pt-1 max-w-xs">
            <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold-300 font-semibold">
              The Groom
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-gold-gradient">
              {groom.fullName}
            </h3>
            <p className="text-xs text-mauve-100 font-light leading-relaxed">
              {groom.relation}{" "}
              <span className="font-medium text-white">{groom.fatherName}</span>
              <br />&amp; <span className="font-medium text-white">{groom.motherName}</span>
            </p>
          </div>

          <a
            href={`https://instagram.com/${groom.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full glass-pill px-4 py-1.5 text-xs text-mauve-100 hover:text-white transition-all shadow-md group"
          >
            <Instagram className="h-3.5 w-3.5 text-gold-300 group-hover:scale-110 transition-transform" />
            <span>@{groom.instagram}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
