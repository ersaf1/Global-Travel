import { MainLayout } from "@/components/layout/MainLayout";
import { DestinationDetailClient } from "@/components/destinations/DestinationDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: `Explore ${slug} — discover hotels, restaurants, attractions and more.`,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <MainLayout>
      <DestinationDetailClient slug={slug} />
    </MainLayout>
  );
}
