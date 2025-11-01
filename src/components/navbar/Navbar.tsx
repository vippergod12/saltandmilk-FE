import React, { useState, useEffect, useRef } from 'react';
// 1. KHÔI PHỤC react-router-dom cho ứng dụng thật
import { Link, useNavigate } from 'react-router-dom';

// 2. IMPORT types và API thật
// (Giả sử file types của bạn nằm ở '../types')
import type { Category, ProductVariant } from '../../types';
import { fetchCategories, searchProductSuggestions } from '../../services/api';

// --- 1B. ĐỊNH NGHĨA ICON (Các component SVG thay thế react-icons) ---
const FiHeart = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);
const FiShoppingCart = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);
const FiUser = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const FiMenu = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const FiX = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const FiSearch = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const FiLoader = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);
// --- BỔ SUNG 2 ICON CHO MEGA MENU ---
const FiChevronDown = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
const FiChevronUp = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);


// 4. Custom Hook: useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // Hủy timeout nếu value thay đổi (người dùng gõ tiếp)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

// --- 5. COMPONENT CON CHO MOBILE (ĐỂ XỬ LÝ ĐỆ QUY) ---
interface MobileNavItemProps {
  item: Category;
  toggleParentMenu: () => void; // Hàm để đóng menu mobile chính
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ item, toggleParentMenu }) => {
  const [isOpen, setIsOpen] = useState(false); // State cho accordion
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen); // Chỉ bật/tắt accordion
    }
  };

  const handleLinkClick = () => {
    if (!hasChildren) {
      toggleParentMenu(); // Đóng menu mobile chính nếu click vào link con
    }
  };

  return (
    <li className="w-full">
      <div className="flex justify-between items-center w-full">
        <Link
          to={`/category/${item.slug}`}
          onClick={handleLinkClick}
          className={`inline-block text-gray-800 hover:text-blue-600 text-base font-medium transition-all duration-300 transform hover:-translate-y-1 ${hasChildren ? 'flex-1' : ''}`}
        >
          {item.name}
        </Link>
        {hasChildren && (
          <button onClick={handleToggle} className="p-2 text-gray-600">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        )}
      </div>
      {/* Đệ quy: Render menu con nếu có và đang mở */}
      {hasChildren && isOpen && (
        <ul className="pl-4 mt-2 flex flex-col items-start space-y-3">
          {item.children?.map((child) => (
            <MobileNavItem 
              key={child.category_id} 
              item={child} 
              toggleParentMenu={toggleParentMenu} 
            />
          ))}
        </ul>
      )}
    </li>
  );
};


// --- COMPONENT CHÍNH ---

