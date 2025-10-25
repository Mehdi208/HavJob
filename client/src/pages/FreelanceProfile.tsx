import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Phone, MessageCircle, FileText, Star, ArrowLeft } from "lucide-react";
import type { User } from "@shared/schema";

export default function FreelanceProfile() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: freelance, isLoading } = useQuery<User>({
    queryKey: ["/api/users", id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch freelance");
      }
      return response.json();
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!freelance) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Freelance introuvable</p>
          <Button onClick={() => setLocation("/freelances")} data-testid="button-back-to-freelances">
            Retour à l'annuaire
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWhatsApp = () => {
    if (freelance.phoneNumber) {
      const phoneNumber = freelance.phoneNumber.replace(/\s/g, "");
      const message = encodeURIComponent(`Bonjour ${freelance.fullName}, je vous contacte depuis HavJob.`);
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    }
  };

  const handlePhone = () => {
    if (freelance.phoneNumber) {
      window.location.href = `tel:${freelance.phoneNumber}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 flex-1">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => setLocation("/freelances")}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'annuaire
        </Button>

        <Card className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarFallback className="text-4xl md:text-5xl">
                {freelance.fullName?.charAt(0) || "F"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-freelance-name">
                {freelance.fullName}
              </h1>
              
              {freelance.location && (
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span data-testid="text-freelance-location">{freelance.location}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" data-testid="badge-role">
                  {freelance.role === "freelance" ? "Freelance" : "Freelance & Client"}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {freelance.rating?.toFixed(1) || "Nouveau"}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {freelance.phoneNumber && (
                  <>
                    <Button
                      onClick={handleWhatsApp}
                      className="gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white"
                      data-testid="button-whatsapp"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </Button>
                    <Button
                      onClick={handlePhone}
                      variant="outline"
                      className="gap-2"
                      data-testid="button-phone"
                    >
                      <Phone className="h-4 w-4" />
                      Appeler
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {freelance.bio && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                À propos
              </h2>
              <p className="text-muted-foreground whitespace-pre-wrap" data-testid="text-bio">
                {freelance.bio}
              </p>
            </div>
          )}

          {freelance.skills && freelance.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Compétences
              </h2>
              <div className="flex flex-wrap gap-2">
                {freelance.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" data-testid={`badge-skill-${index}`}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {freelance.cvUrl && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                CV
              </h2>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open(freelance.cvUrl!, "_blank")}
                data-testid="button-view-cv"
              >
                <FileText className="h-4 w-4" />
                Voir le CV
              </Button>
            </div>
          )}
        </Card>

        {(freelance.reviewCount ?? 0) > 0 && (
          <Card className="p-6 mt-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current text-primary" />
                Avis ({freelance.reviewCount})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <p className="text-muted-foreground">
                Note moyenne : {freelance.rating?.toFixed(1) || "N/A"} / 5
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
