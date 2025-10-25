import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Briefcase, AlertTriangle, TrendingUp, Lock, Shield, Zap, LogOut, User as UserIcon, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Mission, User } from "@shared/schema";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Boost modal states
  const [isBoostDialogOpen, setIsBoostDialogOpen] = useState(false);
  const [boostTargetType, setBoostTargetType] = useState<"user" | "mission">("user");
  const [boostTargetId, setBoostTargetId] = useState("");
  const [boostTargetName, setBoostTargetName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number>(7);
  
  const { data: missions = [] } = useQuery<Mission[]>({
    queryKey: ["/api/missions"],
  });

  // Check admin authentication status
  const { data: adminStatus, isLoading: isCheckingAuth } = useQuery<{ isAdmin: boolean; username?: string }>({
    queryKey: ["/api/auth/admin-status"],
    retry: false,
  });

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["/api/users"],
    enabled: adminStatus?.isAdmin === true,
  });

  useEffect(() => {
    if (!isCheckingAuth) {
      if (adminStatus?.isAdmin) {
        setShowAuthDialog(false);
      } else {
        setShowAuthDialog(true);
      }
    }
  }, [adminStatus, isCheckingAuth]);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      return await apiRequest("POST", "/api/auth/admin-login", credentials);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/admin-status"] });
      setShowAuthDialog(false);
      setUsername("");
      setPassword("");
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'espace administrateur",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur d'authentification",
        description: error.message || "Identifiant ou mot de passe incorrect",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/admin-logout", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/admin-status"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setShowAuthDialog(true);
      setUsername("");
      setPassword("");
      toast({
        title: "Déconnexion",
        description: "Vous avez été déconnecté de l'espace administrateur",
      });
    },
  });

  const handleAdminLogin = () => {
    if (!username || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate({ username, password });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Boost mutation
  const boostMutation = useMutation({
    mutationFn: async ({ targetType, targetId, duration }: { targetType: "user" | "mission"; targetId: string; duration: number }) => {
      const endpoint = targetType === "user" 
        ? `/api/admin/boost-user/${targetId}` 
        : `/api/admin/boost-mission/${targetId}`;
      return await apiRequest("POST", endpoint, { duration });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/missions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setIsBoostDialogOpen(false);
      toast({
        title: "Boost activé",
        description: `${boostTargetType === "user" ? "Le freelance" : "La mission"} a été boosté avec succès pour ${selectedDuration} jour(s)`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de booster",
        variant: "destructive",
      });
    },
  });

  const handleOpenBoostDialog = (type: "user" | "mission", id: string, name: string) => {
    setBoostTargetType(type);
    setBoostTargetId(id);
    setBoostTargetName(name);
    setSelectedDuration(7); // Default to 7 days
    setIsBoostDialogOpen(true);
  };

  const handleBoost = () => {
    if (!boostTargetId || !selectedDuration) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une durée",
        variant: "destructive",
      });
      return;
    }
    boostMutation.mutate({
      targetType: boostTargetType,
      targetId: boostTargetId,
      duration: selectedDuration,
    });
  };

  // Filter out test users and N/A data
  const isTestUser = (user: User) => {
    const nameToCheck = user.fullName?.toLowerCase() || "";
    const phoneToCheck = user.phoneNumber?.toLowerCase() || "";
    return (
      nameToCheck.includes("test") ||
      nameToCheck.includes("n/a") ||
      phoneToCheck.includes("n/a")
    );
  };

  const realUsers = users.filter(u => !isTestUser(u));
  const realFreelances = realUsers.filter(u => u.role === "freelance" || u.role === "both");

  const stats = [
    {
      title: "Utilisateurs totaux",
      value: realUsers.length.toString(),
      icon: Users,
      description: "Inscrits sur la plateforme",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Missions actives",
      value: missions.filter(m => m.status === "open").length.toString(),
      icon: Briefcase,
      description: "En cours de recrutement",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Freelances",
      value: realFreelances.length.toString(),
      icon: UserIcon,
      description: "Profils freelances actifs",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Missions boostées",
      value: missions.filter(m => m.isBoosted).length.toString(),
      icon: Zap,
      description: "Visibilité premium",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground animate-spin" />
            <h2 className="text-2xl font-bold mb-2">Vérification...</h2>
            <p className="text-muted-foreground">
              Vérification des permissions administrateur
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!adminStatus?.isAdmin) {
    return (
      <>
        <Dialog open={showAuthDialog} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <DialogTitle className="text-center text-2xl">Espace Administrateur</DialogTitle>
              <DialogDescription className="text-center">
                Réservé aux administrateurs HavJob uniquement
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="admin-username">Identifiant</Label>
                <Input
                  id="admin-username"
                  placeholder="Entrez votre identifiant"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !loginMutation.isPending && handleAdminLogin()}
                  disabled={loginMutation.isPending}
                  data-testid="input-admin-username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Mot de passe</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !loginMutation.isPending && handleAdminLogin()}
                  disabled={loginMutation.isPending}
                  data-testid="input-admin-password"
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button 
                onClick={handleAdminLogin} 
                className="w-full" 
                disabled={loginMutation.isPending}
                data-testid="button-admin-login"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Se connecter
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Espace Administrateur</h2>
              <p className="text-muted-foreground">
                Authentification requise
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const freelances = realFreelances;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex-1 w-full">
        {/* Header with Logout */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Shield className="h-10 w-10 text-primary" />
              Espace Administrateur
            </h1>
            <p className="text-muted-foreground text-lg">
              Gestion et supervision de la plateforme HavJob
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-admin-logout">
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold mb-1 text-foreground">{stat.value}</div>
                <p className="text-sm font-semibold text-foreground mb-1">{stat.title}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="freelances" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="freelances" data-testid="tab-freelances">
              <UserIcon className="mr-2 h-4 w-4" />
              Booster Freelances
            </TabsTrigger>
            <TabsTrigger value="missions" data-testid="tab-missions">
              <Briefcase className="mr-2 h-4 w-4" />
              Missions
            </TabsTrigger>
          </TabsList>

          {/* Freelances Boost Tab */}
          <TabsContent value="freelances">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  Booster manuellement les freelances
                </CardTitle>
                <CardDescription>
                  Améliorez la visibilité des meilleurs freelances de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                {freelances.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aucun freelance inscrit pour le moment
                  </p>
                ) : (
                  <div className="space-y-3">
                    {freelances.map((freelance) => (
                      <div
                        key={freelance.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                        data-testid={`freelance-item-${freelance.id}`}
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{freelance.fullName}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{freelance.phoneNumber || "N/A"}</span>
                            <span>•</span>
                            <span>{freelance.email || "Pas d'email"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {freelance.isBoosted && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                              <Zap className="mr-1 h-3 w-3" />
                              Boosté
                            </Badge>
                          )}
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleOpenBoostDialog("user", freelance.id, freelance.fullName || "Freelance")}
                            data-testid={`button-boost-freelance-${freelance.id}`}
                          >
                            <Zap className="mr-2 h-4 w-4" />
                            Booster
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Missions Tab */}
          <TabsContent value="missions">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des missions</CardTitle>
                <CardDescription>
                  Aperçu de toutes les missions publiées sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                {missions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aucune mission publiée pour le moment
                  </p>
                ) : (
                  <div className="space-y-3">
                    {missions.slice(0, 15).map((mission) => (
                      <div
                        key={mission.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                        data-testid={`mission-item-${mission.id}`}
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{mission.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {mission.category} • {mission.budget.toLocaleString()} FCFA
                            {mission.isRemote && " • À distance"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={mission.status === "open" ? "default" : "secondary"}>
                            {mission.status === "open" ? "Ouverte" : mission.status}
                          </Badge>
                          {mission.isBoosted && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                              <Zap className="mr-1 h-3 w-3" />
                              Boosté
                            </Badge>
                          )}
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleOpenBoostDialog("mission", mission.id, mission.title)}
                            data-testid={`button-boost-mission-${mission.id}`}
                          >
                            <Zap className="mr-2 h-4 w-4" />
                            Booster
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Boost Dialog */}
        <Dialog open={isBoostDialogOpen} onOpenChange={setIsBoostDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <DialogTitle className="text-center text-2xl">
                Booster {boostTargetType === "user" ? "le freelance" : "la mission"}
              </DialogTitle>
              <DialogDescription className="text-center">
                {boostTargetName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="boost-duration">Durée du boost</Label>
                <Select
                  value={selectedDuration.toString()}
                  onValueChange={(value) => setSelectedDuration(parseInt(value))}
                >
                  <SelectTrigger id="boost-duration" data-testid="select-boost-duration">
                    <SelectValue placeholder="Sélectionner une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 jour</SelectItem>
                    <SelectItem value="3">3 jours</SelectItem>
                    <SelectItem value="7">7 jours</SelectItem>
                    <SelectItem value="15">15 jours</SelectItem>
                    <SelectItem value="30">30 jours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  Le boost augmentera la visibilité dans les résultats de recherche et apparaîtra en haut des listes pendant la durée sélectionnée.
                </p>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setIsBoostDialogOpen(false)}
                disabled={boostMutation.isPending}
                data-testid="button-cancel-boost"
              >
                Annuler
              </Button>
              <Button
                onClick={handleBoost}
                disabled={boostMutation.isPending}
                data-testid="button-confirm-boost"
              >
                {boostMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Activation...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Activer le boost
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
