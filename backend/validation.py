"""Input validation for API requests."""
from typing import Dict, Any, Tuple, Optional, List
import re

class ValidationError(Exception):
    """Custom validation error."""
    pass

def validate_hostel_create(data: Dict[str, Any]) -> Tuple[str, str, int, int, float, float, List[str], List[str], bool]:
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
    
    return name.strip(), address.strip(), price_min, price_max, lat, long, amenities, images, is_verified

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
