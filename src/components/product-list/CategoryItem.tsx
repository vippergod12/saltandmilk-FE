// src/components/product-list/CategoryItem.tsx
import React, { useState } from 'react';
import type { Category } from '../../types';
import { Plus, Minus } from 'lucide-react';

interface CategoryItemProps {
  category: Category;
  // Thay đổi 1: Đồng bộ hóa kiểu dữ liệu
  onSelectCategory: (categoryName: string | null) => void;
  selectedCategory: string | null;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onSelectCategory, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const isActive = selectedCategory === category.name;

  return (
    <li className="my-1">
      {/* Thay đổi 2: Thêm class active */}
      <div className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${isActive ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}>
        <span onClick={() => onSelectCategory(category.name)} className="flex-grow">
          {category.name}
        </span>
        {hasChildren && (
          <button onClick={() => setIsOpen(!isOpen)} className="p-1">
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </button>
        )}
      </div>
      {isOpen && hasChildren && (
        <ul className="pl-4 border-l border-gray-200 ml-2">
          {category.children?.map((child) => (
            <CategoryItem 
              key={child.id} 
              category={child} 
              onSelectCategory={onSelectCategory}
              selectedCategory={selectedCategory}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryItem;