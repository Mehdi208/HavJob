import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Briefcase, AlertTriangle, TrendingUp, Lock, Shield, Zap, LogOut, User as UserIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Mission, User } from "@shared/schema";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const ADMIN_USERNAME = "MeAuWe";
const ADMIN_PASSWORD = "Team_HavJob03";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const { data: missions = [] } = useQuery<Mission[]>({
    queryKey: ["/api/missions"],
  });

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["/api/users"],
    enabled: isAdminAuthenticated,
  });

  useEffect(() => {
    const adminAuth = localStorage.getItem("admin_authenticated");
    if (adminAuth === "true") {
      setIsAdminAuthenticated(true);
    } else {
      setShowAuthDialog(true);
    }
  }, []);

  const handleAdminLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      setShowAuthDialog(false);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'espace administrateur",
      });
    } else {
      toast({
        title: "Erreur d'authentification",
        description: "Identifiant ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    setShowAuthDialog(true);
    setUsername("");
    setPassword("");
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté de l'espace administrateur",
    });
  };

  const stats = [
    {
      title: "Utilisateurs totaux",
      value: users.length.toString(),
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
      value: users.filter(u => u.role === "freelance" || u.role === "both").length.toString(),
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

  if (!isAdminAuthenticated) {
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
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
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
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  data-testid="input-admin-password"
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button onClick={handleAdminLogin} className="w-full" data-testid="button-admin-login">
                <Lock className="mr-2 h-4 w-4" />
                Se connecter
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

  const freelances = users.filter(u => u.role === "freelance" || u.role === "both");

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
                          <Button 
                            variant="default" 
                            size="sm"
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
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
