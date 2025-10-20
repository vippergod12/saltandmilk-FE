// src/types/index.ts

import React from "react";

export interface ApiResponse<T> {
  code: number;
  result: T;
  message?: string; // Tùy chọn, nếu API của bạn có trả về
}

// Dòng 1: Banner
export interface Banner {
  id: string;
  title: string;
  image_url: string;
  target_url: string;
  is_active: boolean;
  display_order: number;
}

// Dòng 2: Danh mục
export interface Category {
  id: string;
  name: string;
  imgUrl: string;
  slug: string;
  children?: Category[]; // Mảng chứa các category con, hỗ trợ đệ quy
}

// Dòng 3: Sản phẩm bán chạy
export interface ProductBestSeller {
  id: string;
  name: string;
  image_url: string;
  color_count: number;
  sizes: string[];
  old_price: number | null; // Có thể không có giá cũ
  new_price: number;
}

// Dòng 4: Sản phẩm (chung)
export interface Product {
  id: string;
  name: string;
  image_url: string;
  base_price: number;
  createdAt: string; // Dùng để sắp xếp hàng mới/cũ
  
    // Liên kết
  category?: {
    id: string;
    name: string;
  };
  tags?: {
    tag_id: number;
    name: string;
  }[];
variants: ProductVariant[];
}

export interface ProductVariant {
  variantId: string;
  sku: string;
  stockQuantity: number;
  price: number;
  salePrice: number | null;
  imageUrl: string;
  productId: string;
  productName: string;
  sizeId: number;
  sizeName: string;
  colorId: number;
  colorName: string;
}
export interface Tag{
  tag_id: number;
  name: string;
}

// Dòng 4: Loại Tab
export type ProductTabId = number;

export interface ProductTab {
  id: ProductTabId;
  name: string;
}

export interface FilterOptions {
  prices: string[];
  sizes: string[];
  colors: string[];
}