"""Input validation for API requests."""
from typing import Dict, Any, Tuple, List

class ValidationError(Exception):
    """Custom validation error."""
    pass

def validate_hostel_create(data: Dict[str, Any]) -> Tuple[str, str, int, int, float, float, List[str], List[str], bool, int | None]:
    """
    Validate hostel creation data.
    """
    if not isinstance(data, dict):
        raise ValidationError("Request body must be a JSON object")
    
    required_fields = ['name', 'address', 'price_min', 'price_max', 'lat', 'long']
    for field in required_fields:
        if field not in data:
            raise ValidationError(f"{field} is required")
            
    name = data['name']
    if not isinstance(name, str) or not name.strip():
        raise ValidationError("Name must be a non-empty string")
        
    address = data['address']
    if not isinstance(address, str) or not address.strip():
        raise ValidationError("Address must be a non-empty string")
        
    try:
        price_min = int(data['price_min'])
        price_max = int(data['price_max'])
    except (ValueError, TypeError):
        raise ValidationError("Prices must be integers")
        
    if price_min < 0 or price_max < 0:
        raise ValidationError("Prices cannot be negative")
    if price_min > price_max:
        raise ValidationError("Minimum price cannot be greater than maximum price")
        
    try:
        lat = float(data['lat'])
        long = float(data['long'])
    except (ValueError, TypeError):
        raise ValidationError("Coordinates must be numbers")
        
    if not (-90 <= lat <= 90) or not (-180 <= long <= 180):
        raise ValidationError("Invalid coordinates")
        
    amenities = data.get('amenities', [])
    if not isinstance(amenities, list) or not all(isinstance(a, str) for a in amenities):
        raise ValidationError("Amenities must be a list of strings")
        
    images = data.get('images', [])
    if not isinstance(images, list) or not all(isinstance(i, str) for i in images):
        raise ValidationError("Images must be a list of URL strings")
        
    is_verified = bool(data.get('is_verified', False))

    college_id = data.get('college_id')
    if college_id is not None:
        try:
            college_id = int(college_id)
            if college_id <= 0:
                raise ValueError
        except (ValueError, TypeError):
            raise ValidationError("college_id must be a positive integer")

    return name.strip(), address.strip(), price_min, price_max, lat, long, amenities, images, is_verified, college_id

