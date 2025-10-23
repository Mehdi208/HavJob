# HavJob API Documentation

Documentation complète de l'API REST pour l'application mobile HavJob.

## Base URL

```
Production: https://your-domain.replit.app/api
Development: http://localhost:5000/api
```

## Authentification

L'API HavJob supporte deux méthodes d'authentification :

### 1. Session-based Auth (Web)
- Utilisée par l'application web
- Basée sur cookies de session
- Supporte OAuth (Replit Auth) et phone/password

### 2. JWT Auth (Mobile)
- Utilisée par les applications mobiles iOS/Android
- Basée sur tokens JWT (JSON Web Tokens)
- Supporte uniquement phone/password

**Note:** Ce document se concentre sur l'authentification JWT pour mobile.

## Types de Tokens JWT

### Access Token
- **Durée de vie:** 1 heure
- **Usage:** Accéder aux routes protégées de l'API
- **Format:** Bearer token dans le header Authorization
- **Type:** `access`

### Refresh Token
- **Durée de vie:** 7 jours
- **Usage:** Obtenir un nouveau access token
- **Type:** `refresh`
- **Important:** Ne peut PAS être utilisé pour accéder aux routes protégées

## Flow d'authentification

```
1. Inscription/Connexion → Reçoit access + refresh tokens
2. Utiliser access token pour accéder aux routes protégées (1h)
3. Quand access token expire → Utiliser refresh token pour obtenir nouveau access token
4. Quand refresh token expire (7j) → Utilisateur doit se reconnecter
```

---

## Endpoints d'authentification mobile

### POST /mobile/register

Inscription d'un nouvel utilisateur avec téléphone et mot de passe.

**Request Body:**
```json
{
  "phoneNumber": "+225 07 12 34 56 78",
  "password": "motdepasse123",
  "fullName": "Jean Kouassi",
  "email": "jean@example.com",
  "role": "freelance"
}
```

**Request Fields:**
| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| phoneNumber | string | ✅ | Numéro de téléphone (min. 8 chiffres) |
| password | string | ✅ | Mot de passe (min. 6 caractères) |
| fullName | string | ✅ | Nom complet de l'utilisateur |
| email | string | ❌ | Email (optionnel pour utilisateurs ivoiriens) |
| role | enum | ✅ | "freelance", "client", ou "both" |

