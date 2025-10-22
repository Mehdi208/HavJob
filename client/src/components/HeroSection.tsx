import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-gradient-to-br from-primary/10 via-sidebar-accent/10 to-chart-3/10">
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Trouvez votre prochaine mission en Côte d'Ivoire
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            Connectez-vous avec des freelances talentueux ou découvrez des opportunités dans tous les domaines.
          </p>

          <div className="flex flex-col md:flex-row gap-3 mb-8 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Quel type de mission recherchez-vous ?"
                className="pl-10 h-12 bg-card border-0 text-base shadow-sm"
                data-testid="input-hero-search"
              />
            </div>
            <div className="relative md:w-64">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ville"
                className="pl-10 h-12 bg-card border-0 text-base shadow-sm"
                data-testid="input-hero-location"
              />
            </div>
            <Button
              size="lg"
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-medium"
              data-testid="button-hero-search"
            >
              Rechercher
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="default"
              className="bg-chart-3 hover:bg-chart-3/90 text-white"
              data-testid="button-hero-publish"
            >
              Publier une mission
            </Button>
            <Button
              variant="outline"
              data-testid="button-hero-services"
            >
              Proposer mes services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
