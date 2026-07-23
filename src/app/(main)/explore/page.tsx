import { MainLayout } from "@/components/layout/MainLayout";
import { DestinationsClient } from "@/components/destinations/DestinationsClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Explore Destinations" };

export default function ExplorePage() {
  return (
    <MainLayout>
      <div style={{ paddingTop: "72px" }}>
        <DestinationsClient />
      </div>
    </MainLayout>
  );
}
