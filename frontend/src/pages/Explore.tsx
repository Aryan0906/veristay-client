import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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
    const [searchTerm, setSearchTerm] = useState('');

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
        <div className="flex h-[calc(100vh-64px)] bg-gray-50">
            {/* Left Sidebar: List */}
            <div className="w-full md:w-[40%] h-full flex flex-col bg-white border-r border-gray-200 shadow-sm z-10">
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
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-gray-600">
                        {loading ? 'Searching...' : `${filteredHostels.length} hostels found in Ahmedabad`}
                    </p>
                </div>

                {/* Hostel List */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
                            <p className="text-gray-600">Loading verified stays...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredHostels.map((hostel: Hostel) => (
                                <HostelCard key={hostel.id} hostel={hostel} />
                            ))}
                            {filteredHostels.length === 0 && (
                                <div className="text-center py-20">
                                    <p className="text-gray-500 mb-2 font-medium">No hostels found</p>
                                    <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Map */}
            <div className="hidden md:block w-[60%] h-full relative z-0">
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
                                <div className="p-2 min-w-[200px]">
                                    <h3 className="font-bold text-gray-900 mb-1">{hostel.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2 truncate">{hostel.address}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-600 font-bold">₹{hostel.price_min.toLocaleString('en-IN')}</span>
                                        {hostel.is_verified && (
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Verified</span>
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