**Success Response (201):**
```json
{
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "phoneNumber": "+225 07 12 34 56 78",
    "fullName": "Jean Kouassi",
    "email": "jean@example.com",
    "role": "freelance",
    "authMethod": "phone",
    "rating": 0,
    "reviewCount": 0,
    "completedMissions": 0,
    "responseRate": 100,
    "isBoosted": false,
    "createdAt": "2025-10-23T20:00:00.000Z",
    "updatedAt": "2025-10-23T20:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

400 - Données invalides:
```json
{
  "message": "Données invalides",
  "errors": [...]
}
```

400 - Téléphone déjà utilisé:
```json
{
  "message": "Ce numéro de téléphone est déjà utilisé"
}
```

---

### POST /mobile/login

Connexion d'un utilisateur existant.

**Request Body:**
```json
{
  "phoneNumber": "+225 07 12 34 56 78",
  "password": "motdepasse123"
}
```

**Success Response (200):**
```json
{
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "phoneNumber": "+225 07 12 34 56 78",
    "fullName": "Jean Kouassi",
    "email": "jean@example.com",
    "role": "freelance",
    ...
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

401 - Identifiants incorrects:
```json
{
  "message": "Numéro de téléphone ou mot de passe incorrect"
}
```

---

### POST /mobile/refresh

Rafraîchit l'access token en utilisant le refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

400 - Refresh token manquant:
```json
{
  "message": "Refresh token manquant"
}
```

401 - Refresh token invalide:
```json
{
  "message": "Refresh token invalide ou expiré"
}
```

**Important:** Seuls les refresh tokens sont acceptés. Les access tokens seront rejetés.

---

### GET /mobile/user

Récupère les informations de l'utilisateur authentifié.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "phoneNumber": "+225 07 12 34 56 78",
  "fullName": "Jean Kouassi",
  "email": "jean@example.com",
  "role": "freelance",
  "bio": "Développeur web fullstack",
  "skills": ["React", "Node.js", "TypeScript"],
  "location": "Abidjan",
  "rating": 4.5,
  "reviewCount": 12,
  "completedMissions": 25,
  "responseRate": 95,
  "isBoosted": false,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-10-23T20:00:00.000Z"
}
```

**Error Responses:**

401 - Token manquant ou invalide:
```json
{
  "message": "Token invalide ou expiré"
}
```

404 - Utilisateur non trouvé:
```json
{
  "message": "Utilisateur non trouvé"
}
```

---

## Endpoints Missions

### GET /missions

Récupère la liste des missions avec filtres optionnels.

**Query Parameters:**
| Paramètre | Type | Description |
|-----------|------|-------------|
| category | string | Filtrer par catégorie |
| minBudget | number | Budget minimum |
| maxBudget | number | Budget maximum |
| location | string | Localisation de la mission |
| isRemote | boolean | Missions à distance uniquement |
| isBoosted | boolean | Missions boostées uniquement |
| status | string | Statut: "open", "in_progress", "completed", "cancelled" |
| search | string | Recherche dans titre et description |

**Example Request:**
```
GET /missions?category=développement&isRemote=true&minBudget=50000
```

**Success Response (200):**
```json
[
  {
    "id": "mission-uuid-1",
    "clientId": "user-uuid-1",
    "title": "Développement d'une application mobile",
    "description": "Nous recherchons un développeur React Native...",
    "category": "développement",
    "budget": 500000,
    "budgetType": "fixed",
    "location": "Abidjan",
    "isRemote": true,
    "duration": "2 mois",
    "skillsRequired": ["React Native", "TypeScript", "Firebase"],
    "status": "open",
    "applicantsCount": 5,
    "isBoosted": true,
    "boostExpiresAt": "2025-11-01T00:00:00.000Z",
    "createdAt": "2025-10-20T10:00:00.000Z",
    "updatedAt": "2025-10-23T15:30:00.000Z"
  },
  ...
]
```

---

### GET /missions/:id

Récupère les détails d'une mission spécifique.

**Success Response (200):**
```json
{
  "id": "mission-uuid-1",
  "clientId": "user-uuid-1",
  "title": "Développement d'une application mobile",
  "description": "Description complète de la mission...",
  "category": "développement",
  "budget": 500000,
  "budgetType": "fixed",
  "location": "Abidjan",
  "isRemote": true,
  "duration": "2 mois",
  "skillsRequired": ["React Native", "TypeScript", "Firebase"],
  "status": "open",
  "applicantsCount": 5,
  "isBoosted": true,
  "boostExpiresAt": "2025-11-01T00:00:00.000Z",
  "createdAt": "2025-10-20T10:00:00.000Z",
  "updatedAt": "2025-10-23T15:30:00.000Z"
}
```

---

### POST /missions

Crée une nouvelle mission (requiert authentification).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "title": "Développement d'une application mobile",
  "description": "Nous recherchons un développeur React Native expérimenté...",
  "category": "développement",
  "budget": 500000,
  "budgetType": "fixed",
  "location": "Abidjan",
  "isRemote": true,
  "duration": "2 mois",
  "skillsRequired": ["React Native", "TypeScript", "Firebase"]
}
```

**Success Response (201):**
```json
{
  "id": "mission-uuid-1",
  "clientId": "user-uuid-1",
  "title": "Développement d'une application mobile",
  ...
}
```

---

### PUT /missions/:id

Met à jour une mission existante (requiert authentification + être le créateur).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "title": "Développement d'une application mobile (URGENT)",
  "budget": 600000,
  "status": "in_progress"
}
```

**Success Response (200):**
```json
{
  "id": "mission-uuid-1",
  "title": "Développement d'une application mobile (URGENT)",
  "budget": 600000,
  ...
}
```

---

### DELETE /missions/:id

Supprime une mission (requiert authentification + être le créateur).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "message": "Mission supprimée avec succès"
}
```

