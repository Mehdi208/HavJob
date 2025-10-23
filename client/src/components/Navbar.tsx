import {
  Plus,
  Menu,
  User,
  X,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import logoImage from "@assets/HavJob-Logo-Sans-Fond.png";
import type { User as UserType } from "@shared/schema";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: currentUser } = useQuery<UserType>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  const handleLogout = () => {
    // Replit Auth logout - navigate to /api/logout
    window.location.href = "/api/logout";
  };

  const isAuthenticated = !!currentUser;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            data-testid="link-home"
            className="flex items-center gap-2"
          >
            <img src={logoImage} alt="HavJob Logo" className="h-10 w-10 ml-[-10px] mr-[-10px]" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-sidebar-accent to-primary bg-clip-text text-transparent">HavJob</h1>
          </Link>

          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
              <Link href="/">
                <Button variant="ghost" data-testid="nav-link-home">
                  Accueil
                </Button>
              </Link>
              <Link href="/publier">
                <Button variant="ghost" data-testid="nav-link-publish">
                  Publier une mission
                </Button>
              </Link>
              <Link href="/missions">
                <Button variant="ghost" data-testid="nav-link-missions">
                  Trouver des missions
                </Button>
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
              <Link href="/">
                <Button variant="ghost" data-testid="nav-link-home">
                  Accueil
                </Button>
              </Link>
              <Link href="/missions">
                <Button variant="ghost" data-testid="nav-link-missions">
                  Trouver des missions
                </Button>
              </Link>
            </div>
          )}

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
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
                      onClick={handleLogout}
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
                <Button 
                  variant="default" 
                  onClick={() => window.location.href = '/api/login'}
                  data-testid="button-login"
                >
                  Se connecter
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
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full"
                    data-testid="nav-link-home-mobile"
                  >
                    Accueil
                  </Button>
                </Link>
                <Link href="/missions">
                  <Button
                    variant="ghost"
                    className="w-full"
                    data-testid="nav-link-missions-mobile"
                  >
                    Trouver des missions
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
                  onClick={handleLogout}
                  data-testid="button-logout-mobile"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full"
                    data-testid="nav-link-home-mobile"
                  >
                    Accueil
                  </Button>
                </Link>
                <Link href="/publier">
                  <Button
                    variant="ghost"
                    className="w-full"
                    data-testid="nav-link-publish-mobile"
                  >
                    Publier une mission
                  </Button>
                </Link>
                <Link href="/missions">
                  <Button
                    variant="ghost"
                    className="w-full"
                    data-testid="nav-link-missions-mobile"
                  >
                    Trouver des missions
                  </Button>
                </Link>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => window.location.href = '/api/login'}
                  data-testid="button-login-mobile"
                >
                  Se connecter
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
