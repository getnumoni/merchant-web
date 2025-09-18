import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePlayPauseRewards = ({ rewardId }: { rewardId: string }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: () => api.put(`/merchant/reward/toggleStatus/${rewardId}`),
    onSuccess: () => {
      toast.success("Rewards played/paused successfully");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to play/pause rewards", error);
      toast.error(error?.response?.data?.message ?? "Failed to play/pause rewards");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reward"] });
    },
  });

  const handlePlayPauseRewards = () => {
    mutate();
  };
  return { handlePlayPauseRewards, isPending, isSuccess };
};