---

## Endpoints Applications

### GET /missions/:missionId/applications

Récupère les candidatures pour une mission (requiert authentification + être le créateur de la mission).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
[
  {
    "id": "application-uuid-1",
    "missionId": "mission-uuid-1",
    "freelancerId": "user-uuid-2",
    "coverLetter": "Bonjour, je suis intéressé par cette mission...",
    "proposedBudget": 480000,
    "proposedDuration": "6 semaines",
    "status": "pending",
    "createdAt": "2025-10-21T10:00:00.000Z"
  },
  ...
]
```

---

### POST /missions/:missionId/applications

Postuler à une mission (requiert authentification).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "coverLetter": "Bonjour, je suis développeur React Native avec 3 ans d'expérience...",
  "proposedBudget": 480000,
  "proposedDuration": "6 semaines"
}
```

**Success Response (201):**
```json
{
  "id": "application-uuid-1",
  "missionId": "mission-uuid-1",
  "freelancerId": "user-uuid-2",
  "coverLetter": "Bonjour, je suis développeur...",
  "proposedBudget": 480000,
  "proposedDuration": "6 semaines",
  "status": "pending",
  "createdAt": "2025-10-21T10:00:00.000Z"
}
```

---

### PUT /missions/:missionId/applications/:applicationId

Met à jour le statut d'une candidature (requiert authentification + être le créateur de la mission).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "status": "accepted"
}
```

**Success Response (200):**
```json
{
  "id": "application-uuid-1",
  "status": "accepted",
  ...
}
```

---

## Endpoints Favoris

### GET /favorites

Récupère les missions favorites de l'utilisateur (requiert authentification).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
[
  {
    "id": "favorite-uuid-1",
    "userId": "user-uuid-1",
    "missionId": "mission-uuid-1",
    "createdAt": "2025-10-22T14:00:00.000Z"
  },
  ...
]
```

---

### POST /favorites/:missionId

Ajoute une mission aux favoris (requiert authentification).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (201):**
```json
{
  "id": "favorite-uuid-1",
  "userId": "user-uuid-1",
  "missionId": "mission-uuid-1",
  "createdAt": "2025-10-22T14:00:00.000Z"
}
```

---

### DELETE /favorites/:missionId

Retire une mission des favoris (requiert authentification).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "message": "Favori supprimé avec succès"
}
```

---

## Endpoints Reviews

### GET /reviews/user/:userId

Récupère les avis d'un utilisateur.

**Success Response (200):**
```json
[
  {
    "id": "review-uuid-1",
    "reviewerId": "user-uuid-1",
    "reviewedUserId": "user-uuid-2",
    "missionId": "mission-uuid-1",
    "rating": 5,
    "comment": "Excellent travail, très professionnel!",
    "createdAt": "2025-10-15T10:00:00.000Z"
  },
  ...
]
```

---

### POST /reviews

Créer un avis (requiert authentification).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "reviewedUserId": "user-uuid-2",
  "missionId": "mission-uuid-1",
  "rating": 5,
  "comment": "Excellent travail, très professionnel!"
}
```

**Success Response (201):**
```json
{
  "id": "review-uuid-1",
  "reviewerId": "user-uuid-1",
  "reviewedUserId": "user-uuid-2",
  "missionId": "mission-uuid-1",
  "rating": 5,
  "comment": "Excellent travail, très professionnel!",
  "createdAt": "2025-10-15T10:00:00.000Z"
}
```

---

## Codes d'erreur HTTP

| Code | Signification |
|------|---------------|
| 200 | Requête réussie |
| 201 | Ressource créée avec succès |
| 400 | Requête invalide (données manquantes ou incorrectes) |
| 401 | Non authentifié (token manquant ou invalide) |
| 403 | Non autorisé (permissions insuffisantes) |
| 404 | Ressource non trouvée |
| 409 | Conflit (ex: téléphone déjà utilisé) |
| 500 | Erreur serveur interne |

---

## Best Practices

