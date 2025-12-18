import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Filter, ArrowUpDown, Download } from 'lucide-react';
import { getEquipment, createEquipment, updateEquipment, deleteEquipment } from '../api/equipmentApi';
import EquipmentTable from './EquipmentTable';
import EquipmentForm from './EquipmentForm';
import Modal from './Modal';

const EquipmentList = () => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            setLoading(true);
            const res = await getEquipment();
            setEquipment(res.data);
        } catch (error) {
            console.error('Error fetching equipment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (formData) => {
        try {
            setLoading(true);
            if (editingItem) {
                await updateEquipment(editingItem._id, formData);
            } else {
                await createEquipment(formData);
            }
            setModalOpen(false);
            setEditingItem(null);
            fetchEquipment();
        } catch (error) {
            console.error('Error saving equipment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this equipment?')) {
            try {
                await deleteEquipment(id);
                fetchEquipment();
            } catch (error) {
                console.error('Error deleting equipment:', error);
            }
        }
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    const filteredAndSortedEquipment = useMemo(() => {
        let result = equipment.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.type.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [equipment, searchTerm, statusFilter, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="space-y-1">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Active Equipment</h2>
                    <p className="text-slate-400">Manage and monitor your industrial assets efficiently.</p>
                </div>
                <button
                    onClick={() => { setEditingItem(null); setModalOpen(true); }}
                    className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-900/20 active:scale-95"
                >
                    <Plus size={20} />
                    Add Equipment
                </button>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 mb-6 backdrop-blur-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search equipment..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <Filter className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none appearance-none cursor-pointer"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                        </select>
                    </div>

                    <button
                        onClick={() => requestSort('name')}
                        className={`p-3 rounded-xl border border-slate-800 transition-all flex items-center gap-2 ${sortConfig.key === 'name' ? 'bg-primary-500/10 text-primary-400 border-primary-500/30' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
                        title="Sort by Name"
                    >
                        <ArrowUpDown size={18} />
                        <span className="hidden md:inline text-sm font-medium">Name</span>
                    </button>

                    <button
                        onClick={() => requestSort('status')}
                        className={`p-3 rounded-xl border border-slate-800 transition-all flex items-center gap-2 ${sortConfig.key === 'status' ? 'bg-primary-500/10 text-primary-400 border-primary-500/30' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
                        title="Sort by Status"
                    >
                        <ArrowUpDown size={18} />
                        <span className="hidden md:inline text-sm font-medium">Status</span>
                    </button>

                    <button
                        onClick={() => requestSort('lastCleanedDate')}
                        className={`p-3 rounded-xl border border-slate-800 transition-all flex items-center gap-2 ${sortConfig.key === 'lastCleanedDate' ? 'bg-primary-500/10 text-primary-400 border-primary-500/30' : 'bg-slate-950 text-slate-400 hover:text-white'}`}
                        title="Sort by Date"
                    >
                        <ArrowUpDown size={18} />
                        <span className="hidden md:inline text-sm font-medium">Date</span>
                    </button>
                </div>
            </div>

            {loading && equipment.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin mb-4" />
                    <p className="text-slate-400 animate-pulse">Loading equipment data...</p>
                </div>
            ) : (
                <EquipmentTable
                    items={filteredAndSortedEquipment}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingItem ? 'Edit Equipment' : 'Register Equipment'}
            >
                <EquipmentForm
                    onSubmit={handleCreateOrUpdate}
                    initialData={editingItem}
                    isLoading={loading}
                />
            </Modal>
        </div>
    );
};

export default EquipmentList;
