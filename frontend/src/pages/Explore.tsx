import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../lib/supabase';
import type { Hostel } from '../types';
import HostelCard from '../components/HostelCard';
import { Loader2, Filter, Search } from 'lucide-react';
import * as L from 'leaflet';

// Fix Leaflet Marker Icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Default: Ahmedabad Center
const center = { lat: 23.0225, lng: 72.5714 };

export default function Explore() {
    const [hostels, setHostels] = useState<Hostel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHostels() {
            // Calling the RPC function we made in SQL
            const { data, error } = await supabase.rpc('nearby_hostels', {
                lat: center.lat,
                long: center.lng,
                radius_meters: 10000 // 10km search
            });

            if (error) console.error(error);
            else setHostels(data || []);
            setLoading(false);
        }

        fetchHostels();
    }, []);

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-50">
            {/* Left Sidebar: List */}
            <div className="w-full md:w-[40%] h-full overflow-hidden flex flex-col bg-white border-r border-gray-200 shadow-sm">
                {/* Search & Filter Header */}
                <div className="bg-white border-b border-gray-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Find Hostels</h2>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Filter className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by location or name..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-gray-600">
                        {loading ? 'Searching...' : `${hostels.length} hostels found in Ahmedabad`}
                    </p>
                </div>

                {/* Hostel List */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                            <p className="text-gray-600">Loading hostels...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {hostels.map((hostel) => (
                                <HostelCard key={hostel.id} hostel={hostel} />
                            ))}
                            {hostels.length === 0 && (
                                <div className="text-center py-20">
                                    <p className="text-gray-500 mb-2">No hostels found nearby</p>
                                    <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Map */}
            <div className="hidden md:block w-[60%] h-full relative">
                <MapContainer
                    center={[center.lat, center.lng]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="h-full w-full z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {hostels.map((hostel) => (
                        <Marker key={hostel.id} position={[hostel.lat, hostel.long]}>
                            <Popup>
                                <div className="p-2">
                                    <strong className="text-gray-900 text-base">{hostel.name}</strong><br />
                                    <span className="text-primary font-semibold text-sm">₹{hostel.price_min}/mo</span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
