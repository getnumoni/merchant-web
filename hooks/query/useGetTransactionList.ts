// merchant / transactionList


import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetTransactionList = ({ fromDate, toDate, page = 0, size = 10 }: { fromDate: string, toDate: string, page?: number, size?: number }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["transactionList", fromDate, toDate, page, size],
    queryFn: async () => {
      const response = await api.get(`/merchant/transactionList?fromDate=${fromDate}&toDate=${toDate}&page=${page}&size=${size}`);
      return response.data;
    },
    enabled: !!fromDate && !!toDate, // Only run query when both dates are provided
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetTransactionList;