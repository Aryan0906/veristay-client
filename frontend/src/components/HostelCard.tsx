import { MapPin, IndianRupee, Wifi, Wind, ShieldCheck, Bed } from 'lucide-react';
import type { Hostel } from '../types';
import { Link } from 'react-router-dom';

interface Props {
    hostel: Hostel;
}

export default function HostelCard({ hostel }: Props) {
    return (
        <Link to={`/hostel/${hostel.id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-500/30 transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={hostel.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'}
                        alt={hostel.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                    {/* Verified Badge */}
                    {hostel.is_verified && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            Verified
                        </div>
                    )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {hostel.name}
                        </h3>
                    </div>

                    <div className="flex items-start text-gray-500 text-sm mb-4 gap-1">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-400" />
                        <span className="line-clamp-2">{hostel.address}</span>
                    </div>

                    {/* Amenities Preview */}
                    <div className="flex gap-2 mb-4">
                        {hostel.amenities.slice(0, 3).map((amenity, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                {amenity}
                            </span>
                        ))}
                        {hostel.amenities.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                +{hostel.amenities.length - 3}
                            </span>
                        )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 mb-0.5">Starting from</p>
                            <div className="flex items-center text-blue-600 font-bold text-xl">
                                <IndianRupee className="h-4 w-4" />
                                <span>{hostel.price_min.toLocaleString('en-IN')}</span>
                                <span className="text-gray-400 text-sm font-normal ml-1">/mo</span>
                            </div>
                        </div>

                        <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            View
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
