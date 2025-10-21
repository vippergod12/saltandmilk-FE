import React, { useState, useEffect, useMemo } from 'react';
import type { Category, FilterOptions, ProductVariant, ApiResponse } from '../../types';
import { fetchCategories, fetchAllProducts, featchAllVariants, fecthVariantsByCategoryId } from '../../services/api';

// Import các components con
import CategoryList from './CategoryList';
import FilterSection from './FilterSection';
import SortDropdown from './SortDropdown';
import ActiveFilters from './ActiveFilters';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';
import ProductCardSkeleton from './ProductCardSkeleton'; // <-- 1. IMPORT SKELETON
// import { all } from 'axios'; // Loại bỏ import không dùng tới

const staticFilterOptions: FilterOptions = {
    prices: ['Dưới 100.000đ', '100.000đ - 300.000đ', '300.000đ - 500.000đ', 'Trên 500.000đ'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Trắng', 'Đen', 'Xanh', 'Be'],
};

// HÀM HỖ TRỢ: Chuyển đổi chuỗi giá thành khoảng số min-max
const parsePriceRange = (rangeString: string): { min: number; max: number } => {
    const cleanString = rangeString.replace(/[.đ\s]/g, '');

    if (cleanString.startsWith('Dưới')) {
        const value = parseInt(cleanString.replace(/\D/g, ''), 10);
        return { min: 0, max: value - 1 };
    }

    if (cleanString.startsWith('Trên')) {
        const value = parseInt(cleanString.replace(/\D/g, ''), 10);
        return { min: value, max: Infinity };
    }

    const values = cleanString.match(/\d+/g)?.map(Number);
    if (values && values.length === 2) {
        return { min: values[0], max: values[1] };
    }

    return { min: 0, max: Infinity };
};


const ProductListPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({ prices: [], sizes: [], colors: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [allVariants, setAllVariants] = useState<ProductVariant[]>([]); 
    // Map từ Product ID (string) sang Category ID (string, sau khi chuyển đổi)
    // const [productCategoryMap, setProductCategoryMap] = useState<Map<string, string>>(new Map()); 
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
        prices: [],
        sizes: [],
        colors: [],
    });
    
    const [sortOption, setSortOption] = useState<string>('Mặc định');

    

    // --- LOGIC LỌC VÀ SẮP XẾP ---
    const displayVariants = useMemo(() => {
        
        // BƯỚC 1: LỌC BIẾN THỂ (VARIANTS)
        const filtered = allVariants.filter(variant => {
            

            // 3. Lọc theo giá
            const selectedPrices = selectedFilters.prices;
            if (selectedPrices.length > 0) {
                const priceMatch = selectedPrices.some(rangeString => {
                    const { min, max } = parsePriceRange(rangeString);
                    const priceToCheck = variant.salePrice ?? variant.price ?? 0;
                    return priceToCheck >= min && priceToCheck <= max;
                });
                if (!priceMatch) return false;
            }
            
            // 4. Lọc theo kích thước
            const selectedSizes = selectedFilters.sizes;
            if (selectedSizes.length > 0 && !selectedSizes.includes(variant.sizeName)) {
                return false;
            }

            return true;
        });

        // BƯỚC 2: SẮP XẾP BIẾN THỂ ĐÃ LỌC
        const sorted = [...filtered];

        switch (sortOption) {
            case 'Giá: Tăng dần':
                sorted.sort((a, b) => (a.salePrice ?? a.price ?? 0) - (b.salePrice ?? b.price ?? 0));
                break;
            case 'Giá: Giảm dần':
                sorted.sort((a, b) => (b.salePrice ?? b.price ?? 0) - (a.salePrice ?? a.price ?? 0));
                break;
            case 'Tên: A-Z':
                sorted.sort((a, b) => (a.productName ?? '').localeCompare(b.productName ?? '')); 
                break;
            case 'Tên: Z-A':
                sorted.sort((a, b) => (b.productName ?? '').localeCompare(a.productName ?? ''));
                break;
            case 'Hàng mới nhất':
                // Cần đảm bảo `createdAt` có thể được chuyển đổi thành Date object
                sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); 
                break;
            case 'Hàng cũ nhất':
                sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            default:
                break;
        }

        return sorted;

    }, [allVariants, selectedCategory, selectedFilters, sortOption]); // Các phụ thuộc đã cập nhật

    // --- CẤU TRÚC LẠI HOÀN TOÀN ---

    // useEffect 1: Tải dữ liệu tĩnh (categories), chỉ chạy 1 LẦN
    useEffect(() => {
        const loadStaticData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData.result);
                setFilterOptions(staticFilterOptions);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        loadStaticData();
    }, []); // Mảng rỗng -> chạy 1 lần duy nhất

    // useEffect 2: Tải variants, chạy lại MỖI KHI `selectedCategory` thay đổi
    useEffect(() => {
        let loadingTimer:number;
        const loadVariants = async () => {
            try {
                loadingTimer = setTimeout(() => {
                setIsLoading(true);
                }, 200);
                let variantsData: ApiResponse<ProductVariant[]>;

                if (selectedCategory !== null) {
                    // Nếu có chọn category -> gọi API theo category ID
                    variantsData = await fecthVariantsByCategoryId(selectedCategory);
                } else {
                    // Nếu không (selectedCategory là null) -> tải tất cả
                    variantsData = await featchAllVariants();
                }
                clearTimeout(loadingTimer);
                setAllVariants(variantsData.result);

            } catch (error) {
                clearTimeout(loadingTimer);
                console.error("Failed to fetch variants:", error);
                setAllVariants([]); // Set về mảng rỗng nếu có lỗi
            } finally {
                setIsLoading(false);
            }
        };

        loadVariants();
        return () => {
            clearTimeout(loadingTimer);
        }
    }, [selectedCategory]); // Phụ thuộc: Chạy lại mỗi khi selectedCategory thay đổi

    // --- CÁC HÀM XỬ LÝ LỌC KHÁC (Giữ nguyên) ---

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


    return (
        <div className="container mx-auto p-4 md:p-8 text-gray-800">
            <div className="grid grid-cols-12 gap-8">
                <aside className="col-span-12 md:col-span-3">
                    <CategoryList 
                         categories={categories} 
                         onSelectCategory={setSelectedCategory} 
                         selectedCategory={selectedCategory}
                     />
                    {/* ... (Các FilterSection khác) */}
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
                    
                    {/* === BƯỚC 2: THÊM LOGIC MỚI VÀO ĐÂY === */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <ProductGrid variants={displayVariants} />
                    )}

                    <Pagination />
                </main>
            </div>
        </div>
    );
};

export default ProductListPage;