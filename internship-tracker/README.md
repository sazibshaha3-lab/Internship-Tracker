# Career Counselling and Placement (Internship Tracker)

React (Vite) frontend + Laravel 11 API (Sanctum, MySQL). Roles: Student, Career Advisor, Admin, Recruiter.
Built from the Figma file "Internship Tracker — Website UI".

## Folders
- `backend-overlay/` : only the files that go ON TOP of a fresh Laravel project (models, controllers, middleware, routes, migration, seeder)
- `frontend/` : complete React + Vite app
- `setup-backend.sh` : creates the Laravel project and copies the overlay in

## Backend
Option A (script): `bash setup-backend.sh`
Option B (manual):
1. `composer create-project laravel/laravel internship-api`
2. Copy everything inside `backend-overlay/` into `internship-api/` (overwrite `app/Models/User.php`, `routes/api.php`, `database/seeders/DatabaseSeeder.php`)
3. `cd internship-api && php artisan install:api`
4. In `bootstrap/app.php`, inside `->withMiddleware(function (Middleware $middleware) { ... })` add:
   `$middleware->alias(['role' => \App\Http\Middleware\RoleMiddleware::class]);`
5. Edit `.env` (MySQL: DB_CONNECTION=mysql, DB_DATABASE=internship_tracker, DB_USERNAME, DB_PASSWORD) and create the database
6. `php artisan migrate --seed`
7. `php artisan serve`  -> http://localhost:8000

## Frontend
```
cd frontend
npm install
npm run dev     # http://localhost:5173
```
API URL is in `frontend/.env` (VITE_API_URL=http://localhost:8000/api).

## Demo logins (password: password123)
student@demo.test / advisor@demo.test / admin@demo.test / recruiter@demo.test
(pick the matching workspace role on the login screen)

## Flow to test
1. Student applies to an opportunity (seeded CV v1 is already approved)
2. Admin approves the application, then forwards it to the company
3. Recruiter shortlists, schedules an interview, makes an offer
4. Student uploads a new CV, Advisor approves it

## Not included yet
Email verification, password reset, CV PDF export, career plan wizard, admin reports/analytics, notifications dropdown.
