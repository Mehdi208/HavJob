import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MapPin, Star, Briefcase } from "lucide-react";
import { useState } from "react";

export default function Freelances() {
  const [searchQuery, setSearchQuery] = useState("");

  const freelances = [
    {
      id: "1",
      name: "Kouadio Jean",
      skills: ["React", "Node.js", "TypeScript"],
      location: "Abidjan",
      rating: 4.8,
      reviewCount: 24,
      completedMissions: 18,
      description: "Développeur full-stack avec 5 ans d'expérience dans la création d'applications web modernes.",
    },
    {
      id: "2",
      name: "Traoré Aminata",
      skills: ["UI/UX Design", "Figma", "Adobe XD"],
      location: "Abidjan",
      rating: 4.9,
      reviewCount: 31,
      completedMissions: 25,
      description: "Designer passionnée spécialisée dans la création d'interfaces utilisateur modernes et intuitives.",
    },
    {
      id: "3",
      name: "N'Guessan Patrick",
      skills: ["SEO", "Content Marketing", "Google Ads"],
      location: "Yamoussoukro",
      rating: 4.7,
      reviewCount: 19,
      completedMissions: 22,
      description: "Expert en marketing digital avec une forte expérience en SEO et stratégie de contenu.",
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const filteredFreelances = freelances.filter(
    freelance =>
      freelance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelance.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      freelance.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-b from-secondary/5 to-transparent py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Annuaire des freelances
          </h1>
          <p className="text-xl text-muted-foreground">
            Trouvez le talent idéal pour votre projet
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un freelance par nom, compétence..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredFreelances.length} freelance{filteredFreelances.length > 1 ? 's' : ''} trouvé{filteredFreelances.length > 1 ? 's' : ''}
          </p>
        </div>

        {filteredFreelances.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun freelance ne correspond à votre recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelances.map((freelance) => (
              <Card key={freelance.id} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">{getInitials(freelance.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{freelance.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        {freelance.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{freelance.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({freelance.reviewCount} avis)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {freelance.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {freelance.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Briefcase className="h-4 w-4" />
                    {freelance.completedMissions} missions complétées
                  </div>

                  <Button className="w-full" data-testid={`button-contact-${freelance.id}`}>
                    Voir le profil
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
