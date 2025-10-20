// src/services/api.ts

 import { mockBestSellers } from '../data/mockData';
import axios from 'axios';
import type { ApiResponse,Banner, Category, ProductBestSeller, Product, ProductTabId, Tag,ProductVariant } from '../types';

const API_DELAY = 100; // Giả lập độ trễ 500ms
// 1. Tạo một instance của axios với cấu hình chung
// URL này nên được đặt trong file môi trường (.env) để linh hoạt
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Thay bằng URL backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});


// Dòng 1: Fetch Banners
export const fetchBanners = async (): Promise<ApiResponse<Banner[]>> => {
  try {
  const response = await apiClient.get<ApiResponse<Banner[]>>('/banners');
    return response.data; // Bây giờ response.data khớp với kiểu ApiResponse<Banner[]>
  } catch (error) {
    console.error('Lỗi khi tải banners:', error);
    throw error; // Ném lỗi ra để component có thể xử lý (hiển thị thông báo lỗi)
  }
};

export const fetchCategories = async (): Promise<ApiResponse<Category[]>> => {
  try{
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return response.data;
  }catch(error){
    throw error;
  }
};

// Dòng 2: Fetch Categories
// export const fetchCategories = (): Promise<Category[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockCategories);
//     }, API_DELAY);
//   });
// };

// Dòng 3: Fetch Best Sellers
export const fetchBestSellers = (): Promise<ProductBestSeller[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBestSellers);
    }, API_DELAY);
  });
};

export const fetchProductTabs = async (): Promise<ApiResponse<Tag[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Tag[]>>('/product-tag');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product tabs:", error);
    throw error;
  }
};

// Dòng 4: Fetch Products by Tab
export const fetchProductsByTab = async (tabId: ProductTabId): Promise< ApiResponse<ProductVariant[]>> => {
 try{
    const response = await apiClient.get<ApiResponse<ProductVariant[]>>('/variants',
      {
        params: {
          tagId: tabId,
        },
      }
    );
    return response.data;
  }catch(error){
    throw error;
  }
};

export const fetchAllProducts = async (): Promise<ApiResponse<Product[]>> => {
  try{

    // Lấy tất cả các mảng sản phẩm từ các tab và gộp lại
    const response = await apiClient.get<ApiResponse<Product[]>>('/getAll');
    return response.data;
  }catch(error){
    throw error;
  }

};