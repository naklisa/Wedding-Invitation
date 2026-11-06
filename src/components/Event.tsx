import Image from "next/image";
import { MapPin, Navigation, Clock, CalendarHeart } from "lucide-react";
import { weddingConfig } from "../lib/config";

export default function Event() {
  const { event } = weddingConfig;

  return (
    <section id="acara" className="relative px-6 py-16 text-center text-white">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gold-400/10 blur-[100px] pointer-events-none" />

      <div className="max-w-md mx-auto space-y-8 relative z-10">
        {/* Monogram Seal Header */}
        <div className="space-y-2">
          <div className="w-14 h-14 mx-auto drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]">
            <Image
              src="/ornaments/wax-seal.svg"
              alt="Seal"
              width={56}
              height={56}
              className="w-full h-full"
            />
          </div>
          <p className="font-cinzel text-xs uppercase tracking-[0.35em] text-gold-300 font-semibold">
            Wedding Event
          </p>
          <h2 className="font-script text-4xl sm:text-5xl text-gold-gradient">
            Rangkaian Acara
          </h2>
        </div>

        {/* Akad Nikah Card */}
        <div className="luxury-card rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-70" />

          <div className="flex items-center justify-center gap-2 text-gold-300">
            <CalendarHeart className="h-5 w-5" />
            <h3 className="font-serif text-2xl text-gold-gradient font-normal">
              Akad Nikah
            </h3>
          </div>

          <div className="h-[1px] w-20 bg-gold-300/30 mx-auto" />

          <div className="space-y-1 text-sm text-mauve-100 font-light">
            <p className="font-medium text-white text-base">{event.dateFormatted}</p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/30 border border-white/15 px-3 py-1 text-xs text-gold-200 mt-1">
              <Clock className="h-3.5 w-3.5 text-gold-300" />
              <span>Pukul {event.akad.time}</span>
            </div>
            <p className="text-xs text-gold-200 font-medium pt-1">{event.akad.location}</p>
          </div>

          <p className="text-xs text-mauve-200/90 italic font-light">
            *Dihadiri oleh keluarga inti &amp; saksi
          </p>
        </div>

        {/* Resepsi Card (The Grand Highlight Card) */}
        <div className="luxury-card-gold rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden border border-gold-300/40">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-200 to-transparent" />

          <div className="space-y-1">
            <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-gold-300 font-bold">
              Celebration
            </span>
            <h3 className="font-serif text-3xl text-gold-gradient font-normal">
              Resepsi Pernikahan
            </h3>
          </div>

          {/* Luxury Calendar Badge */}
          <div className="mx-auto flex w-48 items-center justify-between rounded-2xl bg-black/40 border border-gold-300/30 py-3 px-4 shadow-inner">
            <span className="font-cinzel text-xs tracking-widest text-gold-200 font-semibold">
              {event.resepsi.dayName}
            </span>
            <div className="h-8 w-[1px] bg-gold-300/30" />
            <span className="font-serif text-4xl sm:text-5xl font-bold text-gold-gradient px-2 drop-shadow">
              {event.resepsi.dayNumber}
            </span>
            <div className="h-8 w-[1px] bg-gold-300/30" />
            <span className="font-cinzel text-xs tracking-widest text-gold-200 font-semibold">
              {event.resepsi.monthYear}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-black/40 border border-gold-300/30 px-3.5 py-1 text-xs text-gold-200">
            <Clock className="h-3.5 w-3.5 text-gold-300" />
            <span>Pukul {event.resepsi.time}</span>
          </div>

          <div className="pt-3 border-t border-gold-300/20 space-y-1.5">
            <h4 className="font-serif text-xl font-semibold text-white drop-shadow">
              {event.resepsi.location}
            </h4>
            <p className="text-xs text-mauve-100 font-light leading-relaxed max-w-xs mx-auto">
              {event.resepsi.address}
            </p>
          </div>
        </div>

        {/* Map Location Card */}
        <div className="luxury-card rounded-3xl p-5 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-gold-300/30 shadow-lg">
            <Image
              src="/images/gallery-1.jpg"
              alt="Lokasi Gedung Istana Muara"
              fill
              className="object-cover opacity-60 filter blur-[0.5px] scale-105"
            />
            <div className="absolute inset-0 bg-[#2b1820]/70 flex flex-col items-center justify-center p-4 text-center">
              <div className="relative mb-2">
                <div className="absolute inset-0 rounded-full bg-gold-400/40 animate-ping" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-black/60 border border-gold-300 text-gold-300 shadow-xl">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
              <span className="font-serif text-base font-semibold text-white drop-shadow">
                {event.resepsi.location}
              </span>
              <span className="text-[11px] text-mauve-200 mt-1 max-w-[280px]">
                Pontang, Serang - Banten
              </span>
            </div>
          </div>

          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 px-6 font-medium text-xs text-[#2b1820] shadow-[0_8px_20px_rgba(212,175,55,0.35)] transition-all duration-300 active:scale-95 bg-gradient-to-r from-[#fff5d6] via-[#e5bc54] to-[#caa03b] hover:brightness-110 border border-white/40 uppercase tracking-wider font-cinzel font-semibold"
          >
            <Navigation className="h-4 w-4" />
            <span>Petunjuk Lokasi (Google Maps)</span>
          </a>

          <p className="text-[10px] text-mauve-200/80 italic font-light">
            Demi kenyamanan, mohon gunakan akses jalan utama atau alternatif untuk menghindari penutupan jalan.
          </p>
        </div>
      </div>
    </section>
  );
}
