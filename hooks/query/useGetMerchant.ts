import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetMerchant = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["user", "merchant"],
    queryFn: () => api.get("/merchant"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMerchant;