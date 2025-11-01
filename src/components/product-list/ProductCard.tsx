// src/components/product-list/ProductCard.tsx
import React from 'react';
import type { ProductVariant } from '../../types';

interface ProductCardProps {
    variants: ProductVariant;
}


const ProductCard: React.FC<ProductCardProps> = ({ variants }) => {
    return (
        <div className="border cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
            <img src={variants.imageUrl} alt={variants.productName} className="w-full  object-cover transition-transform duration-300 hover:scale-105" />
            <div className="p-4">
                <h4 className="text-lg font-semibold truncate">{variants.productName}</h4>
                <div className="flex justify-between">
                    {
                        variants.price ? (
                            <div className="text-gray-400 line-through mt-1">{variants.price?.toLocaleString('vi-VN')} ₫</div>
                        ) : <div>{null}</div>
                    }
                    <div className="text-red-500 font-semibold mt-1">{variants.salePrice.toLocaleString('vi-VN')} ₫</div>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;