### Gestion des Tokens
1. **Stocker les tokens de manière sécurisée** dans le Keychain (iOS) ou EncryptedSharedPreferences (Android)
2. **Inclure l'access token** dans le header Authorization de chaque requête protégée
3. **Gérer l'expiration** : Quand une requête retourne 401, utiliser le refresh token
4. **Refresh proactif** : Rafraîchir l'access token avant son expiration (ex: à 50 minutes)

### Gestion des Erreurs
```javascript
async function makeAuthenticatedRequest(endpoint, method, body) {
  let response = await fetch(endpoint, {
    method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (response.status === 401) {
    // Token expiré, rafraîchir
    const refreshResponse = await fetch('/api/mobile/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (refreshResponse.ok) {
      const { accessToken: newToken } = await refreshResponse.json();
      // Sauvegarder le nouveau token
      accessToken = newToken;
      
      // Réessayer la requête originale
      response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
      });
    } else {
      // Refresh token expiré, rediriger vers login
      redirectToLogin();
    }
  }

  return response;
}
```

### Rate Limiting
- Respecter les limites de taux (à implémenter)
- Implémenter un retry avec exponential backoff pour les erreurs 429

### Timeout
- Définir un timeout approprié (ex: 30 secondes)
- Gérer les erreurs de timeout avec des messages clairs à l'utilisateur

---

## Exemple d'implémentation mobile

### Swift (iOS)

```swift
import Foundation

class HavJobAPI {
    static let baseURL = "https://your-domain.replit.app/api"
    
    private var accessToken: String?
    private var refreshToken: String?
    
    func register(phoneNumber: String, password: String, fullName: String, role: String) async throws -> User {
        let body: [String: Any] = [
            "phoneNumber": phoneNumber,
            "password": password,
            "fullName": fullName,
            "role": role
        ]
        
        let response = try await makeRequest(
            endpoint: "/mobile/register",
            method: "POST",
            body: body,
            requiresAuth: false
        )
        
        if let data = response["user"] as? [String: Any],
           let accessToken = response["accessToken"] as? String,
           let refreshToken = response["refreshToken"] as? String {
            
            self.accessToken = accessToken
            self.refreshToken = refreshToken
            
            // Save tokens securely
            saveTokens(access: accessToken, refresh: refreshToken)
            
            return try parseUser(from: data)
        }
        
        throw APIError.invalidResponse
    }
    
    func getMissions(filters: [String: Any]? = nil) async throws -> [Mission] {
        var endpoint = "/missions"
        
        if let filters = filters {
            let queryString = filters.map { "\($0.key)=\($0.value)" }.joined(separator: "&")
            endpoint += "?\(queryString)"
        }
        
        let response = try await makeRequest(endpoint: endpoint, method: "GET")
        
        guard let missions = response as? [[String: Any]] else {
            throw APIError.invalidResponse
        }
        
        return try missions.map { try parseMission(from: $0) }
    }
    
    private func makeRequest(
        endpoint: String,
        method: String,
        body: [String: Any]? = nil,
        requiresAuth: Bool = true
    ) async throws -> Any {
        var request = URLRequest(url: URL(string: HavJobAPI.baseURL + endpoint)!)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        if requiresAuth, let token = accessToken {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        
        if let body = body {
            request.httpBody = try JSONSerialization.data(withJSONObject: body)
        }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }
        
        if httpResponse.statusCode == 401 && requiresAuth {
            // Token expired, try to refresh
            try await refreshAccessToken()
            
            // Retry the original request
            return try await makeRequest(endpoint: endpoint, method: method, body: body, requiresAuth: requiresAuth)
        }
        
        guard (200...299).contains(httpResponse.statusCode) else {
            throw APIError.httpError(statusCode: httpResponse.statusCode)
        }
        
        return try JSONSerialization.jsonObject(with: data)
    }
    
    private func refreshAccessToken() async throws {
        guard let refreshToken = refreshToken else {
            throw APIError.noRefreshToken
        }
        
        let body = ["refreshToken": refreshToken]
        let response = try await makeRequest(
            endpoint: "/mobile/refresh",
            method: "POST",
            body: body,
            requiresAuth: false
        )
        
        guard let dict = response as? [String: Any],
              let newAccessToken = dict["accessToken"] as? String else {
            throw APIError.refreshFailed
        }
        
        self.accessToken = newAccessToken
        saveTokens(access: newAccessToken, refresh: refreshToken)
    }
    
    private func saveTokens(access: String, refresh: String) {
        // Save to Keychain
        let keychain = KeychainSwift()
        keychain.set(access, forKey: "accessToken")
        keychain.set(refresh, forKey: "refreshToken")
    }
}

enum APIError: Error {
    case invalidResponse
    case httpError(statusCode: Int)
    case noRefreshToken
    case refreshFailed
}
```

