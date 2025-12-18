import React, { useState, useEffect } from 'react';
import { Save, AlertCircle } from 'lucide-react';

const EquipmentForm = ({ onSubmit, initialData, isLoading }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Machine',
        status: 'Active',
        lastCleanedDate: new Date().toISOString().split('T')[0]
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                lastCleanedDate: initialData.lastCleanedDate ? new Date(initialData.lastCleanedDate).toISOString().split('T')[0] : ''
            });
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.type) newErrors.type = 'Type is required';
        if (!formData.status) newErrors.status = 'Status is required';
        if (!formData.lastCleanedDate) newErrors.lastCleanedDate = 'Date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Equipment Name</label>
                <div className="relative">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Centrifuge X1"
                        className={`w-full bg-slate-950 border ${errors.name ? 'border-red-500' : 'border-slate-800'} text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all placeholder:text-slate-600`}
                    />
                    {errors.name && (
                        <div className="absolute right-3 top-3.5 text-red-500">
                            <AlertCircle size={18} />
                        </div>
                    )}
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none cursor-pointer"
                    >
                        <option value="Machine">Machine</option>
                        <option value="Vessel">Vessel</option>
                        <option value="Tank">Tank</option>
                        <option value="Mixer">Mixer</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none cursor-pointer"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Last Cleaned Date</label>
                <input
                    type="date"
                    name="lastCleanedDate"
                    value={formData.lastCleanedDate}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all cursor-pointer"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20 disabled:opacity-70 mt-2"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <Save size={18} />
                        {initialData ? 'Update Equipment' : 'Add Equipment'}
                    </>
                )}
            </button>
        </form>
    );
};

export default EquipmentForm;
