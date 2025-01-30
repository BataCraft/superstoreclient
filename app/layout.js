import { Oswald, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";

const opensans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata = {
  title: "Super Store",
  description: "E-commerce store built with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${opensans.variable} ${oswald.variable} antialiased`}
      >
        <div>
          <Header/>
          {children}
          </div>
      </body>
    </html>
  );
}
