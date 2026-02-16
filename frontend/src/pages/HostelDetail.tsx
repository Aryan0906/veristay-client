import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Hostel, Review } from '../types';
import { Star, MapPin, IndianRupee, CheckCircle, ArrowLeft, Phone, Mail, Wifi, Wind, Droplet, Utensils, Shield, Users, Loader2 } from 'lucide-react';

export default function HostelDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hostel, setHostel] = useState<Hostel | null>(null);
    const [loading, setLoading] = useState(true);
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        async function getData() {
            if (!id) return;
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/hostels/${id}`);
                if (!response.ok) throw new Error('Hostel not found');
                const data = await response.json();
                setHostel(data.hostel);
            } catch (error) {
                console.error("Error fetching hostel:", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="ml-3 text-gray-600 font-medium">Loading details...</p>
            </div>
        );
    }

    if (!hostel) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Hostel not found</h2>
                <button
                    onClick={() => navigate('/explore')}
                    className="text-blue-600 hover:underline"
                >
                    Return to Explore
                </button>
            </div>
        );
    }

    const reviews = hostel.reviews || [];

    const amenityIcons: Record<string, any> = {
        'WiFi': Wifi,
        'AC': Wind,
        'Laundry': Droplet,
        'Meals': Utensils,
        'Security': Shield,
        'Gym': Users,
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 'New';

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Back Button */}
            <div className="bg-white border-b border-gray-200 sticky top-16 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Search
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 h-[400px] md:h-[500px]">
                    <div className="h-full rounded-2xl overflow-hidden shadow-lg group">
                        <img
                            src={hostel.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80'}
                            alt={hostel.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="hidden md:grid grid-cols-2 gap-4 h-full">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="rounded-xl overflow-hidden shadow-md group relative">
                                <img
                                    src={hostel.images?.[i] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80'}
                                    alt={`${hostel.name} view ${i}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {i === 4 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors">
                                        <span className="text-white font-bold text-lg">+ View All</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title & Location */}
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{hostel.name}</h1>
                                <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                                    <Star className="h-5 w-5 text-green-600 fill-green-600" />
                                    <span className="font-bold text-green-800">{avgRating}</span>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-600 mb-6">
                                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                                <span className="text-lg">{hostel.address}</span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3">
                                {hostel.is_verified && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        <Shield className="w-4 h-4 mr-1.5" /> Verified Property
                                    </span>
                                )}
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    <CheckCircle className="w-4 h-4 mr-1.5" /> No Brokerage
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="border-gray-200" />

                        {/* Amenities */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Features</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {hostel.amenities?.map((am, idx) => {
                                    const Icon = amenityIcons[am] || CheckCircle;
                                    return (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-gray-700">{am}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Reviews
                                <span className="text-lg font-normal text-gray-500 ml-2">({reviews.length})</span>
                            </h2>
                            <div className="space-y-6">
                                {reviews.map(review => (
                                    <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                                    {review.user_id?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Student</p>
                                                    <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                                                <span className="font-bold text-yellow-700">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                    </div>
                                ))}
                                {reviews.length === 0 && (
                                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                                        <p className="text-gray-500">No reviews yet for this property.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-28">
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Rent starts at</p>
                                <div className="flex items-baseline">
                                    <IndianRupee className="w-6 h-6 text-gray-900" />
                                    <span className="text-4xl font-extrabold text-gray-900">{hostel.price_min.toLocaleString('en-IN')}</span>
                                    <span className="text-gray-500 ml-1">/mo</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {!showContact ? (
                                    <button
                                        onClick={() => setShowContact(true)}
                                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transform active:scale-95"
                                    >
                                        <Phone className="h-5 w-5" />
                                        Contact Owner
                                    </button>
                                ) : (
                                    <div className="w-full bg-green-50 border border-green-200 text-green-800 py-4 rounded-xl font-bold flex flex-col items-center justify-center gap-1 animate-in fade-in slide-in-from-bottom-2">
                                        <span className="text-xs uppercase tracking-wider text-green-600">Owner Contact</span>
                                        <span className="text-xl">+91 98765 43210</span>
                                    </div>
                                )}

                                <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    Send Enquiry
                                </button>
                            </div>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                Direct connection. Zero brokerage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
