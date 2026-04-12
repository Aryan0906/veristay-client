# Veristay - Student Accommodation & Lifestyle Discovery Platform

**Veristay** is a comprehensive web platform designed for students to discover and explore accommodations (hostels), colleges, and dining options. Built with a modern tech stack featuring React, TypeScript, and Flask, it provides an intuitive interface for finding the perfect student lifestyle match.

## 📚 Project Structure

```
veristay-client/
├── frontend/          # React + TypeScript + Vite frontend application
├── backend/           # Flask REST API backend
└── README.md          # Project documentation
```

## ✨ Features

### Frontend
- 🏢 **College Discovery**: Browse and filter colleges with detailed information
- 🏨 **Hostel Exploration**: Search hostels with location-based mapping and filtering
- 🍽️ **Food Vendor Directory**: Discover nearby food vendors and restaurants
- 🗺️ **Interactive Maps**: Leaflet-based map view for location-based browsing
- ⭐ **Reviews & Ratings**: View star ratings and user reviews
- 🔐 **Authentication**: Supabase-based user authentication
- 📱 **Responsive Design**: Tailwind CSS for modern, mobile-friendly UI

### Backend
- RESTful API with comprehensive CRUD operations
- Input validation and error handling
- Supabase integration for database operations
- JWT-based authentication support
- CORS-enabled for frontend integration
- Distance calculation using Haversine algorithm

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI framework
- **TypeScript ~5.9** - Type safety
- **Vite 7.3** - Build tool and dev server
- **Tailwind CSS 4.1** - Styling
- **React Router 7.13** - Client-side routing
- **Leaflet 1.9** - Interactive maps
- **Supabase JS 2.95** - Database and auth
- **Lucide React 0.564** - Icon library

### Backend
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Supabase** - Database and authentication
- **PyJWT** - JWT token handling
- **Pytest** - Testing framework
- **Gunicorn** - Production server

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (for frontend)
- Python 3.8+ (for backend)
- npm or yarn (for frontend package management)
- pip (for backend dependency management)

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows: .\venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env  # (create if needed with Supabase credentials)

# Run development server
python app.py

# Run tests
pytest
```

The backend API will be available at `http://localhost:5000`

## 📖 API Documentation

For detailed API documentation, see [backend/API_DOCS.md](backend/API_DOCS.md)

### Main Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/hostels` - Get all hostels
- `GET /api/colleges` - Get all colleges
- `GET /api/food-vendors` - Get all food vendors
- `POST /api/hostels` - Create a new hostel
- `POST /api/reviews` - Add a review

## 📁 Frontend Structure

```
src/
├── components/       # Reusable React components
├── pages/           # Page components for routing
├── context/         # React Context for state management
├── lib/             # Utility functions and API clients
├── types/           # TypeScript type definitions
├── data/            # Static data
├── assets/          # Images and media
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## 📁 Backend Structure

```
backend/
├── app.py           # Main Flask application
├── models.py        # In-memory data models
├── supabase_models.py  # Supabase-based models
├── validation.py    # Input validation logic
├── supabase_client.py  # Supabase client setup
├── supabase_schema.sql # Database schema
├── requirements.txt  # Python dependencies
├── pytest.ini       # Pytest configuration
├── test_api.py      # API tests
└── API_DOCS.md      # API documentation
```

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run lint    # Run ESLint
```

### Backend
```bash
cd backend
pytest                 # Run all tests
pytest --cov          # Run tests with coverage
pytest -v             # Verbose output
```

## 🔒 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY
```

### Backend (.env)
```
FLASK_ENV=development
FLASK_DEBUG=True
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_KEY=YOUR_SUPABASE_KEY
USE_SUPABASE=true
```

## 📝 Pages & Components

### Main Pages
- **Home** - Landing page
- **Explore** - Browse all options
- **CollegesPage** - College listing and filtering
- **HostelsPage** - Hostel directory with map
- **FoodPage** - Food vendor exploration
- **AuthPage/Login** - User authentication
- **About** - Project information

### Key Components
- `CollegeCard` - College display card
- `HostelCard` - Hostel display card
- `FoodCard` - Food vendor card
- `MapView` - Interactive map display
- `FilterBar` - Advanced filtering
- `ReviewCard` - Review display
- `StarRating` - Rating component
- `Navbar` - Navigation bar

## 🚀 Deployment

### Frontend (Vercel)
The frontend includes a `vercel.json` configuration for seamless Vercel deployment.

```bash
npm run build
# Deploy to Vercel
```

### Backend (Gunicorn)
```bash
gunicorn app:app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is properties of the Veristay team. All rights reserved.

## 📧 Contact & Support

For questions or support, please reach out to the development team or open an issue on GitHub.

---

**Built with ❤️ for students, by students**