import api from "@/lib/api";
import { UpdateBranchManagerPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useUpdateBranchManager = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: UpdateBranchManagerPayload) => api.put("/merchant/branch/manager", data),
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message ?? "Branch manager updated successfully");
        queryClient.invalidateQueries({ queryKey: ["branches"] });
        queryClient.invalidateQueries({ queryKey: ["branch"] });
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to update branch manager");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      queryClient.invalidateQueries({ queryKey: ["branch"] });
    },
  });

  const handleUpdateBranchManager = (data: UpdateBranchManagerPayload) => {
    mutate(data);
  };

  return { handleUpdateBranchManager, isPending, isSuccess };
};