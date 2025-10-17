// src/services/api.ts

import { mockBanners, mockCategories, mockBestSellers, mockProductsByTab } from '../data/mockData';
import type { Banner, Category, ProductBestSeller, Product, ProductTabId } from '../types';

const API_DELAY = 500; // Giả lập độ trễ 500ms

// Dòng 1: Fetch Banners
export const fetchBanners = (): Promise<Banner[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBanners.filter(b => b.is_active));
    }, API_DELAY);
  });
};

// Dòng 2: Fetch Categories
export const fetchCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategories);
    }, API_DELAY);
  });
};

// Dòng 3: Fetch Best Sellers
export const fetchBestSellers = (): Promise<ProductBestSeller[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBestSellers);
    }, API_DELAY);
  });
};

// Dòng 4: Fetch Products by Tab
export const fetchProductsByTab = (tabId: ProductTabId): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProductsByTab[tabId] || []);
    }, API_DELAY);
  });
};