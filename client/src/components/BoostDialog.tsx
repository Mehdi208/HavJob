import { Zap, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const boostPlans = [
  {
    duration: "1 jour",
    price: "5 000 FCFA",
    url: "https://ebookciv.mychariow.shop/boost-1-jour/checkout",
    features: ["Mise en avant 24h", "Badge boost", "+300% visibilité"],
  },
  {
    duration: "3 jours",
    price: "12 000 FCFA",
    url: "https://ebookciv.mychariow.shop/boost-3-jours/checkout",
    features: ["Mise en avant 72h", "Badge boost", "+500% visibilité"],
    popular: true,
  },
  {
    duration: "7 jours",
    price: "25 000 FCFA",
    url: "https://ebookciv.mychariow.shop/boot-7-jours/checkout",
    features: ["Mise en avant 7 jours", "Badge boost", "+800% visibilité"],
  },
  {
    duration: "15 jours",
    price: "45 000 FCFA",
    url: "https://ebookciv.mychariow.shop/boost-15-jours/checkout",
    features: ["Mise en avant 15 jours", "Badge boost", "+1000% visibilité"],
  },
  {
    duration: "30 jours",
    price: "80 000 FCFA",
    url: "https://ebookciv.mychariow.shop/boost-30-jours/checkout",
    features: ["Mise en avant 30 jours", "Badge boost", "+1500% visibilité"],
  },
];

interface BoostDialogProps {
  children: React.ReactNode;
}

export default function BoostDialog({ children }: BoostDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Zap className="h-6 w-6 text-primary" />
            Booster votre mission
          </DialogTitle>
          <DialogDescription>
            Augmentez la visibilité de votre mission et recevez plus de candidatures rapidement
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {boostPlans.map((plan) => (
            <Card
              key={plan.duration}
              className={`relative p-6 ${plan.popular ? "border-2 border-primary" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                  Populaire
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold mb-2">{plan.duration}</h3>
                <div className="text-3xl font-bold text-primary mb-1">{plan.price}</div>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-chart-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                data-testid={`button-boost-${plan.duration}`}
              >
                <a href={plan.url} target="_blank" rel="noopener noreferrer">
                  Choisir ce plan
                </a>
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note :</strong> Le paiement s'effectue via Chariow, notre partenaire sécurisé. Une fois le paiement confirmé, 
            votre boost sera activé automatiquement dans les 5 minutes.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
