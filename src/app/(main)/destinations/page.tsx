import { MainLayout } from "@/components/layout/MainLayout";
import { DestinationsClient } from "@/components/destinations/DestinationsClient";

export const metadata = {
  title: "Destinations",
  description: "Explore thousands of breathtaking destinations around the world.",
};

export default function DestinationsPage() {
  return (
    <MainLayout>
      <DestinationsClient />
    </MainLayout>
  );
}
