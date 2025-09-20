import api from "@/lib/api"
import { BranchManagerPayload } from "@/lib/types"
import { useBranchStore } from "@/stores/branch-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useCreateBranchManager = () => {
  const queryClient = useQueryClient()
  const { setManagerId } = useBranchStore()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: BranchManagerPayload) => api.post("/merchant/branch/manager", data),
    onSuccess: ({ data }) => {
      if (data) {
        // console.log('data', data?.managerId)
        const managerId = data?.managerId || "";
        if (managerId) {
          setManagerId(managerId);
        }
        toast.success(data?.message ?? "Manager Created Successfully")
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      // console.log('failed to create manager', error)
      const errorMessage = error?.response?.data?.message
      toast.error(errorMessage ?? "Failed to create manager")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['manager'] })
    }
  })

  const handleCreateManager = (data: BranchManagerPayload) => {
    mutate(data)
  }

  return {
    handleCreateManager,
    isPending,
    isSuccess
  }
}