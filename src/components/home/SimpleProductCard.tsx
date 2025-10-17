// src/components/ui/SimpleProductCard.tsx

import React from 'react';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const SimpleProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm h-10 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 justify-between">

          {product.old_price && (
            <span className="text-gray-400 line-through text-xs">
              {formatCurrency(product.old_price)}
            </span>
          )}
          <span className="text-red-600 font-bold">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};