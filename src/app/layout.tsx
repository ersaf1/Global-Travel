import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NOVA   Discover the World, Your Way",
    template: "%s | NOVA",
  },
  description:
    "Plan routes, discover destinations, and book your perfect trip   all in one place. Trusted by 50,000+ travelers worldwide.",
  keywords: ["travel", "route planner", "destinations", "booking", "flights", "hotels"],
  authors: [{ name: "NOVA" }],
  creator: "NOVA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nova.travel",
    siteName: "NOVA",
    title: "NOVA   Discover the World, Your Way",
    description: "Plan routes, discover destinations, and book your perfect trip   all in one place.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA   Discover the World, Your Way",
    description: "Plan routes, discover destinations, and book your perfect trip.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
