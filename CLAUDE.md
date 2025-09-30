# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 admin dashboard template called "pure-admin-thin" - a simplified version of vue-pure-admin. It's built with Vue 3, TypeScript, Element Plus, Pinia, and Tailwind CSS. The project focuses on being lightweight while maintaining core admin functionality.

## Development Commands

### Core Development
- `pnpm dev` - Start development server with increased memory allocation
- `pnpm serve` - Alias for `pnpm dev`
- `pnpm build` - Build for production (cleans dist first)
- `pnpm build:staging` - Build for staging environment
- `pnpm preview` - Preview production build
- `pnpm preview:build` - Build and preview

### Code Quality
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run all linters (ESLint, Prettier, Stylelint)
- `pnpm lint:eslint` - ESLint only
- `pnpm lint:prettier` - Prettier only
- `pnpm lint:stylelint` - Stylelint only

### Maintenance
- `pnpm clean:cache` - Clean cache and reinstall dependencies
- `pnpm svgo` - Optimize SVG files

## Architecture

### Core Technologies
- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Element Plus** UI component library
- **Pinia** for state management
- **Vue Router 4** for routing
- **Tailwind CSS** for styling
- **Vite** as build tool

### Project Structure

```
src/
├── api/           # API service modules
├── assets/        # Static assets (icons, images, fonts)
├── components/    # Reusable components (Re* prefix)
├── config/        # Application configuration
├── directives/    # Custom Vue directives
├── layout/        # Layout components and hooks
├── plugins/       # Plugin configurations
├── router/        # Vue Router configuration
├── store/         # Pinia stores
├── style/         # Global styles
├── utils/         # Utility functions
└── views/         # Page components
```

### Key Directories

- **components/Re*** - Reusable components with Re prefix (ReIcon, ReAuth, ReDialog, etc.)
- **layout/** - Main layout system with sidebar, navbar, tags, etc.
- **store/modules/** - Pinia store modules (user, settings, permission, multiTags, etc.)
- **build/** - Vite build configuration and plugins

### State Management

Uses Pinia with modular stores:
- `user` - User authentication and profile
- `settings` - Application settings and theme
- `permission` - Route and permission management
- `multiTags` - Tab management
- `epTheme` - Element Plus theme configuration

### Routing

Dynamic routing system with permission control:
- Routes are loaded dynamically based on user permissions
- Error routes (404, 403, 500) are pre-configured
- Home and remaining routes are modular

### Styling Approach

- **Tailwind CSS** for utility-first styling
- **SCSS** for custom styles
- **Element Plus** component library with theme customization
- **Responsive design** with mobile support

## Development Notes

### TypeScript Configuration
- Strict mode disabled for flexibility
- JSX support enabled with preserve mode
- Path aliases: `@/*` for src, `@build/*` for build

### Build Configuration
- Vite with custom plugins for CDN, compression, and optimization
- Memory allocation increased for build performance
- Chunk size warning limit set to 4000kb

### Code Quality Tools
- ESLint with Vue and TypeScript rules
- Prettier for code formatting
- Stylelint for CSS/SCSS
- Husky for git hooks
- Commitlint for commit message conventions

### Package Manager
- Uses pnpm exclusively (enforced via preinstall hook)
- Node.js version: ^20.19.0 || >=22.12.0
- pnpm version: >=9

## Important Notes

- This is the non-internationalized version (Chinese locale only)
- Issues and PRs should be submitted to the full vue-pure-admin repository
- Bundle size optimized to be under 2.3MB with Element Plus globally imported
- Can be further optimized to under 350kb with CDN and compression