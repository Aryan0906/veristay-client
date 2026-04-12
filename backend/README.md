# Veristay Backend API

Flask-based REST API for the Veristay student discovery platform. Provides comprehensive endpoints for colleges, hostels, and food vendors with support for authentication, reviews, and location-based filtering.

## 🎯 Overview

The Veristay backend is a RESTful API built with Flask that manages data for student accommodations, educational institutions, and dining options. It supports flexible storage options (in-memory or Supabase), JWT authentication, and comprehensive input validation.

## ✨ Features

- 📍 **Location-Based Search** - Distance calculation using Haversine algorithm
- 🔐 **JWT Authentication** - Secure user authentication
- 📊 **CRUD Operations** - Full Create, Read, Update, Delete support
- ✅ **Input Validation** - Comprehensive validation for all inputs
- 🧪 **Comprehensive Testing** - 40+ test cases with pytest
- 📁 **Flexible Storage** - Switch between in-memory and Supabase
- 🔄 **CORS Enabled** - Cross-Origin Resource Sharing for frontend
- 📝 **Well Documented** - Detailed API documentation

## 🛠️ Tech Stack

- **Flask** - Lightweight Python web framework
- **Flask-CORS** - CORS handling
- **Supabase** - Cloud database (optional)
- **PyJWT** - JWT token handling
- **Pytest** - Testing framework
- **Gunicorn** - Production server
- **python-dotenv** - Environment configuration

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- pip (Python package manager)
- Virtual environment (recommended)

### Installation

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
.\venv\Scripts\Activate

# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Configuration

Create a `.env` file in the backend directory:

```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_APP=app.py

# Storage Configuration (set to true for Supabase)
USE_SUPABASE=false

# Supabase Configuration (if using Supabase)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# JWT Configuration
JWT_SECRET_KEY=your_secret_key_here
```

### Running the Server

```bash
# Development server
python app.py

# With custom port
python app.py --port 5001

# Production server (using Gunicorn)
gunicorn app:app --bind 0.0.0.0:5000
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

For complete API documentation including request/response examples, see [API_DOCS.md](API_DOCS.md)

### Core Endpoints

#### Health & Status
- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint

#### Colleges
- `GET /api/colleges` - List all colleges
- `GET /api/colleges/{id}` - Get college details
- `POST /api/colleges` - Create college
- `PUT /api/colleges/{id}` - Update college
- `DELETE /api/colleges/{id}` - Delete college

#### Hostels
- `GET /api/hostels` - List all hostels
- `GET /api/hostels/{id}` - Get hostel details
- `POST /api/hostels` - Create hostel
- `PUT /api/hostels/{id}` - Update hostel
- `DELETE /api/hostels/{id}` - Delete hostel
- `GET /api/hostels/nearby` - Find nearby hostels (location-based)

#### Food Vendors
- `GET /api/food-vendors` - List all food vendors
- `GET /api/food-vendors/{id}` - Get vendor details
- `POST /api/food-vendors` - Create vendor
- `PUT /api/food-vendors/{id}` - Update vendor
- `DELETE /api/food-vendors/{id}` - Delete vendor

#### Reviews
- `POST /api/reviews` - Create review for hostel/vendor
- `GET /api/reviews/{entity_type}/{id}` - Get reviews
- `DELETE /api/reviews/{id}` - Delete review

## 📁 Project Structure

```
backend/
├── app.py                    # Main Flask application
├── models.py                 # In-memory data models
├── supabase_models.py        # Supabase-based models
├── validation.py             # Input validation logic
├── supabase_client.py        # Supabase client setup
├── supabase_schema.sql       # Database schema
├── requirements.txt          # Python dependencies
├── pytest.ini               # Pytest configuration
├── test_api.py              # Comprehensive test suite
├── API_DOCS.md              # Detailed API documentation
└── .env.example             # Environment variables template
```

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run with coverage
pytest --cov=. --cov-report=html

# Run specific test file
pytest test_api.py

# Run specific test
pytest test_api.py::test_get_colleges
```

## 📊 Data Models

### College
```json
{
  "id": "string",
  "name": "string",
  "location": "string",
  "latitude": "float",
  "longitude": "float",
  "description": "string",
  "rating": "float",
  "website": "string",
  "established_year": "integer"
}
```

### Hostel
```json
{
  "id": "string",
  "name": "string",
  "location": "string",
  "latitude": "float",
  "longitude": "float",
  "price_per_night": "float",
  "amenities": ["string"],
  "rating": "float",
  "contact": "string",
  "description": "string"
}
```

### Food Vendor
```json
{
  "id": "string",
  "name": "string",
  "cuisine_type": "string",
  "location": "string",
  "latitude": "float",
  "longitude": "float",
  "price_range": "string",
  "rating": "float",
  "hours": "string",
  "contact": "string"
}
```

## 🔐 Authentication

The API supports JWT-based authentication:

```bash
# Get token (authentication endpoint)
POST /api/auth/login

# Use token in subsequent requests
Authorization: Bearer <token>
```

## 📍 Location-Based Search

The Haversine algorithm is used to calculate distances:

```bash
# Find nearby hostels (within specified radius)
GET /api/hostels/nearby?lat=40.7128&lon=-74.0060&radius_km=5
```

## 📄 Database

### In-Memory Storage
Default option for development - data stored in application memory (resets on restart).

### Supabase
For persistent data storage, configure with Supabase:

1. Create Supabase project
2. Set `USE_SUPABASE=true` in `.env`
3. Add Supabase credentials
4. Run schema: `psql < supabase_schema.sql`

## 🔍 Validation

All inputs are validated according to business rules:

- Required fields validation
- String length constraints
- Coordinate range validation
- Price range validation
- Email/contact format validation
- Review rating validation (1-5)

## ⚠️ Error Handling

API returns appropriate HTTP status codes:

- `200 OK` - Successful request
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

## 🚀 Deployment

### Heroku

```bash
# Create Procfile
# web: gunicorn app:app

git push heroku main
```

### Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "app:app"]
```

```bash
docker build -t veristay-api .
docker run -p 5000:5000 veristay-api
```

## 🐛 Troubleshooting

**Port 5000 already in use:**
```bash
# Use different port
python app.py --port 5001
```

**Import errors:**
```bash
# Ensure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

**Supabase connection issues:**
- Verify credentials in `.env`
- Check network connectivity
- Ensure database schema is created

## 📝 Code Style

- Follow PEP 8 conventions
- Use meaningful variable/function names
- Add docstrings to functions
- Write type hints where possible

## 🤝 Contributing

1. Create a feature branch
2. Write or update tests
3. Ensure all tests pass
4. Implement changes
5. Submit pull request

## 📞 Support

For issues or questions:
1. Check existing issues
2. Review API_DOCS.md
3. Test with Postman/curl
4. Create detailed issue report

## 📄 License

This project is the property of the Veristay team. All rights reserved.
