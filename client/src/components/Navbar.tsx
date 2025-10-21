import { Search, Plus, Menu, User, MessageSquare, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); //todo: remove mock functionality

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link href="/" data-testid="link-home">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-sidebar-accent bg-clip-text text-transparent">
                HavJob
              </h1>
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
                <Button variant="ghost" size="icon" data-testid="button-messages">
                  <MessageSquare className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" data-testid="button-notifications">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="default" className="gap-2" data-testid="button-publish">
                  <Plus className="h-4 w-4" />
                  Publier une mission
                </Button>
                <Button variant="ghost" size="icon" data-testid="button-profile">
                  <User className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" data-testid="button-login">
                  Connexion
                </Button>
                <Button variant="default" data-testid="button-signup">
                  S'inscrire
                </Button>
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
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                <Button variant="default" className="w-full gap-2" data-testid="button-publish-mobile">
                  <Plus className="h-4 w-4" />
                  Publier une mission
                </Button>
                <Button variant="outline" className="w-full" data-testid="button-profile-mobile">
                  Mon profil
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full" data-testid="button-login-mobile">
                  Connexion
                </Button>
                <Button variant="default" className="w-full" data-testid="button-signup-mobile">
                  S'inscrire
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
