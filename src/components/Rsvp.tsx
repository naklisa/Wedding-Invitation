"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Send, CheckCircle2, XCircle, HelpCircle, MessageSquare, Users, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { supabase, isSupabaseConfigured, RsvpEntry } from "../lib/supabase";

const initialWishes: RsvpEntry[] = [
  {
    id: "demo-1",
    name: "Rizky & Rina",
    status: "hadir",
    guest_count: 2,
    message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru Dinda & Fidyan!",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "demo-2",
    name: "Dimas Anggara",
    status: "hadir",
    guest_count: 1,
    message: "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Lancar sampai hari H bro Fidyan!",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "demo-3",
    name: "Sarah Amalia",
    status: "ragu",
    guest_count: 1,
    message: "Selamat ya Dinda sayang! Semoga acaranya berkah dan bahagia selalu bersama suami tercinta.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

interface RsvpProps {
  initialGuestName?: string;
}

export default function Rsvp({ initialGuestName }: RsvpProps = {}) {
  const [wishes, setWishes] = useState<RsvpEntry[]>(initialWishes);
  const [name, setName] = useState(initialGuestName || "");
  const [status, setStatus] = useState<"hadir" | "tidak_hadir" | "ragu">("hadir");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialGuestName && !name) {
      setName(initialGuestName);
    }
  }, [initialGuestName]);

  // Load from Supabase or LocalStorage
  useEffect(() => {
    async function fetchWishes() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from("wishes")
            .select("*")
            .order("created_at", { ascending: false });

          if (!error && data && data.length > 0) {
            setWishes(data);
          }
        } catch (err) {
          console.warn("Supabase fetch error, fallback to initial wishes", err);
        }
      } else {
        const saved = localStorage.getItem("dinda_fidyan_wishes");
        if (saved) {
          try {
            setWishes(JSON.parse(saved));
          } catch (e) {
            // ignore
          }
        }
      }
    }

    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);

    const newEntry: RsvpEntry = {
      name: name.trim(),
      status,
      guest_count: status === "hadir" ? guestCount : 0,
      message: message.trim(),
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("wishes").insert([newEntry]).select();
        if (!error && data) {
          setWishes((prev) => [data[0], ...prev]);
        } else {
          setWishes((prev) => [newEntry, ...prev]);
        }
      } catch (err) {
        setWishes((prev) => [newEntry, ...prev]);
      }
    } else {
      const updated = [newEntry, ...wishes];
      setWishes(updated);
      try {
        localStorage.setItem("dinda_fidyan_wishes", JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
    }

    setLoading(false);
    setSuccess(true);
    setName("");
    setMessage("");

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#fff5d6", "#e5bc54", "#d4af37"],
    });

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case "hadir":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="h-3 w-3" /> Hadir
          </span>
        );
      case "tidak_hadir":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-medium text-rose-300 border border-rose-500/30">
            <XCircle className="h-3 w-3" /> Berhalangan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-medium text-amber-300 border border-amber-500/30">
            <HelpCircle className="h-3 w-3" /> Masih Ragu
          </span>
        );
    }
  };

  return (
    <section id="rsvp" className="relative px-6 py-14 text-center text-white">
      <div className="max-w-md mx-auto space-y-7 relative z-10">
        {/* Header */}
        <div className="space-y-1">
          <p className="font-cinzel text-xs uppercase tracking-[0.35em] text-gold-300 font-semibold">
            RSVP &amp; Wishes
          </p>
          <h3 className="font-script text-4xl sm:text-5xl text-gold-gradient">
            Ucapan &amp; Doa Restu
          </h3>
          <p className="text-xs text-mauve-200 font-light max-w-xs mx-auto">
            Konfirmasi kehadiran dan tinggalkan pesan manis untuk kedua mempelai.
          </p>
        </div>

        {/* RSVP Form */}
        <form
          onSubmit={handleSubmit}
          className="luxury-card rounded-3xl p-6 border border-gold-300/30 shadow-2xl space-y-4 text-left relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-70" />

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gold-200 mb-1.5 font-cinzel font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Bpk. Budi Santoso & Keluarga"
              className="w-full rounded-2xl bg-black/40 border border-gold-300/25 px-4 py-3 text-xs text-white placeholder-mauve-300/50 focus:border-gold-300 focus:outline-none focus:ring-1 focus:ring-gold-300 transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gold-200 mb-1.5 font-cinzel font-semibold">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "hadir", label: "Hadir" },
                { value: "tidak_hadir", label: "Tidak" },
                { value: "ragu", label: "Ragu" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setStatus(opt.value as any)}
                  className={`rounded-xl py-2.5 px-2 text-xs font-medium border transition-all ${
                    status === opt.value
                      ? "bg-gold-500/30 border-gold-300 text-gold-100 shadow-[0_0_15px_rgba(212,175,55,0.3)] font-semibold"
                      : "bg-black/30 border-white/10 text-mauve-200 hover:bg-black/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {status === "hadir" && (
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gold-200 mb-1.5 font-cinzel font-semibold">
                Jumlah Tamu Hadir
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full rounded-2xl bg-[#24131a] border border-gold-300/25 px-4 py-3 text-xs text-white focus:border-gold-300 focus:outline-none focus:ring-1 focus:ring-gold-300 transition-all"
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang</option>
                <option value={5}>5 Orang</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gold-200 mb-1.5 font-cinzel font-semibold">
              Ucapan &amp; Doa Restu
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa terbaik untuk Dinda & Fidyan..."
              className="w-full rounded-2xl bg-black/40 border border-gold-300/25 px-4 py-3 text-xs text-white placeholder-mauve-300/50 focus:border-gold-300 focus:outline-none focus:ring-1 focus:ring-gold-300 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 px-6 font-medium text-xs text-[#2b1820] shadow-[0_10px_25px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-95 bg-gradient-to-r from-[#fff5d6] via-[#e5bc54] to-[#caa03b] hover:brightness-110 border border-white/40 uppercase tracking-wider font-cinzel font-bold disabled:opacity-60"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{loading ? "Mengirimkan..." : "Kirim Konfirmasi & Doa"}</span>
            <Sparkles className="h-3.5 w-3.5 opacity-80" />
          </button>

          {success && (
            <p className="text-center text-xs text-emerald-300 animate-fade-in font-medium pt-1">
              ✓ Terima kasih! Ucapan &amp; konfirmasi Anda telah tersimpan.
            </p>
          )}
        </form>

        {/* Wishes List Display */}
        <div className="luxury-card rounded-3xl p-6 border border-gold-300/25 shadow-2xl space-y-4 text-left relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gold-300" />
              <h4 className="font-serif text-sm font-semibold text-white">
                Buku Tamu ({wishes.length})
              </h4>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-mauve-200">
              <Users className="h-3.5 w-3.5 text-emerald-400" />
              <span className="font-medium text-white">
                {wishes.filter((w) => w.status === "hadir").reduce((sum, w) => sum + (w.guest_count || 1), 0)} Tamu Hadir
              </span>
            </div>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishes.map((w, idx) => (
              <div
                key={w.id || idx}
                className="rounded-2xl bg-black/35 p-4 border border-white/10 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-mauve-700 to-mauve-900 text-gold-200 font-serif font-bold text-xs border border-gold-300/40 shadow">
                      {w.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-serif text-xs font-semibold text-white">
                      {w.name}
                    </span>
                  </div>
                  {getStatusBadge(w.status)}
                </div>

                <p className="text-xs text-mauve-100 font-light leading-relaxed pl-10">
                  {w.message}
                </p>

                <p className="text-[10px] text-mauve-300/70 text-right pl-10">
                  {w.created_at ? new Date(w.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }) : "Baru saja"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
