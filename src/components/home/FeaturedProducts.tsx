// src/components/home/FeaturedProducts.tsx

import React, { useEffect, useState } from 'react';
import { productTabs } from '../../data/mockData';
import { fetchProductsByTab } from '../../services/api';
import type { Product, ProductTabId } from '../../types';
import { SimpleProductCard } from './SimpleProductCard';

export const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductTabId>('promotion');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Effect này sẽ chạy lại mỗi khi activeTab thay đổi
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchProductsByTab(activeTab);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeTab]); // Phụ thuộc vào activeTab

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 font-semibold">Khám Phá Thêm</h2>
      
      {/* Dòng 1: Các Tab */}
      <div className="flex justify-center items-center gap-4 mb-6">
        {productTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-5 py-2 rounded-full font-medium transition-colors
              ${activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dòng 2: Danh sách sản phẩm */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Skeleton placeholders */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-800 font-semibold">
          {products.map((product) => (
            <SimpleProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Dòng 3: Button xem tất cả */}
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-md">
          Xem tất cả
        </button>
      </div>
    </div>
  );
};