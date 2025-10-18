// src/components/Footer.tsx

import React from 'react';
import { FaShippingFast, FaHeadset, FaShieldAlt, FaUndo, FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { SiZalo } from "react-icons/si";
import { RiVisaLine } from "react-icons/ri";
import { FaCreditCard } from 'react-icons/fa';

const Footer: React.FC = () => {
  // Dữ liệu cho phần thông tin dịch vụ (dòng lớn đầu tiên)
  const services = [
    {
      icon: <FaShippingFast size={32} className="text-blue-500" />,
      title: "Giao hàng siêu tốc",
      description: "Miễn phí cho đơn hàng trên 500k",
    },
    {
      icon: <FaHeadset size={32} className="text-blue-500" />,
      title: "Hỗ trợ trực tuyến 24/7",
      description: "Hỗ trợ khách hàng mọi lúc",
    },
    {
      icon: <FaShieldAlt size={32} className="text-blue-500" />,
      title: "Bảo mật thanh toán",
      description: "Đảm bảo an toàn thông tin",
    },
    {
      icon: <FaUndo size={32} className="text-blue-500" />,
      title: "Chính sách đổi trả",
      description: "Đổi trả trong vòng 30 ngày",
    },
  ];

  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 pb-5">
      <div className="container mx-auto px-4">
        {/* === DÒNG LỚN THỨ NHẤT === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10 border-b pb-8">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Phần icon (chiếm 3/12) */}
              <div className="w-3/12 flex justify-center">
                {service.icon}
              </div>
              {/* Phần text (chiếm 9/12) */}
              <div className="w-9/12">
                <h4 className="font-bold text-md text-lg">{service.title}</h4>
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* === DÒNG LỚN THỨ HAI === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phần 1: Giới thiệu */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4 uppercase">Giới thiệu</h3>
            <ul className="space-y-3 text-lg">
              <li className="font-bold text-blue-600">TÊN CỬA HÀNG/DOANH NGHIỆP</li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-gray-500" />
                <span>Địa chỉ của bạn, Quận/Huyện, Tỉnh/Thành phố</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-gray-500" />
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gray-500" />
                <span>emailcuaban@example.com</span>
              </li>
              {/* Social Icons */}
              <li className="flex items-center gap-4 pt-2">
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-all duration-300"><FaFacebookF size={30} /></a>
                <a href="#" className="text-gray-500 hover:text-pink-500 transition-all duration-300"><FaInstagram size={30} /></a>
                <a href="#" className="text-gray-500 hover:text-red-600 transition-all duration-300"><FaYoutube size={30} /></a>
                <a href="#" className="text-gray-500 hover:text-black transition-all duration-300"><FaTiktok size={30} /></a>
              </li>
            </ul>
          </div>

          {/* Phần 2: Chính sách */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4 uppercase">Chính sách</h3>
            <ul className="space-y-3 text-lg">
              <li><a href="#" className="hover:text-blue-500 transition-all duration-300">Chính sách khách hàng thân thiết</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-all duration-300">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-all duration-300">Chính sách bảo hành</a></li>
            </ul>
          </div>

          {/* Phần 3: Phương thức thanh toán */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4 uppercase">Phương thức thanh toán</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 flex-wrap transition-all duration-300">
                <SiZalo size={40} className="text-blue-500" />
                <FaCreditCard size={40} className="text-blue-800" />
                <RiVisaLine size={40} className="text-indigo-700" />
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 border-t mt-10 pt-5 text-sm">
          © {new Date().getFullYear()} Tên Công Ty. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;