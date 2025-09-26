import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetRewardAnalysis = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["user", "reward-analytics"],
    queryFn: () => api.get("/merchant/reward-analytics"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetRewardAnalysis;