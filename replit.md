# HavJob - Freelance Marketplace Platform

## Overview

HavJob is a web-based freelance marketplace platform designed specifically for the Ivorian market, connecting freelancers, individuals, and companies for short-term missions and projects. The platform enables users to post missions, browse opportunities, communicate via WhatsApp/phone, boost listings for increased visibility, and manage their professional profiles with ratings and reviews.

The application targets a mobile-first audience in Côte d'Ivoire, emphasizing accessibility, trust, and transparency through clear pricing, visible ratings, and authentic user profiles.

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

**Authentication Strategy:**
- **Dual Authentication System:**
  - **Replit Auth (OAuth):** Google, GitHub, X, Apple sign-in for web users via OIDC
  - **Phone/Password Auth:** Manual registration/login with phone number + password
- **Web Users:** Can choose either authentication method
- **Mobile Users (Future):** Will use phone/password authentication exclusively
- Password hashing using bcrypt with salt rounds (10)
- Session management with Passport.js + connect-pg-simple (PostgreSQL session store)
- Session expiration: 7 days for phone auth, auto-refresh for OAuth tokens
- Role-based access control for freelancers, clients, or both
- authMethod field in users table distinguishes 'replit' vs 'phone' authentication

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