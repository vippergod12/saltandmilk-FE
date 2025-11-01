import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';;
import Navbar from './components/navbar/Navbar';
import HomePage from './components/home/Home';
import Footer from './components/footer/Footer'
import ProductListPage from './components/product-list/ProductListPage';
function App() {

  return (
    <Router>
      <div className="">
        <Navbar />
        <main className="mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* SỬA Ở ĐÂY:
              - Bỏ route "/bo-suu-tap" cũ.
              - Thêm route động "/category/:slug".
              - Dấu :slug sẽ là một "biến" (ví dụ: "bo-suu-tap", "ao-polo", "nam"...)
            */}
            <Route path="/category/:slug" element={<ProductListPage />} />
            
            {/* Bạn cũng nên có một route cho trang tìm kiếm (từ Navbar) */}
            <Route path="/search" element={<ProductListPage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App
