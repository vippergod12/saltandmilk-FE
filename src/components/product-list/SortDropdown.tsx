// src/components/product-list/SortDropdown.tsx
import React from 'react';

interface SortDropdownProps {
  sortOption: string;
  onSortChange: (newOption: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps>= ({sortOption, onSortChange}) => {
    const sortOptions = [
        'Mặc định', 'Hàng mới nhất', 'Hàng cũ nhất', 
        'Giá: Tăng dần', 'Giá: Giảm dần', 'Tên: A-Z', 'Tên: Z-A'
    ];

    return (
        <div className="flex justify-end mb-4">
            <select className="border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value = {sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            >
                {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default SortDropdown;