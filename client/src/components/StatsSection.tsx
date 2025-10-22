import { Users, Briefcase, Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";

const stats = [
  {
    icon: Users,
    value: 12450,
    suffix: "+",
    label: "Freelances actifs",
    color: "text-primary",
  },
  {
    icon: Briefcase,
    value: 8920,
    suffix: "+",
    label: "Missions réalisées",
    color: "text-sidebar-accent",
  },
  {
    icon: Star,
    value: 4.8,
    suffix: "/5",
    label: "Note moyenne",
    color: "text-yellow-500",
    decimal: true,
  },
  {
    icon: TrendingUp,
    value: 95,
    suffix: "%",
    label: "Taux de satisfaction",
    color: "text-chart-3",
  },
];

function AnimatedCounter({ value, suffix, decimal = false }: { value: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  return (
    <div ref={ref} className="text-3xl font-bold text-foreground mb-1">
      {decimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <div className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label} 
                className="p-6 text-center opacity-0 animate-fade-in" 
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                data-testid={`card-stat-${stat.label}`}
              >
                <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
