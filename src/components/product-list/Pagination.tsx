// src/components/product-list/Pagination.tsx
import React from 'react';

const Pagination: React.FC = () => {
    return (
        <div className="flex justify-center items-center mt-8 space-x-2">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100">Trước</button>
            <button className="px-4 py-2 border rounded-md bg-indigo-600 text-white">1</button>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100">2</button>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100">3</button>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100">Sau</button>
        </div>
    );
}

export default Pagination;