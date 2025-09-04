import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-heading",
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "DuaPutra",
  description: "E-Commerce with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable}`}>
      <head>
         <title>{metadata.title}</title>
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <Toaster />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
