"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, Gift as GiftIcon, CreditCard, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { weddingConfig } from "../lib/config";

export default function Gift() {
  const { banks, giftAddress } = weddingConfig;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.8 },
      colors: ["#fff5d6", "#e5bc54", "#d4af37"],
    });
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  return (
    <section id="kado" className="relative px-6 py-14 text-center text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gold-400/10 blur-[80px] pointer-events-none" />

      <div className="max-w-md mx-auto space-y-7 relative z-10">
        {/* Monogram Seal */}
        <div className="w-12 h-12 mx-auto drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]">
          <Image
            src="/ornaments/wax-seal.svg"
            alt="Seal"
            width={48}
            height={48}
            className="w-full h-full"
          />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <p className="font-cinzel text-xs uppercase tracking-[0.35em] text-gold-300 font-semibold">
            Wedding Gift
          </p>
          <h3 className="font-script text-4xl sm:text-5xl text-gold-gradient">
            Tanda Kasih
          </h3>
          <p className="text-xs text-mauve-200 font-light leading-relaxed max-w-xs mx-auto">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat menyampaikannya secara digital atau kado fisik:
          </p>
        </div>

        {/* Bank Cards */}
        <div className="space-y-4 pt-1">
          {banks.map((bank, idx) => (
            <div
              key={idx}
              className="luxury-card-gold rounded-3xl p-6 border border-gold-300/40 shadow-2xl space-y-4 text-left relative overflow-hidden"
            >
              {/* Metallic Chip & Bank Logo */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-6 w-9 rounded-md bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-300/60 shadow-sm" />
                  <span className="font-serif font-bold text-sm tracking-widest text-gold-200 uppercase">
                    Bank {bank.bankName}
                  </span>
                </div>
                <CreditCard className="h-5 w-5 text-gold-300 opacity-80" />
              </div>

              {/* Account Number */}
              <div className="space-y-1 py-1">
                <p className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-white drop-shadow">
                  {bank.accountNumber}
                </p>
                <p className="text-xs text-mauve-200 font-light">
                  Atas Nama: <span className="font-semibold text-gold-100">{bank.accountHolder}</span>
                </p>
              </div>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(bank.accountNumber, `bank-${idx}`)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-black/40 hover:bg-black/60 active:scale-98 py-3 px-4 text-xs font-medium text-white border border-gold-300/30 transition-all shadow-md group"
              >
                {copiedKey === `bank-${idx}` ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold font-cinzel">Nomor Rekening Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-gold-300 group-hover:scale-110 transition-transform" />
                    <span className="font-cinzel tracking-wider uppercase text-[11px] font-semibold text-gold-200">
                      Salin Nomor Rekening
                    </span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Kirim Kado Fisik */}
        <div className="luxury-card rounded-3xl p-6 border border-gold-300/30 shadow-2xl space-y-3.5 text-left relative overflow-hidden">
          <div className="flex items-center gap-2 text-gold-300">
            <GiftIcon className="h-4 w-4" />
            <h4 className="font-serif text-base font-semibold text-white">
              Kirim Kado Fisik
            </h4>
          </div>

          <p className="text-xs text-mauve-200 font-light leading-relaxed">
            Anda dapat mengirimkan kado ke alamat berikut:
          </p>

          <div className="rounded-2xl bg-black/35 p-4 border border-white/10 text-xs text-mauve-100 font-light space-y-1.5">
            <p className="font-semibold text-gold-200 text-sm">{giftAddress.recipient}</p>
            <p className="leading-relaxed text-mauve-200">{giftAddress.address}</p>
            <p className="text-mauve-300 font-mono text-[11px]">No. HP: {giftAddress.phone}</p>
          </div>

          <button
            onClick={() => handleCopy(`${giftAddress.recipient} - ${giftAddress.address} (${giftAddress.phone})`, "address")}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-black/40 hover:bg-black/60 active:scale-98 py-3 px-4 text-xs font-medium text-white border border-gold-300/30 transition-all shadow-md group"
          >
            {copiedKey === "address" ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-300 font-semibold font-cinzel">Alamat Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-gold-300 group-hover:scale-110 transition-transform" />
                <span className="font-cinzel tracking-wider uppercase text-[11px] font-semibold text-gold-200">
                  Salin Alamat Lengkap
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
