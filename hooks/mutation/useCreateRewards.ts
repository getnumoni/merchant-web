import api from "@/lib/api";
import { CreateRewardsPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useCreateRewards = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateRewardsPayload) => api.post("/merchant/reward", data),
    onSuccess: () => {
      toast.success("Rewards created successfully");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to create rewards", error);
      toast.error(error?.response?.data?.message ?? "Failed to create rewards");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reward"] });
    },
  });

  const handleCreateRewards = (data: CreateRewardsPayload) => {
    mutate(data);
  };

  return { handleCreateRewards, isPending, isSuccess };
};