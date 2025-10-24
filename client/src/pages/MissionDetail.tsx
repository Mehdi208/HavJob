import { useRoute, useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, DollarSign, Briefcase, Star, Zap, ArrowLeft, MessageCircle } from "lucide-react";
import type { Mission, User } from "@shared/schema";

export default function MissionDetail() {
  const [, params] = useRoute("/missions/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: mission, isLoading } = useQuery<Mission>({
    queryKey: ["/api/missions", params?.id],
    enabled: !!params?.id,
  });

  const { data: currentUser } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  // Fetch the client (mission owner) information
  const { data: client } = useQuery<User>({
    queryKey: ["/api/users", mission?.clientId],
    enabled: !!mission?.clientId,
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

  const isOwnMission = currentUser && mission.clientId === currentUser.id;

  // Create WhatsApp redirect URL
  const createWhatsAppUrl = () => {
    if (!client || !currentUser || !client.phoneNumber) return "#";
    
    // Sanitize: keep only digits
    let cleanNumber = client.phoneNumber.replace(/\D/g, "");
    
    // Remove leading zeros
    cleanNumber = cleanNumber.replace(/^0+/, "");
    
    // If number already starts with country code 225, use as-is
    // Otherwise prepend 225 (Ivory Coast country code)
    if (!cleanNumber.startsWith("225")) {
      cleanNumber = "225" + cleanNumber;
    }
    
    // Create pre-filled message
    const message = encodeURIComponent(
      `Bonjour ${client.fullName}, je suis ${currentUser.fullName} et je suis intéressé par votre mission "${mission.title}".`
    );
    
    // Return WhatsApp URL
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  const handleWhatsAppContact = () => {
    if (!currentUser) {
      setLocation("/connexion-telephone");
      return;
    }
    
    const url = createWhatsAppUrl();
    window.open(url, "_blank");
  };

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
              
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-foreground flex-1" data-testid="text-mission-title">
                  {mission.title}
                </h1>
                <Badge variant="secondary" className="ml-4">
                  {getStatusLabel(mission.status)}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="secondary" className="text-sm">
                  {mission.category === "Autre" && mission.customCategory ? mission.customCategory : mission.category}
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
                {mission.duration && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{mission.duration}</span>
                  </div>
                )}
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
                {isOwnMission ? "Votre mission" : "Contacter le client"}
              </h3>

              {!currentUser ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Vous devez être connecté pour contacter le client
                  </p>
                  <Button 
                    className="w-full" 
                    onClick={() => setLocation("/connexion-telephone")} 
                    data-testid="button-login-prompt"
                  >
                    Se connecter
                  </Button>
                </div>
              ) : isOwnMission ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    C'est votre mission. Vous pouvez la gérer depuis votre dashboard.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setLocation("/dashboard")}
                    data-testid="button-manage-mission"
                  >
                    Gérer ma mission
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {client && (
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-lg">
                          {client.fullName?.charAt(0) || "C"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{client.fullName}</p>
                        {client.rating !== null && client.rating > 0 && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                            <span>{client.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-sm text-muted-foreground">
                    Contactez le client directement sur WhatsApp pour discuter de cette mission
                  </p>
                  
                  <Button
                    className="w-full gap-2 bg-green-600 hover:bg-green-700"
                    onClick={handleWhatsAppContact}
                    data-testid="button-whatsapp-contact"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contacter sur WhatsApp
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
