# HavJob Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based with Modern Marketplace Patterns

Drawing inspiration from successful freelance platforms (Upwork, Fiverr, Freelancer.com) while incorporating Ivorian cultural warmth and local market expectations. The design balances professional credibility with approachable, human-centered interactions.

**Core Principles:**
- Trust & Transparency: Clear pricing, visible ratings, authentic profiles
- Accessibility First: Simple navigation for diverse user technical literacy
- Mobile-Optimized: Primary device for Ivorian users is mobile
- Action-Oriented: Clear CTAs guide users to post or respond to missions

---

## Color System

### Primary Palette (Light Mode)
- **Primary Action:** #FF7043 (Coral Orange) - All primary buttons, active states, mission boost badges
- **Primary Text:** #1E3A8A (Deep Blue) - Headings, important text, navigation
- **Secondary Action:** #1A93B8 (Teal Blue) - Links, secondary buttons, icons, hover states
- **Success/Active:** #81C784 (Soft Green) - Completed missions, success messages, availability indicators
- **Neutral Grays:** 
  - Background: 248 250 252 (slate-50)
  - Cards: 255 255 255 (white)
  - Borders: 226 232 240 (slate-200)
  - Muted Text: 100 116 139 (slate-500)

### Dark Mode Palette
- **Background:** 15 23 42 (slate-900)
- **Cards:** 30 41 59 (slate-800)
- **Primary Action:** #FF8A65 (lighter coral for contrast)
- **Text:** 248 250 252 (slate-50)
- **Borders:** 51 65 85 (slate-700)

