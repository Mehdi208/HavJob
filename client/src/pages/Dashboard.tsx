import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Star, Heart, Settings, Plus, Zap, Edit } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { User, Mission } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [newStatus, setNewStatus] = useState("");

  const { data: currentUser, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  const { data: myMissions = [] } = useQuery<Mission[]>({
    queryKey: ["/api/missions"],
    select: (missions) => 
      currentUser ? missions.filter(m => m.clientId === currentUser.id) : [],
    enabled: !!currentUser,
  });

  const { data: favorites = [] } = useQuery<any[]>({
    queryKey: ["/api/users/me/favorites"],
    enabled: !!currentUser,
  });

  const { data: allMissions = [] } = useQuery<Mission[]>({
    queryKey: ["/api/missions"],
    enabled: !!currentUser && favorites.length > 0,
  });

  const favoriteMissions = allMissions.filter(m => 
    favorites.some(f => f.missionId === m.id)
  );

  const updateMissionMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/missions/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/missions"] });
      toast({
        title: "Statut mis à jour",
        description: "Le statut de votre mission a été mis à jour avec succès",
      });
      setStatusDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le statut",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Vous devez être connecté pour accéder au dashboard</p>
          <Button onClick={() => setLocation("/connexion-telephone")} data-testid="button-login-prompt">
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  const openStatusDialog = (mission: Mission) => {
    setSelectedMission(mission);
    setNewStatus(mission.status);
    setStatusDialogOpen(true);
  };

  const handleStatusUpdate = () => {
    if (selectedMission && newStatus) {
      updateMissionMutation.mutate({
        id: selectedMission.id,
        status: newStatus,
      });
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      open: "Ouverte",
      toujours_actualite: "Toujours d'actualité",
      quelqu_un_retenu: "Quelqu'un a été retenu",
      in_progress: "En cours",
      completed: "Terminée",
      cancelled: "Annulée",
    };
    return labels[status] || status;
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    if (status === "open" || status === "toujours_actualite") return "default";
    if (status === "quelqu_un_retenu" || status === "completed") return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex-1">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-2xl">
                  {currentUser.fullName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground" data-testid="text-user-name">
                  {currentUser.fullName}
                </h1>
                <p className="text-muted-foreground">
                  {currentUser.phoneNumber}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {currentUser.role === "freelance" ? "Freelance" : currentUser.role === "client" ? "Client" : "Freelance & Client"}
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => setLocation("/boost")} data-testid="button-boost-profile">
              <Zap className="h-4 w-4" />
              Booster mon profil
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Missions publiées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {myMissions.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Note moyenne
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {currentUser.rating || 0}/5
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avis reçus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {currentUser.reviewCount || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="missions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="missions" data-testid="tab-missions">
              <Briefcase className="h-4 w-4 mr-2" />
              Mes missions
            </TabsTrigger>
            <TabsTrigger value="applications" data-testid="tab-applications">
              <Star className="h-4 w-4 mr-2" />
              Mes candidatures
            </TabsTrigger>
            <TabsTrigger value="favorites" data-testid="tab-favorites">
              <Heart className="h-4 w-4 mr-2" />
              Favoris
            </TabsTrigger>
          </TabsList>

          <TabsContent value="missions" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Missions que vous avez publiées
              </h2>
              <Button onClick={() => setLocation("/publier")} className="gap-2" data-testid="button-new-mission">
                <Plus className="h-4 w-4" />
                Nouvelle mission
              </Button>
            </div>

            {myMissions.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Vous n'avez pas encore publié de mission
                </p>
                <Button onClick={() => setLocation("/publier")} data-testid="button-publish-first">
                  Publier ma première mission
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {myMissions.map((mission) => (
                  <Card key={mission.id} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 cursor-pointer" onClick={() => setLocation(`/missions/${mission.id}`)}>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {mission.title}
                          </h3>
                          <Badge variant={getStatusVariant(mission.status)}>
                            {getStatusLabel(mission.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {mission.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium text-primary">
                            {new Intl.NumberFormat("fr-FR").format(mission.budget)} FCFA
                          </span>
                          <span>{mission.applicantsCount || 0} candidatures</span>
                          <span>{mission.category === "Autre" && mission.customCategory ? mission.customCategory : mission.category}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => openStatusDialog(mission)}
                          data-testid={`button-edit-status-${mission.id}`}
                        >
                          <Edit className="h-4 w-4" />
                          Modifier statut
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="gap-2"
                          onClick={() => setLocation("/boost")}
                          data-testid={`button-boost-mission-${mission.id}`}
                        >
                          <Zap className="h-4 w-4" />
                          Booster
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                Vos candidatures apparaîtront ici
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            {favoriteMissions.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  Vos missions favorites apparaîtront ici
                </p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {favoriteMissions.map((mission: any) => (
                  <Card key={mission.id} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={getStatusVariant(mission.status)}>
                            {getStatusLabel(mission.status)}
                          </Badge>
                          {mission.isBoosted && (
                            <Badge className="bg-gradient-to-r from-[hsl(var(--chart-4))] via-[hsl(var(--chart-5))] to-[hsl(var(--destructive))] text-destructive-foreground">
                              <Zap className="h-3 w-3 mr-1" />
                              Boosté
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 truncate">{mission.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{mission.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {mission.category}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {mission.applicantsCount || 0} candidatures
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xl font-bold text-primary">
                          {new Intl.NumberFormat("fr-FR").format(mission.budget)} FCFA
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setLocation(`/missions/${mission.id}`)}
                          data-testid={`button-view-favorite-${mission.id}`}
                        >
                          Voir la mission
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Status Update Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent data-testid="dialog-update-status">
          <DialogHeader>
            <DialogTitle>Modifier le statut de la mission</DialogTitle>
            <DialogDescription>
              Mettez à jour le statut pour informer les freelances de l'avancement
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger data-testid="select-mission-status">
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Ouverte</SelectItem>
                <SelectItem value="toujours_actualite">Toujours d'actualité</SelectItem>
                <SelectItem value="quelqu_un_retenu">Quelqu'un a été retenu</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="completed">Terminée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStatusDialogOpen(false)}
              data-testid="button-cancel-status"
            >
              Annuler
            </Button>
            <Button
              onClick={handleStatusUpdate}
              disabled={updateMissionMutation.isPending}
              data-testid="button-save-status"
            >
              {updateMissionMutation.isPending ? "Mise à jour..." : "Sauvegarder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
