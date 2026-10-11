#!/bin/sh
set -eu
# Run inside php container. Requires internet on first installation.
cd /var/www/html
if [ ! -f artisan ]; then
  echo 'Installing Laravel 12 skeleton (requires Packagist)...'
  composer create-project laravel/laravel /tmp/gg-laravel '^12.0' --no-interaction
  cp -rn /tmp/gg-laravel/. /var/www/html/
  cp /tmp/gg-laravel/artisan /var/www/html/artisan
  cp /tmp/gg-laravel/composer.json /var/www/html/composer.json
  cp /tmp/gg-laravel/composer.lock /var/www/html/composer.lock
  cp -r /tmp/gg-laravel/bootstrap/. /var/www/html/bootstrap/
  cp -r /tmp/gg-laravel/config/. /var/www/html/config/
  cp -r /tmp/gg-laravel/public/. /var/www/html/public/
  cp -r /tmp/gg-laravel/routes/web.php /var/www/html/routes/web.php
  cp -r /tmp/gg-laravel/database/migrations/0001*.php /var/www/html/database/migrations/ 2>/dev/null || true
  cp -r /tmp/gg-laravel/vendor /var/www/html/vendor
fi
composer require filament/filament:'^3.3' --no-interaction --with-all-dependencies
# Enable API routes and register panel provider in Laravel 12 bootstrap/app.php
php /setup-bootstrap.php
if [ ! -f .env ]; then cp .env.example .env; fi
php artisan key:generate --force
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link || true
php artisan migrate --force
printf '\nSetup completed. Create admin:\nphp artisan make:filament-user\nThen set is_admin=1 in users table (see README).\n'
