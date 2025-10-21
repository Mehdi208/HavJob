import { MapPin, Clock, Star, Bookmark, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface MissionCardProps {
  id: string;
  title: string;
  description: string;
  budget: string;
  category: string;
  location: string;
  postedTime: string;
  clientName: string;
  clientAvatar?: string;
  applicantsCount: number;
  isBoosted?: boolean;
  isRemote?: boolean;
}

export default function MissionCard({
  id,
  title,
  description,
  budget,
  category,
  location,
  postedTime,
  clientName,
  clientAvatar,
  applicantsCount,
  isBoosted = false,
  isRemote = false,
}: MissionCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="relative overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 p-6" data-testid={`card-mission-${id}`}>
      {isBoosted && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-pink-500 text-white px-3 py-1 rounded-bl-lg text-xs font-medium flex items-center gap-1">
          <Zap className="h-3 w-3" />
          Boost actif
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 h-8 w-8 rounded-full bg-background/80 backdrop-blur"
        onClick={() => setIsFavorite(!isFavorite)}
        data-testid={`button-favorite-${id}`}
      >
        <Bookmark className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`} />
      </Button>

      <div className="mt-2">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${id}`}>
            {category}
          </Badge>
          {isRemote && (
            <Badge variant="outline" className="text-xs">
              À distance
            </Badge>
          )}
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2" data-testid={`text-title-${id}`}>
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2" data-testid={`text-description-${id}`}>
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary" data-testid={`text-budget-${id}`}>
            {budget}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            {applicantsCount} candidatures
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={clientAvatar} />
              <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-foreground">{clientName}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {postedTime}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
