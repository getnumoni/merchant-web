import api from "@/lib/api";
import { AuthUser, signInPayload } from "@/lib/types";
import { useUserAuthStore } from "@/stores/user-auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const router = useRouter();
  const { setUser, setLoading } = useUserAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: signInPayload) => api.post("/auth/signIn", data),
    onSuccess: ({ data }) => {
      if (data) {
        console.log('sign in response', data);

        // Transform the response data to match our AuthUser type
        const userData: AuthUser = {
          id: data.id,
          username: data.username,
          usertype: data.usertype,
          roles: data.roles,
          token: data.token,
          refreshToken: data.refreshToken,
        };

        // Store user data in the auth store
        setUser(userData);

        // Navigate to dashboard
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      console.log('Sign in error:', error);
      setLoading(false);
    },
  });

  const handleSignIn = (data: signInPayload) => {
    setLoading(true);
    mutate(data);
  };

  return { handleSignIn, isPending };
};