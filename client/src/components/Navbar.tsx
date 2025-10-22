import {
  Search,
  Plus,
  Menu,
  User,
  MessageSquare,
  Bell,
  X,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@assets/HavJob-Logo-Sans-Fond.png";
import type { User as UserType } from "@shared/schema";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: currentUser } = useQuery<UserType>({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/auth/logout", "POST");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt sur HavJob !",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de se déconnecter",
      });
    },
  });

  const isAuthenticated = !!currentUser;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              data-testid="link-home"
              className="flex items-center gap-2"
            >
              <img src={logoImage} alt="HavJob Logo" className="h-10 w-10 ml-[-10px] mr-[-10px]" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-sidebar-accent to-primary bg-clip-text text-transparent">HavJob</h1>
            </Link>

            <div className="hidden md:flex items-center gap-2 max-w-2xl flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher une mission..."
                  className="pl-10 w-full"
                  data-testid="input-search"
                />
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-support"
                >
                  <HelpCircle className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-messages"
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-notifications"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Link href="/publier">
                  <Button
                    variant="default"
                    className="gap-2"
                    data-testid="button-publish"
                  >
                    <Plus className="h-4 w-4" />
                    Publier une mission
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      data-testid="button-profile"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {currentUser.fullName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/dashboard">
                      <DropdownMenuItem data-testid="menu-dashboard">
                        Mon dashboard
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem 
                      onClick={() => logoutMutation.mutate()}
                      data-testid="menu-logout"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Se déconnecter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" data-testid="button-login">
                    Connexion
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" data-testid="button-signup">
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une mission..."
                className="pl-10 w-full"
                data-testid="input-search-mobile"
              />
            </div>
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link href="/publier">
                  <Button
                    variant="default"
                    className="w-full gap-2"
                    data-testid="button-publish-mobile"
                  >
                    <Plus className="h-4 w-4" />
                    Publier une mission
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid="button-profile-mobile"
                  >
                    Mon profil
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    logoutMutation.mutate();
                    setMobileMenuOpen(false);
                  }}
                  data-testid="button-logout-mobile"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid="button-login-mobile"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="default"
                    className="w-full"
                    data-testid="button-signup-mobile"
                  >
                    S'inscrire
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
