export interface WeddingConfig {
  bride: {
    fullName: string;
    nickname: string;
    relation: string;
    fatherName: string;
    motherName: string;
    instagram: string;
    photo: string;
  };
  groom: {
    fullName: string;
    nickname: string;
    relation: string;
    fatherName: string;
    motherName: string;
    instagram: string;
    photo: string;
  };
  event: {
    title: string;
    dateISO: string; // for countdown
    dateFormatted: string;
    dateShort: string;
    akad: {
      time: string;
      location: string;
      address: string;
    };
    resepsi: {
      time: string;
      location: string;
      address: string;
      dayNumber: string;
      dayName: string;
      monthYear: string;
    };
    mapsUrl: string;
  };
  banks: Array<{
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  }>;
  giftAddress: {
    recipient: string;
    address: string;
    phone: string;
  };
  familyClosing: string;
  stories: Array<{
    title: string;
    date: string;
    description: string;
  }>;
}

export const weddingConfig: WeddingConfig = {
  bride: {
    fullName: "Lina Dinda Aulia, S.Pd",
    nickname: "Dinda",
    relation: "Putri ketiga dari",
    fatherName: "Bpk. H. Suhali (Alm.)",
    motherName: "Ibu Hj. Suhenah",
    instagram: "linadinda.a",
    photo: "/images/bride.jpg",
  },
  groom: {
    fullName: "Fidyan Aolani, S.M",
    nickname: "Fidyan",
    relation: "Putra pertama dari",
    fatherName: "Bpk. Sahroni",
    motherName: "Ibu Marinah",
    instagram: "fidyanaolani",
    photo: "/images/groom.jpg",
  },
  event: {
    title: "Dinda & Fidyan",
    dateISO: "2027-01-16T09:00:00+07:00",
    dateFormatted: "Sabtu, 16 Januari 2027",
    dateShort: "16 . 01 . 2027",
    akad: {
      time: "09.00 WIB",
      location: "Kediaman Mempelai Wanita",
      address: "Jl. KH. Syanwani RT. 02 RW. 01 Kp. Kelapian Ds. Kelapian Kec. Pontang Serang-Banten (MTs. Al-khairiyah Kelapian)",
    },
    resepsi: {
      time: "10.00 WIB s/d Selesai",
      location: "Kediaman Mempelai Wanita",
      address: "Jl. KH. Syanwani RT. 02 RW. 01 Kp. Kelapian Ds. Kelapian Kec. Pontang Serang-Banten (MTs. Al-khairiyah Kelapian)",
      dayNumber: "16",
      dayName: "SABTU",
      monthYear: "JANUARI 2027",
    },
    mapsUrl: "https://goo.gl/maps/GhmTCYxHYgnihLbf9?g_st=aw",
  },
  banks: [
    {
      bankName: "BCA",
      accountNumber: "7825123490",
      accountHolder: "Lina Dinda Aulia",
    },
    {
      bankName: "BNI",
      accountNumber: "0839218273",
      accountHolder: "Fidyan Aolani",
    },
  ],
  giftAddress: {
    recipient: "Lina Dinda Aulia & Fidyan Aolani",
    address: "Jl. KH. Syanwani RT. 02 RW. 01 Kp. Kelapian Ds. Kelapian Kec. Pontang, Serang - Banten (MTs. Al-khairiyah Kelapian)",
    phone: "081234567890",
  },
  familyClosing: "Keluarga Besar Bpk. H. Suhali (Alm.) & Bpk. Sahroni",
  stories: [
    {
      title: "Awal Pertemuan",
      date: "2024 - 25 MARET 2026",
      description: `Ada pagi yang tak pernah benar-benar berlalu dari ingatan Fidyan.

Tahun 2024, di jalan yang sama, di jam yang sama, ia selalu melihat Dinda berangkat mengajar. Tanpa sapaan, tanpa keberanian untuk menyapa. Hanya tatapan dari kejauhan, dan doa yang diam-diam dipanjatkan dalam hati, "Jika ia memang takdirku, pertemukanlah kami di waktu terbaik-Mu."

Waktu berjalan. Hati itu tak pernah padam.

Hingga di akhir 2025, Fidyan akhirnya memberanikan diri untuk memulai komunikasi. Sebuah pesan sederhana, yang ternyata menjadi awal dari segalanya.

Dan pada 25 Maret 2026, takdir menepati janjinya. Pertemuan pertama itu terjadi. Canggung, malu-malu, tapi hangat. Seolah dua hati yang sudah lama saling mencari, akhirnya menemukan jalannya untuk pulang.`,
    },
    {
      title: "Menjalin Komitmen",
      date: "23 MEI 2026",
      description: `Cinta yang dewasa bukanlah tentang seberapa sering kita tertawa bersama, tapi seberapa yakin kita untuk saling menjaga dalam diam.

Pada 23 Mei 2026, kami tidak lagi sekadar saling menyapa. Kami memilih untuk saling berkomitmen. Untuk saling mendampingi, saling menguatkan, dan saling mendoakan dalam setiap langkah.

Bukan karena kami sempurna, tapi karena kami percaya, cinta yang dijaga karena Allah akan selalu menemukan jalannya untuk abadi.`,
    },
    {
      title: "Lamaran",
      date: "27 SEPTEMBER 2026",
      description: `Ada hari dimana keberanian akhirnya menemukan tempatnya.

27 September 2026, dengan dada yang berdebar dan niat yang tulus, Fidyan datang membawa keluarganya. Bukan hanya membawa cincin, tapi membawa seluruh masa depannya untuk dititipkan kepada Dinda.

Di hadapan keluarga besar tercinta, air mata bahagia menjadi saksi. Sebuah janji terucap, bukan sekadar untuk hari itu, tapi untuk seumur hidup.

Hari itu, Dinda bukan lagi sekadar perempuan yang dilihat setiap pagi dari kejauhan. Ia telah menjadi jawaban dari doa-doa yang selama ini dipanjatkan.`,
    },
    {
      title: "Hari Bahagia",
      date: "HARI BAHAGIA",
      description: `Sebelas tahun.

Sebelas tahun kami dipisahkan oleh waktu, oleh jarak, oleh cerita yang tak pernah selesai. Kami pernah menjadi dua orang asing yang berjalan di jalan yang berbeda, tanpa tahu bahwa takdir sedang diam-diam menuliskan ulang pertemuan kami.

Dan kini, setelah 11 tahun berpisah, kami dipertemukan kembali. Bukan kebetulan. Ini adalah takdir yang paling indah.

Atas izin Allah SWT dan restu kedua orang tua, kami menyatukan cinta dalam ikatan suci pernikahan. Karena kami percaya, jodoh yang tertulis oleh Allah tidak akan pernah tertukar, hanya menunggu waktu terbaik untuk dipertemukan.

Dari tatapan di pagi hari, menjadi janji seumur hidup.
Setelah 11 tahun terpisah, akhirnya kita pulang, ke hati yang sama.`,
    },
  ],
};
