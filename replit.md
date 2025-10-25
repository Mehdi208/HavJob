# HavJob - Freelance Marketplace Platform

## Overview

HavJob is a web-based freelance marketplace platform designed specifically for the Ivorian market, connecting freelancers, individuals, and companies for short-term missions and projects. The platform enables users to post missions, browse opportunities, communicate via WhatsApp/phone, boost listings for increased visibility, and manage their professional profiles with ratings and reviews.

The application targets a mobile-first audience in Côte d'Ivoire, emphasizing accessibility, trust, and transparency through clear pricing, visible ratings, and authentic user profiles.

## Recent Changes

**October 25, 2025:**
- Corrected Maketou integration URLs and pricing on Boost page
  - Separated mission boost and profile boost plans into distinct arrays
  - Updated mission boost URLs: boost-24h-0, boost-24h-0-9, boost-24h-0-9-8-0, boost-24h-0-9-8-0-3, boost-24h-0-9-8-0-3-8-6-5
  - Updated profile boost URLs: boost-24h, boost-24h-0-9-8, boost-24h-0-9-8-0-4, boost-24h-0-9-8-0-3-8, boost-24h-0-9-8-0-3-8-6
  - Corrected pricing: 1,000, 1,100, 1,200, 1,500, 2,000 FCFA (reduced from 5,000-80,000 FCFA)
  - Recalculated savings percentages: 10%, 20%, 50%, 67%

**October 24, 2025:**
- Fixed mobile registration bug (HTTP 500) caused by missing database columns
- Synchronized PostgreSQL schema with Drizzle definitions using `npm run db:push`
- Added missing fields to database: `cv_url` (users), `custom_category` (missions)
- Updated all storage implementations (MemStorage, PostgresStorage) to include cvUrl and customCategory
- Mobile registration endpoint now fully operational with comprehensive E2E tests validating:
  - Valid user registration (201 Created)
  - Duplicate phone number prevention (400 Bad Request)
  - Password validation (minimum 6 characters)
  - JWT token generation (access + refresh tokens)
  - Protected endpoint authentication (GET /api/mobile/user)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type safety and modern component development
- Vite as the build tool and development server for fast HMV and optimized production builds
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and data fetching
- Tailwind CSS for utility-first styling with custom design system

**Component Architecture:**
- Component-based architecture with reusable UI components built on Radix UI primitives
- Shadcn/ui component library for accessible, customizable UI components
- Path aliases configured for clean imports (@/, @shared/, @assets/)
- Mobile-first responsive design with breakpoints targeting primary mobile users

