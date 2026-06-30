import { MainLayout } from "@/components/layout/MainLayout";
import { BookingClient } from "@/components/booking/BookingClient";

export const metadata = {
  title: "Book Your Trip",
  description: "Book your perfect trip with Travix.",
};

export default function BookingPage() {
  return (
    <MainLayout>
      <BookingClient />
    </MainLayout>
  );
}
