import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viraj Pravin Mali | Elite Frontend & Cross-Platform App Developer",
  description: "Professional portfolio of Viraj Pravin Mali, an elite Frontend & Mobile App Developer. Specializing in high-performance Angular, Ionic Framework, TypeScript, REST APIs, and modern web interfaces.",
  keywords: [
    "Viraj Pravin Mali",
    "Viraj Mali",
    "Frontend Developer",
    "Mobile App Developer",
    "Ionic Developer",
    "Angular Developer",
    "TypeScript Developer",
    "Next.js Portfolio",
    "Navi Mumbai Developer",
    "Nashik Developer"
  ],
  authors: [{ name: "Viraj Pravin Mali", url: "https://github.com/virajmali1523" }],
  openGraph: {
    title: "Viraj Pravin Mali | Elite Frontend & Cross-Platform App Developer",
    description: "Cinematic, interactive web experience showcasing Angular, Ionic, and enterprise-grade mobile application development.",
    url: "https://virajmali.com",
    siteName: "Viraj Mali Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viraj Pravin Mali | Elite Frontend & Cross-Platform App Developer",
    description: "Cinematic, interactive web experience showcasing Angular, Ionic, and enterprise-grade mobile application development.",
    creator: "@virajmali1523",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-transparent text-white">
        {children}
      </body>
    </html>
  );
}
