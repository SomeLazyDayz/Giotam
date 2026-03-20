import { useState } from 'react';
// Sửa đổi import: Bỏ onRegister, onNavigate props; Thêm Link, useNavigate hook
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin, Droplet } from 'lucide-react'; // Thêm icons nếu cần
// Thêm các component UI cần thiết
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner'; // Đảm bảo import toast đúng
import Logo from '../components/Logo'; // Giả sử bạn có component Logo

// Bỏ interface RegisterPageProps vì component sẽ tự điều hướng
// interface RegisterPageProps {
//   onRegister: () => void;
//   onNavigate: (page: string) => void;
// }

// Đổi tên component thành Page component chuẩn (nếu nó nằm trong thư mục pages)
export default function RegisterPage(/* Bỏ props: { onRegister, onNavigate }: RegisterPageProps */) {
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBloodTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, bloodType: value }));
  };

  // *** PHẦN QUAN TRỌNG: THÊM LOGIC GỌI API ***
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu không khớp!');
      setIsLoading(false);
      return;
    }

    // Chuẩn bị dữ liệu gửi đi (bỏ confirmPassword)
    const dataToSend = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      address: formData.address,
      bloodType: formData.bloodType,
      lastDonationDate: formData.lastDonationDate || null,
    };

    try {
      // Gọi API backend
      const response = await fetch('http://localhost:5000/register_donor', { // Đảm bảo URL đúng
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      toast.success(result.message || 'Đăng ký thành công!');
      navigate('/login'); // Chuyển hướng đến trang đăng nhập

    } catch (error: any) {
      console.error("Registration Error:", error);
      toast.error(`Đăng ký thất bại: ${error.message || 'Lỗi không xác định'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Phần JSX giữ nguyên cấu trúc layout, chỉ cần đảm bảo có đủ input fields
    <div className="min-h-screen bg-[#FBF2E1] flex items-center justify-center py-16 px-4" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="w-full max-w-lg"> {/* Có thể tăng max-w */}
        <div className="text-center mb-8">
           <Link to="/" className="inline-flex items-center gap-2 mb-6">
             <Logo className="w-12 h-12" />
           </Link>
           <h1 className="mb-2 text-3xl font-bold uppercase text-[#930511]">Đăng ký</h1>
           <p className="text-gray-600">Đăng ký tình nguyện viên hiến máu</p>
           <p className="text-sm text-gray-500 mt-2">
             *Bệnh viện vui lòng liên hệ để được cấp tài khoản
           </p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          {/* Sửa tên onSubmit thành handleSubmit mới */}
          <form onSubmit={handleSubmit} className="space-y-6">
             {/* Thêm input/select cho các trường address, bloodType, lastDonationDate */}
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
                  {/* Input password với icon Eye */}
                   <div className="relative">
                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => handleChange('password', e.target.value)} required className="mt-2 pl-10 pr-10" placeholder="••••••••"/>
                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                       {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                     </button>
                   </div>
               </div>
               <div>
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  {/* Input confirm password với icon Eye */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} required className="mt-2 pl-10 pr-10" placeholder="••••••••"/>
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                       {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                     </button>
                  </div>
               </div>
               <div>
                  <Label htmlFor="bloodType">Nhóm máu</Label>
                   <Select value={formData.bloodType} onValueChange={handleBloodTypeChange} required> {/* Thêm required */}
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

            {/* Điều khoản và nút Submit */}
            <div className="flex items-start gap-2">
              <input type="checkbox" required className="w-4 h-4 mt-1" id="terms"/>
              <Label htmlFor="terms" className="text-gray-600 text-sm font-normal"> {/* Sửa lại label */}
                Tôi đồng ý với các{" "}
                <Link to="/terms" className="text-[#930511] hover:underline"> {/* Dùng Link nếu có trang điều khoản */}
                  điều khoản và điều kiện
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#930511] text-white hover:bg-[#7a0410]"
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </form>

           {/* Link đến trang Đăng nhập */}
           <div className="mt-6 text-center">
             <p className="text-gray-600">
               Đã có tài khoản?{' '}
               <Link to="/login" className="text-[#930511] hover:underline"> {/* Dùng Link */}
                 Đăng nhập
               </Link>
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}