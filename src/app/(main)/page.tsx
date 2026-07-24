"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { LoadingScreen }       from "@/components/ui/LoadingScreen";
import { CustomCursor }        from "@/components/ui/CustomCursor";
import { MainLayout }          from "@/components/layout/MainLayout";

import { HeroSection }         from "@/components/home/HeroSection";
import { EditionsNav }         from "@/components/home/EditionsNav";
import { SearchSection }       from "@/components/home/SearchSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { HotelsSection }       from "@/components/home/HotelsSection";
import { ExperiencesSection }  from "@/components/home/ExperiencesSection";
import { FlightsSection }      from "@/components/home/FlightsSection";
import { AIPlanner }           from "@/components/home/AIPlanner";
import { StorySection }        from "@/components/home/StorySection";
import { Testimonials }        from "@/components/home/Testimonials";

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {/* Custom cursor - always rendered, handles its own touch detection */}
      <CustomCursor />

      {/* Loading screen - exits smoothly via AnimatePresence */}
      <AnimatePresence>
        {showLoader && (
          <LoadingScreen onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <MainLayout>
        <HeroSection />
        <EditionsNav />
        <SearchSection />
        <DestinationsSection />
        <HotelsSection />
        <ExperiencesSection />
        <FlightsSection />
        <AIPlanner />
        <StorySection />
        <Testimonials />
      </MainLayout>
    </>
  );
}
