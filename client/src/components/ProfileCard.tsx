import { Star, MapPin, Zap, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  rating: number;
  reviewsCount: number;
  location: string;
  skills: string[];
  completedMissions: number;
  isBoosted?: boolean;
}

export default function ProfileCard({
  id,
  name,
  title,
  avatar,
  rating,
  reviewsCount,
  location,
  skills,
  completedMissions,
  isBoosted = false,
}: ProfileCardProps) {
  return (
    <Card className="relative overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 p-6" data-testid={`card-profile-${id}`}>
      {isBoosted && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-pink-500 text-white px-3 py-1 rounded-bl-lg text-xs font-medium flex items-center gap-1">
          <Zap className="h-3 w-3" />
          Profil boosté
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 ring-2 ring-primary/20 mb-4">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
        </Avatar>

        <h3 className="text-lg font-semibold text-foreground mb-1" data-testid={`text-name-${id}`}>
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3" data-testid={`text-title-${id}`}>
          {title}
        </p>

        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="font-semibold text-sm">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviewsCount} avis)</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
          <MapPin className="h-3 w-3" />
          {location}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          {completedMissions} missions réalisées
        </p>

        <Button
          className="w-full gap-2 bg-sidebar-accent hover:bg-sidebar-accent/90"
          data-testid={`button-contact-${id}`}
        >
          <MessageCircle className="h-4 w-4" />
          Contacter
        </Button>
      </div>
    </Card>
  );
}
