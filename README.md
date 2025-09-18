# CodFleet API (Next.js App Router, TypeScript)

A secure backend API for the CodFleet App (European Region) freelancer marketplace. Implements authentication with email verification, RBAC, rate limiting, password policy, and core domain endpoints.

## Quick Start

- Node.js 18+
- MongoDB Atlas URI
- SMTP credentials (App Password)

Create `.env.local` in `codfleet-api/`:

```
MONGODB_URI=mongodb+srv://admin:admin@cluster0.iczxp.mongodb.net/codfleet
JWT_SECRET=please_change_me
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=you@example.com
SMTP_PASS=your_app_password
```

Install and run:

```
npm install
npm run dev
```

By default runs on http://localhost:3000, but if the port is busy it may choose the next available port (see console output, e.g., http://localhost:3001).

## Security & Standards

- JWT auth (HS256) with expiration
- Passwords hashed with bcrypt
- Zod validation on all inputs
- Email verification with expiring token
- RBAC: least privilege, enforced on routes
- Per-IP rate limiting for sensitive endpoints
- Mongoose schema constraints and indexes

## Roles

- freelancer
- company_org_admin
- company_hiring_manager
- company_finance
- admin
- compliance_officer
- support_agent
- field_master
- government_viewer

## Implemented Endpoints (Phase 1)

Base URL: `http://localhost:3000` (or selected port)

Auth header for protected routes: `Authorization: Bearer <JWT>`

### Health
- GET `/api/health` → Service status

### Auth
- POST `/api/v1/auth/register` → Register user, default role `freelancer`, email verification token sent. In dev, response includes `devEmailVerificationToken`.
- GET `/api/v1/auth/verify?token=...` → Verify email.
- POST `/api/v1/auth/login` → Login and receive JWT. Requires verified email.
- POST `/api/v1/auth/resend-verification` → Resend verification email.

Notes:
- Register ignores any role escalation. Only admins can modify roles via dedicated admin route.
- Rate-limited and validated.

### Users
- GET `/api/v1/users/me` → Get current user profile (excludes sensitive fields)
- PUT `/api/v1/users/me` → Update profile fields (name, bio, skills, experience, location, availability, social links)

### Companies (Admin-only for create/list/delete; company admins can read/update their company)
- GET `/api/v1/companies?page=&limit=` → List active companies (admin)
- POST `/api/v1/companies` → Create company (admin)
- GET `/api/v1/companies/:id` → Fetch company (admin or members of that company)
- PUT `/api/v1/companies/:id` → Update company (admin or `company_org_admin` of that company)
- DELETE `/api/v1/companies/:id` → Soft-delete (admin)

### Tasks
- GET `/api/v1/tasks` → List with filters: category, skills, minBudget, maxBudget, experience, locationType, search
- POST `/api/v1/tasks` → Create task (admin, `company_org_admin`, `company_hiring_manager`) within accessible company; includes coverage windows
- GET `/api/v1/tasks/:id` → Get task if creator/assignee/admin/company member
- PUT `/api/v1/tasks/:id` → Update task; handles status transitions and timestamps
- DELETE `/api/v1/tasks/:id` → Soft-delete (admin, creator, or company admin)

## How to Test (PowerShell examples)

