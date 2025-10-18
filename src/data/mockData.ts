// src/data/mockData.ts

import type { Banner, Category, ProductBestSeller, Product, ProductTab, ProductTabId } from '../types';

// Dòng 1: Mock Banners (Khớp với interface Banner)
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

// Dòng 2: Mock Categories (Khớp với interface Category)
export const mockCategories: Category[] = [
  { id: 'c1', name: 'Áo Sơ Mi', image_url: 'https://picsum.photos/seed/cat1/200/200', slug: 'ao-so-mi'},
  { id: 'c2', name: 'Quần Jeans', image_url: 'https://picsum.photos/seed/cat2/200/200', slug: 'quan-jeans'},
  { id: 'c3', name: 'Váy Đầm', image_url: 'https://picsum.photos/seed/cat3/200/200', slug: 'vay-dam'},
  { id: 'c4', name: 'Phụ Kiện', image_url: 'https://picsum.photos/seed/cat4/200/200', slug: 'phu-kien'},
  { id: 'c5', name: 'Giày Dép', image_url: 'https://picsum.photos/seed/cat5/200/200', slug: 'giay-dep'},
  { id: 'c6', name: 'Đồ Thể Thao', image_url: 'https://picsum.photos/seed/cat6/200/200', slug: 'do-the-thao'},
  { id: 'c7', name: 'Áo Khoác', image_url: 'https://picsum.photos/seed/cat7/200/200', slug: 'ao-khoac'},
  { id: 'c8', name: 'Đồ Mặc Nhà', image_url: 'https://picsum.photos/seed/cat8/200/200', slug: 'do-mac-nha'},
  { id: 'c9', name: 'Túi Xách', image_url: 'https://picsum.photos/seed/cat9/200/200', slug: 'tui-xach'},
  { id: 'c10', name: 'Kính Mát', image_url: 'https://picsum.photos/seed/cat10/200/200', slug: 'kinh-mat'},
  { id: 'c11', name: 'Trang Sức', image_url: 'https://picsum.photos/seed/cat11/200/200', slug: 'trang-suc'},
  { id: 'c12', name: 'Mũ Nón', image_url: 'https://picsum.photos/seed/cat12/200/200', slug: 'mu-non'},
];

// Dòng 3: Mock Best Sellers (Khớp với interface ProductBestSeller)
export const mockBestSellers: ProductBestSeller[] = [
  { id: 'p1', name: 'Áo Sơ Mi Lụa Cao Cấp Trơn', image_url: 'https://picsum.photos/seed/p1/300/400', color_count: 5, sizes: ['S', 'M', 'L'], old_price: 550000, new_price: 399000 },
  { id: 'p2', name: 'Quần Jean Skinny Fit', image_url: 'https://picsum.photos/seed/p2/300/400', color_count: 2, sizes: ['28', '29', '30', '31'], old_price: 700000, new_price: 650000 },
  { id: 'p3', name: 'Váy Hoa Nhí Vintage', image_url: 'https://picsum.photos/seed/p3/300/400', color_count: 3, sizes: ['S', 'M'], old_price: 800000, new_price: 590000 },
  { id: 'p4', name: 'Áo Khoác Bomber Kaki', image_url: 'https://picsum.photos/seed/p4/300/400', color_count: 1, sizes: ['L', 'XL'], old_price: null, new_price: 799000 },
  { id: 'p5', name: 'Giày Sneaker Cổ Thấp', image_url: 'https://picsum.photos/seed/p5/300/400', color_count: 4, sizes: ['39', '40', '41'], old_price: 1200000, new_price: 999000 },
  { id: 'p6', name: 'Túi Xách Da Thật', image_url: 'https://picsum.photos/seed/p6/300/400', color_count: 2, sizes: ['One Size'], old_price: 2500000, new_price: 1990000 },
  { id: 'p7', name: 'Áo Polo Thể Thao', image_url: 'https://picsum.photos/seed/p7/300/400', color_count: 6, sizes: ['S', 'M', 'L', 'XL'], old_price: 450000, new_price: 349000 },
  { id: 'p8', name: 'Quần Kaki Dáng Suông', image_url: 'https://picsum.photos/seed/p8/300/400', color_count: 3, sizes: ['29', '30', '32'], old_price: 600000, new_price: 499000 },
  { id: 'p9', name: 'Đầm Maxi Voan', image_url: 'https://picsum.photos/seed/p9/300/400', color_count: 2, sizes: ['Free Size'], old_price: 950000, new_price: 750000 },
  { id: 'p10', name: 'Áo Thun In Họa Tiết', image_url: 'https://picsum.photos/seed/p10/300/400', color_count: 8, sizes: ['S', 'M', 'L'], old_price: null, new_price: 299000 },
  { id: 'p11', name: 'Giày Loafer Da', image_url: 'https://picsum.photos/seed/p11/300/400', color_count: 2, sizes: ['39', '40', '41', '42'], old_price: 1500000, new_price: 1199000 },
  { id: 'p12', name: 'Balo Vải Canvas', image_url: 'https://picsum.photos/seed/p12/300/400', color_count: 4, sizes: ['One Size'], old_price: 850000, new_price: 699000 },
];