const Navbar: React.FC = () => {
  // 3. State cho Nav Items (dùng Category[])
  const [navItems, setNavItems] = useState<Category[]>([]);
  const [loadingNav, setLoadingNav] = useState<boolean>(true);
  const [errorNav, setErrorNav] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 5. State cho tìm kiếm (dùng ProductVariant[])
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<ProductVariant[]>([]); // Dùng type thật
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Trì hoãn 500ms
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 4. KHÔI PHỤC useNavigate
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 5. Tải Nav Items (Categories) từ API thật
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingNav(true);
        const response = await fetchCategories(); // Gọi API thật
        // API CẦN TRẢ VỀ CẤU TRÚC ĐỆ QUY (children)
        setNavItems(response.result); // Bỏ slice(0, 6)
      } catch (err) {
        setErrorNav("Không thể tải danh mục");
        console.error(err);
      } finally {
        setLoadingNav(false);
      }
    };
    loadCategories();
  }, []); // Chạy 1 lần khi mount

  // 6. useEffect cho tìm kiếm (dùng API thật)
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      setIsSearchLoading(true);
      searchProductSuggestions(debouncedSearchTerm) // Gọi API thật
        .then(response => {
          setSuggestions(response.result); // Lấy từ .result
        })
        .catch(err => {
          console.error("Lỗi tìm kiếm:", err);
          setSuggestions([]);
        })
        .finally(() => {
          setIsSearchLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  // 7. useEffect xử lý click ra ngoài (Giữ nguyên)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // 8. Hàm xử lý khi gõ tìm kiếm (Giữ nguyên)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 9. Hàm xử lý khi bấm Enter (Dùng navigate)
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchFocused(false);
      setSearchTerm("");
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`); // Dùng navigate
    }
  };

  // 10. Hàm đóng gợi ý (Giữ nguyên)
  const closeSuggestions = () => {
    setIsSearchFocused(false);
    setSearchTerm("");
  }

  // 11. Render Nav (dùng Category[] và <Link>)
  // *** ĐÂY LÀ PHẦN ĐƯỢC THIẾT KẾ LẠI CHO MEGA MENU ***
  const renderHorizontalNavigation = () => {
    if (loadingNav) return <div className="text-center text-gray-500">Đang tải...</div>;
    if (errorNav) return <div className="text-center text-red-500">Lỗi: {errorNav}</div>;

    return (
      // Bỏ justify-between, dùng gap
      <ul className="flex items-center gap-6"> 
        {navItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;

          return (
            // SỬA LỖI: Thêm pb-2 (padding-bottom) để "bắc cầu" qua khoảng hở
            <li key={item.category_id} className="relative group pb-2">
              <Link 
                to={`/category/${item.slug}`} 
                className="inline-flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300"
              >
                {item.name.toUpperCase()}
                {/* Thêm icon mũi tên nếu có children */}
                {hasChildren && <FiChevronDown size={16} className="transition-transform group-hover:rotate-180" />}
              </Link>
              
              {/* === MEGA MENU DROPDOWN === */}
              {hasChildren && (
                // SỬA LỖI: Bỏ mt-2 (margin-top) để menu dính liền vào khu vực padding của thẻ li
                <div className="absolute top-full left-0 w-auto min-w-[400px] bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden
                                hidden group-hover:block transition-all duration-300 opacity-0 group-hover:opacity-100 z-50">
                  <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-4">
                    {item.children?.map((child) => (
                      <Link 
                        key={child.category_id} 
                        to={`/category/${child.slug}`} 
                        className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-2 rounded-md"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const showSuggestions = isSearchFocused && (suggestions.length > 0 || isSearchLoading || searchTerm.length > 0);

  return (
    <header className="bg-white shadow-md py-4 w-full sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between xl:grid xl:grid-cols-12 xl:gap-4">

          <div className="w-1/2 md:w-auto xl:col-span-3">
            <Link to="/" className="text-2xl font-bold text-gray-800 inline-block">
              YourLogo
            </Link>
          </div>

          {/* Search & Nav (Desktop) */}
          <div className="w-full order-3 xl:order-2 xl:col-span-6 mt-4 xl:mt-0 flex flex-col gap-y-4">

            <div
              className="w-full relative"
              ref={searchContainerRef}
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full px-4 py-2 pr-10 text-black border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                    <FiSearch size={20} />
                  </button>
                </div>
              </form>

              {/* 12. Dropdown gợi ý (dùng ProductVariant và <Link>) */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                  {isSearchLoading ? (
                    <div className="p-4 flex items-center justify-center text-gray-500">
                      <FiLoader className="animate-spin mr-2" />
                      Đang tìm...
                    </div>
                  ) : suggestions.length > 0 ? (
                    <ul className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                      {suggestions.map(variant => ( // Dùng variant
                        <li key={variant.variantId}>
                          <Link
                            to={`/products/${variant.productId}`} // Link đến trang sản phẩm bằng productId
                            onClick={closeSuggestions}
                            className="flex items-center p-3 hover:bg-gray-50"
                          >
                            <img src={variant.imageUrl} alt={variant.productName} className="w-12 h-12 object-cover rounded-md mr-3" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 truncate">{variant.productName}</p>
                              {/* Ưu tiên salePrice, nếu không có thì dùng price */}
                              <p className="text-sm text-red-600 font-semibold">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(variant.salePrice ?? variant.price)}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Không tìm thấy sản phẩm cho: "{searchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <nav className="h-6 hidden xl:block">
              {renderHorizontalNavigation()}
            </nav>
          </div>

          {/* Icons (dùng <Link>) */}
          <div className="w-1/2 md:w-auto order-2 xl:order-3 xl:col-span-3">
            <div className="flex items-center justify-end space-x-4">
              <Link to="/wishlist" className="text-gray-600 hover:text-blue-600">
                <FiHeart size={24} />
              </Link>
              <Link to="/cart" className="text-gray-600 hover:text-blue-600">
                <FiShoppingCart size={24} />
              </Link>
              <Link to="/account" className="text-gray-600 hover:text-blue-600">
                <FiUser size={24} />
              </Link>
              <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-blue-600 md:hidden">
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu cho Tablet (Giữ nguyên) */}
        <nav className="w-full hidden md:block xl:hidden mt-4">
          {renderHorizontalNavigation()}
        </nav>

        {/* 13. Menu cho Mobile (dùng <Link>) */}
        <div className={`w-full md:hidden overflow-hidden transition-all ease-in-out duration-500 ${isMobileMenuOpen ? 'max-h-screen mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="flex flex-col items-start space-y-4 pt-4 border-t border-gray-200">
            {/* SỬ DỤNG COMPONENT ĐỆ QUY MỚI */}
            {navItems.map((item) => (
              <MobileNavItem 
                key={item.category_id} 
                item={item} 
                toggleParentMenu={toggleMobileMenu} 
              />
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

