import React from 'react';
import type { Category } from '../../types';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  categories: Category[];
  onSelectCategory: (categoryName: string | null) => void;
  selectedCategory: string | null;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-bold mb-3">Danh mục sản phẩm</h3>
      <ul>
        {/* Mục "Tất cả sản phẩm" để reset filter */}
        <li 
          onClick={() => onSelectCategory(null)}
          className={`p-2 rounded-md cursor-pointer font-semibold ${!selectedCategory ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
        >
          Tất cả sản phẩm
        </li>
        
        {/* Render danh sách các danh mục */}
        {categories.map((category) => (
          <CategoryItem 
            key={category.id} 
            category={category} 
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory} // Truyền prop này xuống component con
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;