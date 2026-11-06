# 💍 Undangan Pernikahan Digital - Lina Dinda Aulia & Fidyan Aolani

Aplikasi undangan pernikahan digital (*interactive web invitation*) modern, elegan, dan siap produksi (*production-ready*). Dibangun dengan arsitektur **Next.js 14 (App Router) + Tailwind CSS + Supabase**, terinspirasi dari tema estetik **Novianty** (warna *dusty rose / mauve* dipadu ornamen botanical lili dan busana adat Jawa/Sunda klasik).

---

## 🔒 Pemisahan Rute (User vs Admin)

* **Halaman Publik (`/`)**:
  Halaman utama khusus untuk tamu undangan. **Tidak ada tombol atau panel admin apa pun** di sini, sehingga tamu murni menikmati pengalaman undangan pernikahan.
* **Portal Admin (`/admin`)**:
  Halaman khusus yang hanya bisa diakses dengan mengetikkan URL `/admin` di browser dan **wajib login** menggunakan akun admin yang terdaftar di **Supabase Auth**.

---

## ✨ Fitur Halaman Publik (`/`)

1. **Cover Pembuka Interaktif:**
   - Background prewedding Dinda & Fidyan resolusi tinggi dengan gradasi elegan.
   - Deteksi nama tamu otomatis dari URL query parameter: `?to=Nama+Tamu` (contoh: `https://undangan.com/?to=Budi+Santoso+%26+Partner`).
   - Tombol **"Open Invitation"** dengan transisi *slide-up* halus.
2. **Audio & Floating Controls:**
   - Pemutar musik latar romantis (*Cinematic Romantic Instrumental*) otomatis jalan begitu undangan dibuka.
   - Tombol audio melayang di pojok kanan bawah dengan animasi piringan berputar (*spin*).
   - Tombol WhatsApp untuk langsung berbagi / kirim ucapan.
   - Tombol Menu Navigasi cepat untuk melompat ke setiap bagian (*Mempelai, Acara, Galeri, Kisah, Kado, RSVP*).
3. **Profil Mempelai (*The Bride & The Groom*):**
   - Foto mempelai berbingkai lengkung (*Arch Frame*) beresolusi tinggi dari sesi prewedding asli.
   - Nama lengkap, orang tua, dan tombol tautan Instagram mempelai.
4. **Detail Acara & Kalender:**
   - Akad Nikah & Resepsi dengan badge tanggal kalender khas.
   - Tombol integrasi langsung ke **Google Maps** (Istana Muara, Bandung) lengkap dengan catatan penutupan jalan.
5. **Countdown Timer:**
   - Hitung mundur *real-time* menuju hari H (Hari, Jam, Menit, Detik).
6. **Galeri Momen Prewedding:**
   - Grid galeri foto estetik interaktif.
   - Klik foto mana saja untuk membuka **Lightbox** layar penuh.
7. **Kisah Cinta (*Our Journey*):**
   - Timeline perjalanan cinta dari awal bertemu hingga menuju halal.
8. **Tanda Kasih (Amplop Digital & Kado Fisik):**
   - Nomor rekening BCA & BNI dengan tombol **"Salin Nomor Rekening"** (otomatis *copy to clipboard* + animasi *confetti* perayaan).
   - Alamat pengiriman kado fisik dengan tombol **"Salin Alamat"**.
9. **RSVP & Buku Tamu (Terintegrasi Supabase):**
   - Formulir konfirmasi kehadiran (Hadir, Tidak Hadir, Masih Ragu), jumlah tamu, dan pesan doa restu.
   - Data otomatis tersimpan di database Postgres Supabase secara real-time.

---

## 🛠️ Fitur Dashboard Admin (`/admin`)

1. **Keamanan Login (Supabase Auth):**
   - Form login email & password yang langsung terverifikasi dengan Supabase Auth.
2. **Ringkasan & KPI Acara:**
   - Total tamu yang diundang.
   - Estimasi pax konsumsi katering (total kepala tamu yang konfirmasi hadir).
   - Jumlah tamu berhalangan / ragu.
   - Total ucapan dan doa yang masuk.
3. **Import Excel & WhatsApp Blast (Bisa 500+ Tamu):**
   - **Upload Excel / CSV:** Tinggal drop file `.xlsx` / `.csv`, ratusan tamu langsung ter-load dalam 1 detik.
   - **Download Template Excel:** Tombol download template format kolom (`Nama`, `No_WhatsApp`, `Kategori`).
   - **Tombol "Kirim WA" 1-Klik:** Langsung membuka WhatsApp ke nomor tamu dengan pesan undangan personal yang sudah memuat link khususnya.
   - **Checklist "Terkirim":** Menandai siapa saja yang sudah dikirimi undangan agar tidak ada tamu terlewat atau dobel kirim.
   - **Filter & Search:** Cari nama atau nomor HP tamu, dan filter per kategori (VIP, Keluarga, Teman Kantor, dll.).
4. **Manajemen Buku Tamu & RSVP:**
   - Melihat seluruh doa & konfirmasi kehadiran tamu secara langsung.
   - **Export ke Excel:** Sekali klik download seluruh rekapan data RSVP dan ucapan ke file `.xlsx` untuk diserahkan ke katering / WO.
   - **Hapus Pesan:** Moderasi pesan jika ada pesan typo atau spam.

---

## 🗄️ Setup Database Supabase

1. Buka dashboard project Supabase kamu: [zmzgzhjmsrrmrkgjmbge](https://supabase.com/dashboard/project/zmzgzhjmsrrmrkgjmbge).
2. Masuk ke menu **SQL Editor**, salin dan jalankan seluruh query dari file [`supabase/schema.sql`](./supabase/schema.sql).
3. Untuk membuat akun Admin pertama kali:
   - Masuk ke menu **Authentication -> Users** di dashboard Supabase.
   - Klik **"Add User"** -> **"Create user"**.
   - Masukkan Email admin (contoh: `admin@wedding.com`) dan Password pilihanmu.
   - Centang "Auto Confirm User".
4. Selesai! Kamu sekarang bisa login ke `/admin` menggunakan email & password tersebut.

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
2. **Halaman Undangan Tamu:** [http://localhost:3000](http://localhost:3000)
3. **Halaman Dashboard Admin:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📁 Keamanan Repository Git
File [.gitignore](file:///d:/DiditalWedding/.gitignore) sudah dipasang secara otomatis untuk mengecualikan `.env*.local`, `node_modules`, dan file build lainnya sehingga API key dan secret key Supabase tidak akan pernah ter-push secara publik ke GitHub.
