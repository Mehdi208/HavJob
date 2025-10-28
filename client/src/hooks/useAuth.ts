export function useAuth() {
  return {
    user: {
      id: "demo-user",
      fullName: "Utilisateur Test",
      email: "test@havjob.ci",
      role: "freelance", // ou "client", "admin" selon ce que tu veux tester
    },
    isLoading: false,
    isAuthenticated: true,
    isUnauthenticated: false,
  };
}
