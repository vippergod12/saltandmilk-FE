import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './components/home/Home';
import Footer from './components/footer/Footer'
import ProductListPage from './components/product-list/ProductListPage';

// DÒNG 1: THÊM IMPORT CHO TRANG CHI TIẾT
import ProductDetailPage from './components/product-detail/ProductDetailPage';
import LoginPage from './components/login/LoginPage';
import UserProfilePage from './components/account/UserDetailPage';

function App() {

    return (
        <Router>
            <div className="">
                <Navbar />
                <main className="mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        {/* Route cho trang danh sách (khi click 1 category) */}
                        <Route path="/category/:slug" element={<ProductListPage />} />

                        {/* Route cho trang tìm kiếm (cũng là danh sách) */}
                        <Route path="/search" element={<ProductListPage />} />

                        {/* DÒNG 2: THÊM ROUTE CHO TRANG CHI TIẾT SẢN PHẨM */}
                        <Route path="/product/:variantId" element={<ProductDetailPage />} />
                        <Route path="/account" element={<LoginPage />} />
                        <Route path="/my-info" element={<UserProfilePage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App
