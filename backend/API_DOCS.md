# TODO REST API

A REST API for managing todos with full CRUD operations, input validation, and comprehensive tests.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete todos
- ✅ **Input Validation**: Comprehensive validation for all inputs
- ✅ **Error Handling**: Proper HTTP status codes and error messages
- ✅ **Testing**: Comprehensive test suite with 40+ tests
- ✅ **CORS Enabled**: Cross-Origin Resource Sharing enabled for all routes

## API Endpoints

### Health Check
- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint

### Todo Operations

#### Get All Todos
```
GET /api/todos
```
Returns a list of all todos with count.

**Response (200 OK):**
```json
{
  "todos": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "created_at": "2024-01-15T10:30:00.000000",
      "updated_at": "2024-01-15T10:30:00.000000"
    }
  ],
  "count": 1
}
```

#### Create Todo
```
POST /api/todos
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"  // optional
}
```

**Validation Rules:**
- `title`: Required, string, 1-200 characters, cannot be empty/whitespace
- `description`: Optional, string, max 1000 characters

**Response (201 Created):**
```json
{
  "message": "Todo created successfully",
  "todo": {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "created_at": "2024-01-15T10:30:00.000000",
    "updated_at": "2024-01-15T10:30:00.000000"
  }
}
```

#### Get Todo by ID
```
GET /api/todos/{id}
```

**Response (200 OK):**
```json
{
  "todo": {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "created_at": "2024-01-15T10:30:00.000000",
    "updated_at": "2024-01-15T10:30:00.000000"
  }
}
```

**Response (404 Not Found):**
```json
{
  "error": "Todo not found"
}
```

#### Update Todo
```
PUT /api/todos/{id}
Content-Type: application/json
```

**Request Body (all fields optional, but at least one required):**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

**Validation Rules:**
- At least one field must be provided
- `title`: String, 1-200 characters, cannot be empty/whitespace
- `description`: String, max 1000 characters
- `completed`: Boolean
- No unexpected fields allowed

**Response (200 OK):**
```json
{
  "message": "Todo updated successfully",
  "todo": {
    "id": 1,
    "title": "Updated title",
    "description": "Updated description",
    "completed": true,
    "created_at": "2024-01-15T10:30:00.000000",
    "updated_at": "2024-01-15T10:35:00.000000"
  }
}
```

#### Delete Todo
```
DELETE /api/todos/{id}
```

**Response (200 OK):**
```json
{
  "message": "Todo deleted successfully"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Todo not found"
}
```

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes
- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST (todo created)
- `400 Bad Request` - Validation error or invalid input
- `404 Not Found` - Todo or endpoint not found
- `405 Method Not Allowed` - HTTP method not supported
- `500 Internal Server Error` - Server error

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python app.py
```

The server will start on `http://0.0.0.0:5000`

## Running Tests

Run all tests:
```bash
pytest
```

Run tests with coverage:
```bash
pytest --cov=. --cov-report=html
```

Run specific test class:
```bash
pytest test_api.py::TestCreateTodo
```

Run specific test:
```bash
pytest test_api.py::TestCreateTodo::test_create_todo_success
```

## Test Coverage

The test suite includes:
- ✅ 40+ test cases
- ✅ All CRUD operations
- ✅ Input validation tests
- ✅ Error handling tests
- ✅ Edge cases
- ✅ Integration tests
- ✅ Complete workflow tests

### Test Categories:
1. **Health Endpoints** - Basic endpoint tests
2. **Create Todo** - Todo creation with various inputs
3. **Get Todos** - Retrieving todos (all and by ID)
4. **Update Todo** - Updating todo fields
5. **Delete Todo** - Todo deletion
6. **Edge Cases** - Error scenarios and boundary conditions
7. **Integration** - Complete CRUD workflows

## Data Model

### Todo
```python
{
  "id": int,              # Auto-generated, unique
  "title": str,           # Required, 1-200 chars
  "description": str,     # Optional, max 1000 chars
  "completed": bool,      # Default: false
  "created_at": str,      # ISO 8601 timestamp
  "updated_at": str       # ISO 8601 timestamp
}
```

## Project Structure

```
backend/
├── app.py              # Main Flask application with endpoints
├── models.py           # Data models and storage
├── validation.py       # Input validation logic
├── test_api.py         # Comprehensive test suite
├── requirements.txt    # Python dependencies
├── pytest.ini          # Pytest configuration
└── README.md          # This file
```

## Development

### Adding New Features
1. Update models in `models.py`
2. Add validation in `validation.py`
3. Implement endpoints in `app.py`
4. Write tests in `test_api.py`

### Code Quality
- All inputs are validated
- Proper error handling with appropriate status codes
- Clean separation of concerns
- Comprehensive test coverage
- Type hints where applicable

## Storage

Currently uses in-memory storage. Data is lost when the server restarts. For production use, consider:
- SQLite database
- PostgreSQL
- MongoDB
- Redis

## License

MIT
