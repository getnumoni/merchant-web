import api from "@/lib/api";
import { ChangeBranchStatusPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const useChangeBranchStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: ChangeBranchStatusPayload) => api.put(`/merchant/branch/branch-status
`, data),
    onSuccess: ({ data }) => {
      if (data) {
        toast.success("Branch status changed successfully");
        queryClient.invalidateQueries({ queryKey: ["branch"] });
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to change branch status");
    },
  })

  const handleChangeBranchStatus = (data: ChangeBranchStatusPayload) => {
    mutate(data);
  };

  return { handleChangeBranchStatus, isPending, isSuccess };
}

export default useChangeBranchStatus;