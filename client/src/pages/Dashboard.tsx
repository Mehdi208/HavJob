import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Briefcase, Star, Heart, Settings, Plus } from "lucide-react";
import type { User, Mission } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const { data: currentUser, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  const { data: myMissions = [] } = useQuery<Mission[]>({
    queryKey: ["/api/missions"],
    select: (missions) => 
      currentUser ? missions.filter(m => m.clientId === currentUser.id) : [],
    enabled: !!currentUser,
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
          <Button onClick={() => setLocation("/login")}>
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex-1">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-2xl">
                  {currentUser.fullName.charAt(0)}
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
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
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
                Candidatures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                0
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Favoris
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                0
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
                  <Card key={mission.id} className="p-6 hover-elevate cursor-pointer" onClick={() => setLocation(`/missions/${mission.id}`)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {mission.title}
                          </h3>
                          <Badge variant={mission.status === "open" ? "default" : "secondary"}>
                            {mission.status === "open" ? "Ouverte" : mission.status}
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
                          <span>{mission.category}</span>
                        </div>
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
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                Vos missions favorites apparaîtront ici
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
