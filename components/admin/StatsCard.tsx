import React from 'react';

export default function StatsCard({ title, value, icon, trend, color }: { title: string; value: string | number; icon: React.ReactNode; trend?: string; color?: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" 
          style={{ backgroundColor: color ? `${color}1A` : '#f3f4f6', color: color || '#6b7280' }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-sm text-gray-500 uppercase tracking-wider">{title}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && <p className="text-sm text-green-600 mt-1">{trend}</p>}
        </div>
      </div>
    </div>
  );
}
