// src/components/home/FeaturedProducts.tsx
import React, { useEffect, useState } from "react";
import { fetchProductsByTab, fetchProductTabs } from "../../services/api";
import type { ProductVariant, Tag } from "../../types";
import { SimpleProductCard } from "./SimpleProductCard";



export const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null); // đổi sang number
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState<Tag[]>([]); // danh sách tag

  // Lấy danh sách tag khi component mount
  useEffect(() => {
    const loadTabs = async () => {
      try {
        const tabData = await fetchProductTabs(); // gọi API lấy tag

        setTabs(tabData.result);

        // nếu có ít nhất 1 tag thì set tag đầu tiên làm active
        if (tabData.result.length > 0) {
          setActiveTab(tabData.result[0].tag_id);
        }
      } catch (err) {
        console.error("Failed to fetch tabs:", err);
      }
    };
    loadTabs();
  }, []);

  // Lấy danh sách sản phẩm theo tag đang active
  useEffect(() => {
    const loadProducts = async () => {
      if (activeTab === null) return;
      setLoading(true);
      try {
        const data = await fetchProductsByTab(activeTab);
        console.log("product by tag: " + activeTab);
        setVariants(data.result);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [activeTab]);

  return (
    <div>
      <h2 className="text-3xl mb-8 text-center text-gray-800 font-semibold">
        Khám Phá Thêm
      </h2>

      {/* Dòng 1: Các Tab */}
      <div className="flex justify-center items-center gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.tag_id}
            onClick={() => setActiveTab(tab.tag_id)}
            className={`
              px-5 py-2 rounded-full font-medium transition-colors
              ${activeTab === tab.tag_id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Dòng 2: Danh sách sản phẩm */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-800 font-semibold">
          {variants.map((variant) => (
            <SimpleProductCard key={variant.variantId} variants={variant} />
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
