import api from "@/lib/api";
import { BranchApiError, UpdateBranchPayload, UpdateBranchResponse } from "@/lib/types/branch-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    UpdateBranchResponse,
    BranchApiError,
    UpdateBranchPayload
  >({
    mutationFn: (data: UpdateBranchPayload) => {
      // Create FormData for file uploads
      const formData = new FormData();

      // Append all the form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'images' && Array.isArray(value)) {
            // Handle multiple images
            value.forEach((file) => {
              formData.append('images', file);
            });
          } else if (value instanceof File) {
            // Handle single file uploads
            formData.append(key, value);
          } else {
            // Handle string values
            formData.append(key, String(value));
          }
        }
      });

      return api.put("/merchant/branch", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: (response) => {
      toast.success(response.message || "Branch updated successfully");
      // Invalidate all branch-related queries
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      queryClient.invalidateQueries({ queryKey: ["branch"] });
      // Force refetch of all branch queries
      queryClient.refetchQueries({ queryKey: ["branch"] });
    },
    onError: (error: BranchApiError) => {
      const errorMessage = error?.response?.data?.message ?? error?.message ?? "Failed to create branch";
      toast.error(errorMessage);
    },
  });

  const handleUpdateBranch = (data: UpdateBranchPayload) => {
    mutate(data);
  };

  return {
    handleUpdateBranch,
    isPending,
    isSuccess,
    isError,
    error
  };
};