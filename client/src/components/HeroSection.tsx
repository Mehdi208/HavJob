import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@assets/generated_images/Hero_image_professional_workspace_bad7ca60.png";

export default function HeroSection() {
  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/70" />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Trouvez votre prochaine mission en Côte d'Ivoire
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8">
            Connectez-vous avec des freelances talentueux ou découvrez des opportunités dans tous les domaines.
          </p>

          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="search"
                placeholder="Quel type de mission recherchez-vous ?"
                className="pl-10 h-12 bg-white/95 backdrop-blur border-0 text-base"
                data-testid="input-hero-search"
              />
            </div>
            <div className="relative md:w-64">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Ville"
                className="pl-10 h-12 bg-white/95 backdrop-blur border-0 text-base"
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

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20"
              data-testid="button-hero-publish"
            >
              Publier une mission
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20"
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
