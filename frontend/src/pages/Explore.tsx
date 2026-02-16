import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Hostel } from '../types';
import HostelCard from '../components/HostelCard';
import { Loader2, Filter, Search, MapIcon, ListIcon } from 'lucide-react';
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
    const [searchTerm, setSearchTerm] = useState('');
    const [showMap, setShowMap] = useState(true);

    useEffect(() => {
        async function fetchHostels() {
            try {
                // Fetch from Flask Backend
                const response = await fetch('http://localhost:5000/api/hostels');
                if (!response.ok) {
                    throw new Error('Failed to fetch hostels');
                }
                const data = await response.json();
                setHostels(data.hostels || []);
            } catch (error) {
                console.error("Error fetching hostels:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchHostels();
    }, []);

    // Filter hostels based on search (Client-side for now)
    const filteredHostels = hostels.filter(hostel =>
        hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-80px)] bg-gray-50">
            {/* Left Sidebar: List */}
            <div className="w-full md:w-[40%] h-full flex flex-col bg-white border-r border-gray-200 shadow-sm z-10">
                {/* Search & Filter Header */}
                <div className="bg-white border-b border-gray-200 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-1">Find Your Stay</h2>
                            <p className="text-sm text-gray-600">
                                {loading ? 'Searching...' : `${filteredHostels.length} verified properties`}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setShowMap(!showMap)}
                                className="md:hidden p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Toggle Map"
                            >
                                {showMap ? <ListIcon className="h-5 w-5" /> : <MapIcon className="h-5 w-5" />}
                            </button>
                            <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <Filter className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by location or name..."
                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Hostel List */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
                            <p className="text-gray-600 font-medium">Loading verified stays...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredHostels.map((hostel: Hostel) => (
                                <HostelCard key={hostel.id} hostel={hostel} />
                            ))}
                            {filteredHostels.length === 0 && (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-700 mb-2 font-semibold text-lg">No properties found</p>
                                    <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Map */}
            <div className={`${showMap ? 'block' : 'hidden'} md:block w-full md:w-[60%] h-full relative z-0`}>
                <MapContainer
                    center={[center.lat, center.lng]}
                    zoom={12}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredHostels.map((hostel: Hostel) => (
                        <Marker key={hostel.id} position={[hostel.lat, hostel.long]}>
                            <Popup>
                                <div className="p-2 min-w-[220px]">
                                    <h3 className="font-bold text-gray-900 mb-1.5 text-base">{hostel.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{hostel.address}</p>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                        <span className="text-primary-600 font-bold text-base">₹{hostel.price_min.toLocaleString('en-IN')}</span>
                                        {hostel.is_verified && (
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-semibold">Verified</span>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
