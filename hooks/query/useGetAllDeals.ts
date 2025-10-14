import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllDeals = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["deals"],
    queryFn: () => api.get("/merchant/dealsList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllDeals;