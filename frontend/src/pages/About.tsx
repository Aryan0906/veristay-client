import { MapPin, Shield, Users, Award, CheckCircle, TrendingUp, Star } from 'lucide-react';

export default function About() {
    const features = [
        {
            icon: Shield,
            title: 'Verified Listings',
            description: 'Every property undergoes thorough verification by our team to ensure quality, safety, and authenticity.',
        },
        {
            icon: MapPin,
            title: 'Location-Based Search',
            description: 'Find accommodations near your college with our intelligent search and interactive map feature.',
        },
        {
            icon: Users,
            title: 'Zero Brokerage',
            description: 'Connect directly with property owners and save money with absolutely no hidden fees or charges.',
        },
        {
            icon: Award,
            title: 'Student-Focused',
            description: 'Designed specifically for students in Ahmedabad with features tailored to their unique needs.',
        },
    ];

    const stats = [
        { value: '500+', label: 'Verified Properties' },
        { value: '2,000+', label: 'Happy Students' },
        { value: '50+', label: 'College Locations' },
        { value: '100%', label: 'Transparent Pricing' },
    ];

    const values = [
        {
            title: 'Trust & Transparency',
            description: 'We believe in complete transparency in pricing and property details. No hidden charges, no surprises.',
            icon: Shield,
        },
        {
            title: 'Student-First Approach',
            description: 'Every decision we make prioritizes student safety, convenience, and affordability.',
            icon: Users,
        },
        {
            title: 'Quality Assurance',
            description: 'Rigorous verification processes ensure only the best properties make it to our platform.',
            icon: CheckCircle,
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 tracking-wide uppercase border border-white/20">
                            About VeriStay
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                            Making Student Housing <span className="text-blue-200">Simple & Safe</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            We're on a mission to make finding quality student accommodation in Ahmedabad transparent, easy, and trustworthy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative order-2 lg:order-1">
                        <img
                            src="https://images.pexels.com/photos/5676679/pexels-photo-5676679.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="Students collaborating"
                            className="rounded-3xl shadow-soft-xl w-full h-[500px] object-cover"
                        />
                        <div className="absolute -bottom-8 -right-8 glass p-6 rounded-2xl shadow-xl border border-white/20 max-w-xs">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">50k+</div>
                                    <div className="text-sm text-gray-600">Students Helped</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                            Our Mission
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
                            Helping Students Find Their Perfect Home
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            VeriStay connects students in Ahmedabad with verified hostels, PGs, and mess services. We believe finding accommodation should be transparent, safe, and broker-free.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our platform eliminates the hassle of dealing with middlemen and ensures that every property you see has been personally verified by our team. We're committed to making your student life easier, safer, and more affordable.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-b from-white to-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
                        <p className="text-lg text-gray-600">Trusted by thousands of students across Ahmedabad</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 group">
                                <div className="text-5xl font-display font-bold text-primary-600 mb-3 group-hover:scale-110 transition-transform">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                        What We Offer
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
                        Why Students Choose VeriStay
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-primary-200 hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-2 group"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-50 text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gradient-to-b from-white to-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                            Our Values
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
                            What Drives Us Forward
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, idx) => {
                            const Icon = value.icon;
                            return (
                                <div key={idx} className="bg-white p-8 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 border-2 border-gray-100">
                                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                                        <Icon className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden py-20">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
                        Ready to Find Your Perfect Stay?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Start exploring verified hostels and PGs near your college today. Zero brokerage, 100% transparent.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/explore"
                            className="inline-flex items-center justify-center px-10 py-4 border-2 border-transparent text-base font-bold rounded-xl text-primary-700 bg-white hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
                        >
                            Explore Properties
                        </a>
                        <a
                            href="/explore"
                            className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-base font-bold rounded-xl text-white bg-transparent hover:bg-white/10 transition-all duration-300"
                        >
                            Contact Us
                        </a>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100 text-sm">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-current" />
                            <span>4.8/5 Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <span>100% Verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>50k+ Students</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
