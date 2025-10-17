// src/components/home/CategoryCarousel.tsx

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowRight } from 'react-icons/fa';
// import { Navigation } from 'swiper/modules';
import { fetchCategories } from '../../services/api';
import type { Category } from '../../types';
import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/navigation.css';
import '../../assets/css/home/Category.css'

export const CategoryCarousel: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Danh Mục Sản Phẩm</h2>
      <Swiper
        // modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2.5} // Hiển thị 2.5 cho mobile
        navigation
        breakpoints={{
          // responsive
          640: { slidesPerView: 3.5, spaceBetween: 16 },
          768: { slidesPerView: 4.5, spaceBetween: 16 },
          1024: { slidesPerView: 5.5, spaceBetween: 20 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="border  text-gray-800 font-semibold border-gray-200 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md cursor-pointer h-custom">
              {/* Image */}
              <div className="aspect-square  bg-gray-100">
                <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" />
              </div>
              {/* Bottom: 2 phần */}
              <div className="grid grid-cols-2 border-t">
                <div className="p-3 flex justify-center items-center text-center font-medium text-lx h-16">
                  {category.name}
                </div>
                <div className="p-3 flex justify-center items-center">
                  <FaArrowRight size={18} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};