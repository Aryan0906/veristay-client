"""Tests for the Hostel API."""
import pytest
import json
from app import app, hostel_store

@pytest.fixture
def client():
    """Create a test client."""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client
    # Clear hostels after each test
    hostel_store.clear()

@pytest.fixture
def sample_hostel(client):
    """Create a sample hostel for testing."""
    data = {
        "name": "Test Hostel",
        "address": "123 Test St",
        "price_min": 5000,
        "price_max": 8000,
        "lat": 23.0,
        "long": 72.0,
        "amenities": ["WiFi"],
        "images": ["http://example.com/image.jpg"],
        "is_verified": True
    }
    response = client.post('/api/hostels', json=data)
    return response.get_json()['hostel']

class TestHealthEndpoints:
    def test_health_check(self, client):
        """Test health check endpoint."""
        response = client.get('/api/health')
        assert response.status_code == 200
        data = response.get_json()
        assert data['status'] == 'healthy'

class TestCreateHostel:
    def test_create_hostel_success(self, client):
        """Test successful hostel creation."""
        data = {
            "name": "New Hostel",
            "address": "456 New St",
            "price_min": 6000,
            "price_max": 9000,
            "lat": 23.1,
            "long": 72.1,
            "amenities": ["AC"],
            "images": ["http://example.com/img.jpg"]
        }
        response = client.post('/api/hostels', json=data)
        assert response.status_code == 201
        data = response.get_json()
        assert 'hostel' in data
        assert data['hostel']['name'] == "New Hostel"
        assert 'id' in data['hostel']

    def test_create_hostel_missing_fields(self, client):
        """Test creating hostel with missing fields."""
        response = client.post('/api/hostels', json={"name": "Incomplete"})
        assert response.status_code == 400
        data = response.get_json()
        assert 'error' in data

    def test_create_hostel_invalid_prices(self, client):
        """Test creating hostel with invalid prices."""
        data = {
            "name": "Bad Price Hostel",
            "address": "Address",
            "price_min": 10000,
            "price_max": 5000, # Min > Max
            "lat": 23.0,
            "long": 72.0,
            "amenities": [],
            "images": []
        }
        response = client.post('/api/hostels', json=data)
        assert response.status_code == 400

class TestGetHostels:
    def test_get_all_hostels(self, client):
        """Test getting all hostels."""
        client.post('/api/hostels', json={
            "name": "H1", "address": "A1", "price_min": 1000, "price_max": 2000,
            "lat": 1.0, "long": 1.0, "amenities": [], "images": []
        })
        client.post('/api/hostels', json={
            "name": "H2", "address": "A2", "price_min": 1000, "price_max": 2000,
            "lat": 2.0, "long": 2.0, "amenities": [], "images": []
        })
        
        response = client.get('/api/hostels')
        assert response.status_code == 200
        data = response.get_json()
        assert data['count'] == 2
        assert len(data['hostels']) == 2

    def test_get_hostel_by_id(self, client, sample_hostel):
        """Test getting a specific hostel by ID."""
        hostel_id = sample_hostel['id']
        response = client.get(f'/api/hostels/{hostel_id}')
        assert response.status_code == 200
        data = response.get_json()
        assert data['hostel']['id'] == hostel_id
        assert data['hostel']['name'] == "Test Hostel"

    def test_get_hostel_not_found(self, client):
        """Test getting non-existent hostel."""
        response = client.get('/api/hostels/999')
        assert response.status_code == 404

class TestUpdateHostel:
    def test_update_hostel(self, client, sample_hostel):
        """Test updating hostel."""
        hostel_id = sample_hostel['id']
        response = client.put(f'/api/hostels/{hostel_id}', json={"name": "Updated Name"})
        assert response.status_code == 200
        data = response.get_json()
        assert data['hostel']['name'] == "Updated Name"
        
    def test_update_hostel_invalid(self, client, sample_hostel):
        """Test update with invalid data."""
        hostel_id = sample_hostel['id']
        response = client.put(f'/api/hostels/{hostel_id}', json={"price_min": -100})
        assert response.status_code == 400

class TestDeleteHostel:
    def test_delete_hostel(self, client, sample_hostel):
        """Test deleting hostel."""
        hostel_id = sample_hostel['id']
        response = client.delete(f'/api/hostels/{hostel_id}')
        assert response.status_code == 200
        
        # Verify it's gone
        get_response = client.get(f'/api/hostels/{hostel_id}')
        assert get_response.status_code == 404
