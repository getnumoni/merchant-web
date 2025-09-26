// merchant / transactionList


import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetBranchSummary = ({ fromDate, toDate, }: { fromDate: string, toDate: string, }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant", fromDate, toDate,],
    queryFn: async () => {
      const response = await api.get(`/merchant/mainBranchSummary?fromDate=${fromDate}&toDate=${toDate}`);
      return response.data;
    },
    enabled: !!fromDate && !!toDate, // Only run query when both dates are provided
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetBranchSummary;