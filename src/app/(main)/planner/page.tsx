import { MainLayout } from "@/components/layout/MainLayout";
import { PlannerClient } from "@/components/planner/PlannerClient";

export const metadata = {
  title: "Route Planner",
  description: "Plan the perfect route between any two destinations worldwide.",
};

export default function PlannerPage() {
  return (
    <MainLayout>
      <PlannerClient />
    </MainLayout>
  );
}
