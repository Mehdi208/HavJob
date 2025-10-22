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
    <Card className="relative overflow-hidden hover:scale-105 hover-elevate active-elevate-2 transition-all duration-300 p-6" data-testid={`card-mission-${id}`}>
      {isBoosted && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white px-4 py-2 rounded-bl-xl text-sm font-semibold flex items-center gap-1.5 shadow-lg animate-pulse">
          <Zap className="h-4 w-4" />
          Boost actif
        </div>
      )}

      <div className="mt-2">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-sm" data-testid={`badge-category-${id}`}>
            {category}
          </Badge>
          {isRemote && (
            <Badge variant="outline" className="text-sm">
              À distance
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2" data-testid={`text-title-${id}`}>
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2" data-testid={`text-description-${id}`}>
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary" data-testid={`text-budget-${id}`}>
            {budget}
          </div>
          <div className="flex items-center gap-1.5 text-base font-medium text-foreground">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
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

          <div className="flex flex-col items-end gap-1.5 text-sm font-medium text-foreground">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {location}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsFavorite(!isFavorite)}
                data-testid={`button-favorite-${id}`}
              >
                <Bookmark className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`} />
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {postedTime}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
