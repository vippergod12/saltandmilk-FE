import React, { useState, useEffect, useMemo } from 'react';
import type { Category, Product, FilterOptions } from '../../types';
import { fetchCategories, fetchAllProducts } from '../../services/api';

// Import các components con
import CategoryList from './CategoryList';
import FilterSection from './FilterSection';
import SortDropdown from './SortDropdown';
import ActiveFilters from './ActiveFilters';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';

const staticFilterOptions: FilterOptions = {
    prices: ['Dưới 100.000đ', '100.000đ - 300.000đ', '300.000đ - 500.000đ', 'Trên 500.000đ'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Trắng', 'Đen', 'Xanh', 'Be'],
};

// HÀM HỖ TRỢ: Chuyển đổi chuỗi giá thành khoảng số min-max
const parsePriceRange = (rangeString: string): { min: number; max: number } => {
  // Bước 1: "Dọn dẹp" chuỗi, loại bỏ mọi ký tự không phải là số (ngoại trừ dấu gạch ngang và chữ cái đầu)
  // Ví dụ: "100.000đ - 300.000đ" -> "100000 - 300000"
  const cleanString = rangeString.replace(/[.đ\s]/g, '');

  // Xử lý trường hợp "Dưới"
  if (cleanString.startsWith('Dưới')) {
    const value = parseInt(cleanString.replace(/\D/g, ''), 10);
    return { min: 0, max: value - 1 };
  }

  // Xử lý trường hợp "Trên"
  if (cleanString.startsWith('Trên')) {
    const value = parseInt(cleanString.replace(/\D/g, ''), 10);
    return { min: value, max: Infinity };
  }

  // Xử lý trường hợp khoảng "min - max"
  // Giờ đây chuỗi đã sạch, ta có thể trích xuất số dễ dàng
  const values = cleanString.match(/\d+/g)?.map(Number);
  if (values && values.length === 2) {
    // Không cần nhân với 1000 nữa vì chuỗi đã được làm sạch
    return { min: values[0], max: values[1] };
  }

  // Trường hợp dự phòng nếu không khớp định dạng nào
  return { min: 0, max: Infinity };
};


const ProductListPage: React.FC = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({ prices: [], sizes: [], colors: [] });
    const [isLoading, setIsLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
        prices: [],
        sizes: [],
        colors: [],
    });
    

    const [sortOption, setSortOption] = useState<string>('Mặc định');
