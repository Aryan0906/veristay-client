import { Search, MapPin, Shield, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const features = [
        {
            icon: Shield,
            title: 'Verified Properties',
            description: 'All hostels verified by our team for quality and safety',
        },
        {
            icon: MapPin,
            title: 'Location Based',
            description: 'Find hostels near your college with interactive maps',
        },
        {
            icon: Users,
            title: 'No Brokerage',
            description: 'Connect directly with owners, save money',
        },
        {
            icon: Award,
            title: 'Student Focused',
            description: 'Designed for students in Ahmedabad',
        },
    ];

    return (
        <div className="bg-white bg-grid-pattern min-h-screen pt-16">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                {/* Verified Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
                                    <Shield className="w-4 h-4" />
                                    #1 Trusted Student Housing
                                </div>

                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                                    <span className="block">Find your perfect</span>
                                    {/* Gradient Text Effect */}
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary-dark mt-1">
                                        student home
                                    </span>
                                </h1>
                                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed">
                                    VeriStay connects students in Ahmedabad with verified hostels, PGs, and mess services near their college.
                                    <span className="font-semibold text-gray-900"> No brokerage, full transparency.</span>
                                </p>
                                {/* Buttons with Colored Shadows */}
                                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                                    <button
                                        onClick={() => navigate('/explore')}
                                        className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-gradient-primary hover:opacity-90 md:py-4 md:text-lg md:px-10 shadow-lg shadow-primary/40 hover:shadow-teal-glow transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <Search className="w-5 h-5 mr-2" />
                                        Explore Map
                                    </button>
                                    <button
                                        onClick={() => navigate('/about')}
                                        className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-gray-200 text-base font-semibold rounded-full text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 hover:border-gray-300 transition-all duration-300"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1568&q=80"
                        alt="Student Housing"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent lg:from-transparent"></div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Why Choose VeriStay?
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Your trusted platform for finding verified student accommodations in Ahmedabad
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
                                >
                                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-primary-reverse relative overflow-hidden">
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to find your perfect stay?</span>
                        <span className="block text-primary-light text-xl mt-2">Start exploring verified hostels near your college today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-xl shadow">
                            <button
                                onClick={() => navigate('/explore')}
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-primary-dark bg-white hover:bg-gray-50 active:scale-95 transition-all duration-200"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
