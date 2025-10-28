import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  Zap,
  TrendingUp,
  Eye,
  Briefcase,
  User as UserIcon,
} from "lucide-react";

export default function Boost() {
  const missionPlans = [
    {
      days: 1,
      price: 1000,
      url: "https://havjob-boost.maketou.com/fr/products/boost-24h-0",
      popular: false,
      features: [
        "Visibilité maximale pendant 24h",
        "Apparaît en tête des résultats",
        "Badge 'Boosté' visible",
        "Idéal pour tester le système",
      ],
    },
    {
      days: 3,
      price: 1100,
      url: "https://havjob-boost.maketou.com/fr/products/boost-24h-0-9",
      popular: false,
      features: [
        "Visibilité maximale pendant 3 jours",
        "Apparaît en tête des résultats",
        "Badge 'Boosté' visible",
        "Économie de 10% vs 1 jour",
      ],
    },
    {
      days: 7,
      price: 1200,
      url: "https://havjob-boost.maketou.com/fr/products/boost-24h-0-9-8-0",
      popular: true,
      features: [
        "Visibilité maximale pendant 7 jours",
        "Apparaît en tête des résultats",
        "Badge 'Boosté' visible",
        "Le plus populaire",
        "Économie de 20% vs 1 jour",
      ],
    },
    {
      days: 15,
      price: 1500,
      url: "https://havjob-boost.maketou.com/fr/products/boost-24h-0-9-8-0-3",
      popular: false,
      features: [
        "Visibilité maximale pendant 15 jours",
        "Apparaît en tête des résultats",
        "Badge 'Boosté' visible",
        "Économie de 50% vs 1 jour",
      ],
    },
    {
      days: 30,
      price: 2000,
      url: "https://havjob-boost.maketou.com/fr/products/boost-24h-0-9-8-0-3-8-6-5",
      popular: false,
      features: [
        "Visibilité maximale pendant 30 jours",
        "Apparaît en tête des résultats",
        "Badge 'Boosté' visible",
        "Meilleur rapport qualité/prix",
        "Économie de 67% vs 1 jour",
      ],
    },
  ];

  const profilePlans = [
    {
      days: 1,
      price: 1000,
      url: "https://havjob-boost.maketou.com/fr/products/boost-24h",
      popular: false,
      features: [
        "Visibilité maximale pendant 24h",
        "Apparaît en tête des résultats",
        "Badge 'Boosté' visible",
        "Idéal pour tester le système",
      ],
    },
    {
      days: 3,
      price: 1100,
      url: "https://havjob-boost.maketou.com/fr/products/boost-24h-0-9-8",
      popular: false,
      features: [
        "Visibilité maximale pendant 3 jours",
        "Apparaît en tête des résultats",
        "Badge 'Boosté' visible",
        "Économie de 10% vs 1 jour",
      ],
    },
    {
      days: 7,
      price: 1200,
      url: "https://havjob-boost.maketou.com/fr/products/boost-24h-0-9-8-0-4",
      popular: true,
      features: [
        "Visibilité maximale pendant 7 jours",
        "Apparaît en tête des résultats",
        "Badge 'Boosté' visible",
        "Le plus populaire",
        "Économie de 20% vs 1 jour",
      ],
    },
    {
      days: 15,
      price: 1500,
      url: "https://havjob-boost.maketou.com/fr/products/boost-24h-0-9-8-0-3-8",
      popular: false,
      features: [
        "Visibilité maximale pendant 15 jours",
        "Apparaît en tête des résultats",
        "Badge 'Boosté' visible",
        "Économie de 50% vs 1 jour",
      ],
    },
    {
      days: 30,
      price: 2000,
      url: "https://havjob-boost.maketou.com/fr/products/boost-24h-0-9-8-0-3-8-6",
      popular: false,
      features: [
        "Visibilité maximale pendant 30 jours",
        "Apparaît en tête des résultats",
        "Badge 'Boosté' visible",
        "Meilleur rapport qualité/prix",
        "Économie de 67% vs 1 jour",
      ],
    },
  ];

  const handleBoost = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-b from-primary/5 to-transparent py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Boostez votre visibilité
            </span>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Passez en première position
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Augmentez vos chances de trouver des clients ou le freelance idéal
            en boostant votre profil ou vos missions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover-elevate text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Visibilité maximale
              </h3>
              <p className="text-sm text-muted-foreground">
                Apparaissez systématiquement en tête des résultats de recherche
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Plus de vues</h3>
              <p className="text-sm text-muted-foreground">
                Multipliez par 10 le nombre de personnes qui voient votre profil
                ou mission
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Badge exclusif</h3>
              <p className="text-sm text-muted-foreground">
                Un badge "Boosté" attire l'attention et inspire confiance
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="mission" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="mission" data-testid="tab-boost-mission">
              <Briefcase className="h-4 w-4 mr-2" />
              Booster une mission
            </TabsTrigger>
            <TabsTrigger value="profile" data-testid="tab-boost-profile">
              <UserIcon className="h-4 w-4 mr-2" />
              Booster mon profil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mission">
            <h2 className="text-3xl font-bold text-center mb-4">
              Boostez votre mission
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Augmentez la visibilité de votre mission pour recevoir plus de
              candidatures de freelances qualifiés
            </p>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {missionPlans.map((plan) => (
                <Card
                  key={`mission-${plan.days}`}
                  className={`relative hover-elevate ${
                    plan.popular ? "border-primary shadow-lg" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary">Le plus populaire</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold mb-2">{plan.days}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {plan.days === 1 ? "jour" : "jours"}
                      </p>
                      <div className="text-3xl font-bold text-primary mb-1">
                        {plan.price.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">FCFA</p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleBoost(plan.url)}
                      data-testid={`button-boost-mission-${plan.days}`}
                    >
                      Booster maintenant
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <h2 className="text-3xl font-bold text-center mb-4">
              Boostez votre profil
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Mettez en avant votre profil de freelance pour être vu par plus de
              clients potentiels
            </p>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {profilePlans.map((plan) => (
                <Card
                  key={`profile-${plan.days}`}
                  className={`relative hover-elevate ${
                    plan.popular ? "border-primary shadow-lg" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary">Le plus populaire</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold mb-2">{plan.days}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {plan.days === 1 ? "jour" : "jours"}
                      </p>
                      <div className="text-3xl font-bold text-primary mb-1">
                        {plan.price.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">FCFA</p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleBoost(plan.url)}
                      data-testid={`button-boost-profile-${plan.days}`}
                    >
                      Booster maintenant
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Comment activer le boost ?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Choisissez votre formule</h4>
                <p className="text-sm text-muted-foreground">
                  Sélectionnez la durée qui correspond à vos besoins
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Payez via Maketou</h4>
                <p className="text-sm text-muted-foreground">
                  Effectuez votre paiement sécurisé via notre partenaire Maketou
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">
                  Profitez de la visibilité
                </h4>
                <p className="text-sm text-muted-foreground">
                  Votre boost est activé dans les 24h après paiement
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
