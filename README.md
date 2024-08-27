# Pokémon TCG Web App

This project is a web application centered around the Pokémon Trading Card Game (TCG), built using Next.js and Chakra UI. The app provides a user-friendly interface for browsing and battling Pokémon cards, allowing users to simulate battles between selected cards.

## Project Overview

- **Framework** : [Next.js](https://nextjs.org/) is used as the primary framework.

- **UI Library** : [Chakra UI](https://chakra-ui.com/)

- **API Communication** : [Axios](https://axios-http.com/) is used to handle HTTP requests to the backend API.

- **Custom Select Components** : [React Select]() is used to create customizable dropdown menus, particularly useful for searching cards for battles without listing all cards at once.

- **TypeScript** : The project is built with TypeScript, ensuring type safety and better developer experience.

## Project Structure

- **Pages** : The Next.js `pages` directory contains all the route pages for the application, including the card browsing and battle simulation pages.

- **Components** : Reusable components are located in the `components` directory, including UI elements and layout components.

- **Services** : The `services` directory contains service files, including the `cardsService.ts` file for API communication, handling CRUD operations and battle simulations.

## Development Setup

### Prerequisites

- Node.js (version 20.x)

- yarn package manager

### Installation

1. Install the dependencies:

```bash
yarn install
```

### Running the Development Server

To start the development server:

```bash
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000/) .

### Environment Variables

Set up the environment variables by creating a `.env` file at the root of the project:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
```

Replace the URL with the appropriate API endpoint in production or other environments.

### Building for Production

To build the application for production:

```bash
yarn build
```

## Cloud Deployment

The app is deployed on Vercel. To deploy your changes, push your commits to the main branch, and Vercel will automatically build and deploy the latest version.
Visit the live app at: [https://pokemon-tcg-web.vercel.app/](https://pokemon-tcg-web.vercel.app/)
