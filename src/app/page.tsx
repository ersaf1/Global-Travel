import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { TrendingCountries } from "@/components/home/TrendingCountries";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <WhyChooseUs />
      <PopularDestinations />
      <TrendingCountries />
      <Testimonials />
    </MainLayout>
  );
}
