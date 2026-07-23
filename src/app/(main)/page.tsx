import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { SearchSection } from "@/components/home/SearchSection";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ExploreMore } from "@/components/home/ExploreMore";
import { TrendingCountries } from "@/components/home/TrendingCountries";
import { DestinationCarousel } from "@/components/home/DestinationCarousel";
import { VideoBanner } from "@/components/home/VideoBanner";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <MainLayout>
      {/* Full page long-scroll — no padding-top, Hero handles navbar overlap */}
      <HeroSection />
      <SearchSection />
      <PopularDestinations />
      <WhyChooseUs />
      <ExploreMore />
      <TrendingCountries />
      <DestinationCarousel />
      <VideoBanner />
      <Testimonials />
    </MainLayout>
  );
}
