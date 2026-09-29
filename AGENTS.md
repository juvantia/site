# Site Instructions (`juvantia.org`)

**Service**: `site`  
**Domain**: `juvantia.org`

---

## 🏛️ Description & System Role
The primary public showcase and landing website for the Juvantia ecosystem. Presents the vision of the physical proving ground, teleoperated Robulus rovers, and fractional RWA ownership.

---

## ⚙️ Integrations
- Redirects authentication requests to `auth.juvantia.org`.
- Serves as the primary public entry point for new users and visitors.

---

## 🚀 Deployment Pipeline (DevOps)
* **Automation**: GitHub Actions (`deploy.yml`) on push to `main`.
* **Flow**: SSH -> `git pull` -> `docker build` (on VPS) -> `docker compose up -d`.
* **Secrets**: `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY` in GitHub repository settings.

---

## ⚠️ Critical Build Mandate
* **Dependency Resolution**: Due to Tailwind/Astro peer-dependency constraints, the `Dockerfile` must strictly execute `npm install --legacy-peer-deps`. Omitting this flag causes build failure on VPS.
* **Traefik Configuration**: Ensure `docker-compose.yml` includes `tls=true` and HTTPS redirect middleware.
