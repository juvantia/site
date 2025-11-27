# Security Configuration

## Admin Access Protection

The backend API and admin pages are protected using a secret header-based authentication system to prevent unauthorized access to sensitive data and administrative functions.

### Access Code

**Current Admin Secret:** `JUVANTIA_ARCHITECT_KEY_888`

### How It Works

1. **Backend Protection**: All sensitive routes require the `x-admin-secret` header with the correct value
2. **Frontend Authentication**: Admin pages (`/admin/memorandums` and `/admin/map`) show a login screen that accepts the access code
3. **Persistent Session**: The access code is stored in `localStorage` for convenience
4. **Lock System**: A "Lock System" button appears in the top-right corner of admin pages to logout

### Protected Admin Pages

- `/admin/memorandums` - Memorandum management interface
- `/admin/map` - District layout and sales zone generator

### Protected API Routes

The following API endpoints require the admin secret:

- `GET /api/memorandums` - View all memorandums
- `PUT /api/memorandums/:id/status` - Update memorandum status
- `DELETE /api/memorandums/:id` - Delete a memorandum
- `POST /api/sales-zones` - Create sales zones
- `POST /api/sales-zones/bulk` - Bulk create sales zones
- `DELETE /api/sales-zones/:id` - Delete sales zone
- `DELETE /api/sales-zones/district/:id` - Clear all zones in district
- `POST /api/sales-zones/district/:id/clear-area` - Clear zones in specific area
- `PUT /api/districts/:id` - Update district coordinates
- `POST /api/admin/tile` - Update land tiles

### Public Routes

These routes remain accessible without authentication:

- `GET /api/districts` - List all districts (public map data)
- `GET /api/districts/:id` - Get district details
- `POST /api/memorandums` - Submit a new memorandum (public submission)
- `GET /api/memorandums/count` - Get count of approved memorandums (for progress bar)

### For Production

⚠️ **IMPORTANT**: Before deploying to production:

1. Change the `ADMIN_SECRET` value in `backend/src/index.ts`
2. Move the secret to an environment variable (`.env` file)
3. Never commit the actual secret to version control
4. Consider implementing proper JWT-based authentication for enhanced security

### Usage Example

To access any admin page:

1. Navigate to `/admin/memorandums` or `/admin/map`
2. Enter the access code: `JUVANTIA_ARCHITECT_KEY_888`
3. Click "Unlock"

The code persists in localStorage, so you won't need to re-enter it on subsequent visits. To logout, click the **🔒 Lock System** button in the top-right corner.

