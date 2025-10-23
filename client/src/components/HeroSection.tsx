import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useLocation } from "wouter";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setSelectedLocation] = useState("");
  const [, navigate] = useLocation();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append("search", searchQuery);
    }
    if (location) {
      params.append("location", location);
    }
    const queryString = params.toString();
    navigate(queryString ? `/missions?${queryString}` : "/missions");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-[400px] sm:min-h-[500px] md:h-[60vh] w-full overflow-hidden bg-gradient-to-br from-primary/10 via-sidebar-accent/10 to-chart-3/10">
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-center items-center text-center py-8 md:py-0">
        <div className="max-w-4xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Trouvez votre prochaine mission en Côte d'Ivoire
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-10 px-2">
            Connectez-vous avec des freelances talentueux ou découvrez des opportunités dans tous les domaines.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6 md:mb-8 max-w-3xl mx-auto w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Quel type de mission ?"
                className="pl-9 sm:pl-10 h-11 sm:h-12 bg-card border-0 text-sm sm:text-base shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                data-testid="input-hero-search"
              />
            </div>
            <div className="relative sm:w-48 md:w-64">
              <Select value={location} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-11 sm:h-12 bg-card border-0 text-sm sm:text-base shadow-sm" data-testid="select-hero-location">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Abidjan">Abidjan</SelectItem>
                  <SelectItem value="Yamoussoukro">Yamoussoukro</SelectItem>
                  <SelectItem value="Bouaké">Bouaké</SelectItem>
                  <SelectItem value="San-Pédro">San-Pédro</SelectItem>
                  <SelectItem value="Korhogo">Korhogo</SelectItem>
                  <SelectItem value="Daloa">Daloa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              size="lg"
              className="h-11 sm:h-12 px-6 sm:px-8 font-medium text-sm sm:text-base"
              onClick={handleSearch}
              data-testid="button-hero-search"
            >
              Rechercher
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center">
            <Button
              variant="default"
              className="w-full sm:w-auto text-sm sm:text-base"
              onClick={() => navigate("/publier")}
              data-testid="button-hero-publish"
            >
              Publier une mission
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto text-sm sm:text-base"
              onClick={() => navigate("/missions")}
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
