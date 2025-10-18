// src/components/product-list/ProductCard.tsx
import React from 'react';
import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="border cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
            <img src={product.image_url} alt={product.name} className="w-full  object-cover transition-transform duration-300 hover:scale-105" />
            <div className="p-4">
                <h4 className="text-lg font-semibold truncate">{product.name}</h4>
                <div className="flex justify-between">
                    {
                        product.old_price ? (
                            <div className="text-gray-400 line-through mt-1">{product.old_price?.toLocaleString('vi-VN')} ₫</div>
                        ) : <div>{null}</div>
                    }
                    <div className="text-red-500 font-semibold mt-1">{product.price.toLocaleString('vi-VN')} ₫</div>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;