import { Link, useLocation } from 'react-router-dom';
import { MapPin, User, Menu, X, Home, Search, Building2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/explore', label: 'Find Hostels', icon: Search },
        { path: '/about', label: 'About', icon: Building2 },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <MapPin className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
                            <span className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                VeriStay
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                        isActive(link.path)
                                            ? "text-primary bg-primary/10"
                                            : "text-gray-600 hover:text-primary hover:bg-gray-50"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            );
                        })}

                        {/* Login Button */}
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <User className="h-4 w-4" />
                            Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={cn(
                    "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200",
                                    isActive(link.path)
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        );
                    })}

                    {/* Mobile Login Button */}
                    <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary/90 transition-all duration-200"
                    >
                        <User className="h-5 w-5" />
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
