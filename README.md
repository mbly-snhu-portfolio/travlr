# Travlr Getaways

A full-stack travel booking web application built with the MEAN stack (MongoDB, Express, Angular, Node.js).

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
│       ├── index.hbs    # Home page template
│       ├── travel.hbs   # Travel page template
│       └── error.hbs    # Error page template
├── bin/                  # Application startup scripts
│   └── www              # Server entry point
├── public/               # Static assets
│   ├── css/             # Stylesheets
│   ├── images/          # Image assets
│   └── *.html           # Static HTML pages (legacy)
├── routes/               # Legacy routes
├── views/                # Legacy views
├── app.js               # Express application configuration
└── package.json         # Dependencies and scripts

```

## Module 2 Implementation

This module implements MVC architecture with Handlebars templating:

- **MVC Structure**: Organized code into controllers, routes, and views
- **Handlebars Templates**: Converted static HTML to dynamic HBS templates
- **Route Controllers**: Implemented traveler controller with route handlers
- **View Engine**: Configured Express to use HBS templating engine

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

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

## Available Routes

- `GET /` - Home page (HBS template)
- `GET /travel` - Travel listing page (HBS template)
- `GET /rooms` - Rooms page
- `GET /meals` - Meals page
- `GET /news` - News page
- `GET /about` - About page
- `GET /contact` - Contact page

## Technologies

- **Express.js** - Web application framework
- **Handlebars (HBS)** - Templating engine
- **Node.js** - JavaScript runtime
- **MongoDB** - Database (to be implemented)
- **Angular** - Frontend framework (to be implemented)

## Git Branches

- `main` - Main development branch
- `module-one` - Module 1 implementation
- `module-two` - Module 2 MVC refactoring (current)

## Development

### Module 2 Features

- MVC architecture implementation
- Handlebars templating engine integration
- Route and controller separation
- Dynamic view rendering with HBS directives
- Navigation highlighting based on current page

## License

This project is part of CS 465 coursework.

