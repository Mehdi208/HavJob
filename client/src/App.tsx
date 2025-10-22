import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MissionDetail from "@/pages/MissionDetail";
import PublishMission from "@/pages/PublishMission";
import Dashboard from "@/pages/Dashboard";
import HowItWorks from "@/pages/HowItWorks";
import BecomeFreelance from "@/pages/BecomeFreelance";
import Help from "@/pages/Help";
import Contact from "@/pages/Contact";
import CGU from "@/pages/CGU";
import Boost from "@/pages/Boost";
import Missions from "@/pages/Missions";
import Freelances from "@/pages/Freelances";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/missions/:id" component={MissionDetail} />
      <Route path="/missions" component={Missions} />
      <Route path="/publier" component={PublishMission} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/freelances" component={Freelances} />
      <Route path="/comment-ca-marche" component={HowItWorks} />
      <Route path="/devenir-freelance" component={BecomeFreelance} />
      <Route path="/boost" component={Boost} />
      <Route path="/aide" component={Help} />
      <Route path="/contact" component={Contact} />
      <Route path="/cgu" component={CGU} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
