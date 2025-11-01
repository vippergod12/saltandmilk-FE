// src/components/product-list/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number; // Trang hiện tại (0-based)
  totalPages: number; // Tổng số trang
  onPageChange: (page: number) => void; // Hàm xử lý khi chuyển trang
}

// Hàm hỗ trợ tạo các nút trang hiển thị (vd: 1, 2, 3, ..., 10)
const generatePageNumbers = (currentPage: number, totalPages: number): (number | '...')[] => {
  const maxPagesToShow = 5; // Số lượng nút trang tối đa hiển thị (ví dụ: 1 2 3 ... 10)
  const pages: (number | '...')[] = [];

  if (totalPages <= maxPagesToShow) {
    // Nếu tổng số trang ít, hiển thị tất cả
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Logic hiển thị tối ưu hơn khi có nhiều trang
    const startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);
    
    // Thêm trang đầu tiên (0) và dấu ba chấm nếu cần
    if (startPage > 0) {
      pages.push(0);
      if (startPage > 1) pages.push('...');
    }
    
    // Thêm các trang ở giữa
    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i < totalPages - 1) { // Tránh trùng lặp với trang đầu/cuối
          pages.push(i);
      }
    }
    
    // Thêm trang cuối cùng (totalPages - 1) và dấu ba chấm nếu cần
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages - 1)) pages.push(totalPages - 1); // Đảm bảo trang cuối luôn có
    }
    
    // Nếu logic trên bị lỗi/trùng lặp, ta dùng cách đơn giản hóa:
    // Tạo 3 nút xung quanh trang hiện tại và đảm bảo nút 1 và nút cuối luôn hiển thị
    const simplePages: (number | '...')[] = [];
    simplePages.push(0); // Luôn có trang đầu tiên
    
    const minPage = Math.max(1, currentPage - 1);
    const maxPage = Math.min(totalPages - 2, currentPage + 1);
    
    if (minPage > 1) simplePages.push('...');
    
    for (let i = minPage; i <= maxPage; i++) {
        if (!simplePages.includes(i)) simplePages.push(i);
    }

    if (maxPage < totalPages - 2) simplePages.push('...');

    if (totalPages > 1 && !simplePages.includes(totalPages - 1)) simplePages.push(totalPages - 1);

    // Lọc bỏ trùng lặp và sắp xếp
    const uniquePages = Array.from(new Set(simplePages)).sort((a, b) => {
        if (a === '...') return 1;
        if (b === '...') return -1;
        return (a as number) - (b as number);
    });

    return uniquePages;

  }
  
  return pages; // Trả về mảng các nút trang cần hiển thị
};


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Không cần render nếu chỉ có 1 trang hoặc không có trang nào
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  
  const baseClasses = "px-4 py-2 border rounded-md transition duration-200";
  const activeClasses = "bg-blue-600 text-white border-blue-600 shadow-md";
  const inactiveClasses = "bg-white text-gray-700 hover:bg-gray-100 border-gray-300";

  return (
    <div className="flex justify-center items-center mt-8 space-x-2 select-none">
      {/* Nút TRƯỚC */}
      <button 
        className={`${baseClasses} ${inactiveClasses}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Trước
      </button>

      {/* Các nút trang */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={index} className="px-4 py-2 text-gray-500">
              ...
            </span>
          );
        }

        const pageIndex = page as number;
        const isCurrent = pageIndex === currentPage;

        return (
          <button
            key={pageIndex}
            className={`${baseClasses} ${isCurrent ? activeClasses : inactiveClasses}`}
            onClick={() => onPageChange(pageIndex)}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {pageIndex + 1} {/* Hiển thị 1-based cho người dùng */}
          </button>
        );
      })}

      {/* Nút SAU */}
      <button
        className={`${baseClasses} ${inactiveClasses}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        Sau
      </button>
    </div>
  );
}

export default Pagination;