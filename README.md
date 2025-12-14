# Travlr Getaways

A full-stack travel booking web application built with the MEAN stack (MongoDB, Express, Angular, Node.js).

## Module 6 Implementation (Admin SPA + Trip CRUD)

Module 6 adds an Angular admin single-page application (SPA) for managing trips (create, read, update, delete) backed by MongoDB via the Express API.

- **Admin SPA**: [`/root/projects/travlr/app_admin/`](/root/projects/travlr/app_admin/) (Angular + Bootstrap)
- **API layer**: [`/root/projects/travlr/app_api/`](/root/projects/travlr/app_api/) (`/api/trips` CRUD endpoints)

## Module 7 Implementation (Security: Admin Login + Secured API)

Module 7 adds a **JWT-based login** for the admin SPA and secures the **administrative (write) API endpoints**.

- **Login endpoint**: `POST /api/auth/login` → returns `{ token }`
- **Protected endpoint example**: `GET /api/auth/profile` (requires Bearer token)
- **Trips security**:
  - `GET /api/trips` and `GET /api/trips/:tripCode` are public (supports the customer-facing site)
  - `POST/PUT/DELETE /api/trips*` require `Authorization: Bearer <token>`

### Rubric mapping (Module 7)

- **Develop security protocol**
  - Admin SPA includes an HTML login form at `http://localhost:4200/login`.
  - Backend generates **JWT tokens** on successful login and requires them on administrative trip endpoints.
- **Test security protocol (Postman)**
  - Register/login and validate protected endpoints (details below).
- **Incorporate security protocol**
  - Front-end refactor: route guard + token interceptor + login/logout UI.
  - Back-end refactor: user model + auth endpoints + JWT middleware + protected trip writes.
- **Test front-end**
  - Logging in enables CRUD (create/edit/delete) in the admin SPA; logging out disables it.

## Project Structure

The application follows the Model-View-Controller (MVC) architecture pattern:

```
travlr/
├── app_server/           # MVC application structure
│   ├── controllers/      # Controller logic
│   │   └── traveler.js   # Traveler controller
│   ├── routes/           # Route definitions
│   │   └── traveler.js   # Traveler routes
│   └── views/            # Handlebars templates
│       ├── layout.hbs   # Main layout template
│       ├── partials/    # Handlebars partials
│       │   ├── header.hbs  # Header partial
│       │   └── footer.hbs  # Footer partial
│       ├── index.hbs    # Home page template
│       ├── travel.hbs   # Travel page template (dynamic JSON rendering)
│       ├── rooms.hbs    # Rooms page template
│       ├── meals.hbs    # Meals page template
│       ├── news.hbs     # News page template
│       ├── about.hbs    # About page template
│       ├── contact.hbs  # Contact page template
│       └── error.hbs    # Error page template
├── data/                 # JSON data files
│   └── trips.json       # Trip data for travel page
├── bin/                  # Application startup scripts
│   └── www              # Server entry point
├── public/               # Static assets
│   ├── css/             # Stylesheets
│   ├── images/          # Image assets
│   └── *.html           # Static HTML pages (legacy, redirected to routes)
├── app_admin/            # Angular admin SPA (Module 6)
├── routes/               # Legacy routes
├── app.js               # Express application configuration
└── package.json         # Dependencies and scripts

```

## Module 3 Implementation

This module converts static HTML to dynamic Handlebars templates using JSON data:

- **Handlebars Partials**: Header and footer extracted into reusable partials
- **JSON Data Integration**: Trip data loaded from `data/trips.json` file
- **Dynamic Rendering**: Travel page uses `{{#each}}` loop to render trips from JSON
- **MVC Controller Updates**: Controller reads JSON file and passes data to views
- **Template Engine**: Handlebars partials registered and configured in Express

## Module 2 Implementation

Module 2 implemented MVC architecture with Handlebars templating:

- **MVC Structure**: Organized code into controllers, routes, and views
- **Handlebars Templates**: Converted static HTML to dynamic HBS templates
- **Route Controllers**: Implemented traveler controller with route handlers
- **View Engine**: Configured Express to use HBS templating engine

## Prerequisites

- Node.js (v14 or higher)
- npm (recommended; a `package-lock.json` is generated for npm-based installs)
- MongoDB running locally (default connection: `mongodb://localhost:27017/travlr`)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mbly-snhu-portfolio/travlr.git
cd travlr
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Running the Admin SPA (Angular)

