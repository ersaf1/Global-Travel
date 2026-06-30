import { MainLayout } from "@/components/layout/MainLayout";
import { UserDashboardClient } from "@/components/dashboard/UserDashboardClient";

export const metadata = {
  title: "Dashboard",
  description: "Manage your bookings, saved places and profile.",
};

export default function DashboardPage() {
  return (
    <MainLayout>
      <UserDashboardClient />
    </MainLayout>
  );
}
