# Лукоморье — мобильный paywall

Учебный мини-сервис: экран выбора тарифа для детской игры. Покупка тестовая, без платёжного SDK и реальных денег.

## Локальный запуск

Нужны Node.js 20+ и npm.

```bash
cp .env.example .env
# DATABASE_URL — connection string из Neon (Postgres)
npm install
npm run dev
```

Открой `http://localhost:3000`. Без `DATABASE_URL` покупки пишутся в память процесса (после рестарта пропадают). Для сценария как в проде строка обязательна: таблица `purchases` создаётся при первой покупке.

Проверка API:

```bash
curl http://localhost:3000/api/offers
curl -X POST http://localhost:3000/api/purchase \
  -H 'Content-Type: application/json' \
  -d '{"offerId":"yearly","deviceId":"demo-device"}'
```

## Где что лежит

- **Frontend:** `app/pages/index.vue` — экран paywall. UI-компоненты — `modules/paywall/ui/components/`. Состояние и запросы — Pinia-стор `modules/paywall/application/paywall.store.ts`.
- **Server routes:** `server/api/offers.get.ts` (`GET /api/offers`), `server/api/purchase.post.ts` (`POST /api/purchase`), `server/api/restore.post.ts` (`POST /api/restore`).
- **База:** `server/utils/db.ts` — Neon (`@neondatabase/serverless`), таблица `purchases` (`offer_id`, `device_id`, `created_at`).

## Деплой и БД

- **Vercel** — бесплатный хостинг с SSR и Nitro server routes (не статический HTML).
- **Neon** — serverless Postgres, тот же драйвер локально и в проде.

В проекте на Vercel нужен env `DATABASE_URL` (Production). Без него запись покупки в проде падает с ошибкой.

## AI и что проверено руками

Использовали Cursor (агент) для вёрстки, Nuxt/Pinia-слоёв и server routes. Сами нужно прогнать: загрузка тарифов, выбор карточки, покупка, успех, ошибка сети/повтор, восстановление покупок, запись строки в Neon после деплоя (`GET /api/offers` и `POST /api/purchase`).

## Если бы было ещё 2 часа

Nuxt 4 вместо 3.21, тесты на API, отдельный экран ошибки, ретраи к Neon, e2e в Playwright на ширине 390px.
