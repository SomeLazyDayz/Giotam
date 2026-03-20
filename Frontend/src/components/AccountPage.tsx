import { useState } from "react";
import { User, Mail, Phone, MapPin, Droplet, Calendar, Heart, LogOut } from "lucide-react";

interface AccountPageProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function AccountPage({ onLogout, onNavigate }: AccountPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Nguyễn Văn A",
    phone: "0987654321",
    email: "nguyenvana@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    healthInsuranceId: "BH123456789",
    bloodType: "O+"
  });

  // Mock donation history
  const donationHistory = [
    {
      id: 1,
      date: "15/09/2025",
      location: "Bệnh viện Chợ Rẫy",
      amount: "350ml",
      bloodType: "O+"
    },
    {
      id: 2,
      date: "20/07/2025",
      location: "Trung tâm Truyền máu TP.HCM",
      amount: "400ml",
      bloodType: "O+"
    },
    {
      id: 3,
      date: "05/05/2025",
      location: "Bệnh viện Đại học Y Dược",
      amount: "350ml",
      bloodType: "O+"
    },
    {
      id: 4,
      date: "12/02/2025",
      location: "Bệnh viện Chợ Rẫy",
      amount: "400ml",
      bloodType: "O+"
    }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Thông tin đã được cập nhật!");
  };

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
      onLogout();
      onNavigate("home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF2E1] to-[#f5e6d3] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#930511] to-[#7a0410] text-white p-8 rounded-xl shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-[#930511]" />
              </div>
              <div>
                <h1 className="mb-2">{profileData.fullName}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-5 h-5" />
                    <span>Nhóm máu: {profileData.bloodType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span>{donationHistory.length} lần hiến máu</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 transition-all rounded-lg shadow-md hover:shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#930511]">Thông tin cá nhân</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-[#930511] text-white hover:bg-[#7a0410] transition-all rounded-lg shadow-md hover:shadow-lg"
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">Họ và tên</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">Số điện thoại</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">Nhóm máu</label>
                    <div className="relative">
                      <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={profileData.bloodType}
                        onChange={(e) => handleChange("bloodType", e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511] disabled:opacity-60"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">Địa chỉ</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">Số thẻ bảo hiểm y tế</label>
                    <input
                      type="text"
                      value={profileData.healthInsuranceId}
                      onChange={(e) => handleChange("healthInsuranceId", e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 bg-[#FBF2E1] focus:outline-none focus:border-[#930511] disabled:opacity-60"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#930511] text-white hover:bg-[#7a0410] transition-all rounded-lg shadow-md hover:shadow-lg"
                    >
                      Lưu thay đổi
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 bg-gray-500 text-white hover:bg-gray-600 transition-all rounded-lg shadow-md hover:shadow-lg"
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-xl mb-6 border border-gray-100">
              <h3 className="mb-4 text-[#930511]">Thống kê</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-[#FBF2E1] to-[#f5e6d3] rounded-lg shadow-sm">
                  <div className="text-[#930511] mb-1">Tổng số lần hiến</div>
                  <div className="text-gray-700">{donationHistory.length} lần</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#FBF2E1] to-[#f5e6d3] rounded-lg shadow-sm">
                  <div className="text-[#930511] mb-1">Tổng lượng máu</div>
                  <div className="text-gray-700">1,450ml</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#FBF2E1] to-[#f5e6d3] rounded-lg shadow-sm">
                  <div className="text-[#930511] mb-1">Lần hiến gần nhất</div>
                  <div className="text-gray-700">15/09/2025</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#FBF2E1] to-[#f5e6d3] rounded-lg shadow-sm">
                  <div className="text-[#930511] mb-1">Có thể hiến lại</div>
                  <div className="text-gray-700">15/12/2025</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#930511] to-[#7a0410] text-white p-6 rounded-xl shadow-xl border border-[#7a0410]">
              <h3 className="mb-4">Hiến máu tiếp theo</h3>
              <p className="mb-4 opacity-95 leading-relaxed">
                Cảm ơn bạn đã là một phần của cộng đồng hiến máu. Bạn có thể hiến máu tiếp vào ngày 15/12/2025.
              </p>
              <button className="w-full px-4 py-2 bg-white text-[#930511] hover:bg-gray-100 transition-all rounded-lg shadow-md hover:shadow-lg">
                Đặt lịch hiến máu
              </button>
            </div>
          </div>
        </div>

        {/* Donation History */}
        <div className="mt-8 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
          <h2 className="mb-6 text-[#930511]">Lịch sử hiến máu</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4">Ngày hiến</th>
                  <th className="text-left py-4 px-4">Địa điểm</th>
                  <th className="text-left py-4 px-4">Lượng máu</th>
                  <th className="text-left py-4 px-4">Nhóm máu</th>
                </tr>
              </thead>
              <tbody>
                {donationHistory.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-[#FBF2E1] hover:to-[#f5e6d3] transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {donation.date}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{donation.location}</td>
                    <td className="py-4 px-4 text-gray-700">{donation.amount}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-[#930511] to-[#7a0410] text-white rounded-full shadow-md">
                        {donation.bloodType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
