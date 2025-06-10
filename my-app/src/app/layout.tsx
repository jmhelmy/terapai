import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: "Terapai",
  description: "HIPAA-compliant AI note assistant for therapists",
  icons: {
    icon: "/couchicon2.png",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${montserrat.variable} ${montserrat.className}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
