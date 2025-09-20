import api from "@/lib/api";
import { Rewards } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateRewards = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: Rewards) => api.put(`/merchant/reward/`, data),
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data.message ?? "Reward updated successfully");
        queryClient.invalidateQueries({ queryKey: ["reward"] });
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to update reward", error);
      toast.error(error?.response?.data?.message ?? "Failed to update reward");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reward"] });
    },
  });

  const handleUpdateRewards = (data: Rewards) => {
    mutate(data);
  };

  return { handleUpdateRewards, isPending, isSuccess };
};