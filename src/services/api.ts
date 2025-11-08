// src/services/api.ts

import { mockBestSellers } from "../data/mockData";
import axios, { AxiosError } from "axios";
import type {
  ApiResponse,
  Banner,
  Category,
  PageResponse,
  ProductBestSeller,
  Product,
  ProductTabId,
  Tag,
  ProductVariant,
  CategoryId,
  Size,
  Color,
  token,
  User
} from "../types";



const API_DELAY = 100; // Giả lập độ trễ 500ms
// 1. Tạo một instance của axios với cấu hình chung
// URL này nên được đặt trong file môi trường (.env) để linh hoạt
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // Thay bằng URL backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProductById = async (
  variantId: string
): Promise<ApiResponse<ProductVariant>> => {
  try {
    const response = await apiClient.get<ApiResponse<ProductVariant>>(
      `/products/${variantId}` // Giả định endpoint là /products/{id}
    );
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi tải sản phẩm: ${variantId}`, error);
    throw error;
  }
};

export const login = async (
  username: string,
  password: string
) : Promise<ApiResponse<token>> => {
  try{
    const authenRequest = {
      username,
      password,
    };

    const response = await apiClient.post<ApiResponse<token>>("/auth/token",
      authenRequest
    );

        // === PHẦN SỬA LỖI RACE CONDITION ===
    // (Đây là logic bạn đang thiếu)
    const accessToken = response.data.result.token;

    // 1. Lưu vào localStorage (để F5)
    localStorage.setItem("accessToken", accessToken);
    
    // 2. Cập nhật apiClient NGAY LẬP TỨC (để dùng ngay)
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    // === KẾT THÚC SỬA LỖI ===

    return response.data;
  }catch(error){
    throw error;
  }
};

export const fetchRelatedProducts = async (
  productId: string,
  limit: number = 8 // Giới hạn số SP liên quan
): Promise<ApiResponse<ProductVariant[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<ProductVariant[]>>(
      "/variants/related", // Giả định endpoint
      {
        params: { productId, limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi tải sản phẩm liên quan: ${productId}`, error);
    throw error;
  }
};

const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

