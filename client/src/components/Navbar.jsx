import React from 'react';
import { Package } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="bg-primary-500 p-2 rounded-lg">
                    <Package className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight leading-none">Equipment Tracker</h1>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Asset Management System</p>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
