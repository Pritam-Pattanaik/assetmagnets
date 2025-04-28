# ASSET-MAGNETS IT Services Website

A professional, animated website for ASSET-MAGNETS IT services company built with Next.js and PostgreSQL.

## Tech Stack

- **Frontend**: Next.js with App Router for server components and client-side interactivity
- **Database**: PostgreSQL for robust data storage
- **Authentication**: NextAuth.js for secure user authentication
- **State Management**: React Context API for state management
- **Styling**: Tailwind CSS for responsive design with custom animations
- **API**: Next.js API routes for backend functionality
- **Form Handling**: React Hook Form with Zod validation
- **ORM**: Prisma for database interactions

## Features

### Public Pages
- Home page with animated hero section, service highlights, testimonials carousel
- About page with company timeline, team profiles, core values
- Services page with interactive service cards and project showcase
- Career page with dynamic job listings and application form
- Contact page with form validation and interactive map

### Admin Dashboard
- Secure authentication with role-based permissions
- Analytics dashboard
- Content management system
- Form submission management
- Media library
- User management

## Getting Started

```bash
# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/app - Next.js App Router structure
  /api - API routes
  /(auth) - Authentication routes
  /(admin) - Admin dashboard routes
  /(public) - Public pages
/components - Reusable UI components
/lib - Utility functions and shared logic
/prisma - Database schema and migrations
/public - Static assets
/styles - Global styles and Tailwind configuration
```

## Implementation Details

- Server-side rendering for optimal SEO
- API routes for secure data operations
- Image optimization with Next.js Image component
- PostgreSQL connection via Prisma ORM
- Incremental Static Regeneration for dynamic content
- Middleware for protected routes and authentication