// Dòng 4: Tabs (Khớp với interface ProductTab)
export const productTabs: ProductTab[] = [
  { id: 'promotion', label: 'Sản phẩm khuyến mãi' },
  { id: 'seasonal', label: 'Sản phẩm theo mùa' },
  { id: 'new', label: 'Sản phẩm mới' },
];

// Dòng 4: Mock Products by Tab (Đã được cập nhật để khớp với interface Product)
export const mockProductsByTab: Record<ProductTabId, Product[]> = {
  promotion: [
    { id: 'promo1', name: 'Áo Thun Sale 50%', image_url: 'https://picsum.photos/seed/promo1/300/300', price: 150000, old_price: 300000, category: 'Áo Thun', createdAt: '2025-09-01' ,color:'Trắng'},
    { id: 'promo2', name: 'Quần Short Kaki Giảm Giá', image_url: 'https://picsum.photos/seed/promo2/300/300', price: 200000, old_price: 350000, category: 'Quần Short', createdAt: '2025-09-05' ,color:'Đen'},
    { id: 'promo3', name: 'Đồng Hồ Đeo Tay', image_url: 'https://picsum.photos/seed/promo3/300/300', price: 500000, old_price: 750000, category: 'Phụ Kiện', createdAt: '2025-09-10' ,color:'Trắng'},
    { id: 'promo4', name: 'Balo Du Lịch', image_url: 'https://picsum.photos/seed/promo4/300/300', price: 400000, old_price: 600000, category: 'Túi Xách', createdAt: '2025-09-12' ,color:'Đen'},
    { id: 'promo5', name: 'Áo Thun Cổ Tròn', image_url: 'https://picsum.photos/seed/promo5/300/300', price: 175000, old_price: 350000, category: 'Áo Thun', createdAt: '2025-09-15' ,color:'Trắng'},
    { id: 'promo6', name: 'Quần Jeans Rách Gối', image_url: 'https://picsum.photos/seed/promo6/300/300', price: 350000, old_price: 700000, category: 'Quần Jeans', createdAt: '2025-09-18' ,color:'Be'},
    { id: 'promo7', name: 'Kính Mát Gọng Tròn', image_url: 'https://picsum.photos/seed/promo7/300/300', price: 250000, old_price: 500000, category: 'Phụ Kiện', createdAt: '2025-09-20' ,color:'Xanh'},
    { id: 'promo8', name: 'Giày Sandal', image_url: 'https://picsum.photos/seed/promo8/300/300', price: 300000, old_price: 450000, category: 'Giày Dép', createdAt: '2025-09-22' ,color:'Trắng'},
  ],
  seasonal: [
    { id: 'season1', name: 'Áo Len Cổ Lọ (Mùa Đông)', image_url: 'https://picsum.photos/seed/season1/300/300', price: 450000, category: 'Áo Len', createdAt: '2025-10-01', color:'Be'},
    { id: 'season2', name: 'Đồ Bơi (Mùa Hè)', image_url: 'https://picsum.photos/seed/season2/300/300', price: 550000, category: 'Đồ Bơi', createdAt: '2025-06-15', color:'Trắng'},
    { id: 'season3', name: 'Áo Khoác Gió (Mùa Thu)', image_url: 'https://picsum.photos/seed/season3/300/300', price: 600000, category: 'Áo Khoác', createdAt: '2025-09-01', color:'Đen'},
    { id: 'season4', name: 'Váy Lanh Mát (Mùa Hè)', image_url: 'https://picsum.photos/seed/season4/300/300', price: 480000, category: 'Váy Đầm', createdAt: '2025-07-01', color:'Xanh'},
  ],
  new: [
    { id: 'new1', name: 'BST Mới: Áo Sơ Mi Lụa', image_url: 'https://picsum.photos/seed/new1/300/300', price: 790000, category: 'Áo Sơ Mi', createdAt: '2025-10-18', color:'Đen'},
    { id: 'new2', name: 'Quần Tây Dáng Mới', image_url: 'https://picsum.photos/seed/new2/300/300', price: 890000, category: 'Quần Tây', createdAt: '2025-10-17', color:'Be'},
    { id: 'new3', name: 'Giày Boot Da Cổ Cao', image_url: 'https://picsum.photos/seed/new3/300/300', price: 1500000, category: 'Giày Dép', createdAt: '2025-10-16', color:'Trắng'},
  ],
};