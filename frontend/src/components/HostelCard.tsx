import { MapPin, IndianRupee, Wifi, Wind, Star, Bed } from 'lucide-react';
import type { Hostel } from '../types';
import { Link } from 'react-router-dom';

interface Props {
    hostel: Hostel;
}

export default function HostelCard({ hostel }: Props) {
    return (
        <Link to={`/hostel/${hostel.id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={hostel.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'}
                        alt={hostel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Distance Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-lg flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-primary" />
                        {hostel.dist_meters ? `${(hostel.dist_meters / 1000).toFixed(1)} km` : 'Nearby'}
                    </div>

                    {/* Verified Badge */}
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <Star className="h-3 w-3 fill-white" />
                        Verified
                    </div>
                </div>

                <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                        {hostel.name}
                    </h3>
                    <div className="flex items-start text-gray-500 text-sm mt-2 gap-1">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-400" />
                        <span className="line-clamp-1">{hostel.address}</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-4"></div>

                    <div className="flex items-center justify-between">
                        {/* Price */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Starting from</p>
                            <div className="flex items-center text-primary font-bold text-xl">
                                <IndianRupee className="h-5 w-5" />
                                <span>{hostel.price_min}</span>
                                <span className="text-gray-400 text-sm font-normal ml-1">/mo</span>
                            </div>
                        </div>

                        {/* Amenities Icons */}
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                                <Bed className="h-4 w-4 text-gray-600" />
                            </div>
                            {hostel.amenities?.includes('WiFi') && (
                                <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded-lg">
                                    <Wifi className="h-4 w-4 text-blue-600" />
                                </div>
                            )}
                            {hostel.amenities?.includes('AC') && (
                                <div className="flex items-center gap-1 bg-cyan-50 px-2.5 py-1.5 rounded-lg">
                                    <Wind className="h-4 w-4 text-cyan-600" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* View Details Button */}
                    <button className="w-full mt-4 bg-primary/5 text-primary font-semibold py-2.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
}