### Accent Usage
- Orange (#FF7043): Primary CTAs, "Publier une mission", boost badges, price highlights
- Teal (#1A93B8): Secondary actions, "Contacter via WhatsApp", profile links, filter active states
- Green (#81C784): Mission completed status, availability badges, success notifications
- Avoid using all colors equally - Orange dominates CTAs, Teal for navigation/links, Green sparingly for positive states

---

## Typography

**Font Families:**
- Primary: Inter (Google Fonts) - Clean, professional, excellent for UI elements
- Alternative: Poppins for marketing emphasis if needed
- Monospace: JetBrains Mono for budget/price displays

**Type Scale (Tailwind Classes):**
- Hero Heading: text-5xl md:text-6xl font-bold (48px-60px)
- Page Title: text-3xl md:text-4xl font-bold (30px-36px)
- Section Heading: text-2xl font-semibold (24px)
- Card Title: text-lg font-semibold (18px)
- Body: text-base (16px)
- Small/Meta: text-sm (14px)
- Tiny/Labels: text-xs (12px)

**Hierarchy:**
- Mission titles: font-semibold text-lg text-slate-900
- User names: font-medium text-base
- Descriptions: font-normal text-slate-600
- Budget/Price: font-bold text-xl text-primary (Orange)
- Category tags: font-medium text-sm text-teal-700

---

## Layout System

**Spacing Primitives (Tailwind Units):**
Consistent use of: **2, 4, 6, 8, 12, 16, 20, 24** for spacing
- Component padding: p-4 md:p-6 (cards, sections)
- Section margins: mb-8 md:mb-12 (between page sections)
- Grid gaps: gap-4 md:gap-6 (mission cards, profile grids)
- Container max-width: max-w-7xl mx-auto px-4 md:px-6

**Responsive Breakpoints:**
```
Mobile: base (default)
Tablet: md: (768px)
Desktop: lg: (1024px)
Wide: xl: (1280px)
```

**Grid Systems:**
- Mission Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Filter Sidebar: 2-column layout (filters left, missions right) on desktop
- Profile Stats: grid-cols-2 md:grid-cols-4 gap-4
- Dashboard: Single column mobile, 2-column tablet/desktop

---

## Component Library

### Navigation Header
- Sticky top position with backdrop blur
- Logo left, search center, "Publier une mission" CTA + avatar right
- Search bar: w-full max-w-2xl with category dropdown
- Mobile: Hamburger menu, search overlay
- Height: h-16 md:h-20

### Mission Cards
- White background with subtle shadow (shadow-sm hover:shadow-md)
- Rounded corners: rounded-xl
- Boost indicator: Absolute badge top-right with orange gradient
- Structure: Image/icon top, category tag, title (2 lines max), budget (bold, large), location + time, freelancer count
- Favorite star: Absolute top-left on image, white bg with shadow
- Hover: Slight scale transform (scale-105), shadow lift

### Profile Cards
- Avatar prominent (96x96 md:128x128), rounded-full with ring-2 ring-primary
- Name, title, rating (stars + count), location
- Skills as colored pills (bg-slate-100 text-slate-700 rounded-full)
- "Contacter via WhatsApp" CTA in teal
- Boost badge if active

### Filters Panel
- Sticky sidebar on desktop (sticky top-20)
- Accordion sections: Catégorie, Budget, Délai, Localisation, Type
- Checkbox groups with counts: "Design (24)", "Développement (18)"
- Range slider for budget with input fields
- "Réinitialiser les filtres" link at bottom

### Dashboard Cards
- Three stat cards at top: Missions publiées, Candidatures, Missions en cours
- Each card: Icon, large number, label, trend indicator
- Recent activity feed with avatars + timestamps
- Color-coded status badges: En cours (blue), Terminée (green), En attente (gray)

### Forms
- Label above input: font-medium text-sm text-slate-700
- Input fields: h-11 rounded-lg border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20
- Textarea: min-h-32 for descriptions
- Select dropdowns: Custom styled with chevron icon
- Required asterisk in red
- Error states: border-red-500 with text-red-600 message below

### Buttons
- Primary: bg-primary text-white rounded-lg px-6 py-3 font-medium hover:bg-primary/90
- Secondary: bg-teal-600 text-white (for WhatsApp, secondary actions)
- Outline: border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50
- Text/Link: text-teal-600 hover:text-teal-700 underline-offset-4 hover:underline

### Boost Badges
- Gradient background: bg-gradient-to-r from-orange-500 to-pink-500
- Icon + text: "🚀 Boost actif - 3 jours restants"
- Positioned absolutely on cards/profiles
- Pulsing animation (subtle)

### Rating Display
- Star icons (filled/half/empty) in gold (#F59E0B)
- Count in parentheses: text-sm text-slate-600
- Average rating: font-bold text-lg
- Review cards: Avatar, name, stars, date, comment

---

## Page Layouts

### Homepage (Mission Listing)
- Hero section: 60vh with search bar overlay, gradient background (teal to blue), CTA buttons
- Filter sidebar left (desktop), toggle on mobile
- Mission grid right, 3 columns desktop, 2 tablet, 1 mobile
- Pagination at bottom
- Featured missions at top (boosted)

### Mission Detail Page
- Breadcrumb navigation
- 2-column layout: Mission info left (8/12), Sidebar right (4/12)
- Left: Title, client avatar/name, description, budget, duration, skills needed, location
- Right: "Postuler" CTA sticky, client stats, similar missions
- Reviews section below

### User Profile
- Cover image (optional) with avatar overlapping
- Stats row: Missions complétées, Note moyenne, Taux de réponse
- Tabs: Aperçu, Portfolio, Avis
- Contact buttons sticky on scroll (mobile)
- Skills grid, availability calendar

### Dashboard
- Sidebar navigation: Vue d'ensemble, Missions, Messages, Profil, Paramètres
- Main content area with stats cards top
- Tabs for different mission states (Publiées, Reçues, En cours, Terminées)
- Action buttons in card footers

---

## Animations

Use sparingly - only where they enhance UX:
- Card hover: transform scale-105 duration-200
- Button hover: subtle shadow lift
- Page transitions: fade-in duration-300
- Skeleton loading for async content
- Toast notifications: slide-in from top-right
- NO complex scroll animations, parallax, or decorative movements

---

## Images

### Hero Section
Large hero image showcasing Ivorian professionals at work (diverse fields: tech, design, construction, services). Optimistic, authentic photography with warm lighting. Image should convey collaboration and opportunity.

### Category Icons
Use Lucide icons for categories (Code, Palette, Hammer, Camera, etc.) with orange background circles

### User Avatars
Placeholder: Colored initials on gradient backgrounds when no photo uploaded

### Mission Thumbnails
Encourage users to upload relevant images; default to category icon with brand gradient if none provided

### Profile Backgrounds
Optional cover images with dark overlay for text legibility

---

## Accessibility

- WCAG AA compliant contrast ratios (4.5:1 minimum)
- Focus states visible with ring-2 ring-primary/50
- Skip to main content link
- Screen reader labels for icon-only buttons
- Keyboard navigation functional throughout
- Touch targets minimum 44x44px on mobile
- Alt text for all images

---

## Mobile-Specific

- Bottom navigation bar for key actions on mobile (Accueil, Rechercher, Publier, Messages, Profil)
- Swipeable mission cards
- Sticky "Publier une mission" FAB on homepage
- Full-screen filters with apply/reset actions
- Touch-friendly spacing (min 12px between interactive elements)