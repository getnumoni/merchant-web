import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetBranchById = ({ branchId }: { branchId: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["branch", branchId],
    queryFn: () => api.get(`/merchant/branch?branchId=${branchId}`),
    enabled: !!branchId && branchId.trim() !== "",
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetBranchById;