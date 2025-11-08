// LoginPage.tsx
import React, { useState } from 'react';
import { login } from '../../services/api'
import type { token } from '../../types';
import { useNavigate } from 'react-router-dom';
const LoginPage: React.FC = () => {
    // 1. Quản lý trạng thái cho các input
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    // 2. Hàm xử lý khi submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Ngăn trình duyệt tải lại trang
        setLoading(true);
        setError(null);
        try {
            const apiResponse = await login(username, password);
            if (apiResponse.result && (apiResponse.result as any).token) {
                localStorage.setItem('accessToken', (apiResponse.result as any).token);
                navigate('/');
            } else {
                // BE trả 200 OK nhưng không có token
                setError('Không nhận được token từ máy chủ.');
            }
        } catch (err: any) {
            console.error('Lỗi đăng nhập:', err);

            // Lỗi do BE trả về (vd: 401, 403, 500)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
            // Lỗi mạng (server sập, mất kết nối)
            else if (err.code === 'ERR_NETWORK') {
                setError('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
            }
            // Lỗi khác
            else {
                setError('Sai tên đăng nhập hoặc mật khẩu.');
            }
        } finally {
            setLoading(false); // Dù thành công hay thất bại, dừng loading
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-900">
                    Đăng nhập
                </h2>

                {/* Vùng hiển thị lỗi */}
                {error && (
                    <div className="p-3 text-sm text-center text-red-800 bg-red-100 border border-red-300 rounded-md">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Trường Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block font-medium text-gray-700"
                            style={{ fontSize: '20px' }}
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                            placeholder="Nhập tên đăng nhập của bạn"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading} // Vô hiệu hóa khi đang loading
                        />
                    </div>

                    {/* Trường Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block font-medium text-gray-700"
                            style={{ fontSize: '20px' }}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="text-black w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading} // Vô hiệu hóa khi đang loading
                        />
                    </div>

                    {/* Nút Đăng nhập (cập nhật) */}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            disabled={loading} // Vô hiệu hóa khi đang loading
                        >
                            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>
                    </div>
                </form>

                {/* Link Đăng ký */}
                <p className="text-sm text-center text-gray-600">
                    Chưa có tài khoản?{' '}
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Đăng ký ngay
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;