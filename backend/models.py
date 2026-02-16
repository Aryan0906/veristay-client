"""Data models for the application."""
from datetime import datetime
from typing import Dict, List, Optional
from dataclasses import dataclass, field, asdict

@dataclass
class Review:
    """Review model for a hostel."""
    id: int
    user_id: str
    rating: float
    comment: str
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self) -> Dict:
        return asdict(self)

@dataclass
class Hostel:
    """Hostel item model."""
    id: int
    name: str
    address: str
    price_min: int
    price_max: int
    lat: float
    long: float
    amenities: List[str] = field(default_factory=list)
    images: List[str] = field(default_factory=list)
    is_verified: bool = False
    reviews: List[Review] = field(default_factory=list)
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self) -> Dict:
        """Convert hostel to dictionary, handling nested objects."""
        data = asdict(self)
        data['reviews'] = [review.to_dict() for review in self.reviews]
        return data

    def update(self, name: Optional[str] = None, address: Optional[str] = None,
               price_min: Optional[int] = None, price_max: Optional[int] = None,
               lat: Optional[float] = None, long: Optional[float] = None,
               amenities: Optional[List[str]] = None, images: Optional[List[str]] = None,
               is_verified: Optional[bool] = None) -> None:
        """Update hostel fields."""
        if name is not None: self.name = name
        if address is not None: self.address = address
        if price_min is not None: self.price_min = price_min
        if price_max is not None: self.price_max = price_max
        if lat is not None: self.lat = lat
        if long is not None: self.long = long
        if amenities is not None: self.amenities = amenities
        if images is not None: self.images = images
        if is_verified is not None: self.is_verified = is_verified
        self.updated_at = datetime.utcnow().isoformat()

class HostelStore:
    """In-memory storage for hostels."""
    
    def __init__(self):
        self.hostels: Dict[int, Hostel] = {}
        self.next_id: int = 1
        self.next_review_id: int = 1

    def create(self, name: str, address: str, price_min: int, price_max: int,
               lat: float, long: float, amenities: List[str], images: List[str],
               is_verified: bool = False) -> Hostel:
        """Create a new hostel."""
        hostel = Hostel(
            id=self.next_id,
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
        self.hostels[self.next_id] = hostel
        self.next_id += 1
        return hostel

    def get_all(self) -> List[Hostel]:
        """Get all hostels."""
        return list(self.hostels.values())

    def get_by_id(self, hostel_id: int) -> Optional[Hostel]:
        """Get a hostel by ID."""
        return self.hostels.get(hostel_id)

    def update(self, hostel_id: int, **kwargs) -> Optional[Hostel]:
        """Update a hostel."""
        hostel = self.get_by_id(hostel_id)
        if hostel:
            hostel.update(**kwargs)
        return hostel

    def delete(self, hostel_id: int) -> bool:
        """Delete a hostel."""
        if hostel_id in self.hostels:
            del self.hostels[hostel_id]
            return True
        return False
        
    def add_review(self, hostel_id: int, user_id: str, rating: float, comment: str) -> Optional[Review]:
        """Add a review to a hostel."""
        hostel = self.get_by_id(hostel_id)
        if not hostel:
            return None
            
        review = Review(
            id=self.next_review_id,
            user_id=user_id,
            rating=rating,
            comment=comment
        )
        hostel.reviews.append(review)
        self.next_review_id += 1
        return review

    def clear(self) -> None:
        """Clear all hostels (useful for testing)."""
        self.hostels.clear()
        self.next_id = 1
