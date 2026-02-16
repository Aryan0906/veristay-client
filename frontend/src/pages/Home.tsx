import { Search, MapPin, Shield, Users, Award, Star, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const features = [
        {
            icon: Shield,
            title: 'Verified Properties',
            description: 'Every listing undergoes strict verification for your safety and peace of mind.',
            color: 'bg-blue-50 text-blue-600',
        },
        {
            icon: MapPin,
            title: 'Prime Locations',
            description: 'Handpicked stays near top universities and essential amenities.',
            color: 'bg-green-50 text-green-600',
        },
        {
            icon: Users,
            title: 'Zero Brokerage',
            description: 'Connect directly with property owners and save on hidden fees.',
            color: 'bg-purple-50 text-purple-600',
        },
        {
            icon: Award,
            title: 'Premium Living',
            description: 'Modern amenities and facilities designed for student lifestyle.',
            color: 'bg-orange-50 text-orange-600',
        },
    ];

    const stats = [
        { value: '500+', label: 'Verified Properties' },
        { value: '50k+', label: 'Happy Students' },
        { value: '100%', label: 'Verified Listings' },
        { value: '24/7', label: 'Support Available' },
    ];

    const benefits = [
        { icon: CheckCircle, text: 'No hidden charges or brokerage fees' },
        { icon: TrendingUp, text: 'Best prices directly from owners' },
        { icon: Shield, text: 'Verified and safe accommodations' },
        { icon: Clock, text: 'Quick response from property owners' },
    ];

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            {/* Hero Section - Modern Design with Background Image */}
            <div
                className="relative min-h-[90vh] flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 65, 106, 0.85), rgba(70, 130, 180, 0.75)), url('https://images.pexels.com/photos/5965528/pexels-photo-5965528.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
                }}
            >
                {/* Floating elements for depth */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 w-full max-w-6xl px-6 py-20 animate-fade-in">
                    {/* Trust Badge */}
                    <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-dark text-white text-sm font-semibold tracking-wide uppercase mb-8 shadow-lg mx-auto backdrop-blur-md">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>Trusted by 50,000+ Students</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-display-lg font-display font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
                        Find Your Perfect<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Student Home</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl lg:text-2xl text-blue-50 mb-12 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow-lg">
                        Discover verified premium hostels and PGs near your campus.<br className="hidden md:block" />
                        <span className="font-semibold text-white">Zero brokerage. 100% Transparent.</span>
                    </p>

                    {/* Search Bar - Modern Glassmorphism Style */}
                    <div className="glass max-w-4xl mx-auto p-3 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20 mb-10 animate-slide-up">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 flex items-center bg-white/90 backdrop-blur-sm px-6 rounded-xl h-16 border-2 border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all">
                                <Search className="w-5 h-5 text-gray-400 mr-4" />
                                <input
                                    type="text"
                                    placeholder="Search by college, city or area..."
                                    className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-base font-medium"
                                />
                            </div>
                            <button
                                onClick={() => navigate('/explore')}
                                className="bg-gradient-to-r from-primary-600 to-primary-500 text-white h-16 px-12 rounded-xl font-bold hover:from-primary-700 hover:to-primary-600 transition-all duration-300 uppercase tracking-wider text-sm shadow-xl hover:shadow-2xl hover:scale-105 transform"
                            >
                                Search Now
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-8 text-white/90 text-sm font-medium tracking-wide animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        {benefits.slice(0, 2).map((benefit, idx) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={idx} className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 text-blue-200" />
                                    <span>{benefit.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-b from-white to-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl md:text-5xl font-display font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="section-padding bg-white">
                <div className="max-w-7xl mx-auto container-padding">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                            Why Choose VeriStay
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
                            Your Trusted Student Housing Partner
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We make finding your perfect student accommodation simple, safe, and hassle-free.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div 
                                    key={index} 
                                    className="group p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-primary-200 hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-2"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Benefits Section with Image */}
            <div className="section-padding bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto container-padding">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <div className="relative order-2 lg:order-1">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.pexels.com/photos/4907197/pexels-photo-4907197.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                    alt="Modern student accommodation"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
                            </div>
                            {/* Floating card */}
                            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-xl max-w-xs border border-white/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">100%</div>
                                        <div className="text-sm text-gray-600">Verified</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="order-1 lg:order-2">
                            <div className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                                Our Promise
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
                                Safe, Verified & Affordable Student Living
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Every property on VeriStay undergoes rigorous verification to ensure your safety and satisfaction. We connect you directly with property owners, eliminating unnecessary middlemen and extra costs.
                            </p>

                            <div className="space-y-4 mb-8">
                                {benefits.map((benefit, idx) => {
                                    const Icon = benefit.icon;
                                    return (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                                            <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <span className="text-gray-700 font-medium">{benefit.text}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => navigate('/explore')}
                                className="bg-primary-600 text-white font-semibold py-4 px-10 rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                            >
                                Start Exploring Properties
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-grid-pattern"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center container-padding">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
                        Ready to Find Your Perfect Stay?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Join thousands of students who have found their ideal accommodation through VeriStay. Start your search today!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/explore')}
                            className="bg-white text-primary-700 font-bold py-4 px-10 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
                        >
                            Browse Properties
                        </button>
                        <button
                            onClick={() => navigate('/about')}
                            className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-xl hover:bg-white/10 transition-all duration-300"
                        >
                            Learn More
                        </button>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100 text-sm">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <span>100% Secure</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>50,000+ Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-current" />
                            <span>4.8 Rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
