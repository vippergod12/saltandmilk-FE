import React from 'react';
import { Link } from 'react-router-dom'; // Nên dùng Link để điều hướng
import type { ProductVariant } from '../../types';

// SỬA 1: Đổi tên interface cho rõ ràng
interface ProductCardProps {
    variant: ProductVariant; // SỬA 2: Đổi từ 'variants' (số nhiều) thành 'variant' (số ít)
}

const ProductCard: React.FC<ProductCardProps> = ({ variant }) => { // SỬA 3: Đổi ở đây

    // 🔥 SỬA LỖI: Thêm dòng kiểm tra này
    // Nếu vì lý do nào đó mà variant bị 'undefined',
    // ta sẽ không render gì cả (ngăn chặn crash)
    if (!variant) {
        return null;
    }

    // Logic giá tốt hơn:
    // Kiểm tra salePrice có tồn tại và nhỏ hơn giá gốc
    const hasSale = variant.salePrice != null && variant.salePrice > 0 && variant.salePrice < variant.price;
    const displayPrice = hasSale ? variant.salePrice : variant.price;
    const oldPrice = hasSale ? variant.price : null;

    return (
        // SỬA 4: Bọc trong Link để người dùng click được
        <Link
            to={`/product/${variant.variantId}`} // Link về trang chi tiết
            className="group block border cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
            <img
                src={variant.imageUrl} // SỬA 5: Dùng 'variant'
                alt={variant.product.name} // SỬA 5: Dùng 'variant'
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105" // Thêm aspect-square cho đẹp
            />
            <div className="p-4">
                <h4 className="text-lg font-semibold truncate group-hover:text-blue-600 h-12"> {/* Thêm h-12 để đồng bộ chiều cao */}
                    {variant.product.name} {/* SỬA 5: Dùng 'variant' */}
                </h4>

                {/* SỬA 6: Logic giá đã được làm gọn */}
                <div className="flex items-baseline justify-between mt-1">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-red-500 font-semibold">
                            {displayPrice.toLocaleString('vi-VN')} ₫
                        </span>
                        {oldPrice && (
                            <span className="text-gray-400 line-through text-sm">
                                {oldPrice.toLocaleString('vi-VN')} ₫
                            </span>
                        )}
                    </div>
                </div>

                {/* Bạn có thể thêm SKU ở đây nếu muốn, giống yêu cầu ban đầu */}
                <span className="text-xs text-gray-400 mt-1 block">
                    SKU: {variant.sku} {/* SỬA 5: Dùng 'variant' */}
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;

