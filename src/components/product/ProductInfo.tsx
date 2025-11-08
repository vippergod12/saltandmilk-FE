import React, { useState } from 'react';
import type { ProductVariant } from '../../types';
import { QuantitySelector } from '../ui/QuantitySelector';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';

interface Props {
  variant: ProductVariant;
}

export const ProductInfo: React.FC<Props> = ({ variant }) => {
  const [quantity, setQuantity] = useState(1);

  const product = variant.product;
  const stockStatus = variant.stockQuantity > 0 ? 'Còn hàng' : 'Hết hàng';

  return (
    <div className="flex flex-col space-y-4">
      {/* Tên */}
      <h1 className="text-3xl font-bold">{product.name}</h1>

      {/* SKU & Tình trạng */}
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <span>SKU: {variant.sku}</span>
        <span>|</span>
        <span className={variant.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}>
          {stockStatus}
        </span>
      </div>

      {/* Giá */}
      <div className="pt-2">
        <div className="text-2xl font-semibold text-blue-600">
          {variant.salePrice.toLocaleString('vi-VN')}₫
        </div>
        {variant.salePrice < variant.price && (
          <div className="text-gray-400 line-through text-sm">
            {variant.price.toLocaleString('vi-VN')}₫
          </div>
        )}
      </div>

      {/* Màu & Size */}
      <div className="text-gray-700 space-y-1">
        <p><strong>Màu sắc:</strong> {variant.color?.name}</p>
        <p><strong>Kích thước:</strong> {variant.size?.name}</p>
      </div>

      {/* Mô tả */}
      {product.description && (
        <p className="text-gray-700 pt-2">{product.description}</p>
      )}

      {/* Số lượng */}
      <div className="pt-4">
        <span className="font-semibold">Số lượng</span>
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          max={variant.stockQuantity}
        />
      </div>

      {/* Nút hành động */}
      <div className="flex items-center space-x-4 pt-4">
        <button
          disabled={variant.stockQuantity === 0}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center space-x-2"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          <span>Thêm vào giỏ hàng</span>
        </button>

        <button className="p-3 border rounded text-gray-500 hover:text-red-500 hover:border-red-500">
          <HeartIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
