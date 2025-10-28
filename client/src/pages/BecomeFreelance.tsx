import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { TrendingUp, Clock, Globe, Star, Award, Zap } from "lucide-react";

export default function BecomeFreelance() {
  const advantages = [
    {
      icon: TrendingUp,
      title: "Revenus complémentaires",
      description: "Générez des revenus supplémentaires en travaillant sur des projets qui vous passionnent.",
    },
    {
      icon: Clock,
      title: "Flexibilité totale",
      description: "Choisissez vos missions, vos horaires et travaillez où vous voulez.",
    },
    {
      icon: Globe,
      title: "Travail à distance",
      description: "Acceptez des missions en remote et collaborez avec des clients partout en Côte d'Ivoire.",
    },
    {
      icon: Star,
      title: "Construisez votre réputation",
      description: "Accumulez des avis positifs et devenez un freelance reconnu sur la plateforme.",
    },
    {
      icon: Award,
      title: "Développez vos compétences",
      description: "Travaillez sur des projets variés et enrichissez votre portfolio.",
    },
    {
      icon: Zap,
      title: "Boostez votre visibilité",
      description: "Utilisez notre système de boost pour apparaître en tête des résultats.",
    },
  ];

  const categories = [
    "Développement web",
    "Design graphique",
    "Marketing digital",
    "Rédaction de contenu",
    "Montage vidéo",
    "Photographie",
    "Services administratifs",
    "Conseil & formation",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Devenez freelance sur HavJob
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Rejoignez une communauté de freelances talentueux et trouvez des missions qui correspondent à vos compétences. Inscrivez-vous et commencez à postuler dès maintenant !
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/missions">
              <Button size="lg" data-testid="button-browse-missions">
                Parcourir les missions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Pourquoi devenir freelance ?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <advantage.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Dans quels domaines pouvez-vous travailler ?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="hover-elevate text-center">
                <CardContent className="p-6">
                  <p className="font-medium">{category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Card className="hover-elevate text-center bg-muted/50 w-full md:w-1/4">
              <CardContent className="p-6">
                <p className="font-medium text-muted-foreground">Et bien d'autres domaines...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Prêt à commencer votre aventure freelance ?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Parcourez les missions disponibles et contactez directement les clients pour démarrer votre activité freelance
        </p>
        <Link href="/missions">
          <Button 
            size="lg" 
            data-testid="button-get-started"
          >
            Parcourir les missions
          </Button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
