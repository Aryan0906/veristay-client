from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.exceptions import BadRequest
import math
import os
import jwt
from models import HostelStore, CollegeStore, FoodVendorStore
from supabase_models import SupabaseHostelStore, SupabaseCollegeStore, SupabaseFoodVendorStore
from validation import (
    validate_hostel_create,
    validate_hostel_update,
    validate_hostel_id,
    validate_review_create,
    validate_food_create,
    validate_food_update,
    ValidationError,
)

app = Flask(__name__)
# Allow CORS for anything in dev, or specify frontend domains here easily
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize stores
USE_SUPABASE = os.environ.get('USE_SUPABASE', 'false').lower() == 'true'

if USE_SUPABASE:
    hostel_store = SupabaseHostelStore()
    college_store = SupabaseCollegeStore()
    food_store = SupabaseFoodVendorStore()
else:
    hostel_store = HostelStore()
    college_store = CollegeStore()
    food_store = FoodVendorStore()


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance in KM between two coordinates."""
    radius_km = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return radius_km * c

# Seed some initial data for testing/demo purposes
if not USE_SUPABASE:
    ldce = college_store.create("LDCE", "Navrangpura", 23.0285, 72.5872)
    cept = college_store.create("CEPT University", "Navrangpura", 23.0395, 72.5498)
    nirma = college_store.create("Nirma University", "Chharodi", 23.1170, 72.5200)
    gls = college_store.create("GLS University", "Ellisbridge", 23.0407, 72.5717)
    pdpu = college_store.create("PDPU", "Raisan", 23.1568, 72.6625)

    hostel_store.create(
    name="Stanza Living",
    address="Navrangpura, Ahmedabad",
    price_min=12000,
    price_max=18000,
    lat=23.0365,
    long=72.5611,
    amenities=["WiFi", "AC", "Laundry", "Meals"],
    images=["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
    is_verified=True,
    college_id=gls.id,
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
    is_verified=True,
    college_id=cept.id,
    )
    hostel_store.create(
    name="Campus Nest",
    address="Near Nirma University, Ahmedabad",
    price_min=9000,
    price_max=14000,
    lat=23.1122,
    long=72.5265,
    amenities=["WiFi", "Meals", "Gym"],
    images=["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"],
    is_verified=False,
    college_id=nirma.id,
    )

    food_store.create(
    name="Gajanand Pauva House",
    type="street_food",
    address="Vastrapur Lake Road, Ahmedabad",
    lat=23.0392,
    long=72.5296,
    price_min=50,
    price_max=140,
    menu_items=["Cheese Pauva", "Masala Pauva", "Tea"],
    hygiene_rating=4.1,
    images=["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"],
    college_id=cept.id,
    is_verified=True,
    )
    food_store.create(
    name="Nirma Canteen",
    type="canteen",
    address="Nirma University Campus",
    lat=23.1167,
    long=72.5205,
    price_min=70,
    price_max=180,
    menu_items=["Thali", "Sandwich", "Cold Coffee"],
    hygiene_rating=4.3,
    images=["https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80"],
    college_id=nirma.id,
    is_verified=True,
    )
    food_store.create(
    name="GLS Mess Hub",
    type="mess",
    address="Law Garden, Ellisbridge",
    lat=23.0312,
    long=72.5650,
    price_min=90,
    price_max=170,
    menu_items=["Gujarati Thali", "Dal-Rice", "Chapati Sabzi"],
    hygiene_rating=4.0,
    images=["https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80"],
    college_id=gls.id,
    is_verified=False,
    )
    food_store.create(
    name="LD Night Bites",
    type="street_food",
    address="University Area, Navrangpura",
    lat=23.0291,
    long=72.5868,
    price_min=60,
    price_max=150,
    menu_items=["Maggi", "Frankie", "Bhel"],
    hygiene_rating=3.9,
    images=["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80"],
    college_id=ldce.id,
    is_verified=False,
    )
    food_store.create(
    name="PDPU Student Cafe",
    type="canteen",
    address="PDPU Main Gate, Raisan",
    lat=23.1564,
    long=72.6611,
    price_min=80,
    price_max=190,
    menu_items=["Poha", "Upma", "South Indian Combo"],
    hygiene_rating=4.2,
    images=["https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80"],
    college_id=pdpu.id,
    is_verified=True,
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
    """Get all hostels with optional filters."""
    hostels = hostel_store.get_all()

    college_id = request.args.get("college_id")
    if college_id:
        try:
            college_id_int = int(college_id)
        except ValueError:
            return jsonify({"error": "college_id must be an integer"}), 400
        college = college_store.get_by_id(college_id_int)
        if not college:
            return jsonify({"error": "College not found"}), 404
        hostels = [
            h
            for h in hostels
            if haversine_km(h.lat, h.long, college.lat, college.long) < 5.0
        ]

    price_max = request.args.get("price_max")
    if price_max:
        try:
            price_max_int = int(price_max)
        except ValueError:
            return jsonify({"error": "price_max must be an integer"}), 400
        hostels = [h for h in hostels if h.price_min <= price_max_int]

    amenities = request.args.get("amenities")
    if amenities:
        requested = [a.strip().lower() for a in amenities.split(",") if a.strip()]
        hostels = [
            h
            for h in hostels
            if all(req in {a.lower() for a in h.amenities} for req in requested)
        ]

    verified_only = request.args.get("verified_only")
    if verified_only and verified_only.lower() == "true":
        hostels = [h for h in hostels if h.is_verified]

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
            name, address, price_min, price_max, lat, long, amenities, images, is_verified, college_id = validate_hostel_create(data)
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
            is_verified=is_verified,
            college_id=college_id,
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


@app.route('/api/hostels/<hostel_id>/reviews', methods=['POST'])
def add_hostel_review(hostel_id):
    """Create a review for a hostel."""
    try:
        id_int = validate_hostel_id(hostel_id)

        try:
            data = request.get_json()
        except BadRequest:
            return jsonify({"error": "Invalid JSON"}), 400

        if data is None:
            return jsonify({"error": "Invalid JSON"}), 400

        try:
            user_id, rating, comment = validate_review_create(data)
        except ValidationError as e:
            return jsonify({"error": str(e)}), 400

        # Replace user_id with the decoded token email if present
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            secret = os.getenv("SUPABASE_JWT_SECRET")
            if secret:
                try:
                    # Supabase JWTs use HS256, and they inject the user's email if available
                    decoded = jwt.decode(token, secret, algorithms=["HS256"], audience="authenticated")
                    # Supabase stores email in the JWT payload
                    if "email" in decoded:
                        user_id = decoded["email"]
                except Exception as ex:
                    print(f"Failed to decode JWT: {ex}")

        review = hostel_store.add_review(id_int, user_id=user_id, rating=rating, comment=comment)
        if not review:
            return jsonify({"error": "Hostel not found"}), 404

        return jsonify({"review": review.to_dict()}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception:
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/hostels/<hostel_id>/reviews', methods=['GET'])
def get_hostel_reviews(hostel_id):
    """Get reviews for a hostel and average rating."""
    try:
        id_int = validate_hostel_id(hostel_id)
        hostel = hostel_store.get_by_id(id_int)
        if not hostel:
            return jsonify({"error": "Hostel not found"}), 404

        reviews = [r.to_dict() for r in hostel.reviews]
        avg = round(sum(r["rating"] for r in reviews) / len(reviews), 2) if reviews else 0.0

        return jsonify(
            {
                "hostel_id": id_int,
                "reviews": reviews,
                "count": len(reviews),
                "average_rating": avg,
            }
        ), 200
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except Exception:
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/colleges', methods=['GET'])
def get_colleges():
    colleges = college_store.get_all()
    return jsonify({"colleges": [c.to_dict() for c in colleges], "count": len(colleges)}), 200


@app.route('/api/colleges/<college_id>', methods=['GET'])
def get_college_by_id(college_id):
    try:
        college_id_int = int(college_id)
        if college_id_int <= 0:
            return jsonify({"error": "College ID must be a positive integer"}), 400
    except ValueError:
        return jsonify({"error": "College ID must be a valid integer"}), 400

    college = college_store.get_by_id(college_id_int)
    if not college:
        return jsonify({"error": "College not found"}), 404

    nearby_hostels = [
        h.to_dict()
        for h in hostel_store.get_all()
        if haversine_km(h.lat, h.long, college.lat, college.long) < 5.0
    ]
    return jsonify({"college": college.to_dict(), "nearby_hostels": nearby_hostels}), 200


@app.route('/api/food', methods=['GET'])
def get_food_vendors():
    vendors = food_store.get_all()

    college_id = request.args.get("college_id")
    if college_id:
        try:
            college_id_int = int(college_id)
        except ValueError:
            return jsonify({"error": "college_id must be an integer"}), 400
        vendors = [v for v in vendors if v.college_id == college_id_int]

    max_price = request.args.get("max_price")
    if max_price:
        try:
            max_price_int = int(max_price)
        except ValueError:
            return jsonify({"error": "max_price must be an integer"}), 400
        vendors = [v for v in vendors if v.price_min <= max_price_int]

    vendor_type = request.args.get("type")
    if vendor_type:
        vendors = [v for v in vendors if v.type == vendor_type]

    return jsonify({"food_vendors": [v.to_dict() for v in vendors], "count": len(vendors)}), 200


@app.route('/api/food/<vendor_id>', methods=['GET'])
def get_food_vendor(vendor_id):
    try:
        vendor_id_int = int(vendor_id)
        if vendor_id_int <= 0:
            return jsonify({"error": "Food vendor ID must be a positive integer"}), 400
    except ValueError:
        return jsonify({"error": "Food vendor ID must be a valid integer"}), 400

    vendor = food_store.get_by_id(vendor_id_int)
    if not vendor:
        return jsonify({"error": "Food vendor not found"}), 404
    return jsonify({"food_vendor": vendor.to_dict()}), 200


@app.route('/api/food', methods=['POST'])
def create_food_vendor():
    try:
        try:
            data = request.get_json()
        except BadRequest:
            return jsonify({"error": "Invalid JSON"}), 400

        if data is None:
            return jsonify({"error": "Invalid JSON"}), 400

        try:
            validated = validate_food_create(data)
        except ValidationError as e:
            return jsonify({"error": str(e)}), 400

        vendor = food_store.create(**validated)
        return jsonify({"message": "Food vendor created successfully", "food_vendor": vendor.to_dict()}), 201
    except Exception:
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/food/<vendor_id>', methods=['PUT'])
def update_food_vendor(vendor_id):
    try:
        try:
            vendor_id_int = int(vendor_id)
            if vendor_id_int <= 0:
                return jsonify({"error": "Food vendor ID must be a positive integer"}), 400
        except ValueError:
            return jsonify({"error": "Food vendor ID must be a valid integer"}), 400

        try:
            data = request.get_json()
        except BadRequest:
            return jsonify({"error": "Invalid JSON"}), 400

        if data is None:
            return jsonify({"error": "Invalid JSON"}), 400

        try:
            validated = validate_food_update(data)
        except ValidationError as e:
            return jsonify({"error": str(e)}), 400

        vendor = food_store.update(vendor_id_int, **validated)
        if not vendor:
            return jsonify({"error": "Food vendor not found"}), 404

        return jsonify({"message": "Food vendor updated successfully", "food_vendor": vendor.to_dict()}), 200
    except Exception:
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/food/<vendor_id>', methods=['DELETE'])
def delete_food_vendor(vendor_id):
    try:
        try:
            vendor_id_int = int(vendor_id)
            if vendor_id_int <= 0:
                return jsonify({"error": "Food vendor ID must be a positive integer"}), 400
        except ValueError:
            return jsonify({"error": "Food vendor ID must be a valid integer"}), 400

        success = food_store.delete(vendor_id_int)
        if not success:
            return jsonify({"error": "Food vendor not found"}), 404
        return jsonify({"message": "Food vendor deleted successfully"}), 200
    except Exception:
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
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
