#!/usr/bin/env bash
# Usage: bash setup-backend.sh   (needs PHP 8.2+, Composer, MySQL)
set -e
composer create-project laravel/laravel internship-api
cp -R backend-overlay/. internship-api/
cd internship-api
php artisan install:api --no-interaction
# Register the "role" middleware alias
if ! grep -q "RoleMiddleware" bootstrap/app.php; then
  sed -i "s|->withMiddleware(function (Middleware \$middleware) {|&\n        \$middleware->alias(['role' => \\\\App\\\\Http\\\\Middleware\\\\RoleMiddleware::class]);|" bootstrap/app.php
fi
grep -q "RoleMiddleware" bootstrap/app.php || echo "!! Add the role alias to bootstrap/app.php manually (see README.md)"
echo
echo "Now edit internship-api/.env: DB_CONNECTION=mysql, DB_DATABASE=internship_tracker, DB_USERNAME, DB_PASSWORD"
echo "Create the database, then run:  cd internship-api && php artisan migrate --seed && php artisan serve"
