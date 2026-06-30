import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const metadata = {
  title: "Admin Dashboard | Travix",
  description: "Manage destinations, users, bookings and more.",
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
