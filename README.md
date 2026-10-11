# GG Rent — Vue SPA + Laravel API + Filament

**Struktura:** `frontend/` Vue 3/TypeScript, `backend/` Laravel 12/Filament 3 overlay, `docker/` PHP/Nginx/setup, `compose.yaml`.

## Važno: prvi setup traži internet

ZIP sadrži **kompletan aplikacijski izvorni kod**, ali ne sadrži Composer `vendor/`, npm `node_modules/`, niti preuzeti Laravel framework. Prvi setup preuzima službeni Laravel 12 skeleton i Filament 3, zatim zadržava naše aplikacijske fajlove. Bez internet konekcije na hostu koji izvršava Docker setup to neće raditi. **Nije potvrđeno end-to-end pokretanje u ovom okruženju.**

## Pokretanje

1. Raspakuj ZIP i uđi u root `gg-rent/`.
2. `docker compose build app`
3. `docker compose up -d db redis mailpit`
4. `docker compose run --rm -v "$(pwd)/docker/setup.sh:/setup.sh:ro" -v "$(pwd)/docker/bootstrap.php:/setup-bootstrap.php:ro" app sh /setup.sh`
5. `docker compose up -d app nginx frontend`
6. Frontend: http://localhost:5178 ; Laravel/Filament: http://localhost:8088/admin ; Mailpit: http://localhost:8026

**Admin:**

`docker compose exec app php artisan make:filament-user`

Filament pristup zahtijeva `users.is_admin = 1`. Postavi za kreiranog admina putem tinker:

`docker compose exec app php artisan tinker --execute="\\App\\Models\\User::where('email','admin@example.com')->update(['is_admin'=>true]);"`

Zamijeni `admin@example.com` stvarnim emailom.

**API:** `GET /api/vehicles`, `GET /api/vehicles/{slug}`, `GET /api/vehicles/{id}/availability?from=YYYY-MM-DD&to=YYYY-MM-DD`, `GET /api/vehicles/{id}/quote?from=...&to=...`, `POST /api/bookings`, `POST /api/bookings/track`.

**Kalendar:** potvrđene rezervacije i blokirani termini su crveni. `pending` upiti ne blokiraju termine. Vraćanje vozila je ekskluzivni kraj intervala (`[pickup, return)`), pa je trajanje razlika datuma. Administrator potvrđuje `pending` upit u Filamentu; tada ide email preko queue-a.

**Queue worker:** `docker compose exec -d app php artisan queue:work --tries=3` (za lokalni razvoj). Za produkciju koristite zaseban supervised worker.

**WhatsApp:** u `frontend/.env` postavi `VITE_WHATSAPP_NUMBER=387...` bez plusa; placeholder je `38765000000` i **mora biti promijenjen**. U `frontend/.env` može se postaviti `VITE_API_URL=http://localhost:8088/api`.

**CORS:** Ako browser blokira pozive iz Vite-a, u `backend/config/cors.php` dozvoli `http://localhost:5178` kao origin. Laravel 12 default CORS konfiguraciju provjeri nakon instalacije.

## Sadržaj i ograničenja

- Originalne fotografije iz dostavljenog HTML-a izdvojene su u `frontend/public/images/original-*.jpg` kao vizuelna referenca. Vozila i njihove slike na frontendu dolaze iz API-ja. U Filamentu uploadujte stvarne fotografije vozila.
- Seed unosi tri demonstraciona vozila **bez automatski pridruženih fotografija**; ovo je namjerno da se tuđe slike ne vežu za pogrešan automobil.
- Email se šalje **nakon admin potvrde**, ako je email unesen, i traži aktivan queue worker.
- Administratorsko ručno kreiranje rezervacije ide kao `pending`, zatim se automatski potvrđuje; admin može upisati WhatsApp/telefon kao izvor.
- Obavezno testirati u Docker okruženju prije produkcije: Filament upload/repeater, admin akcije, vremenske intervale, SMTP, CORS, UX i konkurentne potvrde.
- Za produkciju dodatno uraditi rate limiting/WAF, backup, TLS, log monitoring i testiranje concurrency edge caseova.
