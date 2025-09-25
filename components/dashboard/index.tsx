'use client';

import useGetMerchant from "@/hooks/query/useGetMerchant";
import { useRouter } from "next/navigation";
import Hero from "../common/hero";
import ErrorPage from "../ui/error-page";
import LoadingSpinner from "../ui/loading-spinner";
import PointsDistribution from "./points-distribution";

export default function Dashboard() {
  const router = useRouter();
  const { isPending, error, isError, refetch } = useGetMerchant();

  if (isPending) {
    return <LoadingSpinner message="Loading merchant..." />;
  }

  if (isError) {
    return (
      <ErrorPage
        error={error}
        onRetry={() => refetch()}
        onGoHome={() => router.push('/dashboard')}
        title="Failed to load dashboard"
        description={error?.message}
      />
    );
  }

  return (
    <main>
      <Hero />
      <PointsDistribution />
    </main>
  );
}