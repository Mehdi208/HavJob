import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMissionSchema, type InsertMission } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { User } from "@shared/schema";

const categories = [
  "Développement",
  "Design",
  "Marketing",
  "Rédaction",
  "Vidéo",
  "Photographie",
  "Services",
  "Conseil",
  "Stage",
  "Autre",
];

export default function PublishMission() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showBoostDialog, setShowBoostDialog] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const { data: currentUser } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  const form = useForm<InsertMission>({
    resolver: zodResolver(insertMissionSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      customCategory: "",
      budget: undefined as any,
      budgetType: "fixed",
      location: "",
      isRemote: false,
      duration: "",
      skillsRequired: [],
      status: "open",
    },
  });

  const publishMutation = useMutation({
    mutationFn: async (data: InsertMission) => {
      return await apiRequest("POST", "/api/missions", data);
    },
    onSuccess: () => {
      // Show boost dialog instead of redirecting immediately
      setShowBoostDialog(true);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de publier la mission",
      });
    },
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Vous devez être connecté pour publier une mission</p>
          <Button onClick={() => setLocation("/connexion-telephone")} data-testid="button-login-prompt">
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = (data: InsertMission) => {
    publishMutation.mutate(data);
  };

  const handleBoostDialogClose = (boost: boolean) => {
    setShowBoostDialog(false);
    toast({
      title: "Mission publiée",
      description: "Votre mission a été publiée avec succès !",
    });
    queryClient.invalidateQueries({ queryKey: ["/api/missions"] });
    
    if (boost) {
      setLocation("/boost");
    } else {
      setLocation("/dashboard");
    }
  };

  const handleCategoryChange = (value: string) => {
    form.setValue("category", value);
    setShowCustomCategory(value === "Autre");
    if (value !== "Autre") {
      form.setValue("customCategory", "");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Publier une mission
          </h1>
          <p className="text-muted-foreground">
            Décrivez votre projet et trouvez le freelance idéal
          </p>
        </div>

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre de la mission *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex: Développement d'un site web e-commerce"
                        data-testid="input-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie *</FormLabel>
                    <Select onValueChange={handleCategoryChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showCustomCategory && (
                <FormField
                  control={form.control}
                  name="customCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Précisez votre catégorie *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Ex: Traduction, Comptabilité, Jardinage..."
                          data-testid="input-custom-category"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Décrivez en détail votre projet, les compétences requises, les livrables attendus..."
                        className="min-h-40"
                        data-testid="input-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget (FCFA) *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Ex: 150000"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                          data-testid="input-budget"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Abidjan, Yamoussoukro..."
                          data-testid="input-location"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isRemote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Type de mission</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`cursor-pointer rounded-lg border p-4 hover-elevate transition-all ${
                          !field.value ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onClick={() => field.onChange(false)}
                        data-testid="option-onsite"
                      >
                        <div className="font-medium mb-1">Travail sur site</div>
                        <div className="text-sm text-muted-foreground">
                          Mission à réaliser sur place
                        </div>
                      </div>
                      <div
                        className={`cursor-pointer rounded-lg border p-4 hover-elevate transition-all ${
                          field.value ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onClick={() => field.onChange(true)}
                        data-testid="option-remote"
                      >
                        <div className="font-medium mb-1">Télétravail</div>
                        <div className="text-sm text-muted-foreground">
                          Mission réalisable à distance
                        </div>
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/")}
                  data-testid="button-cancel"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={publishMutation.isPending}
                  data-testid="button-publish"
                >
                  {publishMutation.isPending ? "Publication..." : "Publier la mission"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>

      {/* Boost Dialog */}
      <Dialog open={showBoostDialog} onOpenChange={setShowBoostDialog}>
        <DialogContent data-testid="dialog-boost">
          <DialogHeader>
            <DialogTitle>Mission publiée avec succès !</DialogTitle>
            <DialogDescription>
              Souhaitez-vous booster votre mission pour la rendre plus visible ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => handleBoostDialogClose(false)}
              data-testid="button-boost-no"
            >
              Non, merci
            </Button>
            <Button
              onClick={() => handleBoostDialogClose(true)}
              data-testid="button-boost-yes"
            >
              Oui, booster ma mission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
