# HavJob Mobile App - Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 23 Octobre 2025  
**Pour:** Rork AI - Développement Application Mobile  
**Projet:** HavJob - Marketplace Ivoirienne Freelance/Client

---

## 📋 Table des Matières

1. [Vue d'ensemble du projet](#vue-densemble-du-projet)
2. [Objectifs](#objectifs)
3. [Public cible](#public-cible)
4. [Architecture technique](#architecture-technique)
5. [Design & Branding](#design--branding)
6. [Fonctionnalités](#fonctionnalités)
7. [User Stories](#user-stories)
8. [Parcours utilisateur](#parcours-utilisateur)
9. [Spécifications techniques](#spécifications-techniques)
10. [API REST](#api-rest)
11. [Données & Modèles](#données--modèles)
12. [Écrans détaillés](#écrans-détaillés)
13. [Règles métier](#règles-métier)
14. [Priorités de développement](#priorités-de-développement)
15. [Contraintes & Considérations](#contraintes--considérations)

---

## 🎯 Vue d'ensemble du projet

**HavJob** est une plateforme marketplace connectant **freelances** et **clients** (entreprises/particuliers) en Côte d'Ivoire. 

### Proposition de valeur

**Pour les Freelances:**
- Trouver des missions rémunérées dans leur domaine d'expertise
- Construire un portfolio et une réputation via les avis clients
- Gérer leurs candidatures et projets en cours

**Pour les Clients:**
- Publier des missions et recevoir des candidatures qualifiées
- Trouver des freelances compétents avec avis et historique
- Gérer leurs projets et contrats

### Différenciateurs

1. **100% Ivoirien** : Adapté au contexte local (paiement Chariow, numéros de téléphone ivoiriens)
2. **Mobile-first** : Conçu pour utilisateurs mobiles non tech-savvy
3. **Paiement local** : Intégration Chariow (Orange Money, MTN Mobile Money, Moov Money, Wave)
4. **Contact WhatsApp** : Communication facilitée entre freelances et clients

---

## 🎯 Objectifs

### Objectifs Business

1. **Lancement MVP** : Application fonctionnelle iOS + Android en 8 semaines
2. **Adoption** : 1000+ utilisateurs inscrits dans les 3 premiers mois
3. **Engagement** : 50+ missions publiées par mois
4. **Rétention** : 70%+ des utilisateurs reviennent après première utilisation

### Objectifs Produit

1. **Simplicité** : Inscription et publication de mission en < 3 minutes
2. **Performance** : Temps de chargement < 2 secondes
3. **Fiabilité** : 99.5%+ uptime
4. **Sécurité** : Authentification sécurisée, données protégées

---

## 👥 Public cible

### Persona 1: Kouassi - Développeur Freelance

- **Âge:** 26 ans
- **Localisation:** Abidjan, Côte d'Ivoire
- **Expérience:** 3 ans de développement web
- **Objectif:** Trouver des missions freelance pour compléter revenus
- **Pain points:** 
  - Difficulté à trouver des clients locaux
  - Manque de visibilité de ses compétences
  - Paiements compliqués avec clients étrangers
- **Technologie:** Utilise smartphone Android quotidiennement, connexion internet limitée

### Persona 2: Adjoua - Chef d'Entreprise

- **Âge:** 35 ans
- **Localisation:** Yamoussoukro, Côte d'Ivoire
- **Entreprise:** PME commerce (10 employés)
- **Objectif:** Trouver un développeur pour créer site web e-commerce
- **Pain points:**
  - Ne connaît pas de développeurs locaux fiables
  - Budget limité
  - Besoin d'accompagnement et conseils
- **Technologie:** Utilise iPhone, préfère WhatsApp pour communications

---

## 🏗️ Architecture technique

### Stack Technologique Recommandé

**Mobile:**
- **Framework:** React Native (Expo) ou Flutter
- **État:** Redux Toolkit / Zustand (React Native) ou Provider (Flutter)
- **Routing:** React Navigation (RN) ou Navigator 2.0 (Flutter)
- **HTTP Client:** Axios / Fetch API (RN) ou Dio (Flutter)
- **Stockage Local:** AsyncStorage / SecureStore (RN) ou SharedPreferences (Flutter)
- **Authentification:** Keychain (iOS) / EncryptedSharedPreferences (Android)

**Backend:**
- **API:** REST API (déjà développée, voir API_DOCUMENTATION.md)
- **Base de données:** PostgreSQL (Neon) partagée
- **Authentification:** JWT (Access + Refresh tokens)

### Déploiement

- **iOS:** App Store (TestFlight pour beta)
- **Android:** Google Play Store (Beta fermée puis ouverte)
- **Version minimale:** iOS 13+, Android 8.0+ (API 26+)

---

## 🎨 Design & Branding

### Palette de Couleurs

**Couleur Primaire:**
- **Orange:** `#FF7043` - Chaleur, énergie, Afrique
- Utilisée pour CTAs, éléments interactifs principaux

**Couleur Secondaire:**
- **Beige chaud:** `#F7EFE4` - Backgrounds, sections
- Confortable, accueillant, professionnel

**Couleurs Neutres:**
- **Texte principal:** `#2C2C2C` (presque noir)
- **Texte secondaire:** `#6B6B6B` (gris moyen)
- **Bordures:** `#E0E0E0` (gris clair)
- **Backgrounds:** `#FFFFFF` (blanc)

**Couleurs Status:**
- **Succès:** `#4CAF50` (vert)
- **Erreur:** `#F44336` (rouge)
- **Warning:** `#FFC107` (jaune/ambre)
- **Info:** `#2196F3` (bleu)

### Typographie

**Titres:**
- **Font:** Poppins Bold
- **Tailles:** H1 (24px), H2 (20px), H3 (18px)

**Corps de texte:**
- **Font:** Inter Regular/Medium
- **Tailles:** Body (14px), Small (12px), Tiny (10px)

**Boutons:**
- **Font:** Inter SemiBold
- **Taille:** 14px

### Espacements & Grille

- **Unité de base:** 4px
- **Espacements:** 8px, 12px, 16px, 24px, 32px
- **Marges écran:** 16px (mobile), 24px (tablet)
- **Border radius:** 8px (cards), 12px (modals), 24px (boutons)

### Icônes

- **Bibliothèque:** Feather Icons / Lucide
- **Taille:** 20px (petits), 24px (standards), 32px (grands)
- **Style:** Outline (stroke 2px)

---

## ⚙️ Fonctionnalités

### MVP (Must Have) - Phase 1

#### Authentification
- [x] Inscription par téléphone + mot de passe
- [x] Connexion par téléphone + mot de passe
- [x] Refresh automatique des tokens JWT
- [x] Déconnexion

#### Profil Utilisateur
- [ ] Voir son profil (nom, téléphone, email, rôle, bio, compétences)
- [ ] Modifier son profil (bio, compétences, localisation, photo)
- [ ] Voir statistiques (rating, nombre d'avis, missions complétées)

#### Missions
- [ ] Lister toutes les missions (avec filtres)
- [ ] Voir détails d'une mission
- [ ] Chercher missions par mots-clés
- [ ] Filtrer missions (catégorie, budget, localisation, remote)
- [ ] **Client:** Publier une nouvelle mission
- [ ] **Client:** Modifier/Supprimer ses missions
- [ ] **Freelance:** Postuler à une mission
- [ ] **Freelance:** Voir ses candidatures en cours

#### Favoris
- [ ] Ajouter mission aux favoris
- [ ] Retirer mission des favoris
- [ ] Voir liste des favoris

#### Dashboard
- [ ] **Freelance:** Voir missions recommandées (basé sur compétences)
- [ ] **Freelance:** Voir candidatures en cours/acceptées/refusées
- [ ] **Client:** Voir ses missions publiées
- [ ] **Client:** Voir candidatures reçues pour chaque mission

#### Notifications
- [ ] Badge notification sur icône dashboard
- [ ] Liste des notifications (nouvelle candidature, mission acceptée, etc.)

### Phase 2 (Nice to Have) - Post-MVP

#### Avis & Réputation
- [ ] Laisser un avis sur un freelance/client
- [ ] Voir avis d'un utilisateur
- [ ] Calculer rating moyen automatiquement

#### Paiement Chariow
- [ ] Intégration SDK Chariow (Orange Money, MTN, Moov, Wave)
- [ ] Paiement mission
- [ ] Historique paiements
- [ ] Facturation automatique

#### Messagerie
- [ ] Chat 1-to-1 entre client et freelance
- [ ] Historique conversations
- [ ] Notifications push nouveau message

#### Boosting Missions
- [ ] Booster une mission (mise en avant payante)
- [ ] Badge "Mission Boostée" visuellement distinctif

#### Contact WhatsApp
- [ ] Bouton "Contacter via WhatsApp" sur profil freelance
- [ ] Deep link vers WhatsApp avec message pré-rempli

---

## 📖 User Stories

### Authentification

**US-AUTH-01:** En tant qu'utilisateur, je veux m'inscrire avec mon numéro de téléphone et un mot de passe pour créer un compte.

**Critères d'acceptation:**
- [ ] Formulaire avec champs : téléphone, mot de passe, confirmation mot de passe, nom complet, email (optionnel), rôle
- [ ] Validation en temps réel (format téléphone, longueur mot de passe)
- [ ] Message d'erreur si téléphone déjà utilisé
- [ ] Redirection vers Dashboard après inscription réussie
- [ ] Tokens JWT stockés en sécurisé (Keychain/EncryptedSharedPrefs)

**US-AUTH-02:** En tant qu'utilisateur inscrit, je veux me connecter avec mon téléphone et mot de passe pour accéder à mon compte.

**Critères d'acceptation:**
- [ ] Formulaire avec champs : téléphone, mot de passe
- [ ] Message d'erreur si identifiants incorrects
- [ ] Redirection vers Dashboard après connexion réussie
- [ ] Mémoriser connexion (ne pas redemander à chaque ouverture app)

**US-AUTH-03:** En tant qu'utilisateur connecté, je veux que mon token soit automatiquement rafraîchi quand il expire pour rester connecté.

**Critères d'acceptation:**
- [ ] Refresh automatique du token avant expiration (50 min / 1h)
- [ ] Retry automatique requête après refresh si 401
- [ ] Déconnexion automatique si refresh token expiré (7j)

---

### Missions

**US-MISSION-01:** En tant que freelance, je veux voir la liste de toutes les missions disponibles pour trouver du travail.

**Critères d'acceptation:**
- [ ] Liste scrollable infinie (pagination)
- [ ] Affichage : titre, catégorie, budget, localisation, badge "Remote", badge "Boosté"
- [ ] Pull-to-refresh
- [ ] Skeleton loading pendant chargement

**US-MISSION-02:** En tant qu'utilisateur, je veux filtrer les missions par catégorie, budget, et localisation pour trouver des missions pertinentes.

**Critères d'acceptation:**
- [ ] Bottom sheet / Modal filtres
- [ ] Filtres : catégorie (dropdown), budget min/max (sliders), localisation (dropdown), remote (toggle)
- [ ] Badge "X filtres actifs" visible
- [ ] Bouton "Réinitialiser filtres"
- [ ] Appliquer filtres en temps réel

**US-MISSION-03:** En tant qu'utilisateur, je veux chercher une mission par mots-clés pour trouver rapidement ce que je cherche.

**Critères d'acceptation:**
- [ ] Barre de recherche en haut de la liste missions
- [ ] Recherche dans titre + description
- [ ] Affichage résultats en temps réel (debounce 300ms)
- [ ] Message "Aucun résultat" si vide

**US-MISSION-04:** En tant qu'utilisateur, je veux voir les détails complets d'une mission pour décider si je postule.

**Critères d'acceptation:**
- [ ] Affichage : titre, description complète, catégorie, budget, type budget (fixe/horaire), localisation, remote, durée estimée, compétences requises, statut
- [ ] Affichage nombre de candidatures
- [ ] Bouton "Postuler" (freelance) ou "Modifier/Supprimer" (client propriétaire)
- [ ] Bouton "Ajouter aux favoris" (icône coeur)

**US-MISSION-05:** En tant que client, je veux publier une nouvelle mission pour trouver un freelance.

**Critères d'acceptation:**
- [ ] Formulaire multi-étapes :
  1. Titre + Description
  2. Catégorie + Compétences requises
  3. Budget + Type budget + Durée
  4. Localisation + Remote (toggle)
- [ ] Validation temps réel
- [ ] Preview avant publication
- [ ] Redirection vers mission publiée après succès

**US-MISSION-06:** En tant que freelance, je veux postuler à une mission avec une lettre de motivation pour montrer mon intérêt.

**Critères d'acceptation:**
- [ ] Modal "Postuler" avec champs : lettre de motivation, budget proposé (optionnel), durée proposée (optionnel)
- [ ] Validation : lettre min 50 caractères
- [ ] Message succès "Candidature envoyée !"
- [ ] Bouton "Postuler" devient "Candidature envoyée" (disabled)

---

### Profil

**US-PROFILE-01:** En tant qu'utilisateur, je veux voir mon profil complet pour vérifier mes informations.

**Critères d'acceptation:**
- [ ] Affichage : photo, nom, téléphone, email, rôle, bio, compétences, localisation, rating, nombre d'avis, missions complétées
- [ ] Bouton "Modifier profil"
- [ ] Bouton "Déconnexion"

**US-PROFILE-02:** En tant qu'utilisateur, je veux modifier mon profil pour mettre à jour mes informations.

**Critères d'acceptation:**
- [ ] Formulaire pré-rempli avec données actuelles
- [ ] Champs éditables : photo, nom, email, bio, compétences (multi-select), localisation
- [ ] Upload photo depuis galerie ou appareil photo
- [ ] Validation temps réel
- [ ] Message succès "Profil mis à jour !"

---

### Dashboard

**US-DASHBOARD-01:** En tant que freelance, je veux voir mes candidatures en cours sur mon dashboard pour suivre mes opportunités.

**Critères d'acceptation:**
- [ ] Liste candidatures avec statut (pending, accepted, rejected)
- [ ] Affichage : mission title, statut (badge coloré), date candidature
- [ ] Tap pour voir détails mission
- [ ] Tri par date (plus récentes en haut)

**US-DASHBOARD-02:** En tant que client, je veux voir mes missions publiées et les candidatures reçues pour gérer mes projets.

**Critères d'acceptation:**
- [ ] Liste missions publiées
- [ ] Badge nombre candidatures par mission
- [ ] Tap pour voir détails + liste candidatures
- [ ] Bouton "Publier nouvelle mission" (FAB)

---

## 🗺️ Parcours utilisateur

### Parcours 1: Inscription & Première Mission (Freelance)

1. **Télécharger app** depuis App Store / Google Play
2. **Ouvrir app** → Splash Screen (logo HavJob) → Écran Onboarding
3. **Onboarding** (3 slides) :
   - Slide 1: "Trouvez des missions freelance en Côte d'Ivoire"
   - Slide 2: "Construisez votre réputation avec les avis clients"
   - Slide 3: "Recevez vos paiements via Chariow"
   - Bouton "Commencer" → Écran Inscription
4. **Inscription** :
   - Remplir formulaire (téléphone, mot de passe, nom, rôle=freelance)
   - Tap "S'inscrire" → Chargement → Dashboard
5. **Dashboard Freelance** :
   - Section "Missions recommandées" (basé sur compétences si renseignées, sinon toutes)
   - Section "Mes candidatures" (vide pour l'instant)
   - Bottom nav : Home, Recherche, Favoris, Profil
6. **Voir liste missions** :
   - Tap "Voir toutes" ou onglet "Recherche"
   - Scroll liste missions
   - Tap mission intéressante → Détails mission
7. **Postuler** :
   - Tap "Postuler"
   - Remplir lettre motivation
   - Tap "Envoyer candidature" → Message succès
   - Retour Dashboard → Candidature visible dans "Mes candidatures"

### Parcours 2: Publication Mission (Client)

1. **Connexion** (déjà inscrit)
2. **Dashboard Client** :
   - Section "Mes missions" (vide si nouveau)
   - Bouton FAB "+ Nouvelle mission"
3. **Publier mission** :
   - Step 1: Titre + Description
   - Step 2: Catégorie + Compétences
   - Step 3: Budget + Durée
   - Step 4: Localisation + Remote
   - Preview → "Publier"
4. **Mission publiée** :
   - Redirection vers détails mission
   - Notification "Mission publiée avec succès !"
   - Visible dans Dashboard > "Mes missions"
5. **Recevoir candidatures** :
   - Badge notification sur Dashboard
   - Tap mission → Voir liste candidatures
   - Tap candidature → Voir profil freelance + lettre motivation
   - Bouton "Accepter" / "Refuser"

---

## 🛠️ Spécifications techniques

### Structure de l'Application

```
/src
  /screens
    /auth
      - LoginScreen.tsx
      - RegisterScreen.tsx
      - OnboardingScreen.tsx
    /missions
      - MissionListScreen.tsx
      - MissionDetailScreen.tsx
      - CreateMissionScreen.tsx
      - EditMissionScreen.tsx
    /profile
      - ProfileScreen.tsx
      - EditProfileScreen.tsx
    /dashboard
      - FreelanceDashboardScreen.tsx
      - ClientDashboardScreen.tsx
    /favorites
      - FavoritesScreen.tsx
    /applications
      - MyApplicationsScreen.tsx
      - ApplicationDetailScreen.tsx
  /components
    /common
      - Button.tsx
      - Input.tsx
      - Card.tsx
      - Badge.tsx
      - Avatar.tsx
      - Loading.tsx
      - ErrorMessage.tsx
    /missions
      - MissionCard.tsx
      - MissionFilters.tsx
      - MissionSearchBar.tsx
    /profile
      - ProfileHeader.tsx
      - SkillTag.tsx
  /navigation
    - RootNavigator.tsx
    - AuthNavigator.tsx
    - AppNavigator.tsx
    - BottomTabNavigator.tsx
  /services
    - api.ts (HTTP client)
    - auth.ts (authentification)
    - storage.ts (local storage)
  /store (si Redux/Zustand)
    - authSlice.ts
    - missionsSlice.ts
    - profileSlice.ts
  /utils
    - validators.ts
    - formatters.ts
    - constants.ts
  /types
    - models.ts
    - api.ts
  /hooks
    - useAuth.ts
    - useMissions.ts
    - useProfile.ts
```

### Gestion de l'Authentification

**Flux Complet:**

```typescript
// 1. Login/Register
POST /api/mobile/register
POST /api/mobile/login
→ Reçoit { user, accessToken, refreshToken }

// 2. Stocker tokens en sécurisé
await SecureStore.setItemAsync('accessToken', accessToken);
await SecureStore.setItemAsync('refreshToken', refreshToken);

// 3. Interceptor HTTP (axios/dio)
- Ajouter Authorization: Bearer <accessToken> à chaque requête
- Si 401 → Appeler /api/mobile/refresh avec refreshToken
- Si refresh ok → Retry requête originale avec nouveau accessToken
- Si refresh fail → Déconnecter utilisateur

// 4. Refresh proactif
- Timer qui refresh à 50 minutes (avant expiration 1h)
- Evite interruptions pendant utilisation

// 5. Déconnexion
- Supprimer tokens de SecureStore
- Rediriger vers LoginScreen
```

**Code Exemple (React Native + Axios):**

```typescript
// services/api.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://havjob.replit.app/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - ajouter access token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - gérer 401 et refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si 401 et pas déjà retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        
        if (!refreshToken) {
          // Pas de refresh token, déconnecter
          await logout();
          return Promise.reject(error);
        }

        // Appeler endpoint refresh
        const response = await axios.post(`${BASE_URL}/mobile/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;

        // Sauvegarder nouveau access token
        await SecureStore.setItemAsync('accessToken', accessToken);

        // Retry requête originale avec nouveau token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, déconnecter
        await logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

async function logout() {
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('refreshToken');
  // Rediriger vers login (via navigation ou state management)
}

export default api;
```

### Gestion des Données (State Management)

**Option 1: Redux Toolkit (React Native)**

```typescript
// store/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import * as SecureStore from 'expo-secure-store';

export const login = createAsyncThunk(
  'auth/login',
  async ({ phoneNumber, password }: LoginCredentials) => {
    const response = await api.post('/mobile/login', { phoneNumber, password });
    const { user, accessToken, refreshToken } = response.data;
    
    // Stocker tokens
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

**Option 2: Context API + Hooks (Plus simple)**

```typescript
// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import * as SecureStore from 'expo-secure-store';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (phoneNumber: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  async function loadStoredUser() {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        // Fetch current user
        const response = await api.get('/mobile/user');
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(phoneNumber: string, password: string) {
    const response = await api.post('/mobile/login', { phoneNumber, password });
    const { user, accessToken, refreshToken } = response.data;
    
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    
    setUser(user);
  }

  async function register(data: RegisterData) {
    const response = await api.post('/mobile/register', data);
    const { user, accessToken, refreshToken } = response.data;
    
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    
    setUser(user);
  }

  async function logout() {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
```

### Performance & Optimisation

**1. Images:**
- Utiliser format WebP pour images (plus léger)
- Lazy loading pour listes (FlatList avec pagination)
- Cache images (react-native-fast-image ou Expo Image)

**2. Listes:**
- FlatList avec `getItemLayout` pour performance
- Pagination : charger 20 items à la fois
- Pull-to-refresh + infinite scroll

**3. Network:**
- Timeout requêtes : 30 secondes
- Retry automatique (3x) pour requêtes GET
- Cache requêtes GET courantes (React Query / SWR)

**4. Offline:**
- Détecter connexion (NetInfo)
- Message "Pas de connexion" si offline
- Queue requêtes POST/PUT pour retry quand retour online

---

## 📡 API REST

**Documentation complète:** Voir fichier `API_DOCUMENTATION.md`

**Base URL:** `https://havjob.replit.app/api`

### Endpoints Principaux

**Authentification:**
```
POST /mobile/register
POST /mobile/login
POST /mobile/refresh
GET  /mobile/user
```

**Missions:**
```
GET    /missions
GET    /missions/:id
POST   /missions
PUT    /missions/:id
DELETE /missions/:id
```

**Candidatures:**
```
GET  /missions/:missionId/applications
POST /missions/:missionId/applications
PUT  /missions/:missionId/applications/:applicationId
```

**Favoris:**
```
GET    /favorites
POST   /favorites/:missionId
DELETE /favorites/:missionId
```

**Avis (Phase 2):**
```
GET  /reviews/user/:userId
POST /reviews
```

---

## 📊 Données & Modèles

### User

```typescript
interface User {
  id: string;
  phoneNumber: string;
  fullName: string;
  email?: string;
  role: 'freelance' | 'client' | 'both';
  authMethod: 'phone' | 'replit';
  bio?: string;
  skills?: string[];
  location?: string;
  profilePicture?: string;
  rating: number;
  reviewCount: number;
  completedMissions: number;
  responseRate: number;
  isBoosted: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Mission

```typescript
interface Mission {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  budgetType: 'fixed' | 'hourly';
  location?: string;
  isRemote: boolean;
  duration?: string;
  skillsRequired: string[];
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  applicantsCount: number;
  isBoosted: boolean;
  boostExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Application

```typescript
interface Application {
  id: string;
  missionId: string;
  freelancerId: string;
  coverLetter: string;
  proposedBudget?: number;
  proposedDuration?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}
```

### Favorite

```typescript
interface Favorite {
  id: string;
  userId: string;
  missionId: string;
  createdAt: string;
}
```

### Review (Phase 2)

```typescript
interface Review {
  id: string;
  reviewerId: string;
  reviewedUserId: string;
  missionId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}
```

---

## 📱 Écrans détaillés

### 1. Splash Screen

**Affichage:**
- Logo HavJob centré
- Fond orange (#FF7043) avec gradient
- Animation fade-in logo
- Durée : 2 secondes

**Navigation:**
- Si tokens valides → Dashboard
- Sinon → Onboarding (première fois) ou Login

---

### 2. Onboarding (3 Slides)

**Slide 1:**
- **Illustration:** Freelance devant ordinateur
- **Titre:** "Trouvez des missions freelance"
- **Description:** "Accédez à des centaines de missions en Côte d'Ivoire"

**Slide 2:**
- **Illustration:** Étoiles rating + pouce levé
- **Titre:** "Construisez votre réputation"
- **Description:** "Les avis clients vous aident à gagner la confiance"

**Slide 3:**
- **Illustration:** Mobile Money logo (Orange, MTN, Moov, Wave)
- **Titre:** "Paiements sécurisés avec Chariow"
- **Description:** "Recevez vos paiements via Mobile Money local"

**Footer:**
- Dots navigation (1/3, 2/3, 3/3)
- Bouton "Suivant" (slides 1-2) ou "Commencer" (slide 3)
- Lien "Passer" (haut droite)

---

### 3. Register Screen

**Header:**
- Titre : "Créer un compte"
- Sous-titre : "Rejoignez HavJob aujourd'hui"

**Form:**
```
┌─────────────────────────────────────┐
│ 📱 Numéro de téléphone             │
│ +225 __ __ __ __ __ __             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🔒 Mot de passe                     │
│ ••••••••                            │
│ 👁️ (toggle visibility)             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🔒 Confirmer mot de passe           │
│ ••••••••                            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 👤 Nom complet                      │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📧 Email (optionnel)                │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 💼 Je suis...                       │
│ ○ Freelance                         │
│ ○ Client                            │
│ ○ Les deux                          │
└─────────────────────────────────────┘

[  S'INSCRIRE  ] (bouton primaire)
```

**Footer:**
- Lien : "Déjà un compte ? Se connecter"

**Validation:**
- Téléphone : Format ivoirien (+225...), min 8 chiffres
- Mot de passe : Min 6 caractères
- Confirmation : Doit correspondre
- Nom : Min 2 caractères
- Email : Format valide si renseigné
- Rôle : Obligatoire

---

### 4. Login Screen

**Header:**
- Titre : "Connexion"
- Sous-titre : "Content de vous revoir !"

**Form:**
```
┌─────────────────────────────────────┐
│ 📱 Numéro de téléphone             │
│ +225 __ __ __ __ __ __             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🔒 Mot de passe                     │
│ ••••••••                            │
│ 👁️                                  │
└─────────────────────────────────────┘

[  SE CONNECTER  ] (bouton primaire)
```

**Footer:**
- Lien : "Pas encore de compte ? S'inscrire"
- Lien : "Mot de passe oublié ?" (Phase 2)

---

### 5. Dashboard Screen (Freelance)

**Header:**
```
┌─────────────────────────────────────┐
│ 👋 Bonjour, Kouassi                │
│ 🔔 (icône notifications, badge si new) │
└─────────────────────────────────────┘
```

**Section 1: Statistiques rapides**
```
┌────────┬────────┬────────┐
│ ⭐ 4.8 │ 📊 12  │ ✅ 25  │
│ Rating │ Avis   │ Missions│
└────────┴────────┴────────┘
```

**Section 2: Missions recommandées**
```
"Missions pour vous"              [Voir toutes >]

┌─────────────────────────────────────┐
│ 📱 Développement app mobile         │
│ 500 000 FCFA • Abidjan • Remote    │
│ React Native, TypeScript            │
│ 🔥 Boostée • 3 candidatures        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🎨 Design logo entreprise           │
│ 100 000 FCFA • Yamoussoukro        │
│ Illustrator, Photoshop              │
│ 1 candidature                       │
└─────────────────────────────────────┘
```

**Section 3: Mes candidatures**
```
"Mes candidatures"                [Voir toutes >]

┌─────────────────────────────────────┐
│ Site e-commerce                     │
│ ⏳ En attente • Il y a 2 jours     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Application de gestion              │
│ ✅ Acceptée • Il y a 5 jours        │
└─────────────────────────────────────┘
```

**Bottom Tab Navigation:**
```
┌────┬────┬────┬────┐
│ 🏠 │ 🔍 │ ❤️  │ 👤 │
│Home│Missions│Favoris│Profil│
└────┴────┴────┴────┘
```

---

### 6. Dashboard Screen (Client)

**Header:** Identique freelance

**Section 1: Statistiques rapides**
```
┌────────┬────────┬────────┐
│ 📋 5   │ ⏳ 2   │ ✅ 3   │
│Missions│En cours│Complétées│
└────────┴────────┴────────┘
```

**Section 2: Mes missions**
```
"Mes missions publiées"           [Voir toutes >]

┌─────────────────────────────────────┐
│ Développement app mobile            │
│ 500 000 FCFA • Ouvert              │
│ 🔔 8 candidatures                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Design logo entreprise              │
│ 100 000 FCFA • En cours            │
│ Freelance: Jean Kouassi             │
└─────────────────────────────────────┘
```

**FAB (Floating Action Button):**
- Bouton "+" orange en bas droite
- Tap → Create Mission Screen

---

### 7. Mission List Screen (Recherche)

**Header:**
```
┌─────────────────────────────────────┐
│ 🔍 [Rechercher missions...]        │
│ 🎛️ (icône filtres, badge si actifs)│
└─────────────────────────────────────┘
```

**Liste:**
```
┌─────────────────────────────────────┐
│ 📱 Développement app mobile         │
│ 500 000 FCFA • Abidjan • Remote    │
│ React Native, TypeScript            │
│ 🔥 Boostée • 3 candidatures        │
│ ❤️ (icône favoris)                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🎨 Design logo entreprise           │
│ 100 000 FCFA • Yamoussoukro        │
│ Illustrator, Photoshop              │
│ 1 candidature                       │
│ ❤️                                  │
└─────────────────────────────────────┘

[Load more...] (infinite scroll)
```

**Filtres Modal (Bottom Sheet):**
```
┌─────────────────────────────────────┐
│ Filtres                      [✕]   │
│                                     │
│ Catégorie                           │
│ [ Toutes ▼ ]                       │
│                                     │
│ Budget                              │
│ Min: 0 ————●—————— Max: 1M         │
│                                     │
│ Localisation                        │
│ [ Toutes ▼ ]                       │
│                                     │
│ ☑️ Missions à distance uniquement  │
│                                     │
│ [Réinitialiser]  [Appliquer]       │
└─────────────────────────────────────┘
```

---

### 8. Mission Detail Screen

**Header:**
```
┌─────────────────────────────────────┐
│ ← [Retour]              ❤️ [Favoris]│
└─────────────────────────────────────┘
```

**Content:**
```
┌─────────────────────────────────────┐
│ 🔥 MISSION BOOSTÉE                 │
│                                     │
│ Développement app mobile            │
│                                     │
│ 💰 500 000 FCFA (Budget fixe)      │
│ 📍 Abidjan, Côte d'Ivoire          │
│ 🌐 Travail à distance possible      │
│ ⏱️ Durée estimée: 2 mois            │
│                                     │
│ 📋 Description                      │
│ Nous recherchons un développeur     │
│ React Native expérimenté pour       │
│ créer une application mobile...     │
│ (texte complet)                     │
│                                     │
│ 💼 Compétences requises             │
│ [React Native] [TypeScript]         │
│ [Firebase] [REST API]               │
│                                     │
│ 👥 3 freelances ont postulé         │
│                                     │
│ 📅 Publié il y a 2 jours           │
└─────────────────────────────────────┘

[  POSTULER  ] (bouton primaire)
ou
[  MODIFIER  ] [  SUPPRIMER  ] (si client propriétaire)
```

---

### 9. Create Mission Screen

**Header:**
```
┌─────────────────────────────────────┐
│ ← [Annuler]  Nouvelle mission  [✕] │
└─────────────────────────────────────┘
```

**Stepper:**
```
●─────○─────○─────○
1     2     3     4
```

**Step 1: Informations de base**
```
┌─────────────────────────────────────┐
│ Titre de la mission *               │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Description *                       │
│                                     │
│ (textarea, min 100 caractères)      │
│                                     │
│                                     │
└─────────────────────────────────────┘

[  SUIVANT  ]
```

**Step 2: Catégorie & Compétences**
```
┌─────────────────────────────────────┐
│ Catégorie *                         │
│ [ Sélectionner ▼ ]                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Compétences requises                │
│ [ Ajouter compétence... ]           │
│                                     │
│ [React Native ✕] [TypeScript ✕]    │
└─────────────────────────────────────┘

[← RETOUR]  [  SUIVANT  ]
```

**Step 3: Budget & Durée**
```
┌─────────────────────────────────────┐
│ Type de budget *                    │
│ ○ Budget fixe                       │
│ ○ Tarif horaire                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Montant (FCFA) *                    │
│ 500 000                             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Durée estimée                       │
│ 2 mois                              │
└─────────────────────────────────────┘

[← RETOUR]  [  SUIVANT  ]
```

**Step 4: Localisation**
```
┌─────────────────────────────────────┐
│ Localisation                        │
│ [ Sélectionner ville ▼ ]           │
└─────────────────────────────────────┘

☑️ Travail à distance possible

[← RETOUR]  [  PREVIEW  ]
```

**Preview:**
```
┌─────────────────────────────────────┐
│ Aperçu de votre mission             │
│                                     │
│ (Affichage identique Mission Detail)│
│                                     │
└─────────────────────────────────────┘

[← MODIFIER]  [  PUBLIER  ]
```

---

### 10. Application Modal (Postuler)

**Modal:**
```
┌─────────────────────────────────────┐
│ Postuler à cette mission       [✕] │
│                                     │
│ Lettre de motivation *              │
│ ┌─────────────────────────────────┐│
│ │ Bonjour, je suis développeur    ││
│ │ React Native avec 3 ans...      ││
│ │                                 ││
│ │ (min 50 caractères)             ││
│ │                                 ││
│ └─────────────────────────────────┘│
│                                     │
│ Budget proposé (optionnel)          │
│ ┌─────────────────────────────────┐│
│ │ 480 000 FCFA                    ││
│ └─────────────────────────────────┘│
│                                     │
│ Durée proposée (optionnel)          │
│ ┌─────────────────────────────────┐│
│ │ 6 semaines                      ││
│ └─────────────────────────────────┘│
│                                     │
│ [ANNULER]     [  ENVOYER  ]        │
└─────────────────────────────────────┘
```

---

### 11. Profile Screen

**Header:**
```
┌─────────────────────────────────────┐
│              (Photo)                │
│                                     │
│          Jean Kouassi               │
│     Développeur React Native        │
│                                     │
│   ⭐ 4.8 (12 avis) • 25 missions   │
└─────────────────────────────────────┘
```

**Sections:**
```
📱 +225 07 12 34 56 78
📧 jean@example.com

📍 Localisation
   Abidjan, Côte d'Ivoire

📝 Bio
   Développeur web et mobile fullstack
   avec 3 ans d'expérience. Spécialisé
   en React Native et Node.js.

💼 Compétences
   [React Native] [TypeScript] [Node.js]
   [Firebase] [PostgreSQL] [Git]

📊 Statistiques
   • Taux de réponse: 95%
   • Missions complétées: 25
   • Note moyenne: 4.8/5

[  MODIFIER PROFIL  ]
[  DÉCONNEXION  ]
```

---

### 12. Edit Profile Screen

**Form:**
```
┌─────────────────────────────────────┐
│              (Photo)                │
│       [Changer photo]               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Nom complet                         │
│ Jean Kouassi                        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Email                               │
│ jean@example.com                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Bio                                 │
│ (textarea)                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Compétences                         │
│ [ Ajouter compétence... ]           │
│ [React Native ✕] [TypeScript ✕]    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Localisation                        │
│ [ Abidjan ▼ ]                      │
└─────────────────────────────────────┘

[ANNULER]  [  ENREGISTRER  ]
```

---

### 13. Favorites Screen

**Header:**
```
┌─────────────────────────────────────┐
│ ❤️ Mes favoris                      │
└─────────────────────────────────────┘
```

**Liste:**
```
┌─────────────────────────────────────┐
│ 📱 Développement app mobile         │
│ 500 000 FCFA • Abidjan • Remote    │
│ React Native, TypeScript            │
│ 3 candidatures                      │
│ ❤️ (filled, tap pour retirer)       │
└─────────────────────────────────────┘

(vide)
┌─────────────────────────────────────┐
│         (Icône coeur vide)          │
│    Aucune mission favorite          │
│                                     │
│ [  EXPLORER MISSIONS  ]             │
└─────────────────────────────────────┘
```

---

## ⚖️ Règles métier

### Missions

1. **Statuts mission:**
   - `open` : Mission publiée, accepte candidatures
   - `in_progress` : Mission attribuée, en cours de réalisation
   - `completed` : Mission terminée
   - `cancelled` : Mission annulée

2. **Boosting:**
   - Mission boostée = mise en avant payante (Phase 2)
   - Badge "🔥 Boostée" visible sur cards
   - Durée boost : configurable (défaut 7 jours)
   - Apparaît en haut de liste missions

3. **Filtres:**
   - Catégories : Développement, Design, Marketing, Rédaction, Vidéo, Autre
   - Budget : Slider min/max, pas de 10 000 FCFA
   - Localisation : Villes principales Côte d'Ivoire (Abidjan, Yamoussoukro, Bouaké, etc.)
   - Remote : Toggle oui/non

### Candidatures

1. **Statuts candidature:**
   - `pending` : En attente de réponse client
   - `accepted` : Acceptée par client
   - `rejected` : Refusée par client

2. **Règles:**
   - Un freelance peut postuler UNE SEULE fois à une mission
   - Le client peut accepter plusieurs candidatures (décision business à valider)
   - Lettre de motivation obligatoire (min 50 caractères)
   - Budget/durée proposés optionnels

3. **Notifications:**
   - Freelance : Notifié quand candidature acceptée/refusée
   - Client : Notifié quand nouvelle candidature reçue

### Favoris

1. **Règles:**
   - Un utilisateur peut ajouter/retirer mission des favoris
   - Favoris persister même si mission complétée/annulée
   - Icône coeur filled si favori, outline sinon

### Profil

1. **Rating:**
   - Calculé automatiquement à partir des avis (moyenne)
   - Affiché avec 1 décimale (ex: 4.8)
   - Minimum 1 avis pour afficher rating

2. **Statistiques:**
   - `completedMissions` : Incrémenté quand mission status = completed
   - `responseRate` : % de candidatures où freelance a répondu en < 24h (Phase 2)
   - `reviewCount` : Nombre total d'avis reçus

3. **Photo de profil:**
   - Format : JPG/PNG
   - Taille max : 5 MB
   - Dimensions recommandées : 400x400px
   - Stockage : Upload vers serveur (endpoint à créer Phase 2) ou base64 temporaire

---

## 📅 Priorités de développement

### Sprint 1 (Semaines 1-2): Foundation

**Objectifs:**
- [ ] Setup projet (Expo / Flutter)
- [ ] Architecture navigation
- [ ] Intégration API (interceptors, auth)
- [ ] Design system (composants réutilisables)
- [ ] Splash + Onboarding
- [ ] Login + Register

**Livrables:**
- App navigable avec authentification fonctionnelle

---

### Sprint 2 (Semaines 3-4): Missions Core

**Objectifs:**
- [ ] Liste missions (pagination, pull-to-refresh)
- [ ] Détails mission
- [ ] Filtres & recherche
- [ ] Favoris (add/remove)

**Livrables:**
- Utilisateur peut parcourir et chercher missions

---

### Sprint 3 (Semaines 5-6): User Flows

**Objectifs:**
- [ ] Dashboard Freelance
- [ ] Dashboard Client
- [ ] Créer mission (multi-step form)
- [ ] Postuler à mission
- [ ] Voir candidatures (client)

**Livrables:**
- Flux complet freelance + client fonctionnel

---

### Sprint 4 (Semaines 7-8): Profile & Polish

**Objectifs:**
- [ ] Profil utilisateur (view + edit)
- [ ] Upload photo profil
- [ ] Notifications (liste + badge)
- [ ] Tests end-to-end
- [ ] Bug fixes & polish
- [ ] Préparation soumission stores

**Livrables:**
- App MVP complète, testée, prête pour beta

---

### Post-MVP (Phase 2): Advanced Features

**Objectifs:**
- [ ] Avis & ratings
- [ ] Paiement Chariow
- [ ] Messagerie in-app
- [ ] Notifications push (Firebase Cloud Messaging)
- [ ] Contact WhatsApp
- [ ] Boosting missions payant
- [ ] Analytics & tracking

---

## ⚠️ Contraintes & Considérations

### Techniques

1. **Performance:**
   - Target 60 FPS
   - Temps chargement initial < 3s
   - Lazy load images
   - Cache données localement

2. **Sécurité:**
   - Tokens stockés en sécurisé (Keychain/EncryptedSharedPrefs)
   - HTTPS uniquement
   - Validation inputs côté client ET serveur
   - Rate limiting (5 tentatives login / 15 min)

3. **Offline:**
   - Gérer mode offline gracieusement
   - Messages clairs si pas de connexion
   - Retry automatique quand connexion restaurée

4. **Compatibilité:**
   - iOS 13+ (iPhone 6S et plus récents)
   - Android 8.0+ (API 26+)
   - Tester sur devices réels (pas seulement simulateurs)

### Business

1. **Monétisation (Phase 2):**
   - Commission sur transactions (10-15%)
   - Boosting missions payant
   - Abonnements Premium freelance (visibilité accrue)

2. **Modération:**
   - Signalement missions/utilisateurs (Phase 2)
   - Validation manuelle missions avant publication (optionnel)

3. **Support client:**
   - Email support (Phase 2)
   - FAQ in-app (Phase 2)
   - WhatsApp support (numéro dédié)

### Légal

1. **RGPD / Protection données:**
   - Consentement utilisateur pour données personnelles
   - Possibilité suppression compte
   - Politique de confidentialité (link in-app)

2. **CGU:**
   - Conditions générales d'utilisation
   - Acceptation obligatoire lors inscription

---

## 📞 Support & Communication

**Point de contact:**
- **Email:** dev@havjob.ci
- **Slack:** #havjob-mobile (si workspace existant)
- **Documentation API:** `API_DOCUMENTATION.md`
- **Réunions:** Standups hebdomadaires (à planifier)

**Assets:**
- Logo HavJob : (à fournir)
- Mockups/Wireframes : (optionnel, peut être créé par Rork)
- Icons : Feather Icons / Lucide

---

## ✅ Checklist Lancement

### Avant Beta (TestFlight / Beta fermée)

- [ ] Tests manuels complets (tous user flows)
- [ ] Tests automatisés (E2E avec Detox/Maestro)
- [ ] Performance profiling (Flipper / Xcode Instruments)
- [ ] Sécurité : Tokens, HTTPS, validation inputs
- [ ] Crashlytics intégré (Firebase Crashlytics)
- [ ] Analytics intégré (Firebase Analytics / Mixpanel)
- [ ] Privacy Policy + Terms of Service in-app
- [ ] App icons (iOS + Android, toutes tailles)
- [ ] Splash screen optimisé
- [ ] Screenshots stores (5-10 par plateforme)
- [ ] Description stores (FR + EN)

### Avant Production (App Store / Google Play)

- [ ] Beta testing (50+ utilisateurs, 2 semaines min)
- [ ] Correction bugs critiques identifiés en beta
- [ ] Optimisation performance basée sur métriques
- [ ] Review code complet
- [ ] Documentation technique mise à jour
- [ ] Plan rollback si problème post-launch
- [ ] Monitoring production setup (Sentry, Firebase)
- [ ] Support client prêt (email, WhatsApp)

---

## 🎉 Conclusion

Ce PRD définit la vision complète de l'application mobile HavJob. L'objectif est de livrer un MVP fonctionnel, performant et user-friendly en 8 semaines, puis d'itérer avec des fonctionnalités avancées basées sur les retours utilisateurs.

**Prochaines étapes:**
1. Review PRD avec stakeholders
2. Validation design mockups (si applicable)
3. Kick-off développement Sprint 1
4. Setup projet + architecture
5. Daily standups + weekly demos

**Bonne chance pour le développement! 🚀**
