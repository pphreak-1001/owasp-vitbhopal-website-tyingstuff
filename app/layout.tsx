import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Loader from "@/components/Loader";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OWASP VIT Bhopal University Student Chapter",
  description: "Elite Club of Web Application Security at VIT Bhopal University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} antialiased`}
      >
        {/* Loader is a fixed overlay — children keep their layout */}
        <Loader>
          <Navbar />
          {children}
          <Footer />
        </Loader>
      </body>
    </html>
  );
}
