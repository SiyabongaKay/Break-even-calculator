# SaaS Break-Even Calculator

## Overview

This is a web application designed specifically for EdTech platforms in South Africa to calculate break-even metrics and visualize financial projections. The application helps product managers, founders, and financial planners validate pricing models, scaling assumptions, and customer acquisition expectations through interactive calculations and 12-month forecasting.

## System Architecture

The application follows a monorepo structure with a clear separation between client and server code:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Structure**: Modular React components with TypeScript
- **UI Library**: shadcn/ui providing consistent design system with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Charts**: Recharts for data visualization
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Database Access**: Drizzle ORM with PostgreSQL
- **Storage Layer**: Abstract storage interface with in-memory implementation for development
- **API Design**: RESTful endpoints for scenario management

### Database Schema
- **Users Table**: Basic user management (id, username, password)
- **Scenarios Table**: Financial calculation scenarios with:
  - Fixed costs (JSON array of cost items)
  - Pricing parameters (price per learner, variable costs)
  - Growth metrics (initial count, growth rate, churn rate)

### Core Calculation Engine
Located in `client/src/lib/calculations.ts`:
- **Contribution Margin**: Price per learner minus variable cost per learner
- **Break-even Analysis**: Fixed costs divided by contribution margin
- **12-Month Projection**: Simulates user growth and churn over time
- **Financial Metrics**: CM ratio, break-even MRR, learner count projections

## Data Flow

1. **User Input**: Financial parameters entered through form components
2. **Real-time Calculation**: Metrics calculated client-side for immediate feedback
3. **Scenario Persistence**: Data saved to backend via REST API
4. **Visualization**: Charts generated from projection calculations
5. **Export Capabilities**: PDF and sharing functionality (planned)

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Database connectivity for Neon PostgreSQL
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **drizzle-orm**: Database ORM
- **recharts**: Charting library
- **zod**: Schema validation
- **wouter**: Lightweight routing

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Drizzle Kit**: Database migrations

## Deployment Strategy

The application is configured for deployment on platforms like Replit:

- **Build Process**: Vite builds the client, esbuild bundles the server
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection
- **Database Migrations**: Drizzle Kit handles schema changes
- **Static Assets**: Client builds to `dist/public` for serving

### Build Commands
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run db:push`: Push database schema changes

## Changelog
- July 05, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.