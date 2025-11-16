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

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

If you plan to use the included Express + Prisma backend (SQLite) for registrations, follow the Backend setup below before using registration features.

## 🛠️ Development

### Local Development Setup

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd Ride-Matching-Web-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Backend (Express + Prisma + SQLite)**

    Server dependency installation
    ```bash
    cd server
    npm install
    ```

    Prisma initialization and DB creation
    ```bash
    # First run: create and apply migration
    npx prisma migrate dev --name init
    # Or push schema directly to the DB
    # npx prisma db push
    ```

    Server start (development mode)
    ```bash
    npm run dev
    ```

    The backend listens on port 4000 by default (`http://localhost:4000`).

3. **Start development server**
    ```bash
    # In the project root (frontend)
    npm run dev
    ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you save changes

### Development Features

- **Hot Module Replacement (HMR)** - Changes reflect instantly without page refresh
- **TypeScript Compilation** - Automatic type checking and compilation
- **Source Maps** - Easy debugging with original source code mapping

## 📁 Project Structure

```
Ride-Matching-Web-App/
├── src/
│   ├── main.ts          # Main TypeScript entry point
│   └── style.css        # Application stylesheet
├── index.html           # HTML entry point
├── package.json         # Dependencies and npm scripts
├── package-lock.json    # Dependency lock file
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite bundler configuration
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | Run TypeScript type checking without building |

## 🛠️ Technology Stack

- **TypeScript** (v5.3.3) - Typed JavaScript for better development experience
- **Vite** (v7.2.1) - Next-generation frontend build tool
- **Node.js** (v20) - JavaScript runtime

### Key Dependencies

- `typescript` - TypeScript compiler
- `vite` - Build tool and dev server
- `@types/node` - TypeScript definitions for Node.js

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