import { MapPin, IndianRupee, ShieldCheck } from 'lucide-react';
import type { Hostel } from '../types';
import { Link } from 'react-router-dom';

interface Props {
    hostel: Hostel;
}

export default function HostelCard({ hostel }: Props) {
    return (
        <Link to={`/hostel/${hostel.id}`} className="block group">
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-card-hover hover:border-primary-200 transition-all duration-500 h-full flex flex-col hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={hostel.images?.[0] || 'https://images.pexels.com/photos/4907197/pexels-photo-4907197.jpeg?auto=compress&cs=tinysrgb&w=800'}
                        alt={hostel.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-40 transition-opacity"></div>

                    {/* Verified Badge */}
                    {hostel.is_verified && (
                        <div className="absolute top-4 left-4 glass text-primary-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-soft flex items-center gap-1.5 border border-white/20">
                            <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                            Verified
                        </div>
                    )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                            {hostel.name}
                        </h3>
                    </div>

                    <div className="flex items-start text-gray-600 text-sm mb-6 gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary-500" />
                        <span className="line-clamp-2 font-medium">{hostel.address}</span>
                    </div>

                    {/* Amenities Preview */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {hostel.amenities.slice(0, 3).map((amenity, index) => (
                            <span key={index} className="text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg font-medium border border-gray-200">
                                {amenity}
                            </span>
                        ))}
                        {hostel.amenities.length > 3 && (
                            <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg font-semibold border border-primary-200">
                                +{hostel.amenities.length - 3} more
                            </span>
                        )}
                    </div>

                    <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Starting from</p>
                            <div className="flex items-center text-gray-900 font-display font-bold text-2xl">
                                <IndianRupee className="h-5 w-5" />
                                <span>{hostel.price_min.toLocaleString('en-IN')}</span>
                                <span className="text-gray-500 text-sm font-normal ml-1">/mo</span>
                            </div>
                        </div>

                        <button className="bg-primary-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all duration-300 shadow-soft hover:shadow-soft-xl hover:scale-105 transform">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
