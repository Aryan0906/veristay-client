import { useState, useMemo } from 'react';
import { Search, Filter, Utensils, MapPin } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import { foodServices } from '../data/foodData';
import { FoodServiceType } from '../types';

export default function FoodExplore() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<FoodServiceType | 'all'>('all');
    const [selectedCuisine, setSelectedCuisine] = useState<string>('all');

    const types: { value: FoodServiceType | 'all'; label: string }[] = [
        { value: 'all', label: 'All Types' },
        { value: 'mess', label: 'Mess Service' },
        { value: 'tiffin', label: 'Tiffin Service' },
        { value: 'canteen', label: 'Canteen' },
        { value: 'restaurant', label: 'Restaurant' },
    ];

    const cuisines = ['all', 'Gujarati', 'North Indian', 'South Indian', 'Chinese', 'Continental', 'Mixed'];

    const filteredServices = useMemo(() => {
        return foodServices.filter(service => {
            const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.address.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesType = selectedType === 'all' || service.type === selectedType;
            
            const matchesCuisine = selectedCuisine === 'all' || service.cuisine.includes(selectedCuisine as any);
            
            return matchesSearch && matchesType && matchesCuisine;
        });
    }, [searchQuery, selectedType, selectedCuisine]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div
                className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-16 md:py-24"
            >
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 tracking-wide uppercase border border-white/20">
                            <Utensils className="w-4 h-4" />
                            <span>Food Services</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight">
                            Find Food & Mess Services
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Discover verified mess services, tiffin services, and canteens near your hostel
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="glass max-w-4xl mx-auto p-3 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 flex items-center bg-white/90 backdrop-blur-sm px-6 rounded-xl h-14 border-2 border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all">
                                <Search className="w-5 h-5 text-gray-400 mr-4" />
                                <input
                                    type="text"
                                    placeholder="Search by name, cuisine or location..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-base font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Results */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filters */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <h2 className="text-lg font-display font-semibold text-gray-900">Filters</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Type Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Service Type</label>
                            <div className="flex flex-wrap gap-2">
                                {types.map((type) => (
                                    <button
                                        key={type.value}
                                        onClick={() => setSelectedType(type.value)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            selectedType === type.value
                                                ? 'bg-primary-600 text-white shadow-soft'
                                                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
                                        }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cuisine Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Cuisine Type</label>
                            <div className="flex flex-wrap gap-2">
                                {cuisines.map((cuisine) => (
                                    <button
                                        key={cuisine}
                                        onClick={() => setSelectedCuisine(cuisine)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                                            selectedCuisine === cuisine
                                                ? 'bg-primary-600 text-white shadow-soft'
                                                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
                                        }`}
                                    >
                                        {cuisine === 'all' ? 'All Cuisines' : cuisine}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-display font-semibold text-gray-900">
                        {filteredServices.length} {filteredServices.length === 1 ? 'Result' : 'Results'} Found
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>Ahmedabad</span>
                    </div>
                </div>

                {/* Results Grid */}
                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service) => (
                            <FoodCard key={service.id} food={service} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Utensils className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                            No food services found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your filters or search query
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
