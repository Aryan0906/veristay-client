# Veristay Frontend

Modern React + TypeScript + Vite frontend for the Veristay student discovery platform.

## 🎯 Overview

This is the client-side application for Veristay, providing a responsive and intuitive interface for students to discover hostels, colleges, and food vendors with interactive maps and filtering capabilities.

## ✨ Features

- 🎨 **Modern UI** - Built with Tailwind CSS for responsive design
- 🗺️ **Interactive Maps** - Leaflet-based location visualization
- 🔍 **Advanced Filtering** - Search and filter by multiple criteria
- ⭐ **Reviews & Ratings** - View and manage user reviews
- 🔐 **Authentication** - Secure user authentication with Supabase
- ⚡ **Fast Performance** - Vite for rapid development and optimized builds
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- ♿ **Accessible** - Built with accessibility best practices

## 🛠️ Tech Stack

- **React 19.2** - UI framework
- **TypeScript ~5.9** - Type-safe JavaScript
- **Vite 7.3** - Next-generation build tool
- **Tailwind CSS 4.1** - Utility-first CSS
- **React Router 7.13** - Client-side routing
- **Leaflet 1.9** - Interactive maps
- **Supabase JS 2.95** - Database & authentication
- **Lucide React 0.564** - Beautiful icons

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` with hot module replacement (HMR) enabled.

### Build for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier (if configured)
npm run format
```

## 📁 Directory Structure

```
src/
├── components/              # Reusable React components
│   ├── CollegeCard.tsx     # College listing card
│   ├── HostelCard.tsx      # Hostel listing card
│   ├── FoodCard.tsx        # Food vendor card
│   ├── MapView.tsx         # Interactive map component
│   ├── FilterBar.tsx       # Search and filter bar
│   ├── Navbar.tsx          # Navigation header
│   ├── ReviewCard.tsx      # Review display component
│   └── StarRating.tsx      # Rating component
├── pages/                   # Page components
│   ├── Home.tsx            # Landing page
│   ├── HomePage.tsx        # Home page variant
│   ├── Explore.tsx         # Main exploration page
│   ├── CollegesPage.tsx    # Colleges listing
│   ├── HostelsPage.tsx     # Hostels listing
│   ├── HostelDetail.tsx    # Hostel detail view
│   ├── HostelDetailPage.tsx # Hostel detail page
│   ├── FoodPage.tsx        # Food vendors listing
│   ├── FoodExplore.tsx     # Food exploration
│   ├── FoodDetailPage.tsx  # Food detail view
│   ├── AuthPage.tsx        # Authentication page
│   ├── Login.tsx           # Login page
│   └── About.tsx           # About page
├── context/                 # React Context
│   └── AuthContext.tsx     # Authentication state
├── lib/                     # Utility functions
│   ├── api.ts              # API client
│   ├── supabase.ts         # Supabase configuration
│   └── utils.ts            # Utility functions
├── types/                   # TypeScript type definitions
│   └── index.ts            # All types
├── data/                    # Static data
│   └── foodData.ts         # Food vendor data
├── assets/                  # Images and media
├── App.tsx                 # Main app component
├── App.css                 # Global styles
├── main.tsx                # Entry point
├── index.css               # Global CSS
└── vite-env.d.ts           # Vite type definitions
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### TypeScript Config

- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.app.json` - App-specific settings
- `tsconfig.node.json` - Node/build-time settings

### ESLint & Prettier

- `eslint.config.js` - Linting rules
- TypeScript ESLint plugin configured for type-aware linting

### Styling

- `tailwind.config.js` - Tailwind configuration
- `index.css` - Global styles
- `App.css` - App-specific styles

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Key Dependencies

- **react** - UI library
- **react-router-dom** - Client-side routing
- **@supabase/supabase-js** - Backend integration
- **leaflet** & **react-leaflet** - Interactive maps
- **tailwindcss** - Styling framework
- **clsx** - Class name utility
- **tailwind-merge** - Tailwind class merging
- **lucide-react** - Icon library

## 🎨 Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use consistent color schemes and spacing
- Ensure accessibility with proper contrast and labels

## 🧪 Testing

```bash
# Run linter to catch issues
npm run lint
```

## 📝 Component Development

When creating new components:

1. Use functional components with React hooks
2. Add TypeScript types for all props
3. Follow the existing naming conventions
4. Export components from `index.ts` if needed
5. Use Tailwind CSS for styling
6. Add JSDoc comments for complex logic

## 🚀 Deployment

The project includes `vercel.json` configuration for Vercel deployment:

```bash
# Build
npm run build

# Deploy to Vercel
vercel
```

## 🐛 Troubleshooting

**Port 5173 already in use:**
```bash
npm run dev -- --port 3000
```

**Dependencies issues:**
```bash
rm node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
# Check types
npx tsc --noEmit
```

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Leaflet Documentation](https://leafletjs.com/)
- [Supabase Docs](https://supabase.com/docs)
