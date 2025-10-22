import { useRoute, useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, DollarSign, Briefcase, Star, Zap, ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { Mission, User } from "@shared/schema";

export default function MissionDetail() {
  const [, params] = useRoute("/missions/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [coverLetter, setCoverLetter] = useState("");

  const { data: mission, isLoading } = useQuery<Mission>({
    queryKey: ["/api/missions", params?.id],
    enabled: !!params?.id,
  });

  const { data: currentUser } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  const applyMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/missions/${params?.id}/apply`, {
        coverLetter,
        missionId: params?.id,
      });
    },
    onSuccess: () => {
      toast({
        title: "Candidature envoyée",
        description: "Votre candidature a été envoyée avec succès !",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/missions", params?.id] });
      setCoverLetter("");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible d'envoyer votre candidature",
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

  if (!mission) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Mission non trouvée</p>
          <Link href="/">
            <Button variant="outline">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat("fr-FR").format(budget) + " FCFA";
  };

  const formatTimeAgo = (date: Date | string) => {
    const now = new Date();
    const missionDate = new Date(date);
    const diffMs = now.getTime() - missionDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Il y a quelques minutes";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Il y a 1 jour";
    return `Il y a ${diffDays} jours`;
  };

  const isOwnMission = currentUser && mission.clientId === currentUser.id;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex-1">
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Retour aux missions
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              {mission.isBoosted && (
                <Badge className="mb-4 bg-gradient-to-r from-[hsl(var(--chart-4))] via-[hsl(var(--chart-5))] to-[hsl(var(--destructive))] text-destructive-foreground">
                  <Zap className="h-3 w-3 mr-1" />
                  Mission boostée
                </Badge>
              )}
              
              <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-mission-title">
                {mission.title}
              </h1>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="secondary" className="text-sm">
                  {mission.category}
                </Badge>
                {mission.isRemote && (
                  <Badge variant="outline" className="text-sm">
                    À distance
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-2xl font-bold text-primary">{formatBudget(mission.budget)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>{mission.applicantsCount || 0} candidatures</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{mission.location || "Non spécifié"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{mission.duration || "Non spécifié"}</span>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{mission.description}</p>
              </div>

              {mission.skillsRequired && mission.skillsRequired.length > 0 && (
                <div className="border-t border-border pt-6 mt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Compétences requises</h2>
                  <div className="flex flex-wrap gap-2">
                    {mission.skillsRequired.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h3 className="font-semibold text-foreground mb-4">
                {isOwnMission ? "Votre mission" : "Postuler à cette mission"}
              </h3>

              {!currentUser ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Vous devez être connecté pour postuler à cette mission
                  </p>
                  <Link href="/login">
                    <Button className="w-full" data-testid="button-login-prompt">
                      Se connecter
                    </Button>
                  </Link>
                </div>
              ) : isOwnMission ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    C'est votre mission. Vous pouvez la modifier ou voir les candidatures reçues.
                  </p>
                  <Button variant="outline" className="w-full">
                    Voir les candidatures ({mission.applicantsCount || 0})
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Lettre de motivation
                    </label>
                    <Textarea
                      placeholder="Expliquez pourquoi vous êtes le meilleur candidat pour cette mission..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="min-h-32"
                      data-testid="input-cover-letter"
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => applyMutation.mutate()}
                    disabled={applyMutation.isPending || !coverLetter.trim()}
                    data-testid="button-apply"
                  >
                    {applyMutation.isPending ? "Envoi..." : "Envoyer ma candidature"}
                  </Button>
                </div>
              )}

              <div className="border-t border-border mt-6 pt-6">
                <p className="text-xs text-muted-foreground">
                  Publié {formatTimeAgo(mission.createdAt)}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
