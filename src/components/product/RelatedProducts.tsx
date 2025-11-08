// src/components/product/RelatedProducts.tsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/navigation.css';
import '../../../node_modules/swiper/modules/pagination.css';
import ProductCard from '../product-list/ProductCard';
import type {ProductVariant } from '../../types';
import { fetchRelatedProducts } from '../../services/api';

interface Props {
  productId: string;
}

export const RelatedProducts: React.FC<Props> = ({ productId }) => {
  const [related, setRelated] = useState<ProductVariant[]>([]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const response = await fetchRelatedProducts(productId);
        if (response.code === 1000) {
          setRelated(response.result);
        }
      } catch (error) {
        console.error("Lỗi tải sản phẩm liên quan", error);
      }
    };
    loadRelated();
  }, [productId]);

  if (related.length === 0) return null;

  return (
    <div>
      {/* Dòng 1: Đoạn chữ */}
      <h2 className="text-2xl font-semibold mb-4">Sản phẩm liên quan</h2>
      
      {/* Dòng 2: Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={2} // Hiển thị 2
        breakpoints={{
          // Tùy chỉnh responsive
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }, // Trong 9 cột thì 4 là đẹp
        }}
      >
        {related.map(variant => (
          <SwiperSlide key={variant.variantId}>
            {/* Bạn sẽ cần tạo ProductCard để hiển thị variant
                theo đúng format (hình, tên, mã, giá) */}
            <ProductCard variant={variant} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};