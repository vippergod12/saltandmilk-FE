// src/components/product-list/ActiveFilters.tsx
import React from 'react';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  filters: string[];
  onRemoveFilter: (filter: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onRemoveFilter }) => {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center my-4">
      <span className="font-semibold">Đang lọc theo:</span>
      {filters.map((filter) => (
        <div key={filter} className="flex items-center bg-black text-white text-sm font-medium px-3 py-1 rounded-full">
          <span>{filter}</span>
          <button onClick={() => onRemoveFilter(filter)} className="ml-2 text-white hover:text-gray-300">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;