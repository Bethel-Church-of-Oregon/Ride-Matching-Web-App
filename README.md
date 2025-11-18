# Ride-Matching-Web-App

A TypeScript web application for ride matching, built with Vite.

## 📋 Table of Contents

- [Ride-Matching-Web-App](#ride-matching-web-app)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [📦 Prerequisites](#-prerequisites)
  - [🚀 Quick Start](#-quick-start)
  - [🛠️ Development](#️-development)
    - [Local Development Setup](#local-development-setup)
    - [Development Features](#development-features)
  - [📁 Project Structure](#-project-structure)
  - [📝 Scripts](#-scripts)
  - [🛠️ Technology Stack](#️-technology-stack)
    - [Key Dependencies](#key-dependencies)
  - [🔧 Troubleshooting](#-troubleshooting)
    - [TypeScript Errors](#typescript-errors)
    - [Port Already in Use](#port-already-in-use)
    - [Module Not Found](#module-not-found)
    - [Node Version Issues](#node-version-issues)
  - [📄 License](#-license)
  - [🤝 Contributing](#-contributing)
  - [📞 Support](#-support)

## ✨ Features

- ⚡ **Fast Development** - Vite-powered dev server with instant hot module replacement (HMR)
- 🔒 **Type Safety** - Full TypeScript support with strict mode enabled
- 🚀 **Production Ready** - Optimized builds for production deployment
- 📦 **Modern Stack** - ES modules, latest JavaScript features

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Start development servers
# Terminal 1: Frontend (Vite)
npm run dev

# Terminal 2: Backend (Express)
npm run dev:backend
```

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:4000`

**Note**: This project uses **Express** for local development (fast & simple) and **Vercel Serverless Functions** for production (scalable & serverless).

## 🛠️ Development

### Local Development Setup

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd Ride-Matching-Web-App
   ```

2. **Install dependencies**
    ```bash
    # Install frontend dependencies
    npm install

    # Install backend dependencies
    cd server && npm install && cd ..
    ```

3. **Set up Neon PostgreSQL Database**

   Create a Neon database account at [neon.tech](https://neon.tech) and get your connection string.

   Create a `.env` file in the project root:
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

   Edit `.env` and add your Neon database URL:
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require"
   ```

4. **Run Prisma migrations**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start development servers**

    Open **two terminal windows**:

    **Terminal 1 - Frontend (Vite):**
    ```bash
    npm run dev
    ```
    → Frontend runs on `http://localhost:3000`

    **Terminal 2 - Backend (Express):**
    ```bash
    npm run dev:backend
    ```
    → Backend runs on `http://localhost:4000`

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you save changes
   - Express server has hot reload with `tsx watch`

### Development Features

- **Express Server** - Fast local development with instant restart
- **Hot Module Replacement (HMR)** - Frontend changes reflect instantly
- **TypeScript** - Full type safety on both frontend and backend
- **Auto Reload** - Server restarts automatically on code changes (tsx watch)
- **Easy Debugging** - Simple Express server for debugging

## 📁 Project Structure

```
Ride-Matching-Web-App/
├── api/                  # Vercel Serverless Functions (Production)
│   ├── passengers.ts     # Passenger registration endpoint
│   └── drivers.ts        # Driver registration endpoint
├── server/               # Express Backend (Development)
│   ├── src/
│   │   └── index.ts      # Express server entry point
│   ├── prisma/
│   │   ├── schema.prisma # Prisma schema (Neon PostgreSQL)
│   │   └── migrations/   # Database migrations
│   ├── package.json      # Server dependencies
│   └── tsconfig.json     # Server TypeScript config
├── src/                  # Frontend source (Vite + TypeScript)
│   ├── main.ts
│   ├── login.ts
│   ├── mode-selection.ts
│   ├── passenger-mode.ts
│   ├── driver-mode.ts
│   ├── api.ts            # API client functions
│   ├── utils.ts
│   ├── types.ts
│   └── style.css
├── public/               # Static assets (PWA)
│   ├── generate-icons.html
│   ├── manifest.json
│   └── sw.js
├── index.html            # HTML entry point
├── package.json          # Dependencies & npm scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── vercel.json           # Vercel deployment config
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server (Vite on port 3000) |
| `npm run dev:backend` | Start backend dev server (Express on port 4000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | Run TypeScript type checking |
| `npm run db:migrate` | Deploy Prisma migrations |
| `npm run db:generate` | Generate Prisma client |
| `npm run vercel-build` | Vercel build command (auto-runs on deploy) |

## 🛠️ Technology Stack

### Frontend
- **TypeScript** (v5.3.3) - Typed JavaScript for better development experience
- **Vite** (v7.2.1) - Next-generation frontend build tool
- **PWA** - Progressive Web App with Service Worker

### Backend
- **Development**: Express (v4.18+) - Fast local development server
- **Production**: Vercel Serverless Functions - Scalable serverless deployment
- **Database**: Neon PostgreSQL - Serverless PostgreSQL
- **ORM**: Prisma (v6.19.0) - Type-safe database access
- **Security**: bcrypt - Password hashing

### Key Dependencies

**Frontend:**
- `vite` - Build tool and dev server
- `typescript` - TypeScript compiler

**Backend (Dev):**
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `tsx` - TypeScript execution with hot reload

**Backend (Prod):**
- `@vercel/node` - Vercel serverless function types

**Shared:**
- `@prisma/client` - Prisma database client
- `bcrypt` - Password encryption

## 🔧 Troubleshooting

### TypeScript Errors

**Problem**: TypeScript compilation errors during build

**Solution**: 
- Run `npm run type-check` to see all type errors
- Ensure all variables are used (strict mode enabled)
- Fix any unused variable warnings

### Port Already in Use

**Problem**: `Port 3000 is already in use`

**Solution**:
- Change the port in `vite.config.ts`
- Or stop the process using port 3000
- Use: `npm run dev -- --port 3001`

### Module Not Found

**Problem**: `Cannot find module` errors

**Solution**:
- Run `npm install` to ensure all dependencies are installed
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install` (Linux/Mac) or `rmdir /s node_modules && npm install` (Windows)
- Check that `package.json` has the correct dependencies

### Node Version Issues

**Problem**: Build fails or behavior differs between developers

**Solution**:
- Ensure both developers use Node.js v18 or higher
- Use the same `package-lock.json` file (commit it to git)
- Consider using `nvm` (Node Version Manager) to manage Node versions

## 🚀 Deployment

### Deploy to Vercel

#### Option 1: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Configure environment variables:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
5. Click "Deploy"

Vercel will automatically:
- Run `npm run vercel-build`
- Generate Prisma client
- Build the frontend
- Deploy serverless functions

#### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables**
   ```bash
   vercel env add DATABASE_URL
   ```

4. **Run migrations on production** (first deploy only)
   ```bash
   npm run db:migrate
   ```

### Environment Variables

Required environment variables for production:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@ep-xxx.region.aws.neon.tech/db?sslmode=require` |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Happy Coding! 🚀**