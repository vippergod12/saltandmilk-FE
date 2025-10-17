import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';

// Dữ liệu sản phẩm giả để hiển thị
const featuredProducts = [
  {
    id: 1,
    name: 'Áo thun Cotton cao cấp',
    price: '350.000đ',
    imageUrl: 'https://placehold.co/400x500/f0f0f0/333?text=Ao+Thun',
    category: 'Nam',
  },
  {
    id: 2,
    name: 'Váy Maxi mùa hè',
    price: '750.000đ',
    imageUrl: 'https://placehold.co/400x500/e9e9e9/333?text=Vay+Maxi',
    category: 'Nữ',
  },
  {
    id: 3,
    name: 'Quần Jeans rách gối',
    price: '550.000đ',
    imageUrl: 'https://placehold.co/400x500/f5f5f5/333?text=Quan+Jeans',
    category: 'Nam',
  },
  {
    id: 4,
    name: 'Túi xách da thật',
    price: '1.200.000đ',
    imageUrl: 'https://placehold.co/400x500/f1f1f1/333?text=Tui+Xach',
    category: 'Phụ kiện',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* === Hero Section === */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Bộ Sưu Tập Mùa Hè 2025
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá những thiết kế mới nhất, mang đậm phong cách và sự thoải mái cho mùa hè năng động của bạn.
          </p>
          <Link
            to="/san-pham-moi"
            className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-gray-800 text-white font-semibold rounded-full shadow-lg hover:bg-gray-700 transition-transform transform hover:-translate-y-1 duration-300"
          >
            Mua sắm ngay <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* === Featured Products Section === */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Sản phẩm nổi bật</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="relative">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                    <button className="flex items-center px-6 py-3 bg-white text-gray-800 font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FiShoppingCart className="mr-2" /> Thêm vào giỏ
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                  <p className="mt-2 text-xl font-bold text-blue-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
