# PokemonWebApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Clone the repository

```bash
git clone https://github.com/DionysusDT/pokemon-angular-frontend.git
cd pokemon-angular-frontend
```

## Install dependencies

To start a local development server, run:

```bash
npm install
```

## Run the development server

```bash
ng serve
```

Open your browser at: http://localhost:4200

## Implemented Features
- User Authentication: Signup/Login with JWT (email & password).
- Responsive Layout
- Home Page with Carousel and Grid of 10 Pokemon
- List Page
  + Import Pokemon via CSV.
  + Search bar with debounce (300ms) 
  + Advanced filters (type, legendary, speed)
  + Pagination (10/20/50/100 per page) + query params filter. Ex: ?type=Water&page=1&pageSize=20&legendary=false&speedRange=101-150
- Pokemon Detail Modal: View details + mark/unmark favorites with heart icon.

## Routing 
- /sign-in – User login
- /sign-up – User registration
- /home – Home page with carousel + Pokemon grid
- /pokemon – Pokemon list page with search, filter, pagination- 
- /404-not-found 404 Not Found page.

** If not logged in → always redirect to /sign-in.
** If logged in but access an invalid route → show the 404 Not Found page.
