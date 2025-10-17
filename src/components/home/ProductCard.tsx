// src/components/ui/ProductCard.tsx

import React from 'react';
import type { ProductBestSeller } from '../../types';

interface Props {
  product: ProductBestSeller;
}

// Hàm format tiền tệ
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md h-full flex flex-col">
      {/* Dòng 1: Hình ảnh */}
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        {/* Dòng 2: Màu sắc & Size */}
        <div className="grid grid-cols-2 text-xs text-gray-500 mb-1">
          <span>{product.color_count} Màu sắc</span>
          <span className="text-right">{product.sizes.join(', ')}</span>
        </div>

        {/* Dòng 3: Tên sản phẩm */}
        <h3 className="font-semibold text-sm h-10 mb-2 line-clamp-2 flex-grow">
          {product.name}
        </h3>

        {/* Dòng 4: Giá */}
        <div className="grid grid-cols-2 items-center mt-auto">
          {product.old_price ? (
            <span className="text-gray-400 line-through text-xs">
              {formatCurrency(product.old_price)}
            </span>
          ) : (
            <span></span> // Giữ layout
          )}
          <span className="text-red-600 font-bold text-base text-right">
            {formatCurrency(product.new_price)}
          </span>
        </div>
      </div>
    </div>
  );
};