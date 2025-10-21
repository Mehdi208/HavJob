import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import StatsSection from "@/components/StatsSection";
import FilterPanel from "@/components/FilterPanel";
import MissionCard from "@/components/MissionCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);

  //todo: remove mock functionality
  const missions = [
    {
      id: "1",
      title: "Développement d'une application mobile e-commerce",
      description: "Je recherche un développeur expérimenté pour créer une application mobile iOS et Android pour ma boutique en ligne.",
      budget: "500 000 FCFA",
      category: "Développement",
      location: "Abidjan",
      postedTime: "Il y a 2h",
      clientName: "Kouassi Jean",
      applicantsCount: 12,
      isBoosted: true,
    },
    {
      id: "2",
      title: "Design de logo et identité visuelle",
      description: "Besoin d'un graphiste créatif pour concevoir un logo moderne et une charte graphique complète.",
      budget: "150 000 FCFA",
      category: "Design",
      location: "Yamoussoukro",
      postedTime: "Il y a 5h",
      clientName: "Diabaté Awa",
      applicantsCount: 8,
      isRemote: true,
    },
    {
      id: "3",
      title: "Rédaction de contenu web SEO",
      description: "Recherche rédacteur web pour créer du contenu optimisé SEO pour mon site internet.",
      budget: "80 000 FCFA",
      category: "Rédaction",
      location: "Bouaké",
      postedTime: "Il y a 1 jour",
      clientName: "Koné Ibrahim",
      applicantsCount: 5,
    },
    {
      id: "4",
      title: "Montage vidéo pour campagne marketing",
      description: "Besoin d'un monteur vidéo professionnel pour créer des contenus engageants.",
      budget: "200 000 FCFA",
      category: "Vidéo",
      location: "Abidjan",
      postedTime: "Il y a 3h",
      clientName: "Yao Marie",
      applicantsCount: 15,
      isBoosted: true,
    },
    {
      id: "5",
      title: "Création site web vitrine responsive",
      description: "Site web moderne pour une entreprise de services avec 5-7 pages.",
      budget: "350 000 FCFA",
      category: "Développement",
      location: "San-Pédro",
      postedTime: "Il y a 8h",
      clientName: "Traoré Bakary",
      applicantsCount: 20,
    },
    {
      id: "6",
      title: "Photographie produits e-commerce",
      description: "Shooting photo professionnel pour 50 produits avec retouche.",
      budget: "120 000 FCFA",
      category: "Photographie",
      location: "Abidjan",
      postedTime: "Il y a 6h",
      clientName: "N'Guessan Sophie",
      applicantsCount: 7,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <StatsSection />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Missions disponibles
            </h2>
            <p className="text-muted-foreground">
              1,120 missions correspondent à votre recherche
            </p>
          </div>
          <Button
            variant="outline"
            className="md:hidden gap-2"
            onClick={() => setShowFilters(!showFilters)}
            data-testid="button-toggle-filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtres
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <FilterPanel />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {missions.map((mission) => (
                <MissionCard key={mission.id} {...mission} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" data-testid="button-load-more">
                Charger plus de missions
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
