import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Droplet, Search, Send } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { cn } from './ui/utils'; // Import cn

// Định nghĩa kiểu dữ liệu trả về từ API /create_alert
interface DonorSearchResult {
    user: {
        id: number;
        name: string;
        phone: string;
        email?: string;
        blood_type: string;
    };
    distance_km: number;
    ai_score: number;
}

export default function HospitalAccount() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(!user?.name);
  const [hospitalFormData, setHospitalFormData] = useState({
    hospitalName: user?.name || '',
    address: user?.address || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

   useEffect(() => {
     if (user && (user.role === 'hospital' || user.role === 'admin')) {
       setHospitalFormData({
         hospitalName: user.name || '',
         address: user.address || '',
         phone: user.phone || '',
         email: user.email || '',
       });
       setIsEditing(!user.name);
     }
   }, [user]);


  // --- State cho chức năng lọc ---
  const [filters, setFilters] = useState({
    bloodType: 'O+',
    radius: '10',
  });
  const [searchResults, setSearchResults] = useState<DonorSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  const [selectedDonors, setSelectedDonors] = useState<number[]>([]);

  // --- HÀM GỌI API /create_alert ---
   const handleSearchDonors = async () => {
       setIsLoading(true);
       setSearchError(null);
       setSearchResults([]);
       setSelectedDonors([]);

       const hospitalId = user?.id || 1; // Giả sử user.id là hospital_id

       const searchPayload = {
           hospital_id: hospitalId,
           blood_type: filters.bloodType,
           radius_km: parseInt(filters.radius, 10),
       };

       try {
           const response = await fetch('http://localhost:5000/create_alert', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(searchPayload),
           });

           const result = await response.json();
           if (!response.ok) throw new Error(result.error || `Lỗi ${response.status}`);

           setSearchResults(result.top_50_users || []);
           if (!result.top_50_users || result.top_50_users.length === 0) {
              toast.info("Không tìm thấy tình nguyện viên phù hợp.");
           } else {
              toast.success(`Tìm thấy ${result.top_50_users.length} tình nguyện viên.`);
           }

       } catch (error: any) {
           console.error("Search donors API call failed:", error);
           setSearchError(`Lỗi tìm kiếm: ${error.message}`);
           toast.error(`Lỗi tìm kiếm: ${error.message}`);
       } finally {
           setIsLoading(false);
       }
   };
   
  const handleSelectDonor = (checked: boolean | 'indeterminate', donorId: number) => {
    setSelectedDonors(prev => {
      if (checked) {
        return [...prev, donorId];
      } else {
        return prev.filter(id => id !== donorId);
      }
    });
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked) {
      setSelectedDonors(searchResults.map(result => result.user.id));
    } else {
      setSelectedDonors([]);
    }
  };

  // <<< THAY ĐỔI: Cập nhật nội dung tin nhắn
  const handleBulkContact = async () => {
    if (selectedDonors.length === 0) {
      toast.error("Vui lòng chọn ít nhất một người để gửi thông báo.");
      return;
    }

    setIsLoading(true);
    
    // --- TẠO TIN NHẮN ĐỘNG ---
    // 1. Lấy thông tin bệnh viện từ state
    const hospitalName = hospitalFormData.hospitalName || "Bệnh viện";
    const hospitalAddress = hospitalFormData.address || "địa chỉ bệnh viện (vui lòng xem trên website)";
    // 2. Lấy nhóm máu cần tìm từ bộ lọc
    const bloodTypeNeeded = filters.bloodType;

    // 3. Tạo nội dung tin nhắn
    const messageBody = `[GIOT AM] KHẨN CẤP! Bệnh viện ${hospitalName} đang cần gấp nhóm máu ${bloodTypeNeeded}. Nếu bạn sẵn sàng, xin vui lòng đến hiến máu tại: ${hospitalAddress}. Trân trọng cảm ơn!`;
    // --- KẾT THÚC TẠO TIN NHẮN ---

    try {
      const response = await fetch('http://localhost:5000/notify_donors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            donor_ids: selectedDonors,
            message: messageBody // Gửi nội dung tin nhắn mới
          }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Lỗi không xác định');

      toast.success(result.message || 'Đã gửi yêu cầu thông báo thành công.');
      setSelectedDonors([]);

    } catch (error: any) {
      console.error("Bulk notify API call failed:", error);
      toast.error(`Gửi thông báo thất bại: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHospitalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToUpdate = {
        name: hospitalFormData.hospitalName,
        address: hospitalFormData.address,
        phone: hospitalFormData.phone,
    };
    updateProfile({...dataToUpdate, id: user?.id}); 
    setIsEditing(false);
    toast.success('Cập nhật thông tin bệnh viện thành công!');
  };

  const handleHospitalChange = (field: string, value: string) => {
    setHospitalFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const isAllSelected = searchResults.length > 0 && selectedDonors.length === searchResults.length;
  // const isIndeterminate = selectedDonors.length > 0 && selectedDonors.length < searchResults.length;


  return (
    <div className="space-y-8">
      {/* Phần hiển thị/chỉnh sửa thông tin bệnh viện */}
      <div className="flex justify-between items-center">
        <h1>Tài khoản Bệnh viện</h1>
        {user?.name && !isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-[#930511] text-white hover:bg-[#7a0410]">Chỉnh sửa</Button>
        )}
      </div>
       <Card>
            <CardHeader>
                <CardTitle>{isEditing ? 'Cập nhật thông tin bệnh viện' : hospitalFormData.hospitalName || 'Thông tin bệnh viện'}</CardTitle>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <form onSubmit={handleHospitalSubmit} className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                            <Label htmlFor="hospitalName">Tên bệnh viện</Label>
                            <Input id="hospitalName" value={hospitalFormData.hospitalName} onChange={(e) => handleHospitalChange('hospitalName', e.target.value)} required className="mt-2"/>
                            </div>
                            <div className="md:col-span-2">
                            <Label htmlFor="hospitalAddress">Địa chỉ</Label>
                            <Input id="hospitalAddress" value={hospitalFormData.address} onChange={(e) => handleHospitalChange('address', e.target.value)} required className="mt-2"/>
                            </div>
                            <div>
                            <Label htmlFor="hospitalPhone">Số điện thoại</Label>
                            <Input id="hospitalPhone" type="tel" value={hospitalFormData.phone} onChange={(e) => handleHospitalChange('phone', e.target.value)} required className="mt-2"/>
                            </div>
                             <div>
                                <Label htmlFor="hospitalEmail">Email (Không thể thay đổi)</Label>
                                <Input id="hospitalEmail" type="email" value={hospitalFormData.email} readOnly disabled className="mt-2 bg-gray-100 cursor-not-allowed"/>
                             </div>
                        </div>
                        <div className="flex gap-4">
                            <Button type="submit" className="bg-[#930511] text-white hover:bg-[#7a0410]">Lưu thông tin</Button>
                            {user?.name && <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Hủy</Button>}
                        </div>
                    </form>
                ) : (
                     <div className="space-y-4">
                        <div><p className="text-sm text-gray-600">Địa chỉ</p><div className="flex items-start gap-2 mt-1"><MapPin className="w-4 h-4 mt-1 text-[#930511]" /> <p>{hospitalFormData.address || 'Chưa cập nhật'}</p></div></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><p className="text-sm text-gray-600">Số điện thoại</p><p className="mt-1">{hospitalFormData.phone || 'Chưa cập nhật'}</p></div>
                            <div><p className="text-sm text-gray-600">Email</p><p className="mt-1">{hospitalFormData.email}</p></div>
                        </div>
                     </div>
                )}
            </CardContent>
        </Card>


      {/* Phần tìm kiếm tình nguyện viên */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm tình nguyện viên hiến máu</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Chọn nhóm máu và bán kính để tìm người hiến máu phù hợp.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#FBF2E1] rounded-lg items-end">
              <div>
                <Label htmlFor="bloodTypeFilter">Nhóm máu cần tìm</Label>
                <Select value={filters.bloodType} onValueChange={(value) => handleFilterChange('bloodType', value)} required>
                  <SelectTrigger className="mt-2 bg-white" id="bloodTypeFilter">
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
                <Label htmlFor="radiusFilter">Bán kính (km)</Label>
                <Select value={filters.radius} onValueChange={(value) => handleFilterChange('radius', value)}>
                  <SelectTrigger className="mt-2 bg-white" id="radiusFilter">
                    <SelectValue placeholder="Chọn bán kính" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 5, 10, 15, 20].map(r => (
                        <SelectItem key={r} value={String(r)}>{r} km</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSearchDonors}
                disabled={isLoading}
                className="w-full md:w-auto bg-[#930511] text-white hover:bg-[#7a0410]"
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
              </Button>
            </div>

            {/* Error message */}
            {searchError && <p className="text-red-600">{searchError}</p>}

            {/* Thanh Chọn tất cả và Gửi hàng loạt */}
            {searchResults.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg bg-white">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="select-all"
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Chọn tất cả"
                  />
                  <Label htmlFor="select-all" className="font-medium cursor-pointer">
                    {isAllSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"} ({selectedDonors.length} / {searchResults.length})
                  </Label>
                </div>
                {/* <<< THAY ĐỔI: Đổi màu nút này sang màu đỏ chủ đạo */}
                <Button
                  onClick={handleBulkContact}
                  disabled={isLoading || selectedDonors.length === 0}
                  className="w-full sm:w-auto bg-[#930511] text-white hover:bg-[#7a0410]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Gửi thông báo cho ({selectedDonors.length}) người
                </Button>
              </div>
            )}


            {/* Donor List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {isLoading && <p>Đang tải danh sách...</p> }
              {!isLoading && searchResults.length === 0 && !searchError && (
                 <p className="text-center text-gray-500 py-4 italic">Chưa có kết quả tìm kiếm.</p>
              )}
              {!isLoading && searchResults.map((result) => (
                <div
                  key={result.user.id}
                  className={cn(
                    "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#FBF2E1] rounded-lg transition-all gap-3",
                    selectedDonors.includes(result.user.id) ? "ring-2 ring-[#930511] bg-[#fbe4e6]" : "hover:bg-[#f5e8ce]"
                  )}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <Checkbox
                      id={`donor-${result.user.id}`}
                      checked={selectedDonors.includes(result.user.id)}
                      onCheckedChange={(checked) => handleSelectDonor(checked, result.user.id)}
                      className="shrink-0"
                      aria-label={`Chọn ${result.user.name}`}
                    />
                    <Label htmlFor={`donor-${result.user.id}`} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#930511] rounded-full flex items-center justify-center text-white shrink-0">
                          <Droplet className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 text-sm sm:text-base">{result.user.name}</h3>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{result.user.phone}</span>
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* Thông tin phụ */}
                  <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0 sm:pl-4">
                    <div className="text-left sm:text-right flex-1 sm:flex-initial">
                       <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#930511] text-white rounded-full mb-1">
                          <Droplet className="w-3 h-3" />
                          <span className="text-xs font-medium">{result.user.blood_type}</span>
                       </div>
                       <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 justify-start sm:justify-end">
                          <MapPin className="w-3 h-3" />
                          <span>~{result.distance_km.toFixed(1)} km</span>
                          <span className="text-gray-400 text-xs">(AI: {result.ai_score.toFixed(2)})</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}