In a separate terminal:

```bash
cd app_admin
npm install
npm run start:proxy
```

- Admin SPA: `http://localhost:4200`
- API is proxied to Express at `http://localhost:3000` (see `app_admin/proxy.conf.json`)

### Admin Login Credentials (default)

On server start, the app will create a default admin user **if it does not already exist**:

- **Email**: `admin@travlr.local`
- **Password**: `Password123!`

You can override these via environment variables when starting the server:

```bash
ADMIN_EMAIL="admin@example.com" ADMIN_PASSWORD="ChangeMe123!" npm start
```

Optional (recommended) environment variables:

- `JWT_SECRET`: secret used to sign tokens (defaults to a dev fallback)
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`: default seeded admin user (created only if missing)

## Available Routes

All pages use Handlebars (HBS) templates with MVC architecture:

- `GET /` - Home page
- `GET /travel` - Travel listing page (dynamically renders trips from JSON data)
- `GET /rooms` - Rooms page
- `GET /meals` - Meals page
- `GET /news` - News page
- `GET /about` - About page
- `GET /contact` - Contact page

All routes are handled by the traveler controller and render HBS templates with proper navigation highlighting. The travel page dynamically renders trip data from `data/trips.json` using Handlebars `{{#each}}` directives.

## API Endpoints

Trips (MongoDB):

- `GET /api/trips` - list all trips
- `GET /api/trips/:tripCode` - get one trip by code
- `POST /api/trips` - create a trip (**requires Bearer token**)
- `PUT /api/trips/:tripCode` - update a trip by code (**requires Bearer token**)
- `DELETE /api/trips/:tripCode` - delete a trip by code (**requires Bearer token**)

Auth (MongoDB):

- `POST /api/auth/register` - create a user (for mock/test data)
- `POST /api/auth/login` - login and get JWT
- `GET /api/auth/profile` - get current user (**requires Bearer token**)

## Security testing (Postman)

Use `http://localhost:3000` as the base URL.

1. **Login (default admin)**
   - `POST /api/auth/login`
   - Body:
     - `{ "email": "admin@travlr.local", "password": "Password123!" }`
   - Copy `token` from the response.

2. **Verify protected endpoint**
   - `GET /api/auth/profile`
   - Header:
     - `Authorization: Bearer <token>`

3. **Verify trip endpoint security**
   - Without token:
     - `POST /api/trips` → 401
     - `PUT /api/trips/:tripCode` → 401
     - `DELETE /api/trips/:tripCode` → 401
   - With token:
     - Write endpoints succeed (201/200/204)

## Security testing (Admin SPA)

1. Start Express on `http://localhost:3000` (`npm start`).
2. Start Angular on `http://localhost:4200` (`npm run start:proxy`).
3. Visit `http://localhost:4200/login` and sign in.
4. Confirm CRUD is enabled:
   - Create: `/trips/new`
   - Edit: `/trips/:tripCode/edit`
   - Delete from the list page
5. Logout and confirm CRUD is disabled/blocked again.

## Reinstall directions (PowerShell)

Run these commands from the repository root:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm cache clean --force
npm install
npm start
```

## Technologies

- **Express.js** - Web application framework
- **Handlebars (HBS)** - Templating engine
- **Node.js** - JavaScript runtime
- **MongoDB** - Database (used for trips)
- **Angular** - Frontend framework (admin SPA in `app_admin/`)

## Git Branches

- `main` - Main development branch (current)
- `module-one` - Module 1 implementation
- `module-two` - Module 2 MVC refactoring
- `module-three` - Module 3 dynamic templates with JSON (merged to main)

## Development

### Module 3 Features

- Handlebars partials for header and footer
- JSON data file (`data/trips.json`) for trip information
- Dynamic trip rendering using `{{#each}}` Handlebars loop
- Controller integration with filesystem to read JSON data
- Static HTML replaced with dynamic templates

### Module 2 Features

- MVC architecture implementation
- Handlebars templating engine integration
- Route and controller separation
- Dynamic view rendering with HBS directives
- Navigation highlighting based on current page
- All pages converted from static HTML to HBS templates
- Consistent layout template with shared header/footer

## License

This project is part of CS 465 coursework.

