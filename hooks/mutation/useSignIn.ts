import api from "@/lib/api";
import { signInPayload } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: signInPayload) => api.post("/auth/signin", data),
    onSuccess: ({ data }) => {
      if (data) {
        console.log('sign in response', data);
        // localStorage.setItem("token", data.token);
        // router.push("/dashboard");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSignIn = (data: signInPayload) => {
    mutate(data);
  };

  return { handleSignIn, isPending };
};