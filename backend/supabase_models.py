import os
from typing import Dict, List, Optional
from models import Hostel, College, FoodVendor, Review
from supabase_client import supabase

class SupabaseCollegeStore:
    def get_all(self) -> List[College]:
        if not supabase: return []
        response = supabase.table('colleges').select('*').execute()
        return [College(**c) for c in response.data]

    def get_by_id(self, college_id: int) -> Optional[College]:
        if not supabase: return None
        response = supabase.table('colleges').select('*').eq('id', college_id).execute()
        data = response.data
        return College(**data[0]) if data else None

    def create(self, name: str, area: str, lat: float, long: float) -> College:
        if not supabase: return None
        response = supabase.table('colleges').insert({
            'name': name,
            'area': area,
            'lat': lat,
            'long': long
        }).execute()
        return College(**response.data[0])


class SupabaseHostelStore:
    def get_all(self) -> List[Hostel]:
        if not supabase: return []
        response = supabase.table('hostels').select('*, reviews(*)').execute()
        hostels = []
        for h in response.data:
            reviews = [Review(**r) for r in h.pop('reviews', [])]
            hostel = Hostel(**h)
            hostel.reviews = reviews
            hostels.append(hostel)
        return hostels

    def get_by_id(self, hostel_id: int) -> Optional[Hostel]:
        if not supabase: return None
        response = supabase.table('hostels').select('*, reviews(*)').eq('id', hostel_id).execute()
        data = response.data
        if not data: return None
        h = data[0]
        reviews = [Review(**r) for r in h.pop('reviews', [])]
        hostel = Hostel(**h)
        hostel.reviews = reviews
        return hostel

    def create(self, **kwargs) -> Hostel:
        if not supabase: return None
        response = supabase.table('hostels').insert(kwargs).execute()
        return Hostel(**response.data[0])

    def update(self, hostel_id: int, **kwargs) -> Optional[Hostel]:
        if not supabase: return None
        response = supabase.table('hostels').update(kwargs).eq('id', hostel_id).execute()
        return Hostel(**response.data[0]) if response.data else None

    def delete(self, hostel_id: int) -> bool:
        if not supabase: return False
        response = supabase.table('hostels').delete().eq('id', hostel_id).execute()
        return len(response.data) > 0

    def add_review(self, hostel_id: int, user_id: str, rating: float, comment: str) -> Optional[Review]:
        if not supabase: return None
        response = supabase.table('reviews').insert({
            'hostel_id': hostel_id,
            'user_id': user_id,
            'rating': rating,
            'comment': comment
        }).execute()
        return Review(**response.data[0]) if response.data else None

    def clear(self) -> None:
        pass


class SupabaseFoodVendorStore:
    def get_all(self) -> List[FoodVendor]:
        if not supabase: return []
        response = supabase.table('food_vendors').select('*').execute()
        return [FoodVendor(**v) for v in response.data]

    def get_by_id(self, vendor_id: int) -> Optional[FoodVendor]:
        if not supabase: return None
        response = supabase.table('food_vendors').select('*').eq('id', vendor_id).execute()
        data = response.data
        return FoodVendor(**data[0]) if data else None

    def create(self, **kwargs) -> FoodVendor:
        if not supabase: return None
        response = supabase.table('food_vendors').insert(kwargs).execute()
        return FoodVendor(**response.data[0])

    def update(self, vendor_id: int, **kwargs) -> Optional[FoodVendor]:
        if not supabase: return None
        response = supabase.table('food_vendors').update(kwargs).eq('id', vendor_id).execute()
        return FoodVendor(**response.data[0]) if response.data else None

    def delete(self, vendor_id: int) -> bool:
        if not supabase: return False
        response = supabase.table('food_vendors').delete().eq('id', vendor_id).execute()
        return len(response.data) > 0
