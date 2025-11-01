// src/components/product-list/CategoryList.tsx

import React from 'react';
import type { Category } from '../../types';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  categories: Category[];
  // Prop onSelectCategory nhận ID (number) hoặc null (khi chọn "Tất cả")
  onSelectCategory: (category_id: number | null) => void;
  // Prop selectedCategory là ID (number) hoặc null
  selectedCategory: number | null;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
}) => {
  // Xác định xem mục "Tất cả" có đang active hay không
  const isAllActive = selectedCategory === null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Danh mục</h3>
      <ul>
        {/* MỤC "TẤT CẢ DANH MỤC" */}
        <li
          className={`p-2 rounded-md cursor-pointer font-medium ${
            isAllActive
              ? 'bg-indigo-100 text-indigo-700' // Active class
              : 'hover:bg-gray-100' // Hover class
          }`}
          // Khi click, gọi onSelectCategory với giá trị null
          onClick={() => onSelectCategory(null)}
        >
          Tất cả danh mục
        </li>

        {/* RENDER CÁC DANH MỤC GỐC */}
        {categories.map((category) => (
          <CategoryItem
            key={category.category_id}
            category={category}
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;