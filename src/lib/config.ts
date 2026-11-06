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
      date: "Oktober 2020",
      description: "Pertemuan pertama yang tak disengaja berawal dari lingkaran pertemanan yang sama, menyisakan percakapan hangat yang berkesan.",
    },
    {
      title: "Menjalin Komitmen",
      date: "Mei 2022",
      description: "Dengan niat yang tulus dan visi masa depan yang seirama, kami memutuskan untuk saling mendampingi dan melangkah lebih serius.",
    },
    {
      title: "Lamaran",
      date: "Desember 2025",
      description: "Dihadiri keluarga besar tercinta, ikatan suci diresmikan dalam sebuah janji untuk melangkah bersama menuju pernikahan.",
    },
    {
      title: "Hari Bahagia",
      date: "Januari 2027",
      description: "Atas izin Allah SWT dan restu kedua orang tua, kami menyatukan cinta dalam ikatan suci pernikahan.",
    },
  ],
};
