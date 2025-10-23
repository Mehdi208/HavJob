import type {
  User,
  InsertUser,
  UpsertUser,
  Mission,
  InsertMission,
  Application,
  InsertApplication,
  Favorite,
  Review,
  InsertReview,
} from "@shared/schema";
import {
  users,
  missions,
  applications,
  favorites,
  reviews,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, gte, lte, inArray, desc, sql, like } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // Mission methods
  getMission(id: string): Promise<Mission | undefined>;
  getMissions(filters?: {
    category?: string;
    minBudget?: number;
    maxBudget?: number;
    location?: string;
    isRemote?: boolean;
    isOnSite?: boolean;
    isBoosted?: boolean;
    status?: string;
    search?: string;
  }): Promise<Mission[]>;
  createMission(mission: InsertMission & { clientId: string }): Promise<Mission>;
  updateMission(id: string, updates: Partial<Mission>): Promise<Mission | undefined>;
  deleteMission(id: string): Promise<boolean>;
  getMissionsByClient(clientId: string): Promise<Mission[]>;
  
  // Application methods
  getApplication(id: string): Promise<Application | undefined>;
  getApplicationsByMission(missionId: string): Promise<Application[]>;
  getApplicationsByFreelancer(freelancerId: string): Promise<Application[]>;
  createApplication(application: InsertApplication & { freelancerId: string }): Promise<Application>;
  updateApplication(id: string, updates: Partial<Application>): Promise<Application | undefined>;
  
  // Favorite methods
  getFavoritesByUser(userId: string): Promise<Favorite[]>;
  addFavorite(userId: string, missionId: string): Promise<Favorite>;
  removeFavorite(userId: string, missionId: string): Promise<boolean>;
  isFavorite(userId: string, missionId: string): Promise<boolean>;
  
  // Review methods
  getReviewsByUser(userId: string): Promise<Review[]>;
  createReview(review: InsertReview & { reviewerId: string }): Promise<Review>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    const result = await db
      .insert(users)
      .values({
        id: user.id,
        email: user.email || null,
        firstName: user.firstName || null,
        lastName: user.lastName || null,
        profileImageUrl: user.profileImageUrl || null,
        fullName: user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}` 
          : user.firstName || user.lastName || null,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: user.email || null,
          firstName: user.firstName || null,
          lastName: user.lastName || null,
          profileImageUrl: user.profileImageUrl || null,
          fullName: user.firstName && user.lastName 
            ? `${user.firstName} ${user.lastName}` 
            : user.firstName || user.lastName || null,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();
    
    return result[0];
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const result = await db
      .update(users)
      .set({ ...updates, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(users.id, id))
      .returning();
    
    return result[0];
  }

  async getMission(id: string): Promise<Mission | undefined> {
    const result = await db.select().from(missions).where(eq(missions.id, id)).limit(1);
    return result[0];
  }

  async getMissions(filters?: {
    category?: string;
    minBudget?: number;
    maxBudget?: number;
    location?: string;
    isRemote?: boolean;
    isOnSite?: boolean;
    isBoosted?: boolean;
    status?: string;
    search?: string;
  }): Promise<Mission[]> {
    const conditions: any[] = [];

    if (filters) {
      if (filters.category) {
        const categories = filters.category.split(",").map(c => c.trim());
        conditions.push(inArray(missions.category, categories));
      }
      
      if (filters.minBudget !== undefined) {
        conditions.push(gte(missions.budget, filters.minBudget));
      }
      
      if (filters.maxBudget !== undefined) {
        conditions.push(lte(missions.budget, filters.maxBudget));
      }
      
      if (filters.location) {
        const locations = filters.location.split(",").map(l => l.trim());
        conditions.push(inArray(missions.location, locations));
      }
      
      if (filters.isRemote !== undefined) {
        conditions.push(eq(missions.isRemote, filters.isRemote));
      }
      
      if (filters.isOnSite !== undefined) {
        conditions.push(eq(missions.isRemote, !filters.isOnSite));
      }
      
      if (filters.isBoosted !== undefined) {
        conditions.push(eq(missions.isBoosted, filters.isBoosted));
      }
      
      if (filters.status) {
        conditions.push(eq(missions.status, filters.status as any));
      }
      
      if (filters.search) {
        const searchPattern = `%${filters.search}%`;
        conditions.push(
          or(
            like(missions.title, searchPattern),
            like(missions.description, searchPattern)
          )
        );
      }
    }

    let query = db.select().from(missions);
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const result = await query.orderBy(
      desc(missions.isBoosted),
      desc(missions.createdAt)
    );

    return result;
  }

  async createMission(missionData: InsertMission & { clientId: string }): Promise<Mission> {
    const result = await db
      .insert(missions)
      .values({
        clientId: missionData.clientId,
        title: missionData.title,
        description: missionData.description,
        category: missionData.category,
        budget: missionData.budget,
        budgetType: missionData.budgetType || "fixed",
        location: missionData.location || null,
        isRemote: missionData.isRemote || false,
        duration: missionData.duration || null,
        skillsRequired: missionData.skillsRequired || null,
        status: missionData.status || "open",
      })
      .returning();
    
    return result[0];
  }

  async updateMission(id: string, updates: Partial<Mission>): Promise<Mission | undefined> {
    const result = await db
      .update(missions)
      .set({ ...updates, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(missions.id, id))
      .returning();
    
    return result[0];
  }

  async deleteMission(id: string): Promise<boolean> {
    const result = await db.delete(missions).where(eq(missions.id, id)).returning();
    return result.length > 0;
  }

  async getMissionsByClient(clientId: string): Promise<Mission[]> {
    const result = await db
      .select()
      .from(missions)
      .where(eq(missions.clientId, clientId))
      .orderBy(desc(missions.createdAt));
    
    return result;
  }

  async getApplication(id: string): Promise<Application | undefined> {
    const result = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
    return result[0];
  }

  async getApplicationsByMission(missionId: string): Promise<Application[]> {
    const result = await db
      .select()
      .from(applications)
      .where(eq(applications.missionId, missionId))
      .orderBy(desc(applications.createdAt));
    
    return result;
  }

  async getApplicationsByFreelancer(freelancerId: string): Promise<Application[]> {
    const result = await db
      .select()
      .from(applications)
      .where(eq(applications.freelancerId, freelancerId))
      .orderBy(desc(applications.createdAt));
    
    return result;
  }

  async createApplication(appData: InsertApplication & { freelancerId: string }): Promise<Application> {
    const result = await db
      .insert(applications)
      .values({
        missionId: appData.missionId,
        freelancerId: appData.freelancerId,
        coverLetter: appData.coverLetter || null,
        proposedBudget: appData.proposedBudget || null,
      })
      .returning();
    
    await db
      .update(missions)
      .set({ 
        applicantsCount: sql`${missions.applicantsCount} + 1`,
        updatedAt: sql`CURRENT_TIMESTAMP`
      })
      .where(eq(missions.id, appData.missionId));
    
    return result[0];
  }

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application | undefined> {
    const result = await db
      .update(applications)
      .set(updates)
      .where(eq(applications.id, id))
      .returning();
    
    return result[0];
  }

  async getFavoritesByUser(userId: string): Promise<Favorite[]> {
    const result = await db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, userId))
      .orderBy(desc(favorites.createdAt));
    
    return result;
  }

  async addFavorite(userId: string, missionId: string): Promise<Favorite> {
    const result = await db
      .insert(favorites)
      .values({
        userId,
        missionId,
      })
      .returning();
    
    return result[0];
  }

  async removeFavorite(userId: string, missionId: string): Promise<boolean> {
    const result = await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.missionId, missionId)))
      .returning();
    
    return result.length > 0;
  }

  async isFavorite(userId: string, missionId: string): Promise<boolean> {
    const result = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.missionId, missionId)))
      .limit(1);
    
    return result.length > 0;
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    const result = await db
      .select()
      .from(reviews)
      .where(eq(reviews.revieweeId, userId))
      .orderBy(desc(reviews.createdAt));
    
    return result;
  }

  async createReview(reviewData: InsertReview & { reviewerId: string }): Promise<Review> {
    const result = await db
      .insert(reviews)
      .values({
        missionId: reviewData.missionId,
        reviewerId: reviewData.reviewerId,
        revieweeId: reviewData.revieweeId,
        rating: reviewData.rating,
        comment: reviewData.comment || null,
      })
      .returning();
    
    const userReviews = await this.getReviewsByUser(reviewData.revieweeId);
    const avgRating = Math.round(
      userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length
    );
    
    await this.updateUser(reviewData.revieweeId, {
      rating: avgRating,
      reviewCount: userReviews.length,
    });
    
    return result[0];
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private missions: Map<string, Mission>;
  private applications: Map<string, Application>;
  private favorites: Map<string, Favorite>;
  private reviews: Map<string, Review>;

  constructor() {
    this.users = new Map();
    this.missions = new Map();
    this.applications = new Map();
    this.favorites = new Map();
    this.reviews = new Map();
    
    // Seed with some mock data
    this.seedData();
  }

  private seedData() {
    // Create mock users
    const clientId1 = randomUUID();
    const clientId2 = randomUUID();
    const freelancerId = randomUUID();
    
    this.users.set(clientId1, {
      id: clientId1,
      phoneNumber: "+225 07 12 34 56 78",
      password: "password123",
      fullName: "Traoré Bakary",
      email: "traore@example.com",
      firstName: null,
      lastName: null,
      profileImageUrl: null,
      role: "client" as const,
      bio: "Entrepreneur ivoirien",
      skills: [],
      location: "Abidjan",
      avatar: null,
      rating: 0,
      reviewCount: 0,
      completedMissions: 0,
      responseRate: 100,
      isBoosted: false,
      boostExpiresAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.users.set(freelancerId, {
      id: freelancerId,
      phoneNumber: "+225 05 98 76 54 32",
      password: "password123",
      fullName: "N'Guessan Sophie",
      email: "sophie@example.com",
      firstName: null,
      lastName: null,
      profileImageUrl: null,
      role: "freelance" as const,
      bio: "Développeuse web passionnée",
      skills: ["React", "Node.js", "TypeScript"],
      location: "Abidjan",
      avatar: null,
      rating: 0,
      reviewCount: 0,
      completedMissions: 0,
      responseRate: 95,
      isBoosted: false,
      boostExpiresAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.users.set(clientId2, {
      id: clientId2,
      phoneNumber: "+225 07 44 55 66 77",
      password: "password123",
      fullName: "Kouassi Jean",
      email: "kouassi@example.com",
      firstName: null,
      lastName: null,
      profileImageUrl: null,
      role: "client" as const,
      bio: "Directeur d'agence de communication",
      skills: [],
      location: "Abidjan",
      avatar: null,
      rating: 0,
      reviewCount: 0,
      completedMissions: 5,
      responseRate: 100,
      isBoosted: false,
      boostExpiresAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create mock missions
    const missions = [
      {
        clientId: clientId1,
        title: "Développement d'un site web e-commerce",
        description: "Nous recherchons un développeur web expérimenté pour créer un site e-commerce complet avec système de paiement intégré. Le site doit être responsive et optimisé pour mobile. Compétences requises: React, Node.js, base de données.",
        category: "Développement",
        budget: 350000,
        location: "Abidjan",
        isRemote: false,
        duration: "2-3 mois",
        skillsRequired: ["React", "Node.js", "PostgreSQL"],
        isBoosted: true,
        applicantsCount: 20,
      },
      {
        clientId: clientId2,
        title: "Design d'une identité visuelle",
        description: "Création complète d'une identité visuelle pour une nouvelle marque: logo, charte graphique, supports print et digital.",
        category: "Design",
        budget: 150000,
        location: "San-Pédro",
        isRemote: true,
        duration: "1 mois",
        skillsRequired: ["Adobe Illustrator", "Photoshop"],
        applicantsCount: 7,
      },
      {
        clientId: clientId1,
        title: "Rédaction de contenu SEO pour blog",
        description: "Recherche rédacteur pour créer du contenu optimisé SEO pour notre blog d'entreprise. 7 articles par semaine minimum.",
        category: "Rédaction",
        budget: 120000,
        location: "Abidjan",
        isRemote: true,
        duration: "Mission récurrente",
        applicantsCount: 7,
      },
    ];

    missions.forEach((missionData) => {
      const id = randomUUID();
      this.missions.set(id, {
        id,
        clientId: missionData.clientId,
        title: missionData.title,
        description: missionData.description,
        category: missionData.category,
        budget: missionData.budget,
        budgetType: "fixed",
        location: missionData.location || null,
        isRemote: missionData.isRemote || false,
        duration: missionData.duration || null,
        skillsRequired: missionData.skillsRequired || null,
        status: "open" as const,
        applicantsCount: missionData.applicantsCount || 0,
        isBoosted: missionData.isBoosted || false,
        boostExpiresAt: missionData.isBoosted ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    const existing = this.users.get(user.id);
    if (existing) {
      const updated: User = {
        ...existing,
        email: user.email !== undefined ? user.email : existing.email,
        firstName: user.firstName !== undefined ? user.firstName : existing.firstName,
        lastName: user.lastName !== undefined ? user.lastName : existing.lastName,
        profileImageUrl: user.profileImageUrl !== undefined ? user.profileImageUrl : existing.profileImageUrl,
        fullName: user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}` 
          : user.firstName || user.lastName || existing.fullName,
        updatedAt: new Date(),
      };
      this.users.set(user.id, updated);
      return updated;
    }
    
    const newUser: User = {
      id: user.id,
      email: user.email || null,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      profileImageUrl: user.profileImageUrl || null,
      phoneNumber: null,
      password: null,
      fullName: user.firstName && user.lastName 
        ? `${user.firstName} ${user.lastName}` 
        : user.firstName || user.lastName || null,
      role: "freelance",
      bio: null,
      skills: null,
      location: null,
      avatar: null,
      rating: 0,
      reviewCount: 0,
      completedMissions: 0,
      responseRate: 100,
      isBoosted: false,
      boostExpiresAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, newUser);
    return newUser;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Mission methods
  async getMission(id: string): Promise<Mission | undefined> {
    return this.missions.get(id);
  }

  async getMissions(filters?: {
    category?: string;
    minBudget?: number;
    maxBudget?: number;
    location?: string;
    isRemote?: boolean;
    isOnSite?: boolean;
    isBoosted?: boolean;
    status?: string;
    search?: string;
  }): Promise<Mission[]> {
    let missions = Array.from(this.missions.values());

    if (filters) {
      if (filters.category) {
        const categories = filters.category.split(",").map(c => c.trim());
        missions = missions.filter((m) => categories.includes(m.category));
      }
      if (filters.minBudget !== undefined) {
        missions = missions.filter((m) => m.budget >= filters.minBudget!);
      }
      if (filters.maxBudget !== undefined) {
        missions = missions.filter((m) => m.budget <= filters.maxBudget!);
      }
      if (filters.location) {
        const locations = filters.location.split(",").map(l => l.trim());
        missions = missions.filter((m) => m.location && locations.includes(m.location));
      }
      if (filters.isRemote !== undefined) {
        missions = missions.filter((m) => m.isRemote === filters.isRemote);
      }
      if (filters.isOnSite !== undefined) {
        // isOnSite filter: when true, show only missions that are NOT remote (i.e., on-site)
        missions = missions.filter((m) => m.isRemote === !filters.isOnSite);
      }
      if (filters.isBoosted !== undefined) {
        missions = missions.filter((m) => m.isBoosted === filters.isBoosted);
      }
      if (filters.status) {
        missions = missions.filter((m) => m.status === filters.status);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        missions = missions.filter((m) => 
          m.title.toLowerCase().includes(searchLower) || 
          m.description.toLowerCase().includes(searchLower)
        );
      }
    }

    return missions.sort((a, b) => {
      // Boosted missions first
      if (a.isBoosted && !b.isBoosted) return -1;
      if (!a.isBoosted && b.isBoosted) return 1;
      // Then by creation date (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  async createMission(missionData: InsertMission & { clientId: string }): Promise<Mission> {
    const id = randomUUID();
    const mission: Mission = {
      id,
      clientId: missionData.clientId,
      title: missionData.title,
      description: missionData.description,
      category: missionData.category,
      budget: missionData.budget,
      budgetType: missionData.budgetType || "fixed",
      location: missionData.location || null,
      isRemote: missionData.isRemote || false,
      duration: missionData.duration || null,
      skillsRequired: missionData.skillsRequired || null,
      status: missionData.status || "open",
      applicantsCount: 0,
      isBoosted: false,
      boostExpiresAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.missions.set(id, mission);
    return mission;
  }

  async updateMission(id: string, updates: Partial<Mission>): Promise<Mission | undefined> {
    const mission = this.missions.get(id);
    if (!mission) return undefined;
    
    const updatedMission = { ...mission, ...updates, updatedAt: new Date() };
    this.missions.set(id, updatedMission);
    return updatedMission;
  }

  async deleteMission(id: string): Promise<boolean> {
    return this.missions.delete(id);
  }

  async getMissionsByClient(clientId: string): Promise<Mission[]> {
    return Array.from(this.missions.values())
      .filter((m) => m.clientId === clientId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Application methods
  async getApplication(id: string): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getApplicationsByMission(missionId: string): Promise<Application[]> {
    return Array.from(this.applications.values())
      .filter((a) => a.missionId === missionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getApplicationsByFreelancer(freelancerId: string): Promise<Application[]> {
    return Array.from(this.applications.values())
      .filter((a) => a.freelancerId === freelancerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createApplication(appData: InsertApplication & { freelancerId: string }): Promise<Application> {
    const id = randomUUID();
    const application: Application = {
      ...appData,
      id,
      coverLetter: appData.coverLetter || null,
      proposedBudget: appData.proposedBudget || null,
      status: "pending",
      createdAt: new Date(),
    };
    this.applications.set(id, application);
    
    // Increment mission applicants count
    const mission = this.missions.get(appData.missionId);
    if (mission) {
      const currentCount = mission.applicantsCount ?? 0;
      await this.updateMission(mission.id, {
        applicantsCount: currentCount + 1,
      });
    }
    
    return application;
  }

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, ...updates };
    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }

  // Favorite methods
  async getFavoritesByUser(userId: string): Promise<Favorite[]> {
    return Array.from(this.favorites.values())
      .filter((f) => f.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async addFavorite(userId: string, missionId: string): Promise<Favorite> {
    const id = randomUUID();
    const favorite: Favorite = {
      id,
      userId,
      missionId,
      createdAt: new Date(),
    };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async removeFavorite(userId: string, missionId: string): Promise<boolean> {
    const favorite = Array.from(this.favorites.values()).find(
      (f) => f.userId === userId && f.missionId === missionId
    );
    if (favorite) {
      return this.favorites.delete(favorite.id);
    }
    return false;
  }

  async isFavorite(userId: string, missionId: string): Promise<boolean> {
    return Array.from(this.favorites.values()).some(
      (f) => f.userId === userId && f.missionId === missionId
    );
  }

  // Review methods
  async getReviewsByUser(userId: string): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter((r) => r.revieweeId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createReview(reviewData: InsertReview & { reviewerId: string }): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...reviewData,
      id,
      comment: reviewData.comment || null,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    
    // Update user rating
    const userReviews = await this.getReviewsByUser(reviewData.revieweeId);
    const avgRating = Math.round(
      userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length
    );
    
    await this.updateUser(reviewData.revieweeId, {
      rating: avgRating,
      reviewCount: userReviews.length,
    });
    
    return review;
  }
}

export const storage = new DatabaseStorage();