Replace `BASE` with your printed server URL (e.g., http://localhost:3001).

```powershell
# Register
$body = @{ email = "test@example.com"; password = "TestPassword123!" } | ConvertTo-Json
Invoke-WebRequest -Uri "$($env:BASE)/api/v1/auth/register" -Method POST -Body $body -ContentType "application/json"

# Verify
Invoke-WebRequest -Uri "$($env:BASE)/api/v1/auth/verify?token=TOKEN" -Method GET

# Login
$body = @{ email = "test@example.com"; password = "TestPassword123!" } | ConvertTo-Json
$login = Invoke-WebRequest -Uri "$($env:BASE)/api/v1/auth/login" -Method POST -Body $body -ContentType "application/json"
$jwt = (ConvertFrom-Json $login.Content).token
$headers = @{ Authorization = "Bearer $jwt" }

# Users/me get + update
Invoke-WebRequest -Uri "$($env:BASE)/api/v1/users/me" -Headers $headers -Method GET
$body = @{ firstName = "Test"; lastName = "User"; bio = "Hello"; skills = @("nextjs"); experience = "intermediate" } | ConvertTo-Json
Invoke-WebRequest -Uri "$($env:BASE)/api/v1/users/me" -Headers $headers -Method PUT -Body $body -ContentType "application/json"

# Companies (admin JWT needed)
# $adminHeaders = @{ Authorization = "Bearer ADMIN_JWT" }
# Invoke-WebRequest -Uri "$($env:BASE)/api/v1/companies" -Headers $adminHeaders -Method GET

# Tasks list
Invoke-WebRequest -Uri "$($env:BASE)/api/v1/tasks?category=IT&search=next" -Headers $headers -Method GET
```

## Project Structure (key)

```
src/
  app/
    api/
      health/route.ts
      v1/
        auth/
          register/route.ts
          login/route.ts
          verify/route.ts
          resend-verification/route.ts
        users/me/route.ts
        companies/route.ts
        companies/[id]/route.ts
        tasks/route.ts
        tasks/[id]/route.ts
  lib/
    db.ts
    auth.ts
    mailer.ts
    rbac.ts
    password.ts
    rate-limit.ts
  middleware.ts
models/
  User.ts
  Company.ts
  Task.ts
```

## Phases and Future APIs

Below is the planned roadmap with concrete API surfaces per phase. Endpoints are versioned under `/api/v1`.

### Phase 2: Companies Memberships, Role Management, and Profiles

- Company Memberships
  - POST `/companies/:id/members` → Invite/add user to company (admin/org_admin)
  - GET `/companies/:id/members` → List members (admin/org_admin)
  - DELETE `/companies/:id/members/:userId` → Remove member (admin/org_admin)
- Role Management
  - GET `/admin/users/:id/roles` → View roles (admin)
  - PUT `/admin/users/:id/roles` → Update roles (admin) [exists: ensure documented usage]
- Extended User Profiles
  - GET `/users/:id` → Public freelancer profile (limited fields)
  - GET `/users/me/compliance` → View own compliance flags
  - PUT `/users/me/compliance` → Update own compliance metadata (non-privileged fields)

### Phase 3: Hiring Workflow (Proposals, Contracts, Milestones)

- Proposals
  - POST `/tasks/:id/proposals` → Submit proposal (freelancer)
  - GET `/tasks/:id/proposals` → List proposals (task owner/company roles)
  - PUT `/proposals/:id` → Update proposal (owner freelancer)
- Awards & Contracts
  - POST `/proposals/:id/award` → Award proposal (company roles)
  - POST `/contracts` → Create contract from awarded proposal
  - GET `/contracts/:id` → Get contract
  - PUT `/contracts/:id` → Update status/terms (authorized parties)
- Milestones & Time
  - POST `/contracts/:id/milestones` → Create milestone(s)
  - PUT `/milestones/:id` → Update milestone (complete/approve)
  - POST `/contracts/:id/time-entries` → Log time
  - GET `/contracts/:id/time-entries` → List time entries

### Phase 4: Payments, Escrow, and Invoicing (EU-compliant)

- Escrow
  - POST `/payments/escrow` → Create/hold funds for milestone/contract
  - POST `/payments/escrow/:id/release` → Release funds on approval
  - POST `/payments/escrow/:id/refund` → Refund flow (on dispute resolution)
- Payouts & Invoices
  - POST `/payments/payouts` → Request/trigger payout (finance/admin rules)
  - GET `/payments/payouts/:id` → Payout status
  - POST `/payments/invoices` → Generate invoice for milestone/time
  - GET `/payments/invoices/:id` → Download invoice PDF
- PSP Integration
  - Webhooks: POST `/payments/webhooks/stripe` (or chosen PSP)
  - SEPA support and reconciliation jobs (internal cron)

### Phase 5: Messaging, Notifications, and Disputes

- Messaging
  - GET `/conversations` → List conversations (task/contract scoped)
  - POST `/conversations` → Start conversation
  - GET `/conversations/:id/messages` → List messages
  - POST `/conversations/:id/messages` → Send message
- Notifications
  - GET `/notifications` → List
  - POST `/notifications/test` → Trigger test (dev/admin)
- Disputes & Support
  - POST `/disputes` → Create dispute (contract/milestone scoped)
  - GET `/disputes/:id` → View dispute
  - POST `/disputes/:id/actions` → Add evidence/comment/resolve (role-gated)

### Phase 6: Analytics, Admin Console, and Compliance

- Analytics & Reporting
  - GET `/analytics/company` → Company KPIs
  - GET `/analytics/freelancer` → Freelancer stats
  - GET `/analytics/admin` → Platform-wide metrics
- Admin Console
  - GET `/admin/audit-logs` → View audit logs
  - GET `/admin/users` → Filterable listing
  - PUT `/admin/companies/:id/status` → Activate/lock company
- Compliance/KYC
  - POST `/compliance/kyc/documents` → Upload docs
  - GET `/compliance/kyc/status` → Current status
  - POST `/compliance/kyc/review/:userId` → Review result (compliance_officer)

### Phase 7: Security & Observability Enhancements

- Security
  - POST `/auth/refresh` → Refresh tokens
  - POST `/auth/2fa/setup` → Setup 2FA (TOTP)
  - POST `/auth/2fa/verify` → Verify 2FA
  - Device metadata + IP allow/deny lists (middleware + storage)
- Observability
  - Request IDs, structured logs, and correlation headers
  - Readiness: GET `/internal/ready` and Liveness: GET `/internal/live`

Notes on sequencing:
- Phase order can be adjusted based on business priorities. Payments typically require compliance groundwork and PSP onboarding first.
- Each phase will include RBAC, validation, rate-limiting, and audit logging where appropriate.

## Notes

- Default role on registration is always `freelancer`. Only admins can assign elevated roles.
- For admin-only endpoints in development, promote a user via the admin roles endpoint or directly in MongoDB.
- Do not commit real secrets. Rotate any exposed credentials.

---

Maintainers: CodFleet Backend Team
