"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const photos = [
  { src: "/images/couple-cover.jpg", alt: "Dinda & Fidyan Prewedding 1" },
  { src: "/images/gallery-1.jpg", alt: "Dinda & Fidyan Prewedding 2" },
  { src: "/images/gallery-2.jpg", alt: "Dinda & Fidyan Prewedding 3" },
  { src: "/images/gallery-3.jpg", alt: "Dinda & Fidyan Prewedding 4" },
  { src: "/images/gallery-4.jpg", alt: "Dinda & Fidyan Prewedding 5" },
  { src: "/images/gallery-5.jpg", alt: "Dinda & Fidyan Prewedding 6" },
  { src: "/images/gallery-6.jpg", alt: "Dinda & Fidyan Prewedding 7" },
  { src: "/images/couple-closing.jpg", alt: "Dinda & Fidyan Prewedding 8" },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section id="galeri" className="relative px-6 py-14 text-center text-white">
      <div className="max-w-md mx-auto space-y-7">
        {/* Header */}
        <div className="space-y-1">
          <p className="font-cinzel text-xs uppercase tracking-[0.35em] text-gold-300 font-semibold">
            Our Moments
          </p>
          <h3 className="font-script text-4xl sm:text-5xl text-gold-gradient">
            Galeri Bahagia
          </h3>
          <p className="text-xs text-mauve-200 font-light">
            Setiap detik yang kami abadikan dalam langkah menuju hari suci.
          </p>
        </div>

        {/* Gallery Grid with Depth & Frames */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(photo.src)}
              className="group relative h-52 sm:h-60 rounded-2xl overflow-hidden border border-gold-300/30 bg-[#1f0e15] cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] hover:-translate-y-1"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              
              {/* Inner subtle gold border */}
              <div className="absolute inset-2 rounded-xl border border-white/10 group-hover:border-gold-300/40 transition-colors pointer-events-none" />

              <div className="absolute bottom-3 right-3 rounded-full bg-black/60 backdrop-blur-sm border border-gold-300/40 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-3.5 w-3.5 text-gold-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 rounded-full bg-white/20 p-2.5 text-white hover:bg-white/40 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-w-lg max-h-[85vh] w-full h-[75vh] rounded-3xl overflow-hidden border-2 border-gold-300/40 shadow-[0_0_50px_rgba(212,175,55,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedPhoto}
              alt="Preview Full Photo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