def validate_hostel_update(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate hostel update data.
    """
    if not isinstance(data, dict):
        raise ValidationError("Request body must be a JSON object")
        
    if not data:
        raise ValidationError("At least one field must be provided for update")
        
    validated_data = {}
    
    if 'name' in data:
        if not isinstance(data['name'], str) or not data['name'].strip():
            raise ValidationError("Name must be a non-empty string")
        validated_data['name'] = data['name'].strip()
        
    if 'address' in data:
        if not isinstance(data['address'], str) or not data['address'].strip():
            raise ValidationError("Address must be a non-empty string")
        validated_data['address'] = data['address'].strip()
        
    if 'price_min' in data or 'price_max' in data:
        # Note: Ideally we would validate their relation here, but we might only be updating one
        # For simplicity, we just check types if present
        if 'price_min' in data:
            try:
                val = int(data['price_min'])
                if val < 0: raise ValueError
                validated_data['price_min'] = val
            except (ValueError, TypeError):
                raise ValidationError("price_min must be a non-negative integer")
                
        if 'price_max' in data:
            try:
                val = int(data['price_max'])
                if val < 0: raise ValueError
                validated_data['price_max'] = val
            except (ValueError, TypeError):
                raise ValidationError("price_max must be a non-negative integer")

    if 'lat' in data:
        try:
            val = float(data['lat'])
            if not (-90 <= val <= 90): raise ValueError
            validated_data['lat'] = val
        except (ValueError, TypeError):
            raise ValidationError("Invalid latitude")
            
    if 'long' in data:
        try:
            val = float(data['long'])
            if not (-180 <= val <= 180): raise ValueError
            validated_data['long'] = val
        except (ValueError, TypeError):
            raise ValidationError("Invalid longitude")
            
    if 'amenities' in data:
        if not isinstance(data['amenities'], list) or not all(isinstance(a, str) for a in data['amenities']):
            raise ValidationError("Amenities must be a list of strings")
        validated_data['amenities'] = data['amenities']
        
    if 'images' in data:
        if not isinstance(data['images'], list) or not all(isinstance(i, str) for i in data['images']):
            raise ValidationError("Images must be a list of URL strings")
        validated_data['images'] = data['images']
        
    if 'is_verified' in data:
        validated_data['is_verified'] = bool(data['is_verified'])

    if 'college_id' in data:
        if data['college_id'] is None:
            validated_data['college_id'] = None
        else:
            try:
                val = int(data['college_id'])
                if val <= 0:
                    raise ValueError
                validated_data['college_id'] = val
            except (ValueError, TypeError):
                raise ValidationError("college_id must be a positive integer")
        
    return validated_data

def validate_hostel_id(hostel_id: str) -> int:
    """Validate and convert hostel ID."""
    try:
        id_int = int(hostel_id)
        if id_int <= 0:
            raise ValidationError("Hostel ID must be a positive integer")
        return id_int
    except ValueError:
        raise ValidationError("Hostel ID must be a valid integer")


def validate_review_create(data: Dict[str, Any]) -> Tuple[str, float, str]:
    """Validate review creation data."""
    if not isinstance(data, dict):
        raise ValidationError("Request body must be a JSON object")

    for field in ["user_id", "rating", "comment"]:
        if field not in data:
            raise ValidationError(f"{field} is required")

    user_id = data["user_id"]
    if not isinstance(user_id, str) or not user_id.strip():
        raise ValidationError("user_id must be a non-empty string")

    try:
        rating = float(data["rating"])
    except (ValueError, TypeError):
        raise ValidationError("rating must be a number")

    if rating < 1.0 or rating > 5.0:
        raise ValidationError("rating must be between 1.0 and 5.0")

    comment = data["comment"]
    if not isinstance(comment, str):
        raise ValidationError("comment must be a string")

    comment = comment.strip()
    if len(comment) < 1 or len(comment) > 500:
        raise ValidationError("comment must be between 1 and 500 characters")

    return user_id.strip(), rating, comment


def _validate_food_common(data: Dict[str, Any], partial: bool) -> Dict[str, Any]:
    if not isinstance(data, dict):
        raise ValidationError("Request body must be a JSON object")

    required = [
        "name",
        "type",
        "address",
        "lat",
        "long",
        "price_min",
        "price_max",
        "menu_items",
        "hygiene_rating",
        "images",
    ]

    if not partial:
        for field in required:
            if field not in data:
                raise ValidationError(f"{field} is required")
    elif not data:
        raise ValidationError("At least one field must be provided for update")

    validated: Dict[str, Any] = {}

    if "name" in data:
        if not isinstance(data["name"], str) or not data["name"].strip():
            raise ValidationError("name must be a non-empty string")
        validated["name"] = data["name"].strip()

    if "type" in data:
        if data["type"] not in ["mess", "canteen", "street_food"]:
            raise ValidationError("type must be one of: mess, canteen, street_food")
        validated["type"] = data["type"]

    if "address" in data:
        if not isinstance(data["address"], str) or not data["address"].strip():
            raise ValidationError("address must be a non-empty string")
        validated["address"] = data["address"].strip()

    if "lat" in data:
        try:
            lat = float(data["lat"])
            if lat < -90 or lat > 90:
                raise ValueError
            validated["lat"] = lat
        except (ValueError, TypeError):
            raise ValidationError("lat must be a valid latitude")

    if "long" in data:
        try:
            lon = float(data["long"])
            if lon < -180 or lon > 180:
                raise ValueError
            validated["long"] = lon
        except (ValueError, TypeError):
            raise ValidationError("long must be a valid longitude")

    if "price_min" in data:
        try:
            price_min = int(data["price_min"])
            if price_min < 0:
                raise ValueError
            validated["price_min"] = price_min
        except (ValueError, TypeError):
            raise ValidationError("price_min must be a non-negative integer")

    if "price_max" in data:
        try:
            price_max = int(data["price_max"])
            if price_max < 0:
                raise ValueError
            validated["price_max"] = price_max
        except (ValueError, TypeError):
            raise ValidationError("price_max must be a non-negative integer")

    if "price_min" in validated and "price_max" in validated:
        if validated["price_min"] > validated["price_max"]:
            raise ValidationError("price_min cannot be greater than price_max")

    if "menu_items" in data:
        if not isinstance(data["menu_items"], list) or not all(
            isinstance(item, str) and item.strip() for item in data["menu_items"]
        ):
            raise ValidationError("menu_items must be a list of non-empty strings")
        validated["menu_items"] = [item.strip() for item in data["menu_items"]]

    if "hygiene_rating" in data:
        try:
            hygiene_rating = float(data["hygiene_rating"])
        except (ValueError, TypeError):
            raise ValidationError("hygiene_rating must be a number")
        if hygiene_rating < 0.0 or hygiene_rating > 5.0:
            raise ValidationError("hygiene_rating must be between 0.0 and 5.0")
        validated["hygiene_rating"] = hygiene_rating

    if "images" in data:
        if not isinstance(data["images"], list) or not all(
            isinstance(img, str) for img in data["images"]
        ):
            raise ValidationError("images must be a list of strings")
        validated["images"] = data["images"]

    if "college_id" in data:
        if data["college_id"] is None:
            validated["college_id"] = None
        else:
            try:
                college_id = int(data["college_id"])
                if college_id <= 0:
                    raise ValueError
                validated["college_id"] = college_id
            except (ValueError, TypeError):
                raise ValidationError("college_id must be a positive integer")

    if "is_verified" in data:
        validated["is_verified"] = bool(data["is_verified"])

    return validated


def validate_food_create(data: Dict[str, Any]) -> Dict[str, Any]:
    """Validate food vendor creation payload."""
    return _validate_food_common(data, partial=False)


def validate_food_update(data: Dict[str, Any]) -> Dict[str, Any]:
    """Validate food vendor update payload."""
    return _validate_food_common(data, partial=True)
