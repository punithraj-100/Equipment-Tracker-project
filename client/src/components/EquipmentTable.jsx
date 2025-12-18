import React from 'react';
import { Edit2, Trash2, Calendar, Tag, Activity } from 'lucide-react';
import { format } from 'date-fns';

const EquipmentTable = ({ items, onEdit, onDelete }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'Inactive': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
            case 'Under Maintenance': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const getTypeIcon = (type) => {
        return <Tag size={14} className="opacity-60" />;
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
                <Activity size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">No equipment found</p>
                <p className="text-sm">Try adjusting your filters or add new equipment</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-800">
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Cleaned</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {items.map((item) => (
                        <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-semibold text-white group-hover:text-primary-400 transition-colors">{item.name}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    {getTypeIcon(item.type)}
                                    {item.type}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(item.status)} uppercase tracking-wide`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-400">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar size={14} className="opacity-60" />
                                    {format(new Date(item.lastCleanedDate), 'MMM dd, yyyy')}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 text-slate-400 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-all"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item._id)}
                                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EquipmentTable;
