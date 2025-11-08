import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { ProductVariant } from '../../types';
import { fetchProductById } from '../../services/api';

import { ProductGallery } from '../product/ProductGallery';
import { ProductInfo } from '../product/ProductInfo';
import { RelatedProducts } from '../product/RelatedProducts';
import { RecentlyViewed } from '../product/RecentlyViewed';

const ProductDetailPage: React.FC = () => {
  const { variantId } = useParams<{ variantId: string }>();
  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVariant = async () => {
      if (!variantId) return;
      try {
        setLoading(true);
        const response = await fetchProductById(variantId);
        if (response.code === 1000 && response.result) {
          setVariant(response.result);
        }
      } catch (error) {
        console.error("Failed to fetch variant", error);
      } finally {
        setLoading(false);
      }
    };
    loadVariant();
  }, [variantId]);

  if (loading) return <div>Đang tải...</div>;
  if (!variant) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="grid grid-cols-12 gap-6">
        {/* Cột trái */}
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-12 gap-6">
            {/* Hình ảnh */}
            <div className="col-span-12 md:col-span-5">
              <ProductGallery
                productName={variant.product.name}
                mainImageUrl={variant.imageUrl}
              />
            </div>

            {/* Thông tin */}
            <div className="col-span-12 md:col-span-7">
              <ProductInfo variant={variant} />
            </div>
          </div>

          {/* Sản phẩm liên quan */}
          <div className="col-span-12 mt-10">
            {variant.product && (
              <RelatedProducts productId={variant.product.product_id} />
            )}
          </div>
        </div>

        {/* Cột phải */}
        <div className="col-span-12 lg:col-span-3">
          <RecentlyViewed currentVariantId={variant.variantId} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