**Design System:**
- Custom color palette with warm beige backgrounds (#F7EFE4) and deep blue text (#1E3A8A)
- Primary actions use vibrant orange (#FF7043), secondary actions use teal (#1A93B8)
- Boost features highlighted with animated yellow-red gradients
- Inter font family for clean, professional UI elements
- Semantic color tokens via CSS variables for consistent theming
- Mobile-first, warm aesthetic for approachable, friendly user experience

**State Management:**
- React Query for asynchronous state (API data, caching, background updates)
- React hooks (useState, useContext) for local component state
- Custom hooks for reusable logic (use-mobile, use-toast)

### Backend Architecture

**Technology Stack:**
- Express.js as the Node.js web framework
- PostgreSQL via Neon Database (@neondatabase/serverless) for data persistence
- Drizzle ORM for type-safe database operations and schema management
- Session-based authentication using connect-pg-simple for PostgreSQL session storage

**API Architecture:**
- RESTful API design with routes prefixed under /api
- Centralized error handling middleware
- Request/response logging for API endpoints
- Storage abstraction layer (IStorage interface) for potential database switching
- **API Security:**
  - CORS: Production-only whitelisted origins, credentials enabled
  - Rate Limiting: 100 requests/15min per IP (general API), 5 attempts/15min per IP (auth endpoints)
  - Trust proxy enabled for correct client IP detection behind reverse proxy
  - Input validation using Zod schemas
  - HTTPS only in production

**Authentication Strategy:**
- **Dual Authentication System:**
  - **Replit Auth (OAuth):** Google, GitHub, X, Apple sign-in for web users via OIDC
  - **Phone/Password Auth:** Manual registration/login with phone number + password for web and mobile
- **Web Users:** Can choose either authentication method (OAuth or phone/password)
- **Mobile Users:** Use JWT-based phone/password authentication exclusively
- **JWT Authentication (Mobile):**
  - Access tokens: 1 hour expiration, type="access", used for API requests
  - Refresh tokens: 7 days expiration, type="refresh", used only to obtain new access tokens
  - Token type enforcement prevents access token recycling and refresh token misuse
  - Middleware requireJwtAuth accepts only access tokens on protected routes
  - Secure storage: Keychain (iOS) / EncryptedSharedPreferences (Android)
- **Session Authentication (Web):**
  - Password hashing using bcrypt with salt rounds (10)
  - Session management with Passport.js + connect-pg-simple (PostgreSQL session store)
  - Session expiration: 7 days for phone auth, auto-refresh for OAuth tokens
- Role-based access control for freelancers, clients, or both
- authMethod field in users table distinguishes 'replit' vs 'phone' authentication
- **Admin Authentication:**
  - Separate session-based authentication for admin access
  - Credentials stored server-side (not exposed to frontend)
  - Session regeneration on login prevents session fixation attacks
  - Session destruction and cookie clearing on logout prevents session reuse
  - Middleware `isAdmin` protects sensitive admin endpoints (e.g., GET /api/users)
  - Admin routes: POST /api/auth/admin-login, GET /api/auth/admin-status, POST /api/auth/admin-logout
  - Admin dashboard accessible via settings icon in footer (/admin route)

### Database Architecture

**Current State:**
- In-memory storage (MemStorage) for development and testing
- Data models defined in shared/schema.ts with full type safety
- Ready for PostgreSQL migration when needed

**ORM and Migrations:**
- Drizzle ORM schemas prepared for type-safe queries and migrations
- Schema defined in TypeScript (shared/schema.ts)
- Drizzle-Zod integration for runtime schema validation

**Schema Design:**
- Users: 
  - Core fields: id, fullName, email (nullable), phoneNumber (nullable), role
  - Auth fields: password (bcrypt hashed, nullable), authMethod ('replit' | 'phone')
  - Replit Auth users: email required, phoneNumber/password null
  - Phone Auth users: phoneNumber/password required, email optional
- Missions: title, description, category, budget, location, isRemote, status, boost info
- Applications: freelancer applications to missions with cover letters
- Favorites: users can save favorite missions
- Reviews: ratings and feedback system
- Boosts: paid visibility enhancement (1/3/7/15/30 days)

### External Dependencies

**Database Services:**
- Neon PostgreSQL serverless database for scalable data storage
- Connect-pg-simple for PostgreSQL-backed session management

**Payment Integration:**
- Chariow payment gateway for boost feature monetization
- Direct checkout URLs for mission/profile boosts (1-day to 30-day plans)
- Pricing: 5,000 FCFA (1-day) to 80,000 FCFA (30-day boost)

**Third-Party Libraries:**
- Radix UI component primitives for accessible, unstyled UI components
- React Hook Form with Zod resolvers for form validation
- Date-fns for date formatting and manipulation
- Embla Carousel for image carousels
- Lucide React for icon system

**Communication Channels:**
- WhatsApp integration for direct user-to-user contact
- Phone number as primary contact method (Ivorian market preference)

**Development Tools:**
- Replit-specific plugins for development (runtime error overlay, cartographer, dev banner)
- TypeScript for type checking across frontend and backend
- ESBuild for production server bundling
- PostCSS with Autoprefixer for CSS processing

## Mobile Application Development

**Documentation:**
- **API_DOCUMENTATION.md:** Complete REST API documentation for mobile development
  - All endpoints with request/response examples
  - JWT authentication flow (access + refresh tokens)
  - Security details (CORS, rate limiting, validation)
  - Swift (iOS) and Kotlin (Android) implementation examples
  - Error handling and best practices
- **MOBILE_PRD.md:** Product Requirements Document (1000+ lines) for mobile app development by Rork AI
  - Project overview, objectives, and personas (Kouassi freelance, Adjoua client)
  - Technical architecture (React Native/Flutter recommendations)
  - Design & branding (colors, typography, spacing)
  - MVP features vs Phase 2 features
  - User stories with acceptance criteria
  - User journeys (freelance + client flows)
  - Technical specifications (JWT auth flow, state management)
  - Detailed screen specifications with ASCII wireframes
  - Business rules (missions, applications, favorites, profiles)
  - 4-sprint development plan (8 weeks to MVP)
  - Launch checklist (beta + production)

**Mobile API Endpoints:**
- POST /api/mobile/register - User registration with phone/password
- POST /api/mobile/login - User authentication
- POST /api/mobile/refresh - Refresh access token using refresh token
- GET /api/mobile/user - Get authenticated user profile
- All mission, application, favorite, and review endpoints accessible via JWT authentication

**Technology Stack (Recommended for Mobile):**
- React Native (Expo) or Flutter
- JWT authentication with secure token storage
- PostgreSQL database (shared with web app)
- Chariow payment integration (Phase 2)