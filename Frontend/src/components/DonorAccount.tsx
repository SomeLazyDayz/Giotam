import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Sử dụng context để lấy thông tin user
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
// Import các icon cần thiết
import { Calendar, Droplet, MapPin, User as UserIcon, Phone, Mail } from 'lucide-react';

// Định nghĩa lại interface User nếu cần (hoặc import từ AuthContext)
interface User {
  id: number;
  email: string;
  role: 'donor' | 'hospital';
  name?: string;
  phone?: string;
  address?: string;
  lat?: number | null;
  lng?: number | null;
  blood_type?: string;
  last_donation?: string | null;
}

export default function DonorAccount() {
  const { user, updateProfile } = useAuth(); // Lấy user và hàm updateProfile từ context

  // State để quản lý trạng thái chỉnh sửa
  // Mặc định bật chỉnh sửa nếu user chưa có tên (chưa cập nhật profile lần nào)
  const [isEditing, setIsEditing] = useState(!user?.name);

  // State để lưu dữ liệu form
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '', // Email thường không cho sửa
    address: '',
    bloodType: '',
    lastDonationDate: '', // Lưu dạng YYYY-MM-DD
  });

  // Sử dụng useEffect để cập nhật formData khi user object từ context thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || '',
        phone: user.phone || '',
        email: user.email || '', // Email lấy từ user context
        address: user.address || '',
        bloodType: user.blood_type || '',
        // Định dạng lại ngày tháng nếu cần (từ ISO string sang YYYY-MM-DD cho input type="date")
        lastDonationDate: user.last_donation ? user.last_donation.split('T')[0] : '',
      });
      // Tự động tắt chế độ chỉnh sửa nếu user đã có tên
      if (user.name) {
        setIsEditing(false);
      } else {
        setIsEditing(true); // Bắt buộc chỉnh sửa nếu chưa có tên
      }
    } else {
      // Nếu user là null (đăng xuất), reset form
      setFormData({ fullName: '', phone: '', email: '', address: '', bloodType: '', lastDonationDate: '' });
      setIsEditing(true); // Có thể ẩn component hoặc chuyển hướng thay vì bật edit
    }
  }, [user]); // Dependency array: chạy lại effect khi `user` thay đổi

  // Mock donation history (có thể thay bằng gọi API sau)
  const donationHistory = [
    { id: 1, date: '15/08/2025', location: 'Bệnh viện Chợ Rẫy', amount: '350ml', bloodType: user?.blood_type || 'N/A' },
    { id: 2, date: '10/06/2025', location: 'Bệnh viện Từ Dũ', amount: '450ml', bloodType: user?.blood_type || 'N/A' },
    { id: 3, date: '05/04/2025', location: 'Bệnh viện Nhân Dân 115', amount: '350ml', bloodType: user?.blood_type || 'N/A' },
  ];

  // Xử lý khi submit form cập nhật
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dữ liệu cần gửi đi để cập nhật (có thể chỉ gửi những trường thay đổi)
    const dataToUpdate: Partial<User> = {
      name: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      blood_type: formData.bloodType,
      // Đảm bảo gửi đúng định dạng ngày hoặc null
      last_donation: formData.lastDonationDate || null,
    };
    // Gọi hàm updateProfile từ context (sẽ xử lý việc gọi API và cập nhật state)
    updateProfile(dataToUpdate)
        .then(() => {
            // Không cần setIsEditing(false) vì useEffect sẽ làm
            toast.success('Cập nhật thông tin thành công!');
        })
        .catch((error) => {
            // Lỗi đã được xử lý trong updateProfile (nếu có gọi API)
            console.error("Update profile failed in component:", error);
            // toast.error("Cập nhật thất bại. Vui lòng thử lại."); // Toast lỗi có thể đã có trong context
        });
  };

  // Xử lý khi giá trị input thay đổi
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Xử lý khi chọn nhóm máu
   const handleBloodTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, bloodType: value }));
  };


  // Nếu chưa có user (chưa đăng nhập hoặc đang load), có thể hiện loading hoặc null
  if (!user) {
      return <div>Đang tải thông tin tài khoản...</div>; // Hoặc trả về null nếu AccountPage xử lý điều hướng
  }

  return (
    <div className="space-y-8">
      {/* Header của trang tài khoản */}
      <div className="flex justify-between items-center">
        <h1>Tài khoản tình nguyện viên</h1>
        {/* Chỉ hiển thị nút "Chỉnh sửa" khi đã có thông tin và không đang ở chế độ chỉnh sửa */}
        {user.name && !isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-[#930511] text-white hover:bg-[#7a0410]"
          >
            Chỉnh sửa
          </Button>
        )}
      </div>

      {/* Card chứa form hoặc thông tin hiển thị */}
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Cập nhật thông tin cá nhân' : 'Hồ sơ cá nhân'}</CardTitle>
          {!isEditing && <p className="text-sm text-gray-500 pt-1">Đây là thông tin bạn đã đăng ký.</p>}
          {isEditing && !user.name && <p className="text-sm text-red-600 pt-1">Vui lòng cập nhật đầy đủ thông tin của bạn.</p>}
        </CardHeader>
        <CardContent>
          {isEditing ? (
            // Form khi ở chế độ chỉnh sửa
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input id="fullName" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required className="mt-2"/>
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} required className="mt-2"/>
                </div>
                <div>
                  <Label htmlFor="email">Email (Không thể thay đổi)</Label>
                  <Input id="email" type="email" value={formData.email} readOnly disabled className="mt-2 bg-gray-100 cursor-not-allowed"/>
                </div>
                {/* <div><Label htmlFor="healthInsuranceId">Mã số BHYT</Label>...</div> */}
                <div className="md:col-span-2">
                  <Label htmlFor="address">Địa chỉ nhà</Label>
                  <Input id="address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} required className="mt-2"/>
                </div>
                <div>
                  <Label htmlFor="bloodType">Nhóm máu</Label>
                  <Select value={formData.bloodType} onValueChange={handleBloodTypeChange} required>
                    <SelectTrigger className="mt-2" id="bloodType">
                      <SelectValue placeholder="Chọn nhóm máu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div>
                  <Label htmlFor="lastDonationDate">Ngày hiến gần nhất</Label>
                  <Input
                    id="lastDonationDate"
                    type="date"
                    value={formData.lastDonationDate} // Input date cần giá trị '' thay vì null
                    onChange={(e) => handleChange('lastDonationDate', e.target.value)}
                    className="mt-2"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <p className="text-xs text-gray-500 mt-1">Để trống nếu chưa từng hiến máu</p>
                </div>
              </div>
              {/* Nút Lưu và Hủy */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-[#930511] text-white hover:bg-[#7a0410]">
                  Lưu thông tin
                </Button>
                {/* Chỉ hiển thị nút Hủy nếu người dùng đã có tên (đã từng cập nhật) */}
                {user.name && (
                  <Button type="button" variant="outline" onClick={() => {
                    setIsEditing(false);
                    // Reset form về giá trị user hiện tại khi hủy
                     setFormData({
                        fullName: user.name || '', phone: user.phone || '', email: user.email || '',
                        address: user.address || '', bloodType: user.blood_type || '',
                        lastDonationDate: user.last_donation ? user.last_donation.split('T')[0] : ''
                     });
                   }}>
                    Hủy
                  </Button>
                )}
              </div>
            </form>
          ) : (
            // Phần hiển thị thông tin khi không chỉnh sửa
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
               <div>
                  <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
                  <div className="flex items-center gap-2"><UserIcon className="w-4 h-4 text-gray-500 shrink-0" /> <p className="font-medium">{formData.fullName || 'Chưa cập nhật'}</p></div>
               </div>
               <div>
                  <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                   <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-500 shrink-0" /><p className="font-medium">{formData.phone || 'Chưa cập nhật'}</p></div>
               </div>
               <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-500 shrink-0" /><p className="font-medium">{formData.email}</p></div>
               </div>
               <div>
                  <p className="text-sm text-gray-600 mb-1">Nhóm máu</p>
                  <div className="flex items-center gap-2"><Droplet className="w-4 h-4 text-[#930511] shrink-0" /> <p className="font-medium">{formData.bloodType || 'Chưa cập nhật'}</p></div>
               </div>
               <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Địa chỉ</p>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500 shrink-0" /><p className="font-medium">{formData.address || 'Chưa cập nhật'}</p></div>
               </div>
               {/* <div><p className="text-sm text-gray-600 mb-1">Mã số BHYT</p>...</div> */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ngày hiến gần nhất</p>
                   <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500 shrink-0" /><p className="font-medium">{formData.lastDonationDate ? new Date(formData.lastDonationDate).toLocaleDateString('vi-VN') : 'Chưa hiến lần nào'}</p></div>
               </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lịch sử hiến máu (chỉ hiển thị khi không chỉnh sửa và đã có profile) */}
      {!isEditing && user.name && (
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử hiến máu (Demo)</CardTitle>
          </CardHeader>
          <CardContent>
            {donationHistory.length > 0 ? (
              <div className="space-y-4">
                {donationHistory.map((donation) => (
                  <div key={donation.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#FBF2E1] rounded-lg gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#930511] rounded-full flex items-center justify-center text-white shrink-0">
                        <Droplet className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 text-sm sm:text-base">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="font-medium">{donation.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{donation.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0 w-full sm:w-auto">
                      <p className="text-[#930511] font-semibold text-sm sm:text-base">{donation.amount}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Nhóm {donation.bloodType}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <p className="text-gray-500 italic">Chưa có lịch sử hiến máu.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}