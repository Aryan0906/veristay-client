export interface Review {
    id: number;
    user_id: string;
    rating: number;
    comment: string;
    created_at: string;
}

export interface ReviewInput {
    user_id: string;
    rating: number;
    comment: string;
}

export interface College {
    id: number;
    name: string;
    area: string;
    lat: number;
    long: number;
    created_at: string;
}

export interface Hostel {
    id: number;
    name: string;
    address: string;
    price_min: number;
    price_max: number;
    lat: number;
    long: number;
    college_id?: number | null;
    amenities: string[];
    images: string[];
    is_verified: boolean;
    reviews: Review[];
    created_at: string;
    updated_at: string;
}

export type FoodVendorType = 'mess' | 'canteen' | 'street_food';

export interface FoodVendor {
    id: number;
    name: string;
    type: FoodVendorType;
    address: string;
    lat: number;
    long: number;
    price_min: number;
    price_max: number;
    menu_items: string[];
    hygiene_rating: number;
    images: string[];
    college_id?: number | null;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

// Backward-compatible aliases for legacy files still in src/
export type FoodServiceType = 'mess' | 'canteen' | 'street_food' | 'tiffin' | 'restaurant';
export interface FoodService {
    id: number;
    name: string;
    type: FoodServiceType;
    description: string;
    cuisine: string[];
    price_range: string;
    price_per_meal: number;
    monthly_price?: number;
    address: string;
    lat: number;
    long: number;
    image: string;
    rating: number;
    reviews_count: number;
    features: string[];
    is_verified: boolean;
    timing: string;
    contact?: string;
}
