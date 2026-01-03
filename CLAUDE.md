# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SongZi is a full-stack TypeScript monorepo built with Better-T-Stack, featuring:
- **Runtime**: Bun
- **Monorepo**: Turborepo with workspace packages
- **Frontend**: React 19 with Waku (React Server Components framework)
- **Backend**: Elysia server with oRPC for type-safe APIs
- **Database**: PostgreSQL with Drizzle ORM (Neon serverless)
- **Auth**: Better-Auth with email/password
- **Styling**: TailwindCSS v4
- **Code Quality**: Biome for linting and formatting (tabs, double quotes)

## Development Commands

```bash
# Install dependencies
bun install

# Development
bun run dev                  # Start all apps (web + server)
bun run dev:web              # Start only web app (port 3000)
bun run dev:server           # Start only server (port 8000)

# Build & Type Checking
bun run build                # Build all apps
bun run check-types          # Type check all packages

# Database
bun run db:push              # Push schema changes to database
bun run db:studio            # Open Drizzle Studio UI
bun run db:generate          # Generate migration files
bun run db:migrate           # Run migrations

# Code Quality
bun run check                # Run Biome linting and formatting (auto-fix)
```

## Architecture

### Monorepo Structure

```
apps/
├── web/          # Frontend (React + Waku RSC)
└── server/       # Backend API (Elysia + oRPC handlers)

packages/
├── api/          # oRPC router definitions & business logic
├── auth/         # Better-Auth configuration
├── db/           # Drizzle ORM schemas & database client
├── env/          # Environment variable validation (t3-env)
└── config/       # Shared TypeScript configs
```

### Type-Safe API Flow (oRPC)

The project uses **contract-first API design** with oRPC:

1. **Contract Definition** (`packages/api/src/contracts/app.ts`):
   - Define input/output schemas using Zod
   - Specify HTTP routes, methods, and error types
   - No implementation logic here

2. **Router Implementation** (`packages/api/src/routers/app.ts`):
   - Implement handlers using the contract via `implement(appContract)`
   - Access typed context (session, etc.) via `createContext`
   - Use middleware like `requireAuth` for protected routes

3. **Server Integration** (`apps/server/src/index.ts`):
   - Two handlers: `RPCHandler` (RPC calls at `/rpc`) and `OpenAPIHandler` (OpenAPI docs at `/api-reference`)
   - Auth routes handled separately at `/api/auth/*` by Better-Auth

4. **Client Usage** (`apps/web/src/utils/orpc.ts`):
   - Create typed client with `createORPCClient(link)`
   - Use `createTanstackQueryUtils` for React Query integration
   - Client automatically infers types from `AppRouterClient`

### Authentication Flow

- **Better-Auth** (`packages/auth/src/index.ts`):
  - Email/password authentication enabled
  - Uses Drizzle adapter with PostgreSQL
  - Cookie-based sessions (SameSite=none, secure, httpOnly)
  - Trusted origin from `CORS_ORIGIN` env var

- **Context Creation** (`packages/api/src/context.ts`):
  - Extracts session from request headers via `auth.api.getSession`
  - Injected into all oRPC procedures

- **Middleware** (`packages/api/src/routers/router-tools.ts`):
  - `requireAuth` middleware validates session and throws `UNAUTHORIZED` error if missing
  - Use `authed` implementer for protected routes

### Database Architecture

- **ORM**: Drizzle with Neon HTTP driver (WebSocket support via `ws` package)
- **Schemas**: Located in `packages/db/src/schema/`
  - `schema/auth.ts`: Better-Auth tables (users, sessions, etc.)
  - `schema/index.ts`: Application-specific tables (export all schemas here)
- **Configuration**: `packages/db/drizzle.config.ts` reads `.env` from `apps/server/.env`
- **Client**: Singleton `db` instance exported from `packages/db/src/index.ts`

### Environment Variables

- **Validation**: Uses `@t3-oss/env-core` in `packages/env/src/server.ts`
- **Required Variables** (set in `apps/server/.env`):
  - `DATABASE_URL`: PostgreSQL connection string
  - `BETTER_AUTH_SECRET`: Min 32 chars for session signing
  - `BETTER_AUTH_URL`: Backend URL (e.g., http://localhost:8000)
  - `CORS_ORIGIN`: Frontend URL (e.g., http://localhost:3000)

### Frontend (Waku)

- **Framework**: React 19 with Server Components via Waku
- **Entry**: `apps/web/src/pages/` (file-based routing)
- **Generated**: `pages.gen.ts` is auto-generated (excluded from Biome)
- **Client Setup**: oRPC client in `utils/orpc.ts` with TanStack Query integration
- **Env Vars**: `WAKU_PUBLIC_SERVER_URL` for API endpoint (fallback: http://localhost:8000)

## Adding New Features

### 1. Add New API Endpoint

```typescript
// 1. Define schemas in packages/api/src/schemas/
export const myInputSchema = oz.object({ name: z.string() });
export const myOutputSchema = oz.object({ result: z.string() });

// 2. Add contract in packages/api/src/contracts/app.ts
export const appContract = {
  // ...existing,
  myEndpoint: oc
    .input(myInputSchema)
    .output(myOutputSchema)
    .errors(commonErrors)
};

// 3. Implement in packages/api/src/routers/app.ts
export const appRouter = {
  // ...existing,
  myEndpoint: i.myEndpoint.handler(({ input, context }) => {
    // Implementation
    return { result: `Hello ${input.name}` };
  })
};

// 4. Use in frontend (auto-typed!)
const { data } = orpc.myEndpoint.useQuery({ input: { name: 'World' } });
```

### 2. Add Database Table

```typescript
// 1. Define schema in packages/db/src/schema/index.ts
export const myTable = pgTable('my_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// 2. Push schema to database
bun run db:push

// 3. Use in API handlers
import { db } from '@songzi/db';
const rows = await db.query.myTable.findMany();
```

### 3. Add Protected Route

```typescript
// In packages/api/src/routers/app.ts
const authed = i.use(requireAuth); // Gets typed session context

export const appRouter = {
  protectedEndpoint: authed.protectedEndpoint.handler(({ context }) => {
    // context.session.user is guaranteed to exist
    return { userId: context.session.user.id };
  })
};
```

## Code Style

- **Formatter**: Biome with tabs (indentStyle: "tab"), double quotes
- **Import Sorting**: Auto-organize imports enabled
- **Linting**: Biome recommended rules + custom style rules (see `biome.json`)
- Run `bun run check` before committing to auto-fix issues

## Important Notes

- **Package Manager**: Must use Bun (specified in `package.json`)
- **Workspace Protocol**: Use `workspace:*` for internal package dependencies
- **Catalog Dependencies**: Shared versions defined in root `package.json` catalog
- **Generated Files**: Exclude from version control and Biome: `pages.gen.ts`, `.turbo/`, `dist/`
- **Ports**: Web runs on 3000, Server on 8000 (configured in respective apps)
