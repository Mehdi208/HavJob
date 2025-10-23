import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, AlertTriangle, TrendingUp, Lock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Mission, User } from "@shared/schema";
import { useEffect } from "react";

export default function Admin() {
  const [, setLocation] = useLocation();
  
  const { data: currentUser, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });
  
  const { data: missions = [] } = useQuery<Mission[]>({
    queryKey: ["/api/missions"],
  });

  useEffect(() => {
    if (!userLoading && !currentUser) {
      setLocation("/login");
    }
  }, [currentUser, userLoading, setLocation]);

  const stats = [
    {
      title: "Utilisateurs totaux",
      value: "127",
      icon: Users,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Missions actives",
      value: missions.filter(m => m.status === "open").length.toString(),
      icon: Briefcase,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Signalements",
      value: "3",
      icon: AlertTriangle,
      trend: "-5%",
      trendUp: false,
    },
    {
      title: "Taux de conversion",
      value: "68%",
      icon: TrendingUp,
      trend: "+3%",
      trendUp: true,
    },
  ];

  if (userLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Accès restreint</h2>
              <p className="text-muted-foreground mb-6">
                Vous devez être connecté pour accéder à cette page.
              </p>
              <Button onClick={() => setLocation("/login")}>
                Se connecter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tableau de bord administrateur
          </h1>
          <p className="text-muted-foreground">
            Gérez votre plateforme HavJob
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant={stat.trendUp ? "default" : "secondary"}>
                    {stat.trend}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="missions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="reports">Signalements</TabsTrigger>
          </TabsList>

          <TabsContent value="missions">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des missions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {missions.slice(0, 10).map((mission) => (
                    <div
                      key={mission.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{mission.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {mission.category} • {mission.budget.toLocaleString()} FCFA
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={mission.status === "open" ? "default" : "secondary"}>
                          {mission.status}
                        </Badge>
                        {mission.isBoosted && (
                          <Badge className="bg-yellow-500">Boosté</Badge>
                        )}
                        <Button variant="outline" size="sm">
                          Gérer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fonctionnalité de gestion des utilisateurs en cours de développement
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Signalements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aucun signalement en attente de traitement
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
