import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Hostel, Review } from '../types';
import { Star, MapPin, IndianRupee, CheckCircle, ArrowLeft, Phone, Mail, Wifi, Wind, Droplet, Utensils, Shield, Users } from 'lucide-react';

export default function HostelDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hostel, setHostel] = useState<Hostel | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            if (!id) return;
            setLoading(true);
            const { data: h } = await supabase.from('hostels').select('*').eq('id', id).single();
            setHostel(h);

            const { data: r } = await supabase.from('reviews').select('*').eq('hostel_id', id);
            setReviews(r || []);
            setLoading(false);
        }
        getData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading hostel details...</p>
                </div>
            </div>
        );
    }

    if (!hostel) return <div className="p-10 text-center">Hostel not found</div>;

    const amenityIcons: Record<string, any> = {
        'WiFi': Wifi,
        'AC': Wind,
        'Water': Droplet,
        'Mess': Utensils,
        'Security': Shield,
        'Common Area': Users,
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 'No ratings';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-medium">Back to Search</span>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="h-96 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={hostel.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80'}
                            alt={hostel.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-[184px] rounded-xl overflow-hidden shadow-md">
                                <img
                                    src={hostel.images?.[i] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80'}
                                    alt={`${hostel.name} ${i}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Title & Location */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{hostel.name}</h1>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-5 h-5 mr-2 text-primary" />
                                        <span>{hostel.address}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                                    <Star className="h-5 w-5 text-green-600 fill-green-600" />
                                    <span className="font-bold text-green-800">{avgRating}</span>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities & Features</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {hostel.amenities?.map(am => {
                                    const Icon = amenityIcons[am] || CheckCircle;
                                    return (
                                        <div key={am} className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors">
                                            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <span className="font-medium text-gray-700">{am}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Reviews & Ratings
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                                </span>
                            </h2>
                            <div className="space-y-6">
                                {reviews.map(review => (
                                    <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                            <span className="ml-2 text-sm font-semibold text-gray-700">{review.rating}/5</span>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                        <p className="text-xs text-gray-400 mt-2">Posted on {new Date(review.created_at).toLocaleDateString()}</p>
                                    </div>
                                ))}
                                {reviews.length === 0 && (
                                    <div className="text-center py-12">
                                        <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">No reviews yet</p>
                                        <p className="text-sm text-gray-400 mt-1">Be the first to review this hostel!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Booking Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-28">
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-1">Rent starts at</p>
                                <div className="flex items-baseline">
                                    <IndianRupee className="w-7 h-7 text-gray-900" />
                                    <span className="text-4xl font-bold text-gray-900">{hostel.price_min}</span>
                                    <span className="text-lg text-gray-500 font-normal ml-2">/month</span>
                                </div>
                                {hostel.price_max && hostel.price_max !== hostel.price_min && (
                                    <p className="text-sm text-gray-500 mt-1">Up to ₹{hostel.price_max}/month</p>
                                )}
                            </div>

                            <div className="space-y-3 mb-6">
                                <button className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    <Phone className="h-5 w-5" />
                                    Contact Owner
                                </button>
                                <button className="w-full border-2 border-primary text-primary py-3.5 rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    Send Message
                                </button>
                            </div>

                            <div className="pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                    <Shield className="h-5 w-5 text-green-600" />
                                    <span className="font-medium">Verified Property</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                    <span>No brokerage fees</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
