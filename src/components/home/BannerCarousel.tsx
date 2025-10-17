// src/components/home/BannerCarousel.tsx

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { fetchBanners } from '../../services/api';
import type { Banner } from '../../types';

// Import Swiper styles
import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/navigation.css';
import '../../../node_modules/swiper/modules/pagination.css';

export const BannerCarousel: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        const data = await fetchBanners();
        setBanners(data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBanners();
  }, []);

  if (loading) {
    // Placeholder skeleton
    return (
      <div className="aspect-[3/1] w-full bg-gray-200 rounded-lg animate-pulse"></div>
    );
  }

  return (
    <Swiper
          modules={[Navigation, Pagination, Autoplay]}
        //   effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
        //   rewind = {true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
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
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <a href={banner.target_url}>
            <img 
              src={banner.image_url} 
              alt={banner.title} 
              className="w-full h-full object-cover" 
            />
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};