import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type Filters = {
  budget: [number, number];
  categories: string[];
  locations: string[];
  isRemote: boolean | null;
  isOnSite: boolean | null;
  isBoosted: boolean;
  searchQuery: string;
};

type FilterPanelProps = {
  onFiltersChange: (filters: Filters) => void;
  currentSearchQuery?: string;
};

export default function FilterPanel({ onFiltersChange, currentSearchQuery = "" }: FilterPanelProps) {
  const [budget, setBudget] = useState<[number, number]>([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showRemote, setShowRemote] = useState(false);
  const [showOnSite, setShowOnSite] = useState(false);
  const [showBoosted, setShowBoosted] = useState(false);

  const categories = [
    { name: "Développement" },
    { name: "Design" },
    { name: "Marketing" },
    { name: "Rédaction" },
    { name: "Vidéo" },
    { name: "Photographie" },
    { name: "Services" },
    { name: "Conseil" },
  ];

  const locations = [
    { name: "Abidjan" },
    { name: "Yamoussoukro" },
    { name: "Bouaké" },
    { name: "San-Pédro" },
    { name: "Korhogo" },
    { name: "Daloa" },
  ];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      budget,
      categories: selectedCategories,
      locations: selectedLocations,
      isRemote: showRemote ? true : null,
      isOnSite: showOnSite ? true : null,
      isBoosted: showBoosted,
      searchQuery: currentSearchQuery,
    });
  };

  const handleReset = () => {
    setBudget([0, 1000000]);
    setSelectedCategories([]);
    setSelectedLocations([]);
    setShowRemote(false);
    setShowOnSite(false);
    setShowBoosted(false);
    onFiltersChange({
      budget: [0, 1000000],
      categories: [],
      locations: [],
      isRemote: null,
      isOnSite: null,
      isBoosted: false,
      searchQuery: currentSearchQuery,
    });
  };

  return (
    <div className="sticky top-24 h-fit">
      <div className="bg-card border border-card-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filtres</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            data-testid="button-reset-filters"
          >
            Réinitialiser
          </Button>
        </div>

        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Checkbox
              id="boosted-filter"
              checked={showBoosted}
              onCheckedChange={(checked) => setShowBoosted(checked as boolean)}
              data-testid="checkbox-boosted"
            />
            <Label htmlFor="boosted-filter" className="text-sm font-medium cursor-pointer">
              Afficher uniquement les missions boostées
            </Label>
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["category", "budget", "location", "type"]} className="w-full">
          <AccordionItem value="category">
            <AccordionTrigger className="text-sm font-medium">Catégorie</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`category-${category.name}`}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() => handleCategoryToggle(category.name)}
                        data-testid={`checkbox-category-${category.name}`}
                      />
                      <Label
                        htmlFor={`category-${category.name}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {category.name}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="budget">
            <AccordionTrigger className="text-sm font-medium">Budget (FCFA)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={1000000}
                  step={10000}
                  value={budget}
                  onValueChange={(value) => setBudget(value as [number, number])}
                  className="w-full"
                  data-testid="slider-budget"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{budget[0].toLocaleString()}</span>
                  <span className="text-muted-foreground">{budget[1].toLocaleString()}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="location">
            <AccordionTrigger className="text-sm font-medium">Localisation</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {locations.map((location) => (
                  <div key={location.name} className="flex items-center gap-2">
                    <Checkbox
                      id={`location-${location.name}`}
                      checked={selectedLocations.includes(location.name)}
                      onCheckedChange={() => handleLocationToggle(location.name)}
                      data-testid={`checkbox-location-${location.name}`}
                    />
                    <Label
                      htmlFor={`location-${location.name}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {location.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="type">
            <AccordionTrigger className="text-sm font-medium">Type de prestation</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remote-work"
                    checked={showRemote}
                    onCheckedChange={(checked) => setShowRemote(checked as boolean)}
                    data-testid="checkbox-remote"
                  />
                  <Label htmlFor="remote-work" className="text-sm font-normal cursor-pointer">
                    Travail à distance
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="onsite-work"
                    checked={showOnSite}
                    onCheckedChange={(checked) => setShowOnSite(checked as boolean)}
                    data-testid="checkbox-onsite"
                  />
                  <Label htmlFor="onsite-work" className="text-sm font-normal cursor-pointer">
                    Travail sur site
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4">
          <Button
            className="w-full"
            size="lg"
            onClick={handleApplyFilters}
            data-testid="button-apply-filters"
          >
            Appliquer les filtres
          </Button>
        </div>
      </div>
    </div>
  );
}
