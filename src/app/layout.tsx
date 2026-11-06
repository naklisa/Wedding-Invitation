import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://df-wedding-invitation-flax.vercel.app"
  ),
  title: "The Wedding of Dinda & Fidyan | 16.01.27",
  description: "Undangan Pernikahan Lina Dinda Aulia, S.Pd & Fidyan Aolani, S.M - Sabtu, 16 Januari 2027 di Pontang, Serang - Banten.",
  openGraph: {
    title: "The Wedding of Dinda & Fidyan",
    description: "Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i pada acara pernikahan kami.",
    images: [
      {
        url: "/images/couple-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Dinda & Fidyan Wedding Invitation",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-mauve-400 selection:text-white">
        {children}
      </body>
    </html>
  );
}
