import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, FileText, MessageCircle, CheckCircle, UserPlus, Briefcase } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Créez votre compte",
      description: "Inscrivez-vous gratuitement en tant que client ou freelance. Complétez votre profil pour commencer.",
      forClient: true,
      forFreelance: true,
    },
    {
      icon: FileText,
      title: "Publiez votre mission",
      description: "Décrivez votre projet, définissez votre budget et publiez votre mission en quelques clics.",
      forClient: true,
      forFreelance: false,
    },
    {
      icon: Search,
      title: "Trouvez des missions",
      description: "Parcourez les missions disponibles, filtrez par catégorie et postulez aux projets qui vous intéressent.",
      forClient: false,
      forFreelance: true,
    },
    {
      icon: MessageCircle,
      title: "Recevez des candidatures",
      description: "Consultez les profils des freelances et contactez-les directement via WhatsApp pour discuter du projet.",
      forClient: true,
      forFreelance: false,
    },
    {
      icon: Briefcase,
      title: "Travaillez ensemble",
      description: "Collaborez avec le client via WhatsApp, livrez votre travail et recevez votre paiement.",
      forClient: true,
      forFreelance: true,
    },
    {
      icon: CheckCircle,
      title: "Laissez un avis",
      description: "Évaluez votre expérience et construisez votre réputation sur la plateforme.",
      forClient: true,
      forFreelance: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            HavJob simplifie la collaboration entre freelances et clients en Côte d'Ivoire
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-primary/20 hover-elevate">
            <CardContent className="p-6">
              <Badge className="mb-4 bg-primary">Pour les clients</Badge>
              <h3 className="text-2xl font-bold mb-4">Trouvez le freelance idéal</h3>
              <div className="space-y-4">
                {steps.filter(s => s.forClient).map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/publier">
                <Button className="w-full mt-6" data-testid="button-publish-mission">
                  Publier une mission
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 hover-elevate">
            <CardContent className="p-6">
              <Badge className="mb-4 bg-secondary">Pour les freelances</Badge>
              <h3 className="text-2xl font-bold mb-4">Trouvez votre prochaine mission</h3>
              <div className="space-y-4">
                {steps.filter(s => s.forFreelance).map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/missions">
                <Button className="w-full mt-6" variant="secondary" data-testid="button-find-missions">
                  Trouver des missions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Pourquoi choisir HavJob ?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Simple et rapide</h4>
                <p className="text-sm text-muted-foreground">
                  Publiez ou trouvez une mission en quelques clics
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Contact direct</h4>
                <p className="text-sm text-muted-foreground">
                  Échangez directement via WhatsApp avec vos partenaires
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">100% ivoirien</h4>
                <p className="text-sm text-muted-foreground">
                  Une plateforme pensée pour le marché ivoirien
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
