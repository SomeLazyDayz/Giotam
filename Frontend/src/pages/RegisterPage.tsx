import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Bỏ import useAuth vì ta sẽ gọi API trực tiếp
// import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'; // Thêm Select
import { toast } from 'sonner'; // Sửa import sonner
import Logo from '../components/Logo';

export default function RegisterPage() {
  // Thêm các trường mới vào state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '', // Thêm địa chỉ
    bloodType: '', // Thêm nhóm máu
    lastDonationDate: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
  // const { register } = useAuth(); // Bỏ đi, không dùng mock nữa
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBloodTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, bloodType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Bắt đầu loading

    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu không khớp!');
      setIsLoading(false); // Dừng loading
      return;
    }

    // Chuẩn bị dữ liệu gửi đi (bỏ confirmPassword)
    const dataToSend = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password, // Backend sẽ hash mật khẩu này
      address: formData.address,
      bloodType: formData.bloodType,
      lastDonationDate: formData.lastDonationDate || null, // Gửi null nếu không nhập
    };

    try {
      // Gọi API backend
      const response = await fetch('http://localhost:5000/register_donor', { // Thay đổi URL nếu backend chạy ở địa chỉ khác
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        // Nếu backend trả về lỗi (status code không phải 2xx)
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      // Xử lý thành công
      toast.success(result.message || 'Đăng ký thành công!');
      // Có thể lưu thông tin user vào context/localStorage nếu cần đăng nhập ngay
      // login(formData.email, formData.password); // Ví dụ gọi hàm login nếu có
      navigate('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký

    } catch (error: any) {
      console.error("Registration Error:", error);
      toast.error(`Đăng ký thất bại: ${error.message || 'Lỗi không xác định'}`);
    } finally {
      setIsLoading(false); // Dừng loading dù thành công hay thất bại
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF2E1] flex items-center justify-center py-16 px-4" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="w-full max-w-lg"> {/* Tăng max-w */}
        <div className="text-center mb-8">
           {/* ... (Phần Logo và tiêu đề giữ nguyên) ... */}
           <Link to="/" className="inline-flex items-center gap-2 mb-6">
             <Logo className="w-12 h-12" />
           </Link>
           <h1 className="mb-2 text-3xl font-bold uppercase">Đăng ký</h1>
           <p className="text-gray-600">Đăng ký tình nguyện viên hiến máu</p>
           <p className="text-sm text-gray-500 mt-2">
             *Bệnh viện vui lòng liên hệ để được cấp tài khoản
           </p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thêm các trường input mới */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input id="fullName" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required className="mt-2" placeholder="Nguyễn Văn A"/>
               </div>
               <div>
                 <Label htmlFor="phone">Số điện thoại</Label>
                 <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} required className="mt-2" placeholder="09xxxxxxxx"/>
               </div>
               <div className="md:col-span-2">
                 <Label htmlFor="email">Email</Label>
                 <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required className="mt-2" placeholder="example@gmail.com"/>
               </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input id="address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} required className="mt-2" placeholder="Số nhà, Đường, Phường, Quận, TP.HCM"/>
                </div>
               <div>
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input id="password" type="password" value={formData.password} onChange={(e) => handleChange('password', e.target.value)} required className="mt-2" placeholder="••••••••"/>
               </div>
               <div>
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} required className="mt-2" placeholder="••••••••"/>
               </div>
               <div>
                  <Label htmlFor="bloodType">Nhóm máu</Label>
                   <Select value={formData.bloodType} onValueChange={handleBloodTypeChange}>
                      <SelectTrigger className="mt-2" id="bloodType">
                         <SelectValue placeholder="Chọn nhóm máu" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="O+">O+</SelectItem>
                         <SelectItem value="O-">O-</SelectItem>
                         <SelectItem value="A+">A+</SelectItem>
                         <SelectItem value="A-">A-</SelectItem>
                         <SelectItem value="B+">B+</SelectItem>
                         <SelectItem value="B-">B-</SelectItem>
                         <SelectItem value="AB+">AB+</SelectItem>
                         <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                   </Select>
               </div>
                <div>
                  <Label htmlFor="lastDonationDate">Ngày hiến máu gần nhất (nếu có)</Label>
                  <Input
                    id="lastDonationDate"
                    type="date"
                    value={formData.lastDonationDate}
                    onChange={(e) => handleChange('lastDonationDate', e.target.value)}
                    className="mt-2"
                    max={new Date().toISOString().split('T')[0]} // Không cho chọn ngày tương lai
                  />
                  <p className="text-xs text-gray-500 mt-1">Để trống nếu chưa từng hiến máu</p>
                </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#930511] text-white hover:bg-[#7a0410]"
              disabled={isLoading} // Vô hiệu hóa nút khi đang gửi
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </form>

           {/* ... (Phần link Đăng nhập giữ nguyên) ... */}
           <div className="mt-6 text-center">
             <p className="text-gray-600">
               Đã có tài khoản?{' '}
               <Link to="/login" className="text-[#930511] hover:underline">
                 Đăng nhập
               </Link>
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}