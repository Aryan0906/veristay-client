import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPinHouse, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { user, signOut } = useAuth();

    const links = [
        { to: '/', label: 'Home' },
        { to: '/colleges', label: 'Colleges' },
        { to: '/hostels', label: 'Hostels' },
        { to: '/food', label: 'Food' },
    ];

    return (
        <header className="sticky top-0 z-30 border-b border-primary-100 bg-white/90 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
                <Link to="/" className="flex items-center gap-2">
                    <span className="rounded-lg bg-gradient-primary p-2 text-white shadow-soft">
                        <MapPinHouse className="h-5 w-5" />
                    </span>
                    <span className="font-display text-xl font-bold text-accent-600">VeriStay</span>
                </Link>

                <nav className="hidden items-center gap-2 md:flex">
                    {links.map((link) => {
                        const active = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                    active ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-secondary-200'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    
                    <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                    <UserIcon className="h-4 w-4" />
                                    {user.email?.split('@')[0]}
                                </span>
                                <button
                                    onClick={signOut}
                                    className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                                    title="Sign Out"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/auth"
                                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </nav>

                <div className="flex items-center gap-2 md:hidden">
                    {!user ? (
                        <Link
                            to="/auth"
                            className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white"
                        >
                            Sign In
                        </Link>
                    ) : null}
                    <button
                        type="button"
                        className="rounded-lg p-2"
                        onClick={() => setIsOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {isOpen ? (
                <div className="border-t border-primary-100 bg-white p-3 md:hidden">
                    {links.map((link) => {
                        const active = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                                    active ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    {user && (
                        <div className="mt-2 border-t border-gray-100 pt-2 flex items-center justify-between px-3">
                            <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                <UserIcon className="h-4 w-4" />
                                {user.email?.split('@')[0]}
                            </span>
                            <button
                                onClick={() => {
                                    signOut();
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-1 rounded p-2 text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : null}
        </header>
    );
}
