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
    college_id: Optional[int] = None
    amenities: List[str] = field(default_factory=list)
    images: List[str] = field(default_factory=list)
    is_verified: bool = False
    reviews: List[Review] = field(default_factory=list)
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self) -> Dict:
        """Convert hostel to dictionary, handling nested objects."""
        data = asdict(self)
        data["reviews"] = [review.to_dict() for review in self.reviews]
        return data

    def update(
        self,
        name: Optional[str] = None,
        address: Optional[str] = None,
        price_min: Optional[int] = None,
        price_max: Optional[int] = None,
        lat: Optional[float] = None,
        long: Optional[float] = None,
        college_id: Optional[int] = None,
        amenities: Optional[List[str]] = None,
        images: Optional[List[str]] = None,
        is_verified: Optional[bool] = None,
    ) -> None:
        """Update hostel fields."""
        if name is not None:
            self.name = name
        if address is not None:
            self.address = address
        if price_min is not None:
            self.price_min = price_min
        if price_max is not None:
            self.price_max = price_max
        if lat is not None:
            self.lat = lat
        if long is not None:
            self.long = long
        if college_id is not None:
            self.college_id = college_id
        if amenities is not None:
            self.amenities = amenities
        if images is not None:
            self.images = images
        if is_verified is not None:
            self.is_verified = is_verified
        self.updated_at = datetime.utcnow().isoformat()


@dataclass
class College:
    """College model."""
    id: int
    name: str
    area: str
    lat: float
    long: float
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self) -> Dict:
        return asdict(self)


@dataclass
class FoodVendor:
    """Food vendor model."""
    id: int
    name: str
    type: str
    address: str
    lat: float
    long: float
    price_min: int
    price_max: int
    menu_items: List[str] = field(default_factory=list)
    hygiene_rating: float = 0.0
    images: List[str] = field(default_factory=list)
    college_id: Optional[int] = None
    is_verified: bool = False
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self) -> Dict:
        return asdict(self)

    def update(self, **kwargs) -> None:
        allowed = {
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
            "college_id",
            "is_verified",
        }
        for key, value in kwargs.items():
            if key in allowed:
                setattr(self, key, value)
        self.updated_at = datetime.utcnow().isoformat()


class HostelStore:
    """In-memory storage for hostels."""

    def __init__(self):
        self.hostels: Dict[int, Hostel] = {}
        self.next_id: int = 1
        self.next_review_id: int = 1

    def create(
        self,
        name: str,
        address: str,
        price_min: int,
        price_max: int,
        lat: float,
        long: float,
        amenities: List[str],
        images: List[str],
        is_verified: bool = False,
        college_id: Optional[int] = None,
    ) -> Hostel:
        """Create a new hostel."""
        hostel = Hostel(
            id=self.next_id,
            name=name,
            address=address,
            price_min=price_min,
            price_max=price_max,
            lat=lat,
            long=long,
            college_id=college_id,
            amenities=amenities,
            images=images,
            is_verified=is_verified,
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

    def add_review(
        self, hostel_id: int, user_id: str, rating: float, comment: str
    ) -> Optional[Review]:
        """Add a review to a hostel."""
        hostel = self.get_by_id(hostel_id)
        if not hostel:
            return None

        review = Review(
            id=self.next_review_id,
            user_id=user_id,
            rating=rating,
            comment=comment,
        )
        hostel.reviews.append(review)
        self.next_review_id += 1
        return review

    def clear(self) -> None:
        """Clear all hostels (useful for testing)."""
        self.hostels.clear()
        self.next_id = 1
        self.next_review_id = 1


class CollegeStore:
    """In-memory storage for colleges."""

    def __init__(self):
        self.colleges: Dict[int, College] = {}
        self.next_id: int = 1

    def create(self, name: str, area: str, lat: float, long: float) -> College:
        college = College(
            id=self.next_id,
            name=name,
            area=area,
            lat=lat,
            long=long,
        )
        self.colleges[self.next_id] = college
        self.next_id += 1
        return college

    def get_all(self) -> List[College]:
        return list(self.colleges.values())

    def get_by_id(self, college_id: int) -> Optional[College]:
        return self.colleges.get(college_id)


class FoodVendorStore:
    """In-memory storage for food vendors."""

    def __init__(self):
        self.vendors: Dict[int, FoodVendor] = {}
        self.next_id: int = 1

    def create(
        self,
        name: str,
        type: str,
        address: str,
        lat: float,
        long: float,
        price_min: int,
        price_max: int,
        menu_items: List[str],
        hygiene_rating: float,
        images: List[str],
        college_id: Optional[int] = None,
        is_verified: bool = False,
    ) -> FoodVendor:
        vendor = FoodVendor(
            id=self.next_id,
            name=name,
            type=type,
            address=address,
            lat=lat,
            long=long,
            price_min=price_min,
            price_max=price_max,
            menu_items=menu_items,
            hygiene_rating=hygiene_rating,
            images=images,
            college_id=college_id,
            is_verified=is_verified,
        )
        self.vendors[self.next_id] = vendor
        self.next_id += 1
        return vendor

    def get_all(self) -> List[FoodVendor]:
        return list(self.vendors.values())

    def get_by_id(self, vendor_id: int) -> Optional[FoodVendor]:
        return self.vendors.get(vendor_id)

    def update(self, vendor_id: int, **kwargs) -> Optional[FoodVendor]:
        vendor = self.get_by_id(vendor_id)
        if vendor:
            vendor.update(**kwargs)
        return vendor

    def delete(self, vendor_id: int) -> bool:
        if vendor_id in self.vendors:
            del self.vendors[vendor_id]
            return True
        return False

    def filter_by_college(self, college_id: int) -> List[FoodVendor]:
        return [v for v in self.vendors.values() if v.college_id == college_id]
