// src/components/product-list/CategoryItem.tsx
import React, { useState } from 'react';
import type { Category } from '../../types';
import { Plus, Minus } from 'lucide-react';

interface CategoryItemProps {
  category: Category;
  onSelectCategory: (category_id: number | null) => void;
  selectedCategory: number | null;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onSelectCategory, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  
  // SỬA Ở ĐÂY: Dùng `category.category_id`
  const isActive = selectedCategory === category.category_id;

  return (
    <li className="my-1">
      <div className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${isActive ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}>
        {/* SỬA Ở ĐÂY: Dùng `category.category_id` */}
        <span onClick={() => onSelectCategory(category.category_id)} className="flex-grow">
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
              // SỬA NỐT Ở ĐÂY (key prop): Dùng `child.category_id`
              key={child.category_id} 
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