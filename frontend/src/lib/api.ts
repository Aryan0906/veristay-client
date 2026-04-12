import type { College, FoodVendor, Hostel, Review, ReviewInput } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const BASE = `${API_URL}/api`;

type HostelParams = {
  college_id?: number;
  price_max?: number;
  amenities?: string;
  verified_only?: boolean;
};

type FoodParams = {
  college_id?: number;
  max_price?: number;
  type?: string;
};

function toQuery(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) {
    return '';
  }
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  });
  const encoded = query.toString();
  return encoded ? `?${encoded}` : '';
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error || 'Request failed');
  }
  return body as T;
}

export const getColleges = async (): Promise<College[]> => {
  const data = await requestJson<{ colleges: College[] }>(`${BASE}/colleges`);
  return data.colleges;
};

export const getCollegeById = async (id: number): Promise<{ college: College; nearby_hostels: Hostel[] }> => {
  return requestJson(`${BASE}/colleges/${id}`);
};

export const getHostels = async (params?: HostelParams): Promise<Hostel[]> => {
  const data = await requestJson<{ hostels: Hostel[] }>(`${BASE}/hostels${toQuery(params)}`);
  return data.hostels;
};

export const getHostelById = async (id: number): Promise<Hostel> => {
  const data = await requestJson<{ hostel: Hostel }>(`${BASE}/hostels/${id}`);
  return data.hostel;
};

export const getHostelReviews = async (id: number): Promise<{ reviews: Review[]; average_rating: number; count: number }> => {
  return requestJson(`${BASE}/hostels/${id}/reviews`);
};

export const submitReview = async (hostelId: number, payload: ReviewInput): Promise<Review> => {
  const data = await requestJson<{ review: Review }>(`${BASE}/hostels/${hostelId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.review;
};

export const getFood = async (params?: FoodParams): Promise<FoodVendor[]> => {
  const data = await requestJson<{ food_vendors: FoodVendor[] }>(`${BASE}/food${toQuery(params)}`);
  return data.food_vendors;
};

export const getFoodById = async (id: number): Promise<FoodVendor> => {
  const data = await requestJson<{ food_vendor: FoodVendor }>(`${BASE}/food/${id}`);
  return data.food_vendor;
};

export const createFoodVendor = async (payload: Partial<FoodVendor>): Promise<FoodVendor> => {
  const data = await requestJson<{ food_vendor: FoodVendor }>(`${BASE}/food`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.food_vendor;
};
