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
    "viraj",
    "viraj mali",
    "virajmali1523",
    "virajmali2006",
    "Mobile & Frontend Engineer",
    "Frontend Developer",
    "Mobile App Developer",
    "Cross-Platform App Developer",
    "Ionic Framework Developer",
    "Ionic Developer",
    "Angular Developer",
    "React.js Developer",
    "React Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "Firebase Developer",
    "Solana Web3.js Developer",
    "Solana Blockchain Developer",
    "Smart Contracts Developer",
    "dApp Developer",
    "Next.js Portfolio",
    "Navi Mumbai Developer",
    "Nashik Developer",
    "Software Engineering Intern",
    "App Developer Intern",
    "REST APIs Integration",
    "Prudent Tech IT Solutions",
    "Cyber Sanskar Nashik",
    "SoulPay Blockchain Payment Gateway",
    "ChatCom Chat Application",
    "Smt. Indira Gandhi College of Engineering",
    "K. K. Wagh Polytechnic",
    "Computer Engineering Student",
    "Web Developer Navi Mumbai"
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
      <body className="min-h-full flex flex-col bg-transparent text-white relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Viraj Pravin Mali",
              "url": "https://virajmali.com",
              "sameAs": ["https://github.com/virajmali1523"],
              "jobTitle": "Mobile & Frontend Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Prudent Tech IT Solutions"
              },
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Smt. Indira Gandhi College of Engineering"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "K. K. Wagh Polytechnic"
                }
              ],
              "knowsAbout": [
                "Ionic Framework",
                "Angular",
                "React.js",
                "TypeScript",
                "JavaScript",
                "Firebase",
                "Solana Web3.js",
                "Blockchain Development",
                "REST APIs",
                "Mobile App Development",
                "Frontend Development",
                "Smart Contracts",
                "dApps"
              ]
            })
          }}
        />
        {/* Hardware-accelerated fixed background layer (replaces high-repaint background-attachment: fixed) */}
        <div
          className="fixed inset-0 -z-50 bg-[#080C14] pointer-events-none select-none"
          style={{
            backgroundImage: `
              radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.12) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(16, 185, 129, 0.08) 0px, transparent 50%),
              radial-gradient(at 50% 50%, rgba(6, 182, 212, 0.05) 0px, transparent 60%),
              radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.08) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.08) 0px, transparent 50%)
            `,
            backgroundSize: '100% 100%'
          }}
        />
        {children}
      </body>
    </html>
  );
}
