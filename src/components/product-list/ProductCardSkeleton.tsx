// src/components/product-list/ProductCardSkeleton.tsx
import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md group animate-pulse">
      {/* Skeleton cho ảnh */}
      <div className="w-full h-48 bg-gray-300"></div>
      
      <div className="p-4">
        {/* Skeleton cho tên sản phẩm */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        
        {/* Skeleton cho giá */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;