### Kotlin (Android)

```kotlin
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject

class HavJobAPI(private val context: Context) {
    private val baseURL = "https://your-domain.replit.app/api"
    private val client = OkHttpClient()
    private val jsonMediaType = "application/json".toMediaType()
    
    private var accessToken: String? = null
    private var refreshToken: String? = null
    
    suspend fun register(
        phoneNumber: String,
        password: String,
        fullName: String,
        role: String
    ): User = withContext(Dispatchers.IO) {
        val json = JSONObject().apply {
            put("phoneNumber", phoneNumber)
            put("password", password)
            put("fullName", fullName)
            put("role", role)
        }
        
        val response = makeRequest(
            endpoint = "/mobile/register",
            method = "POST",
            body = json,
            requiresAuth = false
        )
        
        accessToken = response.getString("accessToken")
        refreshToken = response.getString("refreshToken")
        
        saveTokens(accessToken!!, refreshToken!!)
        
        parseUser(response.getJSONObject("user"))
    }
    
    suspend fun getMissions(filters: Map<String, String>? = null): List<Mission> = 
        withContext(Dispatchers.IO) {
            var endpoint = "/missions"
            
            filters?.let {
                val queryString = it.entries.joinToString("&") { "${it.key}=${it.value}" }
                endpoint += "?$queryString"
            }
            
            val response = makeRequest(endpoint = endpoint, method = "GET")
            val missions = mutableListOf<Mission>()
            
            val array = response.getJSONArray("missions")
            for (i in 0 until array.length()) {
                missions.add(parseMission(array.getJSONObject(i)))
            }
            
            missions
        }
    
    private suspend fun makeRequest(
        endpoint: String,
        method: String,
        body: JSONObject? = null,
        requiresAuth: Boolean = true
    ): JSONObject = withContext(Dispatchers.IO) {
        val requestBuilder = Request.Builder()
            .url(baseURL + endpoint)
            .method(method, body?.toString()?.toRequestBody(jsonMediaType))
        
        if (requiresAuth && accessToken != null) {
            requestBuilder.addHeader("Authorization", "Bearer $accessToken")
        }
        
        val response = client.newCall(requestBuilder.build()).execute()
        
        if (response.code == 401 && requiresAuth) {
            refreshAccessToken()
            return@withContext makeRequest(endpoint, method, body, requiresAuth)
        }
        
        if (!response.isSuccessful) {
            throw IOException("HTTP error: ${response.code}")
        }
        
        JSONObject(response.body?.string() ?: "{}")
    }
    
    private suspend fun refreshAccessToken() = withContext(Dispatchers.IO) {
        val json = JSONObject().apply {
            put("refreshToken", refreshToken)
        }
        
        val response = makeRequest(
            endpoint = "/mobile/refresh",
            method = "POST",
            body = json,
            requiresAuth = false
        )
        
        accessToken = response.getString("accessToken")
        saveTokens(accessToken!!, refreshToken!!)
    }
    
    private fun saveTokens(access: String, refresh: String) {
        val prefs = EncryptedSharedPreferences.create(
            "secure_prefs",
            MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC),
            context,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
        
        prefs.edit()
            .putString("accessToken", access)
            .putString("refreshToken", refresh)
            .apply()
    }
}
```

---

## Support

Pour toute question ou problème concernant l'API :
- Email: support@havjob.ci
- Documentation: https://docs.havjob.ci
- Issues GitHub: https://github.com/havjob/mobile/issues
