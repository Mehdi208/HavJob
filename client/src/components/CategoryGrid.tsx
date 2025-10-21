import { Code, Palette, Megaphone, PenTool, Video, Camera, Wrench, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  { name: "Développement", icon: Code, count: 124, color: "text-blue-500" },
  { name: "Design", icon: Palette, count: 89, color: "text-purple-500" },
  { name: "Marketing", icon: Megaphone, count: 67, color: "text-pink-500" },
  { name: "Rédaction", icon: PenTool, count: 45, color: "text-green-500" },
  { name: "Vidéo", icon: Video, count: 34, color: "text-red-500" },
  { name: "Photographie", icon: Camera, count: 28, color: "text-yellow-500" },
  { name: "Services", icon: Wrench, count: 56, color: "text-orange-500" },
  { name: "Conseil", icon: Users, count: 41, color: "text-teal-500" },
];

export default function CategoryGrid() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Parcourir par catégorie
          </h2>
          <p className="text-muted-foreground">
            Découvrez des missions dans tous les domaines
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                className="p-6 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200"
                data-testid={`card-category-${category.name}`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={`p-3 rounded-lg bg-muted ${category.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} missions</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
