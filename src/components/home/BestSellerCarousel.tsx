// src/components/home/BestSellerCarousel.tsx

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { fetchBestSellers } from '../../services/api';
import type { ProductBestSeller } from '../../types';
import { ProductCard } from './ProductCard'; // Import Card component
import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/navigation.css';

export const BestSellerCarousel: React.FC = () => {
  const [products, setProducts] = useState<ProductBestSeller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchBestSellers();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Skeleton loading
  if (loading) {
    return <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sản Phẩm Bán Chạy</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          breakpoints={{
            // Khi chiều rộng màn hình >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // Khi chiều rộng màn hình >= 768px
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            // Khi chiều rộng màn hình >= 1024px
            1024: {
              slidesPerView: 5, // hoặc 4, tùy vào thiết kế của bạn
              spaceBetween: 50,
            },
          }}
          loop={true}
          // rewind = {true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-auto">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Button xem tất cả */}
      <div className="text-center mt-6">
        <button className="px-6 py-2 border border-gray-800 text-gray-800 font-semibold rounded-full hover:bg-gray-800 hover:text-white transition-colors">
          Xem tất cả sản phẩm bán chạy
        </button>
      </div>
    </div>
  );
};