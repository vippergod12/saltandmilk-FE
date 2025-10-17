// src/types/index.ts

import React from "react";

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
  image_url: string;
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
  price: number;
  old_price?: number; // Tùy chọn
}

// Dòng 4: Loại Tab
export type ProductTabId = 'promotion' | 'seasonal' | 'new';

export interface ProductTab {
  id: ProductTabId;
  label: string;
}