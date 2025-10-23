import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  // Treat 401 errors as expected unauthenticated state
  const is401 = isError && (error as any)?.status === 401;
  
  return {
    user,
    isLoading,
    // User is authenticated if we have user data
    isAuthenticated: !!user,
    // Only considered not authenticated after query settles
    isUnauthenticated: !isLoading && (!user || is401),
  };
}
