import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetAllBranches = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["branch"],
    queryFn: () => api.get("/merchant/branch"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllBranches;