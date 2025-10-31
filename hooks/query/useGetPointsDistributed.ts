import api from "@/lib/api";
import { getCurrentDate, getYesterdayDate } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";

interface UseGetPointsDistributedParams {
  page?: number;
  size?: number;
  search?: string;
}

const useGetPointsDistributed = (params: UseGetPointsDistributedParams = {}) => {
  const { page = 0, size = 10, search } = params;
  const fromDate = getYesterdayDate("dd-mm-yyyy") as string;
  const toDate = getCurrentDate("dd-mm-yyyy") as string;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["points-distributed", fromDate, toDate, page, size, search],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Required parameters
      queryParams.append("fromDate", fromDate);
      queryParams.append("toDate", toDate);
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());

      // Optional search parameter
      if (search) queryParams.append("search", search);

      const queryString = queryParams.toString();
      return api.get(`/merchant/points-distributed?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetPointsDistributed;