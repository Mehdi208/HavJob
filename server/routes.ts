import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertMissionSchema, 
  insertApplicationSchema, 
  insertReviewSchema,
  phoneRegisterSchema,
  phoneLoginSchema 
} from "@shared/schema";
import { z } from "zod";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { generateAccessToken, generateRefreshToken, verifyToken, requireJwtAuth } from "./jwtAuth";
import bcrypt from "bcrypt";
import "./types";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // Phone Authentication Routes
  
  // Register with phone number and password
  app.post('/api/auth/register-phone', async (req, res) => {
    try {
      const validatedData = phoneRegisterSchema.parse(req.body);
      
      // Check if phone number already exists
      const existingUser = await storage.getUserByPhone(validatedData.phoneNumber);
      if (existingUser) {
        return res.status(400).json({ 
          message: "Ce numéro de téléphone est déjà utilisé" 
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Create user with phone auth
      const newUser = await storage.createPhoneUser({
        phoneNumber: validatedData.phoneNumber,
        password: hashedPassword,
        fullName: validatedData.fullName,
        email: validatedData.email || undefined,
        role: validatedData.role,
      });

      // Create user object for Passport session
      const sessionUser = {
        claims: { sub: newUser.id },
        authMethod: 'phone',
        expires_at: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 1 week
      };

      // Regenerate session to prevent fixation, then login
      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ message: "Erreur de session" });
        }
        
        // Use Passport's login to properly serialize the user
        req.logIn(sessionUser, (err) => {
          if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: "Erreur de connexion" });
          }
          
          // Return user without password
          const { password, ...userWithoutPassword } = newUser;
          res.status(201).json(userWithoutPassword);
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Données invalides", 
          errors: error.errors 
        });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "Erreur lors de l'inscription" });
    }
  });

  // Login with phone number and password
  app.post('/api/auth/login-phone', async (req, res) => {
    try {
      const validatedData = phoneLoginSchema.parse(req.body);
      
      // Find user by phone number
      const user = await storage.getUserByPhone(validatedData.phoneNumber);
      if (!user || user.authMethod !== 'phone') {
        return res.status(401).json({ 
          message: "Numéro de téléphone ou mot de passe incorrect" 
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(
        validatedData.password, 
        user.password!
      );
      
      if (!isValidPassword) {
        return res.status(401).json({ 
          message: "Numéro de téléphone ou mot de passe incorrect" 
        });
      }

      // Create user object for Passport session
      const sessionUser = {
        claims: { sub: user.id },
        authMethod: 'phone',
        expires_at: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 1 week
      };

      // Regenerate session to prevent fixation, then login
      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ message: "Erreur de session" });
        }
        
        // Use Passport's login to properly serialize the user
        req.logIn(sessionUser, (err) => {
          if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: "Erreur de connexion" });
          }
          
          // Return user without password
          const { password, ...userWithoutPassword } = user;
          res.json(userWithoutPassword);
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Données invalides", 
          errors: error.errors 
        });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Erreur lors de la connexion" });
    }
  });

  // Logout (works for both auth methods)
  app.post('/api/auth/logout-phone', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Erreur lors de la déconnexion" });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Erreur lors de la déconnexion" });
        }
        res.json({ message: "Déconnexion réussie" });
      });
    });
  });

  // Mobile Authentication Routes (JWT-based)
  
  // Mobile register with phone number and password
  app.post('/api/mobile/register', async (req, res) => {
    try {
      const validatedData = phoneRegisterSchema.parse(req.body);
      
      // Check if phone number already exists
      const existingUser = await storage.getUserByPhone(validatedData.phoneNumber);
      if (existingUser) {
        return res.status(400).json({ 
          message: "Ce numéro de téléphone est déjà utilisé" 
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Create user with phone auth
      const newUser = await storage.createPhoneUser({
        phoneNumber: validatedData.phoneNumber,
        password: hashedPassword,
        fullName: validatedData.fullName,
        email: validatedData.email || undefined,
        role: validatedData.role,
      });

      // Generate JWT tokens
      const accessToken = generateAccessToken(newUser.id);
      const refreshToken = generateRefreshToken(newUser.id);

      // Return user without password and with tokens
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json({
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Données invalides", 
          errors: error.errors 
        });
      }
      console.error("Mobile registration error:", error);
      res.status(500).json({ message: "Erreur lors de l'inscription" });
    }
  });

  // Mobile login with phone number and password
  app.post('/api/mobile/login', async (req, res) => {
    try {
      const validatedData = phoneLoginSchema.parse(req.body);
      
      // Find user by phone number
      const user = await storage.getUserByPhone(validatedData.phoneNumber);
      if (!user) {
        return res.status(401).json({ 
          message: "Numéro de téléphone ou mot de passe incorrect" 
        });
      }

      // Check if user has phone auth method
      if (user.authMethod !== 'phone' || !user.password) {
        return res.status(401).json({ 
          message: "Numéro de téléphone ou mot de passe incorrect" 
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(
        validatedData.password, 
        user.password
      );
      
      if (!isValidPassword) {
        return res.status(401).json({ 
          message: "Numéro de téléphone ou mot de passe incorrect" 
        });
      }

      // Generate JWT tokens
      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      // Return user without password and with tokens
      const { password, ...userWithoutPassword } = user;
      res.json({
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Données invalides", 
          errors: error.errors 
        });
      }
      console.error("Mobile login error:", error);
      res.status(500).json({ message: "Erreur lors de la connexion" });
    }
  });

  // Mobile refresh token
  app.post('/api/mobile/refresh', async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token manquant" });
      }

      // Verify refresh token - MUST be a refresh token, not an access token
      const decoded = verifyToken(refreshToken, "refresh");
      if (!decoded) {
        return res.status(401).json({ message: "Refresh token invalide ou expiré" });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(decoded.userId);

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error("Token refresh error:", error);
      res.status(500).json({ message: "Erreur lors du rafraîchissement du token" });
    }
  });

  // Mobile get current user (JWT-based)
  app.get('/api/mobile/user', requireJwtAuth, async (req: any, res) => {
    try {
      const userId = req.jwtUserId;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Return user without password
      const { password, ...userWithoutPassword } = user as any;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
    }
  });

  // Auth route - get current user (unified for both auth methods)
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

  // Update own profile (authenticated user)
  app.patch('/api/auth/user/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const updates = req.body;
      
      // Only allow updating specific safe fields
      const allowedFields = ['fullName', 'phoneNumber', 'email', 'bio', 'skills', 'location', 'avatar', 'cvUrl'];
      const filteredUpdates: any = {};
      
      for (const field of allowedFields) {
        if (updates[field] !== undefined) {
          filteredUpdates[field] = updates[field];
        }
      }
      
      // Validate that fullName is not empty if provided
      if (filteredUpdates.fullName !== undefined && !filteredUpdates.fullName.trim()) {
        return res.status(400).json({ message: "Le nom complet ne peut pas être vide" });
      }
      
      const updatedUser = await storage.updateUser(userId, filteredUpdates);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
    }
  });

  // Admin Authentication
  const ADMIN_USERNAME = "MeAuWe";
  const ADMIN_PASSWORD_HASH = await bcrypt.hash("Team_HavJob03", 10);

  // Middleware to check admin authentication
  const isAdmin = (req: any, res: Response, next: Function) => {
    if (req.session && req.session.isAdmin === true) {
      return next();
    }
    res.status(403).json({ message: "Accès admin requis" });
  };

  // Admin login
  app.post('/api/auth/admin-login', async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Identifiant et mot de passe requis" });
      }

      // Verify credentials
      if (username !== ADMIN_USERNAME) {
        return res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
      }

      const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Identifiant ou mot de passe incorrect" });
      }

      // Regenerate session to prevent session fixation attacks
      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ message: "Erreur lors de la création de la session" });
        }

        // Set admin session flags
        req.session.isAdmin = true;
        req.session.adminUsername = username;

        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
            return res.status(500).json({ message: "Erreur lors de la sauvegarde de la session" });
          }

          res.json({ 
            success: true,
            message: "Authentification admin réussie"
          });
        });
      });
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Get admin status
  app.get('/api/auth/admin-status', (req, res) => {
    if (req.session && req.session.isAdmin === true) {
      res.json({ 
        isAdmin: true,
        username: req.session.adminUsername 
      });
    } else {
      res.json({ isAdmin: false });
    }
  });

  // Admin logout
  app.post('/api/auth/admin-logout', (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err);
          return res.status(500).json({ message: "Erreur lors de la déconnexion" });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true, message: "Déconnexion admin réussie" });
      });
    } else {
      res.json({ success: true, message: "Déconnexion admin réussie" });
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
  app.get("/api/users", isAdmin, async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      // Remove passwords from all users
      const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user);
      res.send(usersWithoutPasswords);
    } catch (error) {
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

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

  app.get("/api/freelances", async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      
      // Filter for freelances with completed profiles
      const freelances = allUsers
        .filter(user => 
          (user.role === "freelance" || user.role === "both") &&
          user.bio && 
          user.bio.trim().length > 0 &&
          user.skills && 
          user.skills.length > 0
        )
        .map(({ password, ...user }) => user);
      
      res.send(freelances);
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

  // Admin Boost routes
  app.post("/api/admin/boost-user/:id", isAdmin, async (req, res) => {
    try {
      const { duration } = req.body;
      const userId = req.params.id;

      // Validate duration
      const validDurations = [1, 3, 7, 15, 30];
      if (!duration || !validDurations.includes(duration)) {
        return res.status(400).json({ 
          error: "Durée invalide. Valeurs acceptées: 1, 3, 7, 15, 30 jours" 
        });
      }

      // Calculate expiration date
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + duration);

      // Update user
      const updatedUser = await storage.updateUser(userId, {
        isBoosted: true,
        boostExpiresAt: expiresAt,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error boosting user:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  app.post("/api/admin/boost-mission/:id", isAdmin, async (req, res) => {
    try {
      const { duration } = req.body;
      const missionId = req.params.id;

      // Validate duration
      const validDurations = [1, 3, 7, 15, 30];
      if (!duration || !validDurations.includes(duration)) {
        return res.status(400).json({ 
          error: "Durée invalide. Valeurs acceptées: 1, 3, 7, 15, 30 jours" 
        });
      }

      // Calculate expiration date
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + duration);

      // Update mission
      const updatedMission = await storage.updateMission(missionId, {
        isBoosted: true,
        boostExpiresAt: expiresAt,
      });

      if (!updatedMission) {
        return res.status(404).json({ error: "Mission non trouvée" });
      }

      res.json(updatedMission);
    } catch (error) {
      console.error("Error boosting mission:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  // Admin User Management routes
  app.delete("/api/admin/users/:id", isAdmin, async (req, res) => {
    try {
      const userId = req.params.id;
      
      const success = await storage.deleteUser(userId);
      
      if (!success) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      
      res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  app.patch("/api/admin/users/:id", isAdmin, async (req, res) => {
    try {
      const userId = req.params.id;
      const updates = req.body;
      
      // Validate that we're not allowing dangerous updates
      const allowedFields = ['fullName', 'phoneNumber', 'email', 'role', 'bio', 'skills', 'location', 'avatar', 'cvUrl'];
      const filteredUpdates: any = {};
      
      for (const field of allowedFields) {
        if (updates[field] !== undefined) {
          filteredUpdates[field] = updates[field];
        }
      }
      
      const updatedUser = await storage.updateUser(userId, filteredUpdates);
      
      if (!updatedUser) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
