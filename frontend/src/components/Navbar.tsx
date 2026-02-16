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
        <nav className="sticky w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-xl group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300 shadow-soft group-hover:shadow-soft-xl">
                                <MapPin className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                                Veri<span className="text-primary-600">Stay</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={cn(
                                        "flex items-center gap-2 text-sm font-semibold transition-all duration-200 px-4 py-2 rounded-lg",
                                        isActive(link.path)
                                            ? "text-primary-700 bg-primary-50"
                                            : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            );
                        })}

                        {/* Modern Login Button */}
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-2.5 rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-300 font-semibold text-sm shadow-soft hover:shadow-soft-xl hover:scale-105 transform"
                        >
                            <User className="h-4 w-4" />
                            Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={cn(
                "md:hidden transition-all duration-300 overflow-hidden",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="px-4 pt-2 pb-4 space-y-2 bg-white/98 backdrop-blur-lg border-t border-gray-100">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200",
                                    isActive(link.path)
                                        ? "text-primary-700 bg-primary-50"
                                        : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
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
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-soft"
                    >
                        <User className="h-5 w-5" />
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
