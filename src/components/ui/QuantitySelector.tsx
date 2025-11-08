// src/components/ui/QuantitySelector.tsx
import React from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'; // Cần 'npm install @heroicons/react'

interface Props {
  quantity: number;
  onChange: (newQuantity: number) => void;
  max?: number; // Số lượng tối đa (thường là tồn kho)
  min?: number; // Số lượng tối thiểu (thường là 1)
}

export const QuantitySelector: React.FC<Props> = ({
  quantity,
  onChange,
  max,
  min = 1, // Mặc định là 1
}) => {
  const handleDecrement = () => {
    // Không cho giảm dưới min
    const newQuantity = Math.max(min, quantity - 1);
    onChange(newQuantity);
  };

  const handleIncrement = () => {
    // Nếu không có max, cho phép tăng vô hạn
    if (max === undefined) {
      onChange(quantity + 1);
      return;
    }
    // Nếu có max, không cho tăng vượt max
    const newQuantity = Math.min(max, quantity + 1);
    onChange(newQuantity);
  };

  // Logic vô hiệu hóa nút
  const isDecrementDisabled = quantity <= min;
  const isIncrementDisabled = max !== undefined && quantity >= max;

  return (
    <div className="flex items-center border border-gray-300 rounded w-fit">
      {/* Nút Giảm */}
      <button
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        className="px-3 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Giảm số lượng"
      >
        <MinusIcon className="w-4 h-4" />
      </button>

      {/* Hiển thị số lượng (Read-only) */}
      <span className="px-5 py-1 text-center font-medium border-x border-gray-300">
        {quantity}
      </span>

      {/* Nút Tăng */}
      <button
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        className="px-3 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Tăng số lượng"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;