// GỘP LOGIC: Chỉ còn một biến duy nhất `displayProducts`
    const displayProducts = useMemo(() => {
        // BƯỚC 1: LỌC SẢN PHẨM
        const filtered = allProducts.filter(product => {
              const variant = product.variants;
            // Lọc theo danh mục
            const categoryMatch = !selectedCategory || product.category?.id === selectedCategory;
            if (!categoryMatch) return false;

            // Lọc theo màu sắc
            const selectedColors = selectedFilters.colors;
            if (selectedColors.length > 0 && !selectedColors.includes(variant.color)) {
                return false;
            }

            // Lọc theo giá
            const selectedPrices = selectedFilters.prices;
            if (selectedPrices.length > 0) {
                const priceMatch = selectedPrices.some(rangeString => {
                    const { min, max } = parsePriceRange(rangeString);
                    return variant.sale_price >= min && variant.sale_price <= max;
                });
                if (!priceMatch) return false;
            }
            
            return true;
        });

        // BƯỚC 2: SẮP XẾP SẢN PHẨM ĐÃ LỌC
        // Tạo bản sao để không làm thay đổi mảng `filtered`
        const sorted = [...filtered];

        switch (sortOption) {
            case 'Giá: Tăng dần':
                sorted.sort((a, b) => a.base_price - b.base_price);
                break;
            case 'Giá: Giảm dần':
                sorted.sort((a, b) => b.base_price - a.base_price);
                break;
            case 'Tên: A-Z':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Tên: Z-A':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'Hàng mới nhất':
                sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'Hàng cũ nhất':
                sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            default: // 'Mặc định'
                break;
        }

        return sorted;

    }, [allProducts, selectedCategory, selectedFilters, sortOption]); // Các phụ thuộc không đổi

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                const [categoriesData, allProductsData] = await Promise.all([
                    fetchCategories(),
                    fetchAllProducts(), 
                ]);
                
                setCategories(categoriesData.result);
                setAllProducts(allProductsData.result);
                setFilterOptions(staticFilterOptions);

            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const handleFilterChange = (filterType: keyof FilterOptions, option: string) => {
        setSelectedFilters(prev => {
            const currentFilters = prev[filterType];
            const newFilters = currentFilters.includes(option)
                ? currentFilters.filter(item => item !== option)
                : [...currentFilters, option];
            return { ...prev, [filterType]: newFilters };
        });
    };

    const getActiveFilters = (): string[] => {
        return Object.values(selectedFilters).flat();
    };
    
    const removeActiveFilter = (filterToRemove: string) => {
        setSelectedFilters(prev => {
            const newFilters = { ...prev };
            for (const key in newFilters) {
                const filterKey = key as keyof FilterOptions;
                newFilters[filterKey] = newFilters[filterKey].filter(item => item !== filterToRemove);
            }
            return newFilters;
        });
    };

    // // LOGIC LỌC ĐẦY ĐỦ VÀ CHI TIẾT
    // const filteredProducts = allProducts.filter(product => {
    //     // BƯỚC 1: LỌC THEO DANH MỤC
    //     const categoryMatch = !selectedCategory || product.category === selectedCategory;
    //     if (!categoryMatch) {
    //         return false; // Nếu không khớp danh mục, loại ngay
    //     }

    //     // BƯỚC 2: LỌC THEO MÀU SẮC
    //     const selectedColors = selectedFilters.colors;
    //     if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
    //         return false; // Nếu có chọn màu và màu sản phẩm không khớp -> loại
    //     }

    //     // BƯỚC 3: LỌC THEO GIÁ
    //     const selectedPrices = selectedFilters.prices;
    //     if (selectedPrices.length > 0) {
    //         // Kiểm tra xem giá sản phẩm có khớp với BẤT KỲ khoảng giá nào đã chọn không
    //         const priceMatch = selectedPrices.some(rangeString => {
    //             const { min, max } = parsePriceRange(rangeString);
    //             return product.price >= min && product.price <= max;
    //         });
    //         if (!priceMatch) {
    //             return false; // Nếu không khớp với bất kỳ khoảng giá nào -> loại
    //         }
    //     }

    //     // (Tùy chọn) BƯỚC 4: LỌC THEO KÍCH THƯỚC (nếu cần)
    //     // const selectedSizes = selectedFilters.sizes;
    //     // if (selectedSizes.length > 0 && !product.sizes.some(s => selectedSizes.includes(s))) {
    //     //     return false;
    //     // }

    //     // Nếu sản phẩm vượt qua tất cả các bộ lọc
    //     return true;
    // });
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><p>Đang tải dữ liệu trang sản phẩm...</p></div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8 text-gray-800">
            <div className="grid grid-cols-12 gap-8">
                <aside className="col-span-12 md:col-span-3">
                    <CategoryList 
                        categories={categories} 
                        onSelectCategory={setSelectedCategory} 
                        selectedCategory={selectedCategory}
                    />
                    <FilterSection 
                        title="Mức giá" 
                        options={filterOptions.prices}
                        selectedOptions={selectedFilters.prices}
                        onFilterChange={(option) => handleFilterChange('prices', option)}
                    />
                    <FilterSection 
                        title="Kích thước" 
                        options={filterOptions.sizes}
                        selectedOptions={selectedFilters.sizes}
                        onFilterChange={(option) => handleFilterChange('sizes', option)}
                    />
                    <FilterSection 
                        title="Màu sắc" 
                        options={filterOptions.colors}
                        selectedOptions={selectedFilters.colors}
                        onFilterChange={(option) => handleFilterChange('colors', option)}
                    />
                </aside>
                <main className="col-span-12 md:col-span-9">
                    <SortDropdown sortOption={sortOption} onSortChange={setSortOption}/>
                    <ActiveFilters filters={getActiveFilters()} onRemoveFilter={removeActiveFilter} />
                    <ProductGrid products={displayProducts} />
                    <Pagination />
                </main>
            </div>
        </div>
    );
};

export default ProductListPage;