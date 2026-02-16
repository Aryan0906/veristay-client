import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Hostel } from '../types';
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
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-14 w-14 animate-spin text-primary-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium text-lg">Loading property details...</p>
                </div>
            </div>
        );
    }

    if (!hostel) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-50">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MapPin className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Property not found</h2>
                    <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate('/explore')}
                        className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-soft hover:shadow-soft-xl"
                    >
                        Return to Explore
                    </button>
                </div>
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
            <div className="bg-white border-b border-gray-200 sticky top-20 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors font-semibold group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Search
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 h-[400px] md:h-[500px]">
                    <div className="h-full rounded-3xl overflow-hidden shadow-soft-xl group">
                        <img
                            src={hostel.images?.[0] || 'https://images.pexels.com/photos/4907197/pexels-photo-4907197.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                            alt={hostel.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="hidden md:grid grid-cols-2 gap-4 h-full">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="rounded-2xl overflow-hidden shadow-soft group relative">
                                <img
                                    src={hostel.images?.[i] || 'https://images.pexels.com/photos/4907208/pexels-photo-4907208.jpeg?auto=compress&cs=tinysrgb&w=600'}
                                    alt={`${hostel.name} view ${i}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {i === 4 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors group">
                                        <span className="text-white font-bold text-lg group-hover:scale-110 transition-transform">View All Photos</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Title & Location */}
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 tracking-tight">{hostel.name}</h1>
                                <div className="flex items-center gap-2.5 bg-gradient-to-br from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200 shadow-soft">
                                    <Star className="h-5 w-5 text-green-600 fill-green-600" />
                                    <span className="font-bold text-green-800 text-lg">{avgRating}</span>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-600 mb-6">
                                <MapPin className="w-5 h-5 mr-2.5 text-primary-600" />
                                <span className="text-lg font-medium">{hostel.address}</span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3">
                                {hostel.is_verified && (
                                    <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                        <Shield className="w-4 h-4 mr-1.5" /> Verified Property
                                    </span>
                                )}
                                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                    <CheckCircle className="w-4 h-4 mr-1.5" /> No Brokerage
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="border-gray-200" />

                        {/* Amenities */}
                        <div>
                            <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">Amenities & Features</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {hostel.amenities?.map((am, idx) => {
                                    const Icon = amenityIcons[am] || CheckCircle;
                                    return (
                                        <div key={idx} className="flex items-center gap-3 p-5 bg-white rounded-2xl border-2 border-gray-100 shadow-card hover:shadow-card-hover hover:border-primary-200 transition-all duration-300">
                                            <div className="flex-shrink-0 w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-semibold text-gray-700">{am}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
                                Student Reviews
                            </h2>
                            <p className="text-gray-600 mb-8">
                                {reviews.length > 0 ? `${reviews.length} reviews from verified students` : 'No reviews yet'}
                            </p>
                            <div className="space-y-6">
                                {reviews.map(review => (
                                    <div key={review.id} className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center font-bold text-primary-700 text-lg">
                                                    {review.user_id?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Student</p>
                                                    <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-200">
                                                <Star className="w-4 h-4 text-yellow-600 fill-yellow-600 mr-1" />
                                                <span className="font-bold text-yellow-700">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                    </div>
                                ))}
                                {reviews.length === 0 && (
                                    <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Star className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-600 font-medium">No reviews yet for this property</p>
                                        <p className="text-sm text-gray-500 mt-1">Be the first to share your experience!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-8 shadow-soft-xl border-2 border-gray-100 sticky top-32">
                            <div className="mb-8 pb-8 border-b border-gray-200">
                                <p className="text-sm text-gray-600 mb-2 font-semibold uppercase tracking-wide">Rent starts at</p>
                                <div className="flex items-baseline mb-1">
                                    <IndianRupee className="w-7 h-7 text-gray-900" />
                                    <span className="text-5xl font-display font-bold text-gray-900">{hostel.price_min.toLocaleString('en-IN')}</span>
                                    <span className="text-gray-500 ml-2 text-lg">/month</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Direct pricing from owner</p>
                            </div>

                            <div className="space-y-4">
                                {!showContact ? (
                                    <button
                                        onClick={() => setShowContact(true)}
                                        className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-soft-xl hover:shadow-glass flex items-center justify-center gap-2.5 transform active:scale-95"
                                    >
                                        <Phone className="h-5 w-5" />
                                        Contact Owner Now
                                    </button>
                                ) : (
                                    <div className="w-full bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 py-4 rounded-xl font-bold flex flex-col items-center justify-center gap-1.5 animate-scale-in shadow-soft">
                                        <span className="text-xs uppercase tracking-wider text-green-600 font-semibold">Owner Contact</span>
                                        <span className="text-xl">+91 98765 43210</span>
                                    </div>
                                )}

                                <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:border-primary-500 hover:text-primary-700 transition-all duration-300 flex items-center justify-center gap-2.5">
                                    <Mail className="h-5 w-5" />
                                    Send Enquiry
                                </button>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="font-medium">Direct connection, zero brokerage</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                    <Shield className="w-4 h-4 text-blue-600" />
                                    <span className="font-medium">Verified property & owner</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
