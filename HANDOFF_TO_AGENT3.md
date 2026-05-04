# Handoff to Agent 3: API Routes & Database Logic

**From**: Agent 2 (Frontend & UI)
**To**: Agent 3 (API Routes & DB Logic)
**Date**: Mai 2026

---

## Status Overview

Agent 2 has completed:
- ✅ Complete frontend with 12 pages
- ✅ Design system (Tailwind + CSS Variables)
- ✅ All UI components (Header, Footer, Cards, Carousel, etc.)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ TypeScript types throughout
- ✅ Build: 0 errors

**Frontend is production-ready with mock data.**

---

## What Agent 3 Needs to Build

### 1. API Routes Structure

Create these endpoints in `app/api/`:

#### Services API
```typescript
// app/api/services/route.ts
GET /api/services
→ Returns: Service[] (from database)

// app/api/services/[slug]/route.ts
GET /api/services/[slug]
→ Returns: Service (single service detail)
```

#### Contact API
```typescript
// app/api/contact/route.ts
POST /api/contact
Body: { name, email, phone, subject, message }
→ Send email via Resend
→ Return: { success: true }
```

#### Google Reviews API
```typescript
// app/api/google-reviews/route.ts
GET /api/google-reviews
→ Fetch from Google Places API
→ Cache 24h
→ Return: Review[] (with rating, author, text, date, image)
```

#### Instagram Feed API
```typescript
// app/api/instagram-feed/route.ts
GET /api/instagram-feed
→ Fetch from Instagram Graph API
→ Cache 6h
→ Return: InstagramPost[] (image, url, caption)
```

#### Bookings API
```typescript
// app/api/bookings/route.ts
POST /api/bookings
Body: { acuityId, serviceId, date, time, clientInfo }
→ Create booking in DB
→ Return: Booking

// app/api/bookings/me/route.ts
GET /api/bookings/me
→ Auth required
→ Return: Booking[] (user's bookings)
```

#### Acuity Webhooks
```typescript
// app/api/webhooks/acuity/route.ts
POST /api/webhooks/acuity
→ Receive webhook from Acuity
→ Sync booking data to DB
```

#### NextAuth Routes
```typescript
// app/api/auth/[...nextauth]/route.ts
→ Handle login/logout/callback
→ Sessions management
```

---

## Database Schema (Prisma)

Create migrations for:

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  phone         String?
  passwordHash  String
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  bookings      Booking[]
  accounts      Account[]
}

model Service {
  id              String @id @default(cuid())
  slug            String @unique
  name            String
  price           Float
  duration        Int    // minutes
  category        String
  description     String
  detailedDesc    String?
  includes        String[] // JSON array
  image           String?
  acuityServiceId String?
  active          Boolean @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  bookings        Booking[]
}

model Booking {
  id          String @id @default(cuid())
  acuityId    String @unique
  userId      String @db.Cuid()
  serviceId   String @db.Cuid()
  date        DateTime
  time        String
  status      String // 'scheduled' | 'completed' | 'cancelled'
  clientName  String
  clientEmail String
  clientPhone String
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  service     Service @relation(fields: [serviceId], references: [id])
}

model Account {
  id                 String  @id @default(cuid())
  userId             String  @db.Cuid()
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  user               User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```

---

## Frontend Changes Needed

Once Agent 3 creates the API, Agent 2 components will be updated:

### 1. Replace Mock Data with API Calls

**Home page (`app/page.tsx`)**:
```typescript
// Before (mock data)
const mockServices = [...]

// After (API call)
const response = await fetch('/api/services');
const services = await response.json();
```

**Services page (`app/(public)/prestations/page.tsx`)**:
```typescript
// Fetch services from /api/services
const response = await fetch('/api/services');
const services = await response.json();
return <ServiceGrid services={services} />;
```

**Service detail (`app/(public)/prestations/[slug]/page.tsx`)**:
```typescript
// Fetch single service from /api/services/[slug]
const response = await fetch(`/api/services/${params.slug}`);
const service = await response.json();
return <ServiceDetail {...service} />;
```

### 2. ReviewCarousel Integration

Currently shows mock reviews. Will integrate:
```typescript
// app/page.tsx (Home)
const response = await fetch('/api/google-reviews');
const { reviews, averageRating, totalReviews } = await response.json();
return <ReviewCarousel reviews={reviews} averageRating={averageRating} totalReviews={totalReviews} />;
```

### 3. InstagramFeed Integration

Currently shows mock posts. Will integrate:
```typescript
// app/page.tsx & realisations/page.tsx
const response = await fetch('/api/instagram-feed');
const posts = await response.json();
return <InstagramFeed posts={posts} />;
```

### 4. Contact Form Integration

Form in `app/(public)/contact/page.tsx` needs:
```typescript
const handleSubmit = async (e) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  const result = await response.json();
  // Handle success/error
};
```

### 5. Authentication Integration

Pages requiring auth (`/mon-compte`, etc.) need NextAuth:
```typescript
import { getServerSession } from 'next-auth';

