// src/types/index.ts

// import React from "react";

export interface ApiResponse<T> {
  code: number;
  result: T;
  message?: string; // Tùy chọn, nếu API của bạn có trả về
}

// Định nghĩa cấu trúc Page trả về từ Spring Boot
export interface PageResponse<T> {
  content: T[]; // Mảng variants thực sự nằm ở đây (quan trọng nhất!)
  totalPages: number; // Tổng số trang
  number: number; // Số trang hiện tại (bắt đầu từ 0)
  size: number; // Kích thước trang
  totalElements: number; // Tổng số phần tử
  // Thêm các thuộc tính Page khác nếu cần:
  // first: boolean;
  // last: boolean;
  // empty: boolean;
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
  category_id: CategoryId; // SỬA: Đổi sang number để khớp với category_id
  name: string;
  imgUrl: string;
  slug: string;
  children?: Category[];
}

export interface Size{
  size_id: number;
  name: string;
}

export interface Color{
  color_id: number;
  name: string;
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
    category_id: CategoryId;
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
  salePrice: number;
  imageUrl: string;
  productId: string;
  productName: string;
  sizeId: number;
  sizeName: string;
  colorId: number;
  colorName: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Tag{
  tag_id: number;
  name: string;
}

export type CategoryId = number;

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