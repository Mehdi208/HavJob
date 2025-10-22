import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-sidebar-accent bg-clip-text text-transparent mb-4">
              HavJob
            </h3>
            <p className="text-sm text-muted-foreground">
              La plateforme qui connecte freelances et entreprises en Côte d'Ivoire
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Pour les clients</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/publier" className="text-sm text-muted-foreground hover:text-sidebar-accent">
                  Publier une mission
                </Link>
              </li>
              <li>
                <Link href="/freelances" className="text-sm text-muted-foreground hover:text-sidebar-accent">
                  Trouver un freelance
                </Link>
              </li>
              <li>
                <Link href="/comment-ca-marche" className="text-sm text-muted-foreground hover:text-sidebar-accent">
                  Comment ça marche
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Pour les freelances</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/missions" className="text-sm text-muted-foreground hover:text-sidebar-accent">
                  Trouver des missions
                </Link>
              </li>
              <li>
                <Link href="/devenir-freelance" className="text-sm text-muted-foreground hover:text-sidebar-accent">
                  Devenir freelance
                </Link>
              </li>
              <li>
                <Link href="/boost" className="text-sm text-muted-foreground hover:text-sidebar-accent">
                  Booster mon profil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/aide" className="text-sm text-muted-foreground hover:text-sidebar-accent">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-sidebar-accent">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-sm text-muted-foreground hover:text-sidebar-accent">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-primary font-medium hover:text-primary/80" data-testid="link-admin-dashboard">
                  Dashboard Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 HavJob. Tous droits réservés. Made with ❤️ in Côte d'Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
}
