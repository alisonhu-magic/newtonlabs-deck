import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./social.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const gtSectraFine = localFont({
  src: [
    {
      path: "../../fonts/gt-sectra/GT-Sectra-LCGV-Fine-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/gt-sectra/GT-Sectra-LCGV-Fine-Regular-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/gt-sectra/GT-Sectra-LCGV-Fine-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-gt-sectra-fine",
  display: "swap",
});

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${gtSectraFine.variable} foundation-social min-h-screen`}>
      {children}
    </div>
  );
}
