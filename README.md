# Chirper - Laravel Application

A simple Social Media application built with Laravel and Inertia 2.0.

## Features

1. User Authentication

   - Register
   - Login
   - Logout
   - Password Reset

2. Chirps (Posts)

   - Create new chirps
   - Edit chirps
   - Delete chirps
   - View chirp list

3. Email Notifications
   - When a new chirp is created, all users (except the creator) receive an email notification
   - Email contains:
     - Creator's name
     - Chirp content (limited to 50 characters)
     - Link to application

## Tech Stack

- Laravel 11
- Inertia.js
- React
- Tailwind CSS
- SQLite
- Mailpit (for email testing)

## Installation

1. Clone repository

```bash
git clone [repository-url]
cd chirper
```

2. Install dependencies

```bash
composer install
npm install
```

3. Setup environment

```bash
cp .env.example .env
php artisan key:generate
```

4. Create database

```bash
touch database/database.sqlite
php artisan migrate
```

5. Run application

```bash
npm run dev
php artisan serve
```

6. Run Mailpit for email testing

```bash
# Install Mailpit if not already installed
brew install axllent/apps/mailpit

# Run Mailpit
mailpit

# Open Mailpit web interface
open http://localhost:8025
```

7. Run queue worker for processing notifications

```bash
php artisan queue:work
```

## Testing the Application

1. Register two or more users
2. Login with one user
3. Create a new chirp
4. Check Mailpit (http://localhost:8025) to see email notifications sent to other users
