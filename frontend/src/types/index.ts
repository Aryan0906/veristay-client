export interface Hostel {
    id: string;
    name: string;
    address: string;
    price_min: number;
    price_max: number;
    amenities: string[] | null;
    images: string[] | null;
    lat: number;
    long: number;
    dist_meters?: number;
}

export interface Review {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    user_id: string;
}
