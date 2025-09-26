import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetBranchAnalysis = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["user", "branch-analytics"],
    queryFn: () => api.get("/merchant/branch/branch-analytics"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetBranchAnalysis;