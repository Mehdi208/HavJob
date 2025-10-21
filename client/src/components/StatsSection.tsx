import { Users, Briefcase, Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    icon: Users,
    value: "12 450+",
    label: "Freelances actifs",
    color: "text-primary",
  },
  {
    icon: Briefcase,
    value: "8 920+",
    label: "Missions réalisées",
    color: "text-sidebar-accent",
  },
  {
    icon: Star,
    value: "4.8/5",
    label: "Note moyenne",
    color: "text-yellow-500",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Taux de satisfaction",
    color: "text-chart-3",
  },
];

export default function StatsSection() {
  return (
    <div className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6 text-center" data-testid={`card-stat-${stat.label}`}>
                <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
