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
import { useQuery } from "@tanstack/react-query";
import type { Mission, User } from "@shared/schema";

type MissionWithClient = Mission & {
  client?: User;
};

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);

  const { data: missions = [], isLoading } = useQuery<MissionWithClient[]>({
    queryKey: ["/api/missions"],
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Chargement des missions...</p>
        </div>
      </div>
    );
  }

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
              {missions.length} mission{missions.length > 1 ? 's' : ''} disponible{missions.length > 1 ? 's' : ''}
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
            {missions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucune mission disponible pour le moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {missions.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    id={mission.id}
                    title={mission.title}
                    description={mission.description}
                    budget={formatBudget(mission.budget)}
                    category={mission.category}
                    location={mission.location || "Non spécifié"}
                    postedTime={formatTimeAgo(mission.createdAt)}
                    clientName="Client HavJob"
                    applicantsCount={mission.applicantsCount || 0}
                    isBoosted={mission.isBoosted || false}
                    isRemote={mission.isRemote || false}
                  />
                ))}
              </div>
            )}

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
