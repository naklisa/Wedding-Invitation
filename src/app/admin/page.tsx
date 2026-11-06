"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageSquare,
  Upload,
  Download,
  Copy,
  Check,
  Send,
  LogOut,
  ExternalLink,
  Search,
  Filter,
  Plus,
  Trash2,
  Lock,
  Mail,
  KeyRound,
  FileSpreadsheet,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import * as XLSX from "xlsx";
import { supabase, isSupabaseConfigured, GuestEntry, RsvpEntry } from "../../lib/supabase";

export default function AdminPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Data states
  const [guests, setGuests] = useState<GuestEntry[]>([]);
  const [wishes, setWishes] = useState<RsvpEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "guests" | "wishes">("overview");

  // Filter & Search states
  const [guestSearch, setGuestSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [wishesSearch, setWishesSearch] = useState("");
  const [wishesFilter, setWishesFilter] = useState("ALL");

  // Action states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importMessage, setImportMessage] = useState("");
  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualCategory, setManualCategory] = useState("Umum");
  const [showAddModal, setShowAddModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Check Supabase Auth Session
  useEffect(() => {
    async function checkAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            setIsAuthenticated(true);
            setUserEmail(data.session.user.email || "Admin");
          }
        } catch (e) {
          console.error("Auth check error", e);
        }
      }
      setAuthLoading(false);
    }
    checkAuth();
  }, []);

  // Fetch Data from Supabase
  const fetchData = async () => {
    if (isSupabaseConfigured && supabase) {
      // 1. Fetch Wishes
      try {
        const { data: wishesData } = await supabase
          .from("wishes")
          .select("*")
          .order("created_at", { ascending: false });
        if (wishesData) setWishes(wishesData);
      } catch (err) {
        console.warn("Wishes fetch error", err);
      }

      // 2. Fetch Guests
      try {
        const { data: guestsData, error } = await supabase
          .from("guests")
          .select("*")
          .order("created_at", { ascending: false });
        if (guestsData && !error) {
          setGuests(guestsData);
        } else {
          // Fallback to local storage if table not yet created
          const localGuests = localStorage.getItem("wedding_guests");
          if (localGuests) setGuests(JSON.parse(localGuests));
        }
      } catch (err) {
        const localGuests = localStorage.getItem("wedding_guests");
        if (localGuests) setGuests(JSON.parse(localGuests));
      }
    } else {
      // LocalStorage fallback
      const localGuests = localStorage.getItem("wedding_guests");
      if (localGuests) setGuests(JSON.parse(localGuests));
      const localWishes = localStorage.getItem("dinda_fidyan_wishes");
      if (localWishes) setWishes(JSON.parse(localWishes));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          setAuthError(error.message || "Email atau password salah.");
        } else if (data.user) {
          setIsAuthenticated(true);
          setUserEmail(data.user.email || "Admin");
        }
      } catch (err: any) {
        setAuthError(err.message || "Terjadi kesalahan saat login.");
      }
    } else {
      // Offline fallback login for demonstration
      if (password === "admin123") {
        setIsAuthenticated(true);
        setUserEmail("admin@local.test");
      } else {
        setAuthError("Gunakan password demo: admin123");
      }
    }
    setAuthLoading(false);
  };

  // Handle Logout
  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setUserEmail("");
  };

  // 1. Download Sample Excel Template
  const handleDownloadTemplate = () => {
    const templateData = [
      { Nama: "Bpk. Hendra & Keluarga", No_WhatsApp: "6281234567890", Kategori: "VIP" },
      { Nama: "Dimas Prasetyo", No_WhatsApp: "6285712345678", Kategori: "Teman Kantor" },
      { Nama: "Sarah Amalia & Partner", No_WhatsApp: "6289912345678", Kategori: "Teman Kuliah" },
      { Nama: "Keluarga Bpk. H. Ahmad", No_WhatsApp: "6282112345678", Kategori: "Keluarga" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template_Tamu");
    XLSX.writeFile(workbook, "Template_Daftar_Tamu_Undangan.xlsx");
  };

  // 2. Import Excel / CSV File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportMessage("");

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData: any[] = XLSX.utils.sheet_to_json(ws);

        if (!rawData || rawData.length === 0) {
          setImportMessage("File Excel kosong atau format tidak sesuai.");
          setIsImporting(false);
          return;
        }

        // Map column variations
        const parsedGuests: GuestEntry[] = rawData
          .map((row) => {
            const name = row.Nama || row.nama || row.Name || row.name || row["Nama Tamu"] || "";
            let phone = String(row.No_WhatsApp || row.no_whatsapp || row.WhatsApp || row.Phone || row.phone || row["No HP"] || "").replace(/\D/g, "");
            if (phone.startsWith("0")) {
              phone = "62" + phone.slice(1);
            }
            const category = row.Kategori || row.kategori || row.Category || "Umum";

            return {
              name: String(name).trim(),
              phone: phone || undefined,
              category: String(category).trim(),
              is_sent: false,
              created_at: new Date().toISOString(),
            };
          })
          .filter((g) => g.name.length > 0);

        if (parsedGuests.length === 0) {
          setImportMessage("Kolom 'Nama' tidak ditemukan di file Excel.");
          setIsImporting(false);
          return;
        }

        // Save to Supabase or LocalStorage
        if (isSupabaseConfigured && supabase) {
          try {
            const { error } = await supabase.from("guests").insert(parsedGuests);
            if (!error) {
              setGuests((prev) => [...parsedGuests, ...prev]);
            } else {
              // fallback
              const updated = [...parsedGuests, ...guests];
              setGuests(updated);
              localStorage.setItem("wedding_guests", JSON.stringify(updated));
            }
          } catch (err) {
            const updated = [...parsedGuests, ...guests];
            setGuests(updated);
            localStorage.setItem("wedding_guests", JSON.stringify(updated));
          }
        } else {
          const updated = [...parsedGuests, ...guests];
          setGuests(updated);
          localStorage.setItem("wedding_guests", JSON.stringify(updated));
        }

        setImportMessage(`✓ Berhasil mengimpor ${parsedGuests.length} tamu dari Excel!`);
        setTimeout(() => setImportMessage(""), 5000);
      } catch (err: any) {
        setImportMessage(`Gagal membaca Excel: ${err.message}`);
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    reader.readAsBinaryString(file);
  };

  // 3. Add Guest Manually
  const handleAddManualGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    let phone = manualPhone.replace(/\D/g, "");
    if (phone.startsWith("0")) {
      phone = "62" + phone.slice(1);
    }

    const newGuest: GuestEntry = {
      name: manualName.trim(),
      phone: phone || undefined,
      category: manualCategory,
      is_sent: false,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("guests").insert([newGuest]).select();
        if (!error && data) {
          setGuests((prev) => [data[0], ...prev]);
        } else {
          const updated = [newGuest, ...guests];
          setGuests(updated);
          localStorage.setItem("wedding_guests", JSON.stringify(updated));
        }
      } catch (e) {
        const updated = [newGuest, ...guests];
        setGuests(updated);
        localStorage.setItem("wedding_guests", JSON.stringify(updated));
      }
    } else {
      const updated = [newGuest, ...guests];
      setGuests(updated);
      localStorage.setItem("wedding_guests", JSON.stringify(updated));
    }

    setManualName("");
    setManualPhone("");
    setShowAddModal(false);
  };

  // Toggle Is Sent Status
  const handleToggleSent = async (index: number, guest: GuestEntry) => {
    const newStatus = !guest.is_sent;
    const updated = [...guests];
    updated[index].is_sent = newStatus;
    setGuests(updated);

    if (isSupabaseConfigured && supabase && guest.id) {
      await supabase.from("guests").update({ is_sent: newStatus }).eq("id", guest.id);
    } else {
      localStorage.setItem("wedding_guests", JSON.stringify(updated));
    }
  };

  // Delete Guest
  const handleDeleteGuest = async (index: number, guest: GuestEntry) => {
    if (!confirm(`Hapus tamu ${guest.name}?`)) return;
    const updated = guests.filter((_, i) => i !== index);
    setGuests(updated);

    if (isSupabaseConfigured && supabase && guest.id) {
      await supabase.from("guests").delete().eq("id", guest.id);
    } else {
      localStorage.setItem("wedding_guests", JSON.stringify(updated));
    }
  };

  // Delete Wish
  const handleDeleteWish = async (wish: RsvpEntry) => {
    if (!confirm(`Hapus ucapan dari ${wish.name}?`)) return;
    const updated = wishes.filter((w) => w.id !== wish.id);
    setWishes(updated);

    if (isSupabaseConfigured && supabase && wish.id) {
      await supabase.from("wishes").delete().eq("id", wish.id);
    } else {
      localStorage.setItem("dinda_fidyan_wishes", JSON.stringify(updated));
    }
  };

  // Export Wishes to Excel
  const handleExportWishes = () => {
    const exportData = wishes.map((w, idx) => ({
      No: idx + 1,
      Nama: w.name,
      Status_Kehadiran: w.status,
      Jumlah_Tamu: w.guest_count,
      Ucapan: w.message,
      Waktu_Kirim: w.created_at ? new Date(w.created_at).toLocaleString("id-ID") : "-",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RSVP_Ucapan");
    XLSX.writeFile(wb, "Data_RSVP_Buku_Tamu_Dinda_Fidyan.xlsx");
  };

  // Generate URL for guest
  const getGuestLink = (guestName: string) => {
    if (typeof window !== "undefined") {
      const baseUrl = window.location.origin;
      return `${baseUrl}/?to=${encodeURIComponent(guestName)}`;
    }
    return `/?to=${encodeURIComponent(guestName)}`;
  };

  // Generate WhatsApp Blast Message
  const sendWhatsApp = (guest: GuestEntry, index: number) => {
    const link = getGuestLink(guest.name);
    const message = `Yth. ${guest.name},

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

💍 *Lina Dinda Aulia, S.Pd & Fidyan Aolani, S.M*
📅 Sabtu, 16 Januari 2027
📍 Kediaman Mempelai Wanita (Pontang, Serang - Banten)

Detail acara dan konfirmasi kehadiran dapat dilihat melalui tautan undangan berikut:
${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.
_Dinda & Fidyan_`;

    const encodedMsg = encodeURIComponent(message);
    const phone = guest.phone ? guest.phone : "";
    const waUrl = phone
      ? `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`
      : `https://api.whatsapp.com/send?text=${encodedMsg}`;

    window.open(waUrl, "_blank");

    // Auto mark as sent
    if (!guest.is_sent) {
      handleToggleSent(index, guest);
    }
  };

  // Copy Link to clipboard
  const handleCopyLink = (guestName: string, id: string) => {
    const link = getGuestLink(guestName);
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtering calculations
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(guestSearch.toLowerCase()) ||
      (g.phone && g.phone.includes(guestSearch));
    const matchesCategory = categoryFilter === "ALL" || g.category === categoryFilter;
    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "SENT" && g.is_sent) ||
      (statusFilter === "UNSENT" && !g.is_sent);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(guests.map((g) => g.category || "Umum")));

  const totalPaxHadir = wishes
    .filter((w) => w.status === "hadir")
    .reduce((sum, w) => sum + (w.guest_count || 1), 0);

  // --------------------------------------------------------------------------
  // SCREEN 1: LOGIN (Protected Route)
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mauve-600/30 border border-mauve-400 text-mauve-300">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-wide text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-400">
              The Wedding of Dinda &amp; Fidyan
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                Email Admin
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@wedding.com"
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-mauve-400 focus:outline-none focus:ring-1 focus:ring-mauve-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-mauve-400 focus:outline-none focus:ring-1 focus:ring-mauve-400 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-mauve-600 hover:bg-mauve-500 text-white font-medium py-3 px-4 text-xs shadow-lg transition-all active:scale-98 disabled:opacity-50"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>{authLoading ? "Memverifikasi..." : "Masuk ke Dashboard"}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-700/60 text-center">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Login menggunakan akun pengurus yang telah ditambahkan di <strong>Supabase Auth</strong>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 2: ADMIN DASHBOARD (Authenticated)
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mauve-600 text-white font-serif font-bold text-sm shadow">
            D&amp;F
          </div>
          <div>
            <h1 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
              Wedding Admin Panel
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Lina Dinda Aulia, S.Pd &amp; Fidyan Aolani, S.M • 16 Januari 2027
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5 text-mauve-400" />
            <span className="hidden sm:inline">Lihat Web</span>
          </a>

          <div className="h-4 w-[1px] bg-slate-800" />

          <span className="text-xs text-slate-400 hidden md:inline truncate max-w-[150px]">
            {userEmail}
          </span>

          <button
            onClick={handleLogout}
            title="Keluar"
            className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 text-xs text-rose-300 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          {[
            { id: "overview", label: "Ringkasan & KPI", icon: Users },
            { id: "guests", label: `Daftar Tamu & WA Blast (${guests.length})`, icon: FileSpreadsheet },
            { id: "wishes", label: `Buku Tamu & RSVP (${wishes.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl py-2 px-4 text-xs font-medium whitespace-nowrap transition-all ${
                  active
                    ? "bg-mauve-600 text-white shadow"
                    : "bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB 1: OVERVIEW & STATS
           ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow space-y-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Total Tamu Diundang
                </span>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  {guests.length}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-medium">
                    {guests.filter((g) => g.is_sent).length} terkirim
                  </span>
                  <span>•</span>
                  <span>{guests.filter((g) => !g.is_sent).length} belum</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow space-y-2">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-medium">
                  Estimasi Pax Hadir
                </span>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-emerald-300">
                  {totalPaxHadir} <span className="text-sm font-sans font-normal text-slate-400">Orang</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Dari {wishes.filter((w) => w.status === "hadir").length} konfirmasi hadir
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow space-y-2">
                <span className="text-xs uppercase tracking-wider text-rose-400 font-medium">
                  Berhalangan / Ragu
                </span>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-rose-300">
                  {wishes.filter((w) => w.status !== "hadir").length}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span>{wishes.filter((w) => w.status === "tidak_hadir").length} tidak hadir</span>
                  <span>•</span>
                  <span>{wishes.filter((w) => w.status === "ragu").length} ragu</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow space-y-2">
                <span className="text-xs uppercase tracking-wider text-mauve-300 font-medium">
                  Total Doa &amp; Ucapan
                </span>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-mauve-200">
                  {wishes.length}
                </p>
                <p className="text-[11px] text-slate-400">
                  Tersimpan di database
                </p>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="bg-gradient-to-r from-mauve-900/60 via-slate-900 to-slate-900 border border-mauve-500/20 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-white">
                  Siap Membagikan Undangan ke Ratusan Tamu?
                </h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  Gunakan fitur Import Excel untuk memasukkan daftar 500+ tamu sekaligus, lalu kirimkan link unik personal ke WhatsApp masing-masing dalam 1-klik.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("guests")}
                className="flex items-center gap-2 rounded-xl bg-mauve-600 hover:bg-mauve-500 text-white font-medium py-2.5 px-5 text-xs shadow-lg transition-all whitespace-nowrap active:scale-98"
              >
                <Upload className="h-4 w-4" />
                <span>Buka Pengelola Tamu</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: GUEST LIST & EXCEL IMPORT (WHATSAPP BLAST)
           ========================================================================= */}
        {activeTab === "guests" && (
          <div className="space-y-5 animate-fade-in">
            {/* Top Bar Actions: Import, Template, Add Manual */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-base font-bold text-white">
                    Kelola Tamu &amp; Import Excel
                  </h3>
                  <p className="text-xs text-slate-400">
                    Import dari file Excel (.xlsx) atau tambahkan satu per satu.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Download Template */}
                  <button
                    onClick={handleDownloadTemplate}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 text-xs text-slate-200 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5 text-gold-400" />
                    <span>Download Template Excel</span>
                  </button>

                  {/* Upload Excel Button */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isImporting}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-medium shadow transition-colors disabled:opacity-50"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>{isImporting ? "Mengimpor..." : "Import File Excel"}</span>
                  </button>

                  {/* Add Manual */}
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-1.5 rounded-xl bg-mauve-600 hover:bg-mauve-500 text-white px-3.5 py-2 text-xs font-medium shadow transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Tambah Tamu</span>
                  </button>
                </div>
              </div>

              {importMessage && (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-300">
                  {importMessage}
                </div>
              )}

              {/* Search & Filter Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={guestSearch}
                    onChange={(e) => setGuestSearch(e.target.value)}
                    placeholder="Cari nama atau nomor WA..."
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-mauve-400 focus:outline-none"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:border-mauve-400 focus:outline-none"
                >
                  <option value="ALL">Semua Kategori ({categories.length})</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:border-mauve-400 focus:outline-none"
                >
                  <option value="ALL">Semua Status Blast</option>
                  <option value="SENT">Sudah Dikirim</option>
                  <option value="UNSENT">Belum Dikirim</option>
                </select>
              </div>
            </div>

            {/* Guests Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Nama Tamu</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">No. WhatsApp</th>
                      <th className="py-3 px-4">Tautan Khusus</th>
                      <th className="py-3 px-4 text-center">Aksi Blast</th>
                      <th className="py-3 px-4 text-right">Opsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredGuests.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500">
                          Belum ada data tamu. Klik <strong>"Import File Excel"</strong> atau <strong>"Tambah Tamu"</strong>.
                        </td>
                      </tr>
                    ) : (
                      filteredGuests.map((guest, idx) => (
                        <tr key={guest.id || idx} className="hover:bg-slate-800/40 transition-colors">
                          {/* Status toggle */}
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleSent(idx, guest)}
                              title={guest.is_sent ? "Tandai Belum Terkirim" : "Tandai Sudah Terkirim"}
                              className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium border transition-colors ${
                                guest.is_sent
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                  : "bg-slate-800 border-slate-700 text-slate-400"
                              }`}
                            >
                              <CheckCircle2 className={`h-3 w-3 ${guest.is_sent ? "text-emerald-400" : "text-slate-500"}`} />
                              <span>{guest.is_sent ? "Terkirim" : "Belum"}</span>
                            </button>
                          </td>

                          {/* Guest Name */}
                          <td className="py-3 px-4 font-medium text-white">
                            {guest.name}
                          </td>

                          {/* Category Badge */}
                          <td className="py-3 px-4">
                            <span className="rounded-lg bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-700">
                              {guest.category || "Umum"}
                            </span>
                          </td>

                          {/* Phone */}
                          <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                            {guest.phone || "-"}
                          </td>

                          {/* Copy Link */}
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleCopyLink(guest.name, `guest-${idx}`)}
                              className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 text-[11px] text-slate-200 transition-colors"
                            >
                              {copiedId === `guest-${idx}` ? (
                                <>
                                  <Check className="h-3 w-3 text-emerald-400" />
                                  <span className="text-emerald-400">Disalin!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 text-gold-400" />
                                  <span>Salin Link</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* WhatsApp Blast Button */}
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => sendWhatsApp(guest, idx)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 text-xs shadow transition-all active:scale-95"
                            >
                              <Send className="h-3 w-3" />
                              <span>Kirim WA</span>
                            </button>
                          </td>

                          {/* Delete */}
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteGuest(idx, guest)}
                              className="rounded-lg p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: GUESTBOOK & WISHES RSVP
           ========================================================================= */}
        {activeTab === "wishes" && (
          <div className="space-y-5 animate-fade-in">
            {/* Wishes Header & Export Action */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-base font-bold text-white">
                  Data RSVP &amp; Doa Tamu
                </h3>
                <p className="text-xs text-slate-400">
                  Total {wishes.length} ucapan dan {totalPaxHadir} pax tamu yang menyatakan hadir.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchData}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 text-xs text-slate-200 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
                  <span>Refresh Data</span>
                </button>

                <button
                  onClick={handleExportWishes}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3.5 py-2 text-xs shadow transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export ke Excel</span>
                </button>
              </div>
            </div>

            {/* Wishes Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  value={wishesSearch}
                  onChange={(e) => setWishesSearch(e.target.value)}
                  placeholder="Cari nama pengirim ucapan..."
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-mauve-400 focus:outline-none"
                />
              </div>

              <select
                value={wishesFilter}
                onChange={(e) => setWishesFilter(e.target.value)}
                className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:border-mauve-400 focus:outline-none"
              >
                <option value="ALL">Semua Kehadiran</option>
                <option value="hadir">Hadir Saja</option>
                <option value="tidak_hadir">Berhalangan</option>
                <option value="ragu">Masih Ragu</option>
              </select>
            </div>

            {/* Wishes Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Nama Tamu</th>
                      <th className="py-3 px-4">Status &amp; Pax</th>
                      <th className="py-3 px-4">Pesan &amp; Doa Restu</th>
                      <th className="py-3 px-4">Waktu</th>
                      <th className="py-3 px-4 text-right">Opsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {wishes
                      .filter((w) => {
                        const matchName = w.name.toLowerCase().includes(wishesSearch.toLowerCase());
                        const matchStatus = wishesFilter === "ALL" || w.status === wishesFilter;
                        return matchName && matchStatus;
                      })
                      .map((wish, idx) => (
                        <tr key={wish.id || idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                            {wish.name}
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            {wish.status === "hadir" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-500/30">
                                <CheckCircle2 className="h-3 w-3" /> Hadir ({wish.guest_count || 1} orang)
                              </span>
                            ) : wish.status === "tidak_hadir" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-medium text-rose-300 border border-rose-500/30">
                                <XCircle className="h-3 w-3" /> Berhalangan
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-medium text-amber-300 border border-amber-500/30">
                                <HelpCircle className="h-3 w-3" /> Masih Ragu
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-slate-200 max-w-md leading-relaxed">
                            {wish.message}
                          </td>

                          <td className="py-3 px-4 text-[11px] text-slate-400 whitespace-nowrap">
                            {wish.created_at ? new Date(wish.created_at).toLocaleString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }) : "-"}
                          </td>

                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteWish(wish)}
                              className="rounded-lg p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Hapus Pesan"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Manual Add Guest Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-base font-bold text-white">
                Tambah Tamu Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManualGuest} className="space-y-3.5">
              <div>
                <label className="block text-xs uppercase text-slate-300 mb-1 font-medium">
                  Nama Tamu
                </label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="Contoh: Bpk. Rahmat & Keluarga"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-mauve-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-300 mb-1 font-medium">
                  No. WhatsApp (Opsional)
                </label>
                <input
                  type="text"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  placeholder="08123456789 atau 6281234..."
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-mauve-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-300 mb-1 font-medium">
                  Kategori
                </label>
                <select
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:border-mauve-400 focus:outline-none"
                >
                  <option value="VIP">VIP</option>
                  <option value="Keluarga">Keluarga</option>
                  <option value="Teman Kantor">Teman Kantor</option>
                  <option value="Teman Kuliah">Teman Kuliah</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-mauve-600 hover:bg-mauve-500 text-white px-4 py-2 text-xs font-medium shadow"
                >
                  Simpan Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
