"""Tests for the Hostel API."""
import pytest
from app import app, hostel_store, college_store, food_store

@pytest.fixture
def client():
    """Create a test client."""
    app.config['TESTING'] = True
    hostel_store.clear()
    food_store.vendors.clear()
    food_store.next_id = 1
    with app.test_client() as client:
        yield client
    # Clear hostels after each test
    hostel_store.clear()
    food_store.vendors.clear()
    food_store.next_id = 1

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


class TestReviews:
    def test_add_review_success(self, client, sample_hostel):
        hostel_id = sample_hostel['id']
        payload = {
            "user_id": "user_1",
            "rating": 4.5,
            "comment": "Clean and safe place"
        }
        response = client.post(f'/api/hostels/{hostel_id}/reviews', json=payload)
        assert response.status_code == 201
        body = response.get_json()
        assert body['review']['user_id'] == "user_1"
        assert body['review']['rating'] == 4.5

    def test_get_reviews_with_average(self, client, sample_hostel):
        hostel_id = sample_hostel['id']
        client.post(f'/api/hostels/{hostel_id}/reviews', json={
            "user_id": "user_1", "rating": 4.0, "comment": "Good"
        })
        client.post(f'/api/hostels/{hostel_id}/reviews', json={
            "user_id": "user_2", "rating": 5.0, "comment": "Great"
        })

        response = client.get(f'/api/hostels/{hostel_id}/reviews')
        assert response.status_code == 200
        body = response.get_json()
        assert body['count'] == 2
        assert body['average_rating'] == 4.5


class TestColleges:
    def test_get_colleges(self, client):
        response = client.get('/api/colleges')
        assert response.status_code == 200
        body = response.get_json()
        assert body['count'] >= 5

    def test_get_college_with_nearby_hostels(self, client):
        college = college_store.get_all()[0]
        hostel_store.create(
            name="Near College Hostel",
            address="Nearby",
            price_min=5000,
            price_max=9000,
            lat=college.lat,
            long=college.long,
            amenities=["WiFi"],
            images=[],
            is_verified=True,
            college_id=college.id,
        )

        response = client.get(f'/api/colleges/{college.id}')
        assert response.status_code == 200
        body = response.get_json()
        assert body['college']['id'] == college.id
        assert len(body['nearby_hostels']) >= 1


class TestFood:
    def test_create_food_vendor(self, client):
        payload = {
            "name": "Test Mess",
            "type": "mess",
            "address": "Campus Road",
            "lat": 23.03,
            "long": 72.56,
            "price_min": 80,
            "price_max": 160,
            "menu_items": ["Thali", "Rice"],
            "hygiene_rating": 4.2,
            "images": ["http://example.com/food.jpg"],
            "college_id": 1,
            "is_verified": True
        }
        response = client.post('/api/food', json=payload)
        assert response.status_code == 201
        body = response.get_json()
        assert body['food_vendor']['name'] == "Test Mess"

    def test_filter_food_by_type(self, client):
        client.post('/api/food', json={
            "name": "Canteen X",
            "type": "canteen",
            "address": "Center",
            "lat": 23.04,
            "long": 72.57,
            "price_min": 60,
            "price_max": 180,
            "menu_items": ["Idli"],
            "hygiene_rating": 4.0,
            "images": []
        })
        client.post('/api/food', json={
            "name": "Street Y",
            "type": "street_food",
            "address": "Road",
            "lat": 23.02,
            "long": 72.58,
            "price_min": 40,
            "price_max": 120,
            "menu_items": ["Pav Bhaji"],
            "hygiene_rating": 3.8,
            "images": []
        })

        response = client.get('/api/food?type=canteen')
        assert response.status_code == 200
        body = response.get_json()
        assert all(v['type'] == 'canteen' for v in body['food_vendors'])
