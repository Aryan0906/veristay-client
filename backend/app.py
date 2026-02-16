from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.exceptions import BadRequest
import os
from models import HostelStore
from validation import (
    validate_hostel_create, 
    validate_hostel_update, 
    validate_hostel_id, 
    ValidationError
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize hostel store
hostel_store = HostelStore()

# Seed some initial data for testing/demo purposes
hostel_store.create(
    name="Stanza Living",
    address="Navrangpura, Ahmedabad",
    price_min=12000,
    price_max=18000,
    lat=23.0365,
    long=72.5611,
    amenities=["WiFi", "AC", "Laundry", "Meals"],
    images=["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
    is_verified=True
)
hostel_store.create(
    name="Your Space",
    address="Vastrapur, Ahmedabad",
    price_min=10000,
    price_max=15000,
    lat=23.0450,
    long=72.5250,
    amenities=["WiFi", "Laundry", "Gym"],
    images=["https://images.unsplash.com/photo-1596276020587-8044fe049813?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
    is_verified=True
)


@app.route('/')
def home():
    return jsonify({"message": "Welcome to the VeriStay Backend!"})

@app.route('/api/health')
def health_check():
    return jsonify({"status": "healthy", "service": "veristay-backend"})


# Hostel API Endpoints

@app.route('/api/hostels', methods=['GET'])
def get_hostels():
    """Get all verified hostels."""
    hostels = hostel_store.get_all()
    # In a real app, we might filter by is_verified=True by default for public view
    # For now, we return all
    return jsonify({
        "hostels": [hostel.to_dict() for hostel in hostels],
        "count": len(hostels)
    }), 200


@app.route('/api/hostels', methods=['POST'])
def create_hostel():
    """Create a new hostel (Admin only)."""
    try:
        try:
            data = request.get_json()
        except BadRequest:
            return jsonify({"error": "Invalid JSON"}), 400
            
        if data is None:
            return jsonify({"error": "Invalid JSON"}), 400
            
        # Validate data
        try:
            name, address, price_min, price_max, lat, long, amenities, images, is_verified = validate_hostel_create(data)
        except ValidationError as e:
            return jsonify({"error": str(e)}), 400

        hostel = hostel_store.create(
            name=name,
            address=address,
            price_min=price_min,
            price_max=price_max,
            lat=lat,
            long=long,
            amenities=amenities,
            images=images,
            is_verified=is_verified
        )
        
        return jsonify({
            "message": "Hostel created successfully",
            "hostel": hostel.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/hostels/<hostel_id>', methods=['GET'])
def get_hostel(hostel_id):
    """Get a specific hostel by ID."""
    try:
        id_int = validate_hostel_id(hostel_id)
        hostel = hostel_store.get_by_id(id_int)
        
        if not hostel:
            return jsonify({"error": "Hostel not found"}), 404
        
        return jsonify({"hostel": hostel.to_dict()}), 200
        
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/hostels/<hostel_id>', methods=['PUT'])
def update_hostel(hostel_id):
    """Update a hostel."""
    try:
        id_int = validate_hostel_id(hostel_id)
        
        try:
            data = request.get_json()
        except BadRequest:
            return jsonify({"error": "Invalid JSON"}), 400
            
        if data is None:
            return jsonify({"error": "Invalid JSON"}), 400
            
        try:
            update_data = validate_hostel_update(data)
        except ValidationError as e:
            return jsonify({"error": str(e)}), 400
        
        hostel = hostel_store.update(id_int, **update_data)
        
        if not hostel:
            return jsonify({"error": "Hostel not found"}), 404
        
        return jsonify({
            "message": "Hostel updated successfully",
            "hostel": hostel.to_dict()
        }), 200
        
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print(f"Error updating hostel: {e}")
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/hostels/<hostel_id>', methods=['DELETE'])
def delete_hostel(hostel_id):
    """Delete a hostel."""
    try:
        id_int = validate_hostel_id(hostel_id)
        success = hostel_store.delete(id_int)
        
        if not success:
            return jsonify({"error": "Hostel not found"}), 404
        
        return jsonify({"message": "Hostel deleted successfully"}), 200
        
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500


# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({"error": "Method not allowed"}), 405


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
