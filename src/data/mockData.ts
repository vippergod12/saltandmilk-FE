// src/data/mockData.ts

import type { Banner, Category, ProductBestSeller, Product, ProductTab, ProductTabId } from '../types';
import { Shirt, Zap, Sun, Gift } from 'lucide-react'; // Import icons

// Dòng 1: Mock Banners
export const mockBanners: Banner[] = [
  {
    id: 'b1',
    title: 'Banner 1',
    image_url: 'https://picsum.photos/seed/banner1/1200/400',
    target_url: '/sale/summer',
    is_active: true,
    display_order: 1,
  },
  {
    id: 'b2',
    title: 'Banner 2',
    image_url: 'https://picsum.photos/seed/banner2/1200/400',
    target_url: '/products/new-arrivals',
    is_active: true,
    display_order: 2,
  },
  {
    id: 'b3',
    title: 'Banner 3',
    image_url: 'https://picsum.photos/seed/banner3/1200/400',
    target_url: '/categories/all',
    is_active: true,
    display_order: 3,
  },
];

// Dòng 2: Mock Categories
export const mockCategories: Category[] = [
  { id: 'c1', name: 'Áo Sơ Mi', image_url: 'https://picsum.photos/seed/cat1/200/200'},
  { id: 'c2', name: 'Quần Jeans', image_url: 'https://picsum.photos/seed/cat2/200/200'},
  { id: 'c3', name: 'Váy Đầm', image_url: 'https://picsum.photos/seed/cat3/200/200'},
  { id: 'c4', name: 'Phụ Kiện', image_url: 'https://picsum.photos/seed/cat4/200/200'},
  { id: 'c5', name: 'Giày Dép', image_url: 'https://picsum.photos/seed/cat5/200/200'},
  { id: 'c6', name: 'Đồ Thể Thao', image_url: 'https://picsum.photos/seed/cat6/200/200'},
  { id: 'c7', name: 'Áo Sơ Mi', image_url: 'https://picsum.photos/seed/cat1/200/200'},
  { id: 'c8', name: 'Quần Jeans', image_url: 'https://picsum.photos/seed/cat2/200/200'},
  { id: 'c9', name: 'Váy Đầm', image_url: 'https://picsum.photos/seed/cat3/200/200'},
  { id: 'c10', name: 'Phụ Kiện', image_url: 'https://picsum.photos/seed/cat4/200/200'},
  { id: 'c11', name: 'Giày Dép', image_url: 'https://picsum.photos/seed/cat5/200/200'},
  { id: 'c12', name: 'Đồ Thể Thao', image_url: 'https://picsum.photos/seed/cat6/200/200'},
];

