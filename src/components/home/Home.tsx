// src/pages/HomePage.tsx

import React from 'react';
import { BannerCarousel } from './BannerCarousel';
import { CategoryCarousel } from './CategoryCarousel';
import { BestSellerCarousel } from './BestSellerCarousel';
import { FeaturedProducts } from './FeaturedProducts';
 const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dùng space-y để tạo khoảng cách giữa các dòng */}
      <div className="space-y-12 md:space-y-16">
        
        {/* Dòng 1: Banner */}
        <section>
          <BannerCarousel />
        </section>

        {/* Dòng 2: Danh mục sản phẩm */}
        <section>
          <CategoryCarousel />
        </section>

        {/* Dòng 3: Sản phẩm bán chạy */}
        <section>
          <BestSellerCarousel />
        </section>

        {/* Dòng 4: Sản phẩm theo Tab */}
        <section>
          <FeaturedProducts />
        </section>
        
      </div>
    </div>
  );
};

export default HomePage;