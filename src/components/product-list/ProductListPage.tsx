import React, { useState, useEffect, useMemo, useRef } from 'react'; // <-- 1. IMPORT useRef
import { useParams } from 'react-router-dom';
import type { Category, FilterOptions, ProductVariant, ApiResponse } from '../../types';
import { fetchCategories, fetchVariantsByCategorySlug, featchAllVariants, fecthVariantsByCategoryId, fetchColors, fetchSizes } from '../../services/api';
// Giả định bạn đã tạo file config/app
import { DEFAULT_PAGE_SIZE } from '../config/app'; 
// Import các components con
import CategoryList from './CategoryList';
import FilterSection from './FilterSection';
import SortDropdown from './SortDropdown';
import ActiveFilters from './ActiveFilters';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';
import ProductCardSkeleton from './ProductCardSkeleton';

const staticPriceOptions = ['Dưới 100.000đ', '100.000đ - 300.000đ', '300.000đ - 500.000đ', 'Trên 500.000đ']

// HÀM HỖ TRỢ (Giữ nguyên)
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
    const { slug } = useParams<{ slug: string }>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({ prices: [], sizes: [], colors: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [allVariants, setAllVariants] = useState<ProductVariant[]>([]);
    
    // === PHÂN TRANG ===
    const [currentPage, setCurrentPage] = useState(0); 
    const [totalPages, setTotalPages] = useState(1); 
    
    // === LỌC CHÍNH ===
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
        prices: [],
        sizes: [],
        colors: [],
    });
    const [sortOption, setSortOption] = useState<string>('Mặc định');


    // --- LOGIC LỌC VÀ SẮP XẾP (Giữ nguyên) ---
    const displayVariants = useMemo(() => {
        const filtered = allVariants.filter(variant => {
            // Lọc giá
            const selectedPrices = selectedFilters.prices;
            if (selectedPrices.length > 0) {
                const priceMatch = selectedPrices.some(rangeString => {
                    const { min, max } = parsePriceRange(rangeString);
                    const priceToCheck = variant.salePrice ?? variant.price ?? 0;
                    return priceToCheck >= min && priceToCheck <= max;
                });
                if (!priceMatch) return false;
            }

            // Lọc kích thước
            const selectedSizes = selectedFilters.sizes;
            if (selectedSizes.length > 0 && !selectedSizes.includes(variant.size.name)) {
                return false;
            }

            // LỌC MÀU SẮC
            const selectedColors = selectedFilters.colors;
            if (selectedColors.length > 0) {
                if (!selectedColors.includes(variant.color.name)) {
                    return false;
                }
            }

            return true;
        });

        // BƯỚC 2: SẮP XẾP (Giữ nguyên)
        const sorted = [...filtered];
        switch (sortOption) {
            case 'Giá: Tăng dần':
                sorted.sort((a, b) => (a.salePrice ?? a.price ?? 0) - (b.salePrice ?? b.price ?? 0));
                break;
            case 'Giá: Giảm dần':
                sorted.sort((a, b) => (b.salePrice ?? b.price ?? 0) - (a.salePrice ?? a.price ?? 0));
                break;
            case 'Tên: A-Z':
                sorted.sort((a, b) => (a.product.name ?? '').localeCompare(b.product.name ?? ''));
                break;
            case 'Tên: Z-A':
                sorted.sort((a, b) => (b.product.name ?? '').localeCompare(a.product.name ?? ''));
                break;
            case 'Hàng mới nhất':
                sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'Hàng cũ nhất':
                sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            default:
                break;
        }

        return sorted;

    }, [allVariants, selectedCategory, selectedFilters, sortOption]); 

    // --- CẤU TRÚC LẠI HOÀN TOÀN ---

    // useEffect 1: Tải dữ liệu tĩnh (categories, sizes, colors) (Giữ nguyên)
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [categoriesData, sizesData, colorsData] = await Promise.all([
                    fetchCategories(),
                    fetchSizes(), 
                    fetchColors() 
                ]);

                setCategories(categoriesData.result);
                
                const dynamicSizes = sizesData.result.map(size => size.name);
                const dynamicColors = colorsData.result.map(color => color.name);

                setFilterOptions({
                    prices: staticPriceOptions, 
                    sizes: dynamicSizes,
                    colors: dynamicColors
                });

            } catch (error) {
                console.error("Failed to fetch initial page data:", error);
                setFilterOptions({ prices: staticPriceOptions, sizes: [], colors: [] });
            }
        };

        loadInitialData();
    }, []);


    // 🔥🔥🔥 CÁC EFFECT XỬ LÝ TRẠNG THÁI MỚI - ĐÃ SỬA LỖI XUNG ĐỘT 🔥🔥🔥
    
    // 1. EFFECT: RESET FILTER SIDEBAR KHI SLUG THAY ĐỔI
    // Dùng useRef để lưu giá trị slug trước đó mà không gây re-render
    const prevSlugRef = useRef(slug);

    useEffect(() => {
        // Kiểm tra xem slug *thực sự* thay đổi hay không (so với lần render trước)
        if (slug !== prevSlugRef.current) {
            // Khi Slug thay đổi (click Navbar), đây là hành động ưu tiên nhất.
            // Reset tất cả bộ lọc sidebar về trạng thái ban đầu.
            setSelectedCategory(null);
            setSelectedFilters({ prices: [], sizes: [], colors: [] });
            setSortOption('Mặc định');
            setCurrentPage(0); // Reset trang

            // Cập nhật ref cho lần render tiếp theo
            prevSlugRef.current = slug;
        }
    }, [slug]); // Chỉ lắng nghe 'slug'


    // 2. EFFECT: RESET TRANG KHI CHỌN CATEGORY ID
    // Dùng useRef để tránh chạy lần đầu tiên
    const isFirstCategoryRun = useRef(true);

    useEffect(() => {
        // Bỏ qua lần render đầu tiên
        if (isFirstCategoryRun.current) {
            isFirstCategoryRun.current = false;
            return;
        }

        // Nếu Category ID thay đổi (do click Sidebar), ta reset trang về 0
        // và reset các bộ lọc phụ (giá, màu, size)
        setCurrentPage(0);
        setSelectedFilters({ prices: [], sizes: [], colors: [] });
        setSortOption('Mặc định');

    }, [selectedCategory]); // Chỉ lắng nghe 'selectedCategory'


    // 3. EFFECT: TẢI VARIANTS (Điều khiển bởi 3 dependencies: selectedCategory, slug, currentPage)
    useEffect(() => {
        let loadingTimer: number;
        const loadVariants = async () => {
            clearTimeout(loadingTimer);
            loadingTimer = setTimeout(() => {
                setIsLoading(true);
            }, 200);

            let variantsData: ApiResponse<any>;
            let actualVariants: ProductVariant[] = [];
            let newTotalPages: number = 1;

            try {
                if (selectedCategory !== null) {
                    // ===========================================
                    // ƯU TIÊN 1: LỌC THEO CATEGORY ID (Sidebar click)
                    // ===========================================
                    
                    // 🔥 SỬA LỖI 2: Dùng API mới có phân trang
                    variantsData = await fecthVariantsByCategoryId(selectedCategory, currentPage, DEFAULT_PAGE_SIZE); 
                    
                    // 🔥 SỬA LỖI 3: Trích xuất mảng từ .content
                    if (variantsData.result?.content) {
                        actualVariants = variantsData.result.content;
                        newTotalPages = variantsData.result.totalPages; 
                    } else {
                        actualVariants = [];
                    }
                    
                } else if (slug) {
                    // ===========================================
                    // ƯU TIÊN 2: LỌC THEO CATEGORY SLUG (URL/Navbar)
                    // ===========================================
                    variantsData = await fetchVariantsByCategorySlug(slug, currentPage, DEFAULT_PAGE_SIZE);

                    if (variantsData.result?.content) {
                        actualVariants = variantsData.result.content;
                        newTotalPages = variantsData.result.totalPages; 
                    } else {
                        actualVariants = [];
                    }
                    
                } else {
                    // ===========================================
                    // ƯU TIÊN 3: TẢI TẤT CẢ (Không Slug, Không ID)
                    // ===========================================
                    variantsData = await featchAllVariants(); // API này không phân trang
                    actualVariants = variantsData.result || [];
                    newTotalPages = 1;
                }

                clearTimeout(loadingTimer);
                setAllVariants(actualVariants);
                setTotalPages(newTotalPages);

            } catch (error) {
                clearTimeout(loadingTimer);
                console.error("Failed to fetch variants:", error);
                setAllVariants([]);
                setTotalPages(1);
            } finally {
                setIsLoading(false);
            }
        };

        loadVariants();
        return () => {
            clearTimeout(loadingTimer);
        }
        
        // Lắng nghe cả ba biến trạng thái chi phối việc tải dữ liệu
    }, [selectedCategory, slug, currentPage]); 


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
                    <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
                    <ActiveFilters filters={getActiveFilters()} onRemoveFilter={removeActiveFilter} />

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                        ))}
                        </div>
                    ) : (
                        <ProductGrid variants={displayVariants} />
                    )}

                    {/* 🔥 SỬA LỖI 4: Hiển thị Pagination cho *cả hai* luồng (Slug và ID) */}
                    {totalPages > 1 && !isLoading && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductListPage;