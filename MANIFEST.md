# Site Manifest (`juvantia.org`)

**Service**: `site`
**Domain**: `juvantia.org`

## Описание
Это общая витрина проекта — сайт для посадки пользователей (landing page). Здесь находится фронтенд и бэкенд, ответственный за первое знакомство юзера с миром Juvantia (физическим технопарком и роверами Robulus).

## Взаимосвязи
- При попытке входа/регистрации перенаправляет на `auth.juvantia.org`.
- Является единой публичной входной точкой для новых участников.

## 🚀 Деплой
*   **Автоматизация**: GitHub Actions (`deploy.yml`) по пушу в `main`.
*   **Метод**: SSH -> `git pull` -> `docker build` (на VPS) -> `docker compose up`.
*   **Секреты**: `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY` в настройках репозитория.
