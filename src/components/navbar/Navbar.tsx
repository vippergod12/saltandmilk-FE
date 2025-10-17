import React, { useState, useEffect } from 'react';
// 1. Import Link từ react-router-dom
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

interface NavItem {
  id: number;
  name: string;
  path: string;
}

const mockNavItems: NavItem[] = [
  { id: 1, name: 'Sản phẩm mới', path: '/san-pham-moi' },
  { id: 2, name: 'Sale', path: '/khuyen-mai' },
  { id: 3, name: 'Thời trang Nam', path: '/nam' },
  { id: 4, name: 'Thời trang Nữ', path: '/nu' },
  { id: 5, name: 'Bộ sưu tập', path: '/bo-suu-tap' },
];

const Navbar: React.FC = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchMockNavItems = () => {
      setTimeout(() => {
        setNavItems(mockNavItems);
        setLoading(false);
      }, 1000);
    };
    fetchMockNavItems();
  }, []);

  // Menu cho Desktop và Tablet
  const renderHorizontalNavigation = () => {
    if (loading) return <div className="text-center text-gray-500">Đang tải...</div>;
    if (error) return <div className="text-center text-red-500">Lỗi: {error}</div>;

    return (
      <ul className="flex items-center justify-between">
        {navItems.map((item) => (
          <li key={item.id}>
            {/* 2. Thay thế <a> bằng <Link> */}
            <Link to={item.path} className="inline-block text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 transform hover:-translate-y-1">
              {item.name.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <header className="bg-white shadow-md py-4 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between xl:grid xl:grid-cols-12 xl:gap-4">
          
          {/* Logo */}
          <div className="w-1/2 md:w-auto xl:col-span-3">
             {/* 2. Thay thế <a> bằng <Link> */}
            <Link to="/" className="text-2xl font-bold text-gray-800 navbar-logo inline-block">
              YourLogo
            </Link>
          </div>

          {/* Search & Nav (Desktop) */}
          <div className="w-full order-3 xl:order-2 xl:col-span-6 mt-4 xl:mt-0 flex flex-col gap-y-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <nav className="h-6 hidden xl:block">
              {renderHorizontalNavigation()}
            </nav>
          </div>

          {/* Icons */}
          <div className="w-1/2 md:w-auto order-2 xl:order-3 xl:col-span-3">
            <div className="flex items-center justify-end space-x-4">
              {/* 2. Thay thế <a> bằng <Link> và thêm path ví dụ */}
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

        {/* Menu cho Tablet */}
        <nav className="w-full hidden md:block xl:hidden mt-4">
          {renderHorizontalNavigation()}
        </nav>

        {/* Menu cho Mobile */}
        <div className={`w-full md:hidden overflow-hidden transition-all ease-in-out duration-500 ${isMobileMenuOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="flex flex-col items-start space-y-4 pt-4 border-t border-gray-200">
            {navItems.map((item) => (
              <li key={item.id}>
                {/* 2. Thay thế <a> bằng <Link> */}
                <Link to={item.path} className="inline-block text-gray-800 hover:text-blue-600 text-base font-medium transition-all duration-300 transform hover:-translate-y-1">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

