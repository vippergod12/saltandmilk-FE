// src/components/product/RecentlyViewed.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchVariantSummaries } from '../../services/api';
import type { ProductVariant } from '../../types';

interface Props {
  currentVariantId: string;
}

const STORAGE_KEY = 'recentlyViewedVariantIds';
const MAX_RECENTLY_VIEWED = 5;

export const RecentlyViewed: React.FC<Props> = ({ currentVariantId }) => {
  const [products, setProducts] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Lấy danh sách ID từ localStorage
    const storedIds: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // 2. Thêm ID hiện tại vào đầu (nếu chưa có)
    let updatedIds = [currentVariantId, ...storedIds.filter(id => id !== currentVariantId)];
    
    // 3. Giới hạn danh sách
    updatedIds = updatedIds.slice(0, MAX_RECENTLY_VIEWED + 1); // Lấy 6, vì ta sẽ bỏ cái hiện tại
    
    // 4. Lưu lại localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));

    // 5. Fetch thông tin tóm tắt
    const fetchSummaries = async () => {
      try {
        setLoading(true);
        // Lọc ra các ID KHÔNG PHẢI trang hiện tại
        const idsToFetch = updatedIds.filter(id => id !== currentVariantId);
        
        if (idsToFetch.length > 0) {
          const response = await fetchVariantSummaries(idsToFetch);
          if (response.code === 200) {
            setProducts(response.result);
          }
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch recently viewed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, [currentVariantId]); // Chạy lại mỗi khi xem 1 variant mới

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Đã xem gần đây</h3>
      
      {loading && <div>Đang tải...</div>}

      {!loading && products.length === 0 && (
        <p className="text-sm text-gray-500">Chưa có sản phẩm nào.</p>
      )}

      {!loading && products.map(variant => (
        <Link
          // Link về trang product gốc
          to={`/product/${variant.productId}`} 
          key={variant.variantId} 
          className="grid grid-cols-12 gap-2 p-2 rounded hover:bg-gray-100"
        >
          {/* Nửa trái 3 cột: Hình */}
          <div className="col-span-3">
            <img 
              src={variant.imageUrl} 
              alt={variant.productName} 
              className="w-full aspect-square object-cover rounded" 
            />
          </div>
          {/* Nửa phải 9 cột: Tên, Giá */}
          <div className="col-span-9 flex flex-col justify-center">
            {/* Dòng 1: Tên */}
            <span className="text-sm font-medium line-clamp-2">{variant.productName}</span>
            {/* Dòng 2: Giá */}
            <span className="text-sm font-bold text-red-600">
              {(variant.salePrice || variant.price).toLocaleString('vi-VN')}đ
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};