export default async function MonComptePage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/connexion');
  }

  // Fetch user bookings
  const bookings = await fetch(`/api/bookings/me`, {
    headers: { Authorization: `Bearer ${session.user.id}` },
  });

  return <Dashboard bookings={bookings} />;
}
```

---

## Environment Variables Needed

Create `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/expert_boucles"
DIRECT_URL="postgresql://..." # For migrations

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Acuity Scheduling
NEXT_PUBLIC_ACUITY_OWNER_ID="your-owner-id"
ACUITY_USER_ID="your-user-id"
ACUITY_API_KEY="your-api-key"

# Instagram API
INSTAGRAM_ACCESS_TOKEN="your-token"
INSTAGRAM_BUSINESS_ACCOUNT_ID="your-account-id"

# Google APIs
GOOGLE_PLACES_API_KEY="your-key"
GOOGLE_MAPS_API_KEY="your-key"

# Email (Resend)
RESEND_API_KEY="your-key"
ADMIN_EMAIL="contact@expert-boucles.com"

# Optional: Google OAuth
GOOGLE_CLIENT_ID="your-id"
GOOGLE_CLIENT_SECRET="your-secret"
```

---

## Caching Strategy

Recommended caching for frequently accessed data:

```typescript
// Google Reviews: 24h cache
export const revalidate = 86400; // seconds

// Instagram Feed: 6h cache
export const revalidate = 21600; // seconds

// Services: 1h cache (changes frequently)
export const revalidate = 3600; // seconds
```

---

## Input Validation

Use libraries like `zod` for validation:

```typescript
import { z } from 'zod';

const ServiceSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  duration: z.number().positive(),
});

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  message: z.string().min(10),
});
```

---

## Error Handling

Implement consistent error responses:

```typescript
// Success
{ success: true, data: {...} }

// Error
{ success: false, error: "Error message" }

// Validation errors
{ success: false, errors: { field: "message" } }
```

---

## Testing Checklist for Agent 3

- [ ] All 6 API routes working
- [ ] Database migrations applied
- [ ] Seed data (17 services) created
- [ ] Acuity webhook receiving data
- [ ] Google Reviews fetching
- [ ] Instagram Feed fetching
- [ ] Contact form sending emails
- [ ] NextAuth authentication working
- [ ] Protected routes requiring auth

---

## Integration Points (Agent 2 will update)

Once Agent 3 provides the APIs:

1. `app/page.tsx` - Fetch services, reviews, instagram posts
2. `app/(public)/prestations/page.tsx` - Fetch services
3. `app/(public)/prestations/[slug]/page.tsx` - Fetch single service
4. `app/(public)/contact/page.tsx` - Send contact form
5. `app/(auth)/mon-compte/page.tsx` - Fetch user bookings

---

## Documentation to Write

Agent 3 should document:
- [ ] API endpoint specifications (request/response)
- [ ] Database schema explanation
- [ ] How to add new services (admin)
- [ ] Webhook payload formats
- [ ] Cache invalidation strategy

---

## Notes for Success

1. **Start with Database**: Set up PostgreSQL + Prisma first
2. **Seed Data**: Add 17 services mock data to database
3. **API Routes**: Implement routes in order (services, contact, reviews)
4. **Testing**: Use Postman/curl to test each endpoint
5. **Error Handling**: Validate input, return proper error messages
6. **Performance**: Add caching for frequently accessed data
7. **Security**: Validate inputs, use HTTPS, protect sensitive endpoints

---

## Handoff Checklist

- [x] Frontend 100% complete
- [x] Design system complete
- [x] All pages with mock data
- [x] TypeScript types ready
- [x] Build: 0 errors
- [ ] API Routes (Agent 3)
- [ ] Database schema (Agent 3)
- [ ] Authentication (Agent 3)
- [ ] Integrations (Agent 4)
- [ ] Testing (Agent 5)
- [ ] Deployment (Agent 5)

---

## Good Luck Agent 3! 🚀

The frontend is ready. Build the API and database layer to bring Expert Boucles to life.

Contact info if questions:
- Codebase: `/c/Users/jujum/Documents/Expert_boucle/expert-boucles`
- Frontend docs: `GETTING_STARTED.md`
- Agent 2 notes: `AGENT2_DELIVERABLES.md`

---

**Agent 2 Signature**: ✨ Frontend & UI Components
**Date**: Mai 2026