// 3. Logic xử lý Refresh Token (Interceptors)
// Biến này để ngăn chặn vòng lặp vô hạn khi refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Đây là phần quan trọng nhất: Interceptor (bộ đánh chặn)
apiClient.interceptors.response.use(
  (response) => {
    // Nếu request thành công, trả về response
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any; // 'as any' để thêm cờ _retry
    const errStatus = error.response?.status;

    // Chỉ xử lý lỗi 401 (Unauthorized - AccessToken hết hạn)
    if (errStatus === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, đẩy request vào hàng đợi
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Đánh dấu đã retry để tránh lặp vô hạn
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gọi đến endpoint /auth/refresh
        // Backend sẽ đọc HttpOnly cookie (refreshToken)
        const refreshResponse = await apiClient.post("/auth/refresh");
        
        // Giả định BE trả về accessToken mới trong 'result.token'
        const newAccessToken = (refreshResponse.data as ApiResponse<token>)
          .result.token;

        // Lưu accessToken mới
        localStorage.setItem("accessToken", newAccessToken);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        // Cập nhật header cho request gốc và xử lý hàng đợi
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        
        // Retry lại request gốc với token mới
        return apiClient(originalRequest);

      } catch (refreshError) {
        // Nếu Refresh Token thất bại (hết hạn, không hợp lệ)
        processQueue(refreshError as AxiosError, null);
        
        // Xóa token cũ, logout người dùng
        localStorage.removeItem("accessToken");
        delete apiClient.defaults.headers.common["Authorization"];
        
        // Chuyển hướng về trang đăng nhập (tùy chọn)
        // window.location.href = '/login'; 
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Trả về lỗi nếu không phải 401
    return Promise.reject(error);
  }
);

// 3. API để lấy thông tin tóm tắt của nhiều variant (cho "Đã xem")
export const fetchVariantSummaries = async (
  variantIds: string[]
): Promise<ApiResponse<ProductVariant[]>> => {
  try {
    // Dùng POST để gửi một mảng ID lên body
    const response = await apiClient.post<ApiResponse<ProductVariant[]>>(
      "/variants/by-ids", // Giả định endpoint
      variantIds
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải variants đã xem:", error);
    throw error;
  }
};

// === HÀM MỚI ĐƯỢC THÊM VÀO ĐỂ LOAD SẢN PHẨM THEO SLUG ===
export const fetchVariantsByCategorySlug = async (
  slug: string,
  page: number = 0,
  size: number
): Promise<ApiResponse<PageResponse<ProductVariant>>> => {
  try {
    // Thêm params page và size vào request
    const response = await apiClient.get<
      ApiResponse<PageResponse<ProductVariant>>
    >(`/variants/by-category-slug/${slug}`, {
      params: { page, size }, // Truyền tham số page và size
    });
    return response.data; // Trả về ApiResponse chứa đối tượng PageResponse
  } catch (error) {
    console.error(`Lỗi khi tải variants cho slug: ${slug}`, error);
    throw error;
  }
};

export const searchProductSuggestions = async (
  query: string
): Promise<ApiResponse<ProductVariant[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<ProductVariant[]>>(
      "/variants/search",
      {
        params: {
          q: query,
          limit: 5, // Có thể thêm giới hạn số lượng gợi ý
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm gợi ý:", error);
    throw error;
  }
};

export const fetchSizes = async (): Promise<ApiResponse<Size[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Size[]>>("/sizes");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchColors = async (): Promise<ApiResponse<Color[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Color[]>>("/colors");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fecthVariantsByCategoryId = async (
  category_id: CategoryId,
    page: number = 0,
  size: number
): Promise<ApiResponse<PageResponse<ProductVariant[]>>> => {
  try {
    const response = await apiClient.get<ApiResponse<PageResponse<ProductVariant[]>>>(
      "/variants/get-by-cate",
      {
        params: {
          category_id: category_id,
          page: page,
          size: size
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Dòng 1: Fetch Banners
export const fetchBanners = async (): Promise<ApiResponse<Banner[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Banner[]>>("/banners");
    return response.data; // Bây giờ response.data khớp với kiểu ApiResponse<Banner[]>
  } catch (error) {
    console.error("Lỗi khi tải banners:", error);
    throw error; // Ném lỗi ra để component có thể xử lý (hiển thị thông báo lỗi)
  }
};

export const fetchCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Category[]>>(
      "/categories"
    );
    return response.data;
  } catch (error) {
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

// phải dựa trên hoá đơn xem thuộc product Id và product_variants
// export const fetchBestSellers = async(): Promise<ApiResponse<ProductBestSeller[]>> => {
//   try{
//     const response = await apiClient.get<ApiResponse<ProductBestSeller[]>>('/bestseller');
//     return response.data;
//   }catch(error){
//     throw error;
//   }
// };

export const fetchProductTabs = async (): Promise<ApiResponse<Tag[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Tag[]>>("/product-tag");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product tabs:", error);
    throw error;
  }
};

// Dòng 4: Fetch Products by Tab
export const fetchProductsByTab = async (
  tabId: ProductTabId
): Promise<ApiResponse<ProductVariant[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<ProductVariant[]>>(
      "/variants",
      {
        params: {
          tagId: tabId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const featchAllVariants = async (): Promise<
  ApiResponse<ProductVariant[]>
> => {
  try {
    const response = await apiClient.get<ApiResponse<ProductVariant[]>>(
      "/variants/all"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    // Lấy tất cả các mảng sản phẩm từ các tab và gộp lại
    const response = await apiClient.get<ApiResponse<Product[]>>(
      "/products/getAll"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchUserProfile = async(): Promise<ApiResponse<User>> => {
  try{
    const response = await apiClient.get<ApiResponse<User>>("/users/my-info");
    return response.data;
  }catch(error){
    throw error;
  }
}


export const logout = async(): Promise<void> => {
  const token = localStorage.getItem("accessToken");
  if(token){
    try{
        await apiClient.post<void>("/auth/logout",
         { token: token }
        );
          localStorage.removeItem("accessToken");
    }catch(error){
      throw error;
    }
  }
  localStorage.removeItem("accessToken");

  delete apiClient.defaults.headers.common["Authorization"];
}