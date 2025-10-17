import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';;
import Navbar from './components/navbar/Navbar';
import HomePage from './components/home/Home';
function App() {

  return (
    <Router>
      <div className="">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
            {/* 4. <Routes> là nơi định nghĩa các tuyến đường có thể có */}
            <Routes>
              {/* 5. Mỗi <Route> là một ánh xạ giữa 'path' (đường dẫn) và 'element' (component trang) */}
              <Route path="/" element={<HomePage />} />
            </Routes>
          </main>
      </div>
    </Router>
  );
};

export default App
