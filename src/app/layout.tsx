import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Travix — Explore the World, Your Way",
    template: "%s | Travix",
  },
  description:
    "Plan routes, discover destinations, and book your perfect trip — all in one place. Trusted by 50,000+ travelers worldwide.",
  keywords: ["travel", "route planner", "destinations", "booking", "flights", "hotels"],
  authors: [{ name: "Travix" }],
  creator: "Travix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://travix.app",
    siteName: "Travix",
    title: "Travix — Explore the World, Your Way",
    description:
      "Plan routes, discover destinations, and book your perfect trip — all in one place.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travix — Explore the World, Your Way",
    description: "Plan routes, discover destinations, and book your perfect trip.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
