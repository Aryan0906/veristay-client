import { MapPin, Shield, Users, Award } from 'lucide-react';

export default function About() {
    const features = [
        {
            icon: Shield,
            title: 'Verified Listings',
            description: 'All hostels and PGs are verified by our team to ensure quality and safety.',
        },
        {
            icon: MapPin,
            title: 'Location-Based Search',
            description: 'Find accommodations near your college with our interactive map feature.',
        },
        {
            icon: Users,
            title: 'No Brokerage',
            description: 'Connect directly with property owners. Save money, no hidden fees.',
        },
        {
            icon: Award,
            title: 'Student-Focused',
            description: 'Designed specifically for students in Ahmedabad with their needs in mind.',
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-primary text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                            About VeriStay
                        </h1>
                        <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto">
                            Making student accommodation search transparent, easy, and trustworthy in Ahmedabad.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="lg:text-center">
                    <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
                        Our Mission
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Helping Students Find Their Perfect Home
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        VeriStay connects students in Ahmedabad with verified hostels, PGs, and mess services.
                        We believe finding accommodation should be transparent, safe, and broker-free.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className="relative bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                                >
                                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-4">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                        <div>
                            <p className="text-4xl font-extrabold text-primary">500+</p>
                            <p className="mt-2 text-lg text-gray-600">Verified Properties</p>
                        </div>
                        <div>
                            <p className="text-4xl font-extrabold text-primary">2000+</p>
                            <p className="mt-2 text-lg text-gray-600">Happy Students</p>
                        </div>
                        <div>
                            <p className="text-4xl font-extrabold text-primary">50+</p>
                            <p className="mt-2 text-lg text-gray-600">College Locations</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Ready to find your perfect stay?
                    </h2>
                    <p className="mt-4 text-lg text-white/80">
                        Start exploring verified hostels and PGs near your college today.
                    </p>
                    <div className="mt-8">
                        <a
                            href="/explore"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition-colors duration-200"
                        >
                            Explore Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
