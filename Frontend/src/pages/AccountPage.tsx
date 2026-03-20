import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DonorAccount from '../components/DonorAccount'; // Component cho donor
import HospitalAccount from '../components/HospitalAccount'; // Component cho hospital/admin

export default function AccountPage() {
  const { user } = useAuth(); // Lấy user từ context
  const navigate = useNavigate();

  // Nếu chưa đăng nhập, chuyển về trang login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Nếu đang load user hoặc chưa đăng nhập, không hiển thị gì
  if (!user) {
    return null; // Hoặc một component Loading...
  }

  return (
    <div className="min-h-screen bg-[#FBF2E1]" style={{ fontFamily: 'Times New Roman, serif' }}>
      <Header />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- Hiển thị component dựa trên vai trò --- */}
          {user.role === 'donor' && <DonorAccount />}
          {(user.role === 'hospital' || user.role === 'admin') && <HospitalAccount />}
          {/* Thêm các vai trò khác nếu có */}
          {/* --- Kết thúc hiển thị dựa trên vai trò --- */}
        </div>
      </main>

      <Footer />
    </div>
  );
}