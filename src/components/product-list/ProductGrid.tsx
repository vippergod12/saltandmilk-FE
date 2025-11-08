// src/components/product-list/ProductGrid.tsx
import React from 'react';
import type { ProductVariant } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    variants: ProductVariant[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ variants }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {variants.map(variant => (
                <ProductCard key={variant.variantId} variant={variant} />
            ))}
        </div>
    );
}

export default ProductGrid;