// Dòng 3: Mock Best Sellers
export const mockBestSellers: ProductBestSeller[] = [
  // Thêm 8-10 sản phẩm ở đây
  { id: 'p1', name: 'Áo Sơ Mi Lụa Cao Cấp Trơn', image_url: 'https://picsum.photos/seed/p1/300/400', color_count: 5, sizes: ['S', 'M', 'L'], old_price: 550000, new_price: 399000 },
  { id: 'p2', name: 'Quần Jean Skinny Fit', image_url: 'https://picsum.photos/seed/p2/300/400', color_count: 2, sizes: ['28', '29', '30', '31'], old_price: 700000, new_price: 650000 },
  { id: 'p3', name: 'Váy Hoa Nhí Vintage', image_url: 'https://picsum.photos/seed/p3/300/400', color_count: 3, sizes: ['S', 'M'], old_price: 800000, new_price: 590000 },
  { id: 'p4', name: 'Áo Khoác Bomber Kaki', image_url: 'https://picsum.photos/seed/p4/300/400', color_count: 1, sizes: ['L', 'XL'], old_price: null, new_price: 799000 },
  { id: 'p5', name: 'Giày Sneaker Cổ Thấp', image_url: 'https://picsum.photos/seed/p5/300/400', color_count: 4, sizes: ['39', '40', '41'], old_price: 1200000, new_price: 999000 },
  { id: 'p6', name: 'Túi Xách Da Thật', image_url: 'https://picsum.photos/seed/p6/300/400', color_count: 2, sizes: ['One Size'], old_price: 2500000, new_price: 1990000 },
  { id: 'p7', name: 'Áo Sơ Mi Lụa Cao Cấp Trơn', image_url: 'https://picsum.photos/seed/p1/300/400', color_count: 5, sizes: ['S', 'M', 'L'], old_price: 550000, new_price: 399000 },
  { id: 'p8', name: 'Quần Jean Skinny Fit', image_url: 'https://picsum.photos/seed/p2/300/400', color_count: 2, sizes: ['28', '29', '30', '31'], old_price: 700000, new_price: 650000 },
  { id: 'p9', name: 'Váy Hoa Nhí Vintage', image_url: 'https://picsum.photos/seed/p3/300/400', color_count: 3, sizes: ['S', 'M'], old_price: 800000, new_price: 590000 },
  { id: 'p10', name: 'Áo Khoác Bomber Kaki', image_url: 'https://picsum.photos/seed/p4/300/400', color_count: 1, sizes: ['L', 'XL'], old_price: null, new_price: 799000 },
  { id: 'p11', name: 'Giày Sneaker Cổ Thấp', image_url: 'https://picsum.photos/seed/p5/300/400', color_count: 4, sizes: ['39', '40', '41'], old_price: 1200000, new_price: 999000 },
  { id: 'p12', name: 'Túi Xách Da Thật', image_url: 'https://picsum.photos/seed/p6/300/400', color_count: 2, sizes: ['One Size'], old_price: 2500000, new_price: 1990000 },

];

// Dòng 4: Tabs
export const productTabs: ProductTab[] = [
  { id: 'promotion', label: 'Sản phẩm khuyến mãi' },
  { id: 'seasonal', label: 'Sản phẩm theo mùa' },
  { id: 'new', label: 'Sản phẩm mới' },
];

// Dòng 4: Mock Products by Tab
export const mockProductsByTab: Record<ProductTabId, Product[]> = {
  promotion: [
    { id: 'promo1', name: 'Áo Thun Sale 50%', image_url: 'https://picsum.photos/seed/promo1/300/300', price: 150000, old_price: 300000 },
    { id: 'promo2', name: 'Quần Short Kaki Giảm Giá', image_url: 'https://picsum.photos/seed/promo2/300/300', price: 200000, old_price: 350000 },
    { id: 'promo3', name: 'Đồng Hồ Đeo Tay', image_url: 'https://picsum.photos/seed/promo3/300/300', price: 500000, old_price: 750000 },
    { id: 'promo4', name: 'Balo Du Lịch', image_url: 'https://picsum.photos/seed/promo4/300/300', price: 400000, old_price: 600000 },
    { id: 'promo5', name: 'Áo Thun Sale 50%', image_url: 'https://picsum.photos/seed/promo1/300/300', price: 150000, old_price: 300000 },
    { id: 'promo6', name: 'Quần Short Kaki Giảm Giá', image_url: 'https://picsum.photos/seed/promo2/300/300', price: 200000, old_price: 350000 },
    { id: 'promo7', name: 'Đồng Hồ Đeo Tay', image_url: 'https://picsum.photos/seed/promo3/300/300', price: 500000, old_price: 750000 },
    { id: 'promo8', name: 'Balo Du Lịch', image_url: 'https://picsum.photos/seed/promo4/300/300', price: 400000, old_price: 600000 },

  ],
  seasonal: [
    { id: 'season1', name: 'Áo Len Cổ Lọ (Mùa Đông)', image_url: 'https://picsum.photos/seed/season1/300/300', price: 450000 },
    { id: 'season2', name: 'Đồ Bơi (Mùa Hè)', image_url: 'https://picsum.photos/seed/season2/300/300', price: 550000 },
    { id: 'season3', name: 'Áo Khoác Gió (Mùa Thu)', image_url: 'https://picsum.photos/seed/season3/300/300', price: 600000 },
  ],
  new: [
    { id: 'new1', name: 'BST Mới: Áo Sơ Mi Lụa', image_url: 'https://picsum.photos/seed/new1/300/300', price: 790000 },
],
};