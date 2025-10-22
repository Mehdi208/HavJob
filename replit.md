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
- Primary actions use soft green (#81C784), secondary actions use teal (#1A93B8)
- Boost features highlighted with red/bordeaux gradients
- Inter font family for clean, professional UI elements
- Custom border radius system (9px/6px/3px)
- Nintendo-inspired warm aesthetic for approachable, friendly user experience

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
- Manual login using phone number + password (email optional)
- Password hashing using bcrypt (implied by security requirements)
- Session management with PostgreSQL backing store
- Role-based access control for freelancers and clients

### Database Architecture

**ORM and Migrations:**
- Drizzle ORM for type-safe queries and migrations
- Schema defined in TypeScript (shared/schema.ts)
- Migration files generated in ./migrations directory
- Database URL configured via environment variables

**Schema Design:**
- Users table with username, password fields (UUID primary keys)
- Extensible schema for missions, boosts, favorites, reviews, transactions, categories
- PostgreSQL-specific features leveraged (gen_random_uuid())

**Data Validation:**
- Drizzle-Zod integration for runtime schema validation
- Type inference from database schema to TypeScript types

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