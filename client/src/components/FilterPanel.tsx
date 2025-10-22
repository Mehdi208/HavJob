import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FilterPanel() {
  const [budget, setBudget] = useState([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showBoosted, setShowBoosted] = useState(false);

  const categories = [
    { name: "Développement", count: 124 },
    { name: "Design", count: 89 },
    { name: "Marketing", count: 67 },
    { name: "Rédaction", count: 45 },
    { name: "Vidéo", count: 34 },
    { name: "Photographie", count: 28 },
  ];

  const locations = [
    { name: "Abidjan", count: 256 },
    { name: "Yamoussoukro", count: 45 },
    { name: "Bouaké", count: 38 },
    { name: "San-Pédro", count: 24 },
  ];

  const types = [
    { name: "Ponctuel", count: 178 },
    { name: "Récurrent", count: 145 },
    { name: "À distance", count: 89 },
  ];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    //todo: remove mock functionality - Implement actual filter application
    console.log("Applying filters:", { budget, selectedCategories, showBoosted });
  };

  return (
    <div className="sticky top-24 h-fit">
      <div className="bg-card border border-card-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filtres</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setBudget([0, 1000000]);
              setSelectedCategories([]);
              setShowBoosted(false);
            }}
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
                    <span className="text-xs text-muted-foreground">({category.count})</span>
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
                  onValueChange={setBudget}
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
                  <div key={location.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`location-${location.name}`} data-testid={`checkbox-location-${location.name}`} />
                      <Label
                        htmlFor={`location-${location.name}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {location.name}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground">({location.count})</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="type">
            <AccordionTrigger className="text-sm font-medium">Type de prestation</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {types.map((type) => (
                  <div key={type.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`type-${type.name}`} data-testid={`checkbox-type-${type.name}`} />
                      <Label
                        htmlFor={`type-${type.name}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {type.name}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground">({type.count})</span>
                  </div>
                ))}
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
