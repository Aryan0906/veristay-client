export interface Review {
    id: number;
    user_id: string;
    rating: number;
    comment: string;
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
    amenities: string[];
    images: string[];
    is_verified: boolean;
    reviews: Review[];
    // Optional frontend-only properties
    dist_meters?: number;
}
