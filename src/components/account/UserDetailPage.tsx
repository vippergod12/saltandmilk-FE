import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, logout } from '../../services/api'; // Thêm hàm logout
import type { User } from '../../types'; // Import kiểu DTO

// Component Icon (tương tự như trong Navbar)
const FiLoader = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        // Gọi API để lấy thông tin user 'me' (đã được xác thực)
        const response = await fetchUserProfile();
        console.log(response.result)
        setUser(response.result);
      } catch (err: any) {
        console.error("Lỗi khi tải hồ sơ:", err);
        setError("Không thể tải thông tin hồ sơ. Vui lòng đăng nhập lại.");
        // Nếu lỗi (vd: 401), có thể xóa token và điều hướng
        logout();
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleLogout = async () => {
    await logout(); // Gọi hàm logout từ api.ts
    navigate('/'); // Điều hướng về trang đăng nhập
  };

  const renderProfile = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-10">
          <FiLoader size={32} className="animate-spin text-blue-600" />
          <span className="ml-3 text-lg text-gray-700">Đang tải hồ sơ...</span>
        </div>
      );
    }

    if (error) {
      return <div className="p-4 text-center text-red-600 bg-red-100 rounded-md">{error}</div>;
    }

    if (!user) {
      return <div className="p-4 text-center text-gray-500">Không tìm thấy thông tin người dùng.</div>;
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Hồ sơ của bạn</h3>
          <p className="mt-1 text-gray-600">Chi tiết thông tin tài khoản.</p>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          {/* Hàng 1: Username */}
          <div className="flex flex-col sm:flex-row">
            <dt className="w-full sm:w-1/3 font-medium text-gray-500">Username</dt>
            <dd className="w-full sm:w-2/3 mt-1 sm:mt-0 font-semibold text-gray-900">{user.username}</dd>
          </div>

          {/* Hàng 2: Tên đầy đủ */}
          <div className="flex flex-col sm:flex-row">
            <dt className="w-full sm:w-1/3 font-medium text-gray-500">Tên đầy đủ</dt>
            <dd className="w-full sm:w-2/3 mt-1 sm:mt-0 text-gray-900">{user.full_name}</dd>
          </div>

          {/* Hàng 3: Email */}
          <div className="flex flex-col sm:flex-row">
            <dt className="w-full sm:w-1/3 font-medium text-gray-500">Email</dt>
            <dd className="w-full sm:w-2/3 mt-1 sm:mt-0 text-gray-900">{user.email}</dd>
          </div>

          {/* Hàng 4: Vai trò */}
          <div className="flex flex-col sm:flex-row">
            <dt className="w-full sm:w-1/3 font-medium text-gray-500">Vai trò</dt>
            <dd className="w-full sm:w-2/3 mt-1 sm:mt-0 text-gray-900">
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                {user.role.name}
              </span>
            </dd>
          </div>

          {/* QUAN TRỌNG: KHÔNG HIỂN THỊ MẬT KHẨU!
            Trường 'user.password' được trả về từ BE, nhưng chúng ta
            tuyệt đối không hiển thị nó ra giao diện.
          */}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-6 py-2 font-bold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-xl">
        {renderProfile()}
      </div>
    </div>
  );
};

export default UserProfilePage;