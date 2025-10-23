import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMissionSchema, insertApplicationSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth, isAuthenticated } from "./replitAuth";
import "./types";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // Auth route - get current user
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Mission routes
  app.get("/api/missions", async (req, res) => {
    try {
      const filters = {
        category: req.query.category as string | undefined,
        minBudget: req.query.minBudget ? Number(req.query.minBudget) : undefined,
        maxBudget: req.query.maxBudget ? Number(req.query.maxBudget) : undefined,
        location: req.query.location as string | undefined,
        isRemote: req.query.isRemote === "true" ? true : req.query.isRemote === "false" ? false : undefined,
        isOnSite: req.query.isOnSite === "true" ? true : req.query.isOnSite === "false" ? false : undefined,
        isBoosted: req.query.isBoosted === "true" ? true : req.query.isBoosted === "false" ? false : undefined,
        status: req.query.status as string | undefined,
        search: req.query.search as string | undefined,
      };

      const missions = await storage.getMissions(filters);
      res.send(missions);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.get("/api/missions/:id", async (req, res) => {
    try {
      const mission = await storage.getMission(req.params.id);
      if (!mission) {
        return res.status(404).send({ error: "Mission non trouvée" });
      }
      res.send(mission);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.post("/api/missions", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertMissionSchema.parse(req.body);
      const mission = await storage.createMission({
        ...validatedData,
        clientId: (req as any).user.claims.sub!,
      });
      res.status(201).send(mission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ error: "Données invalides", details: error.errors });
      }
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.patch("/api/missions/:id", isAuthenticated, async (req, res) => {
    try {
      const mission = await storage.getMission(req.params.id);
      if (!mission) {
        return res.status(404).send({ error: "Mission non trouvée" });
      }

      // Check if user owns this mission
      if (mission.clientId !== (req as any).user.claims.sub) {
        return res.status(403).send({ error: "Non autorisé" });
      }

      const updatedMission = await storage.updateMission(req.params.id, req.body);
      res.send(updatedMission);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.delete("/api/missions/:id", isAuthenticated, async (req, res) => {
    try {
      const mission = await storage.getMission(req.params.id);
      if (!mission) {
        return res.status(404).send({ error: "Mission non trouvée" });
      }

      if (mission.clientId !== (req as any).user.claims.sub) {
        return res.status(403).send({ error: "Non autorisé" });
      }

      await storage.deleteMission(req.params.id);
      res.send({ success: true });
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.get("/api/users/:id/missions", async (req, res) => {
    try {
      const missions = await storage.getMissionsByClient(req.params.id);
      res.send(missions);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  // Application routes
  app.get("/api/missions/:id/applications", isAuthenticated, async (req, res) => {
    try {
      const mission = await storage.getMission(req.params.id);
      if (!mission) {
        return res.status(404).send({ error: "Mission non trouvée" });
      }

      // Only mission owner can see applications
      if (mission.clientId !== (req as any).user.claims.sub) {
        return res.status(403).send({ error: "Non autorisé" });
      }

      const applications = await storage.getApplicationsByMission(req.params.id);
      res.send(applications);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.post("/api/missions/:id/apply", isAuthenticated, async (req, res) => {
    try {
      const mission = await storage.getMission(req.params.id);
      if (!mission) {
        return res.status(404).send({ error: "Mission non trouvée" });
      }

      // Can't apply to own mission
      if (mission.clientId === (req as any).user.claims.sub) {
        return res.status(400).send({ error: "Vous ne pouvez pas candidater à votre propre mission" });
      }

      const validatedData = insertApplicationSchema.parse({
        ...req.body,
        missionId: req.params.id,
      });

      const application = await storage.createApplication({
        ...validatedData,
        freelancerId: (req as any).user.claims.sub!,
      });

      res.status(201).send(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ error: "Données invalides", details: error.errors });
      }
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.get("/api/users/me/applications", isAuthenticated, async (req, res) => {
    try {
      const applications = await storage.getApplicationsByFreelancer((req as any).user.claims.sub!);
      res.send(applications);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.patch("/api/applications/:id", isAuthenticated, async (req, res) => {
    try {
      const application = await storage.getApplication(req.params.id);
      if (!application) {
        return res.status(404).send({ error: "Candidature non trouvée" });
      }

      const mission = await storage.getMission(application.missionId);
      if (!mission) {
        return res.status(404).send({ error: "Mission non trouvée" });
      }

      // Only mission owner or applicant can update
      if (mission.clientId !== (req as any).user.claims.sub && application.freelancerId !== (req as any).user.claims.sub) {
        return res.status(403).send({ error: "Non autorisé" });
      }

      const updatedApplication = await storage.updateApplication(req.params.id, req.body);
      res.send(updatedApplication);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  // Favorite routes
  app.get("/api/users/me/favorites", isAuthenticated, async (req, res) => {
    try {
      const favorites = await storage.getFavoritesByUser((req as any).user.claims.sub!);
      res.send(favorites);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.post("/api/missions/:id/favorite", isAuthenticated, async (req, res) => {
    try {
      const mission = await storage.getMission(req.params.id);
      if (!mission) {
        return res.status(404).send({ error: "Mission non trouvée" });
      }

      const isFavorite = await storage.isFavorite((req as any).user.claims.sub!, req.params.id);
      if (isFavorite) {
        return res.status(400).send({ error: "Cette mission est déjà dans vos favoris" });
      }

      const favorite = await storage.addFavorite((req as any).user.claims.sub!, req.params.id);
      res.status(201).send(favorite);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.delete("/api/missions/:id/favorite", isAuthenticated, async (req, res) => {
    try {
      await storage.removeFavorite((req as any).user.claims.sub!, req.params.id);
      res.send({ success: true });
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.get("/api/missions/:id/is-favorite", isAuthenticated, async (req, res) => {
    try {
      const isFavorite = await storage.isFavorite((req as any).user.claims.sub!, req.params.id);
      res.send({ isFavorite });
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  // User/Profile routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).send({ error: "Utilisateur non trouvé" });
      }

      const { password, ...userWithoutPassword } = user;
      res.send(userWithoutPassword);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.patch("/api/users/me", isAuthenticated, async (req, res) => {
    try {
      // Don't allow updating password or id through this route
      const { password, id, ...updates } = req.body;
      
      const updatedUser = await storage.updateUser((req as any).user.claims.sub!, updates);
      if (!updatedUser) {
        return res.status(404).send({ error: "Utilisateur non trouvé" });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.send(userWithoutPassword);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  // Review routes
  app.get("/api/users/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviewsByUser(req.params.id);
      res.send(reviews);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  app.post("/api/reviews", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview({
        ...validatedData,
        reviewerId: (req as any).user.claims.sub!,
      });
      res.status(201).send(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ error: "Données invalides", details: error.errors });
      }
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
