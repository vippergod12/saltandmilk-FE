// src/components/product-list/SortDropdown.tsx
import React from 'react';

const SortDropdown: React.FC = () => {
    const sortOptions = [
        'Mặc định', 'Hàng mới nhất', 'Hàng cũ nhất', 
        'Giá: Tăng dần', 'Giá: Giảm dần', 'Tên: A-Z', 'Tên: Z-A'
    ];

    return (
        <div className="flex justify-end mb-4">
            <select className="border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default SortDropdown;