import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ExploreMore } from "@/components/home/ExploreMore";
import { DestinationCarousel } from "@/components/home/DestinationCarousel";
import { VideoBanner } from "@/components/home/VideoBanner";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <PopularDestinations />
      <WhyChooseUs />
      <ExploreMore />
      <DestinationCarousel />
      <VideoBanner />
    </MainLayout>
  );
}
