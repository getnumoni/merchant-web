// merchant / transactionList


import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetCustomerAnalytics = ({ startDate, endDate, }: { startDate: string, endDate: string, }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant", startDate, endDate,],
    queryFn: async () => {
      const response = await api.get(`/merchant/customerAnalytics?fromDate=${startDate}&toDate=${endDate}`);
      return response.data;
    },
    enabled: !!startDate && !!endDate, // Only run query when both dates are provided
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetCustomerAnalytics;