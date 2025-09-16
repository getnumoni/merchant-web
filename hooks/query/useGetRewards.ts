'use client';

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type UseGetRewardsProps = {
  merchantId?: string;
}

const useGetRewards = ({ merchantId }: UseGetRewardsProps) => {
  //if merchantId is not provided, do not fetch with merchantId just fetch all rewards

  const getRewards = async () => {
    const endpoint = merchantId ? `/merchant/reward/${merchantId}` : '/merchant/reward';
    const response = await api.get(endpoint);
    return response.data;
  };

  const { isPending, error, data, isError, refetch } = useQuery({
    queryKey: ["reward", merchantId],
    queryFn: getRewards,
    enabled: true, // Always enabled, but endpoint changes based on merchantId
  });

  return {
    data,
    isPending,
    error,
    isError,
    refetch,
  };
};

export default useGetRewards;
