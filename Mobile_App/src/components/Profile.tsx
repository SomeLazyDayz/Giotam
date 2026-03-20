import { User, Heart, Award, Calendar, Settings, HelpCircle, LogOut, ChevronRight, ArrowLeft, Phone, Mail, MapPin, Edit, Bell, Lock, Globe, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { PageHeader } from './PageHeader';

interface ProfileProps {
  onLogout: () => void;
  onBack?: () => void;
}

export function Profile({ onLogout, onBack }: ProfileProps) {
  const [currentPage, setCurrentPage] = useState<string>('main');
  const [isEditing, setIsEditing] = useState(false);
  // Tạo khung dữ liệu trống ban đầu
  const [formData, setFormData] = useState({
    name: 'Đang tải...',
    bloodGroup: 'Chưa rõ',
    phone: 'Chưa cập nhật',
    email: 'Chưa cập nhật',
    address: 'Chưa cập nhật',
    dateOfBirth: '15/05/1995', // Database chưa có, tạm giữ nguyên
    gender: 'Nam',             // Database chưa có, tạm giữ nguyên
    weight: '65',              // Database chưa có, tạm giữ nguyên
    height: '170',             // Database chưa có, tạm giữ nguyên
    donationsCount: '0',
    rewardPoints: '0',
  });

  // Tự động lấy dữ liệu từ điện thoại ra khi mở màn hình
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Bơm dữ liệu thật vào khung
      setFormData(prev => ({
        ...prev,
        name: userData.name || 'Người hiến máu',
        bloodGroup: userData.blood_type || 'Chưa rõ',
        phone: userData.phone || 'Chưa cập nhật',
        email: userData.email || 'Chưa cập nhật',
        address: userData.address || 'Chưa cập nhật',
        donationsCount: userData.donations_count?.toString() || '0',
        rewardPoints: userData.reward_points?.toString() || '0'
      }));
    }
  }, []);

  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: false,
    language: 'vi',
  });

  const userStats = [
    { label: 'Lần hiến', value: formData.donationsCount, icon: Heart },
    { label: 'Điểm thưởng', value: formData.rewardPoints, icon: Award },
    { label: 'Ngày tham gia', value: '06/2023', icon: Calendar },
  ];

  const menuItems = [
    {
      icon: User,
      label: 'Thông tin cá nhân',
      description: 'Cập nhật hồ sơ của bạn',
      page: 'personal-info',
    },
    {
      icon: Heart,
      label: 'Lịch sử hiến máu',
      description: 'Xem các lần hiến máu trước đây',
      page: 'history',
    },
    {
      icon: Award,
      label: 'Huy hiệu & Thành tích',
      description: 'Các danh hiệu đã đạt được',
      page: 'achievements',
    },
    {
      icon: Settings,
      label: 'Cài đặt',
      description: 'Tùy chỉnh ứng dụng',
      page: 'settings',
    },
    {
      icon: HelpCircle,
      label: 'Trợ giúp & Hỗ trợ',
      description: 'Câu hỏi thường gặp',
      page: 'help',
    },
  ];

  const donationHistory = [
    { date: '15/12/2025', location: 'Bệnh viện Chợ Rẫy', type: 'Hiến máu toàn phần', amount: '350ml', status: 'Hoàn thành' },
    { date: '15/09/2025', location: 'Viện Huyết học Truyền máu TW', type: 'Hiến tiểu cầu', amount: '450ml', status: 'Hoàn thành' },
    { date: '15/06/2025', location: 'Bệnh viện Nhân dân 115', type: 'Hiến máu toàn phần', amount: '350ml', status: 'Hoàn thành' },
    { date: '15/03/2025', location: 'Bệnh viện Đại học Y Dược', type: 'Hiến máu toàn phần', amount: '350ml', status: 'Hoàn thành' },
    { date: '15/12/2024', location: 'Bệnh viện Chợ Rẫy', type: 'Hiến tiểu cầu', amount: '450ml', status: 'Hoàn thành' },
  ];

  const achievements = [
    {
      title: 'Người hùng hiến máu',
      description: 'Hiến máu lần đầu tiên',
      date: '06/2023',
      icon: '🏅',
      unlocked: true,
    },
    {
      title: 'Chiến binh cứu người',
      description: 'Hiến máu 5 lần',
      date: '03/2025',
      icon: '⭐',
      unlocked: true,
    },
    {
      title: 'Anh hùng máu vàng',
      description: 'Hiến máu 10 lần',
      date: null,
      icon: '🏆',
      unlocked: false,
    },
    {
      title: 'Thiên thần cứu trợ',
      description: 'Hiến tiểu cầu 3 lần',
      date: '09/2025',
      icon: '👼',
      unlocked: true,
    },
    {
      title: 'Đại sứ nhân đạo',
      description: 'Giới thiệu 5 người tham gia hiến máu',
      date: null,
      icon: '💎',
      unlocked: false,
    },
  ];

  const faqItems = [
    {
      question: 'Tôi cần chuẩn bị gì trước khi hiến máu?',
      answer: 'Bạn nên ăn uống đầy đủ, ngủ nghỉ tốt trước khi hiến máu. Mang theo CCCD/CMND và uống đủ nước.',
    },
    {
      question: 'Sau bao lâu tôi có thể hiến máu lại?',
      answer: 'Sau khi hiến máu toàn phần, bạn cần nghỉ ít nhất 12 tuần (3 tháng) trước khi hiến lại. Với hiến tiểu cầu, thời gian này là 2 tuần.',
    },
    {
      question: 'Tôi có được nhận gì khi hiến máu?',
      answer: 'Bạn sẽ nhận được giấy chứng nhận hiến máu, điểm thưởng tích lũy và các huy hiệu thành tích. Quan trọng nhất là bạn đã cứu sống người khác!',
    },
    {
      question: 'Làm sao để liên hệ với đội ngũ hỗ trợ?',
      answer: 'Bạn có thể liên hệ qua email: support@giotam.vn hoặc hotline: 1900 xxxx (8:00 - 20:00 hàng ngày).',
    },
    {
      question: 'Dữ liệu của tôi có được bảo mật không?',
      answer: 'Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của bạn theo Chính sách quyền riêng tư và quy định của pháp luật Việt Nam.',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saved data:', formData);
  };

  const handleSettingToggle = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    });
  };

  // Render different pages
  const renderPage = () => {
    switch (currentPage) {
      case 'personal-info':
        return renderPersonalInfo();
      case 'history':
        return renderHistory();
      case 'achievements':
        return renderAchievements();
      case 'settings':
        return renderSettings();
      case 'help':
        return renderHelp();
      default:
        return renderMain();
    }
  };

  const renderMain = () => (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground pt-8 pb-20 px-4">
        <h1 className="text-xl font-bold mb-6">Tài khoản</h1>

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-destructive" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">{formData.name}</h2>
              <p className="text-destructive-foreground/90 text-sm">Nhóm máu: {formData.bloodGroup}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-12">
        <div className="bg-card rounded-2xl shadow-lg p-4">
          <div className="grid grid-cols-3 gap-4">
            {userStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-destructive" />
                  <div className="font-bold text-xl text-card-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Blood Donation Card */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-br from-destructive to-destructive/80 rounded-2xl p-6 text-destructive-foreground shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm opacity-90 mb-1">Thẻ hiến máu điện tử</div>
              <div className="font-bold text-2xl">{formData.bloodGroup}</div>
            </div>
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="opacity-90">Mã số:</span>
              <span className="font-medium">HD2023-00847</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Lần hiến gần nhất:</span>
              <span className="font-medium">15/12/2025</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Có thể hiến tiếp:</span>
              <span className="font-medium">15/03/2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-6">
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => setCurrentPage(item.page)}
                className="w-full p-4 flex items-center space-x-4 hover:bg-accent transition-colors border-b border-border last:border-b-0"
              >
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-card-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-6">
        <button className="w-full bg-card rounded-2xl p-4 flex items-center justify-center space-x-2 text-destructive font-medium shadow-sm hover:bg-accent transition-colors" onClick={onLogout}>
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>

      {/* Version */}
      <div className="text-center mt-6 text-xs text-muted-foreground mb-20">
        Version 1.0.0
      </div>
    </>
  );

  const renderPersonalInfo = () => (
    <>
      {/* Header with Back Button */}
      <div className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground pt-8 pb-6 px-4">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentPage('main')} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Thông tin cá nhân</h1>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 mt-6">
        <div className="bg-card rounded-2xl shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-card-foreground">Hồ sơ của tôi</h2>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="text-destructive text-sm flex items-center gap-1">
                <Edit className="w-4 h-4" />
                Chỉnh sửa
              </button>
            ) : (
              <button onClick={handleSave} className="text-destructive text-sm flex items-center gap-1">
                <Check className="w-4 h-4" />
                Lưu
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Họ và tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground disabled:opacity-60"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Ngày sinh</label>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground disabled:opacity-60"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Giới tính</label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1">Nhóm máu</label>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground disabled:opacity-60"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Cân nặng (kg)</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground disabled:opacity-60"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Chiều cao (cm)</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1 flex items-center gap-1">
                <Phone className="w-4 h-4" />
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground disabled:opacity-60"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground disabled:opacity-60"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground disabled:opacity-60"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderHistory = () => (
    <>
      {/* Header with Back Button */}
      <div className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground pt-8 pb-6 px-4">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentPage('main')} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Lịch sử hiến máu</h1>
        </div>
      </div>

      {/* History List */}
      <div className="px-4 mt-6">
        <div className="space-y-4">
          {donationHistory.map((donation, index) => (
            <div key={index} className="bg-card rounded-xl shadow-sm p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-bold text-card-foreground">{donation.type}</h3>
                    <p className="text-sm text-muted-foreground">{donation.date}</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {donation.status}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Địa điểm:</span>
                  <span className="text-card-foreground">{donation.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số lượng:</span>
                  <span className="text-card-foreground font-medium">{donation.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Stats */}
        <div className="mt-6 bg-gradient-to-br from-destructive to-destructive/80 rounded-2xl p-6 text-destructive-foreground shadow-lg">
          <h3 className="font-bold mb-4">Tổng kết</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold">8 lần</div>
              <div className="text-sm opacity-90">Tổng số lần hiến</div>
            </div>
            <div>
              <div className="text-2xl font-bold">2,100ml</div>
              <div className="text-sm opacity-90">Tổng lượng máu</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderAchievements = () => (
    <>
      {/* Header with Back Button */}
      <div className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground pt-8 pb-6 px-4">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentPage('main')} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Huy hiệu & Thành tích</h1>
        </div>
      </div>

      {/* Achievements List */}
      <div className="px-4 mt-6">
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`bg-card rounded-xl shadow-sm p-4 ${!achievement.unlocked && 'opacity-50'}`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-card-foreground mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  {achievement.unlocked ? (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600">Đã đạt được • {achievement.date}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Chưa mở khóa</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Card */}
        <div className="mt-6 bg-gradient-to-br from-destructive to-destructive/80 rounded-2xl p-6 text-destructive-foreground shadow-lg">
          <h3 className="font-bold mb-2">Tiến độ của bạn</h3>
          <p className="text-sm opacity-90 mb-4">Bạn đã mở khóa 4/5 huy hiệu</p>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-white rounded-full h-2" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>
    </>
  );

  const renderSettings = () => (
    <>
      {/* Header with Back Button */}
      <div className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground pt-8 pb-6 px-4">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentPage('main')} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Cài đặt</h1>
        </div>
      </div>

      {/* Settings List */}
      <div className="px-4 mt-6">
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {/* Notifications */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-destructive" />
                <div>
                  <div className="font-medium text-card-foreground">Thông báo đẩy</div>
                  <div className="text-xs text-muted-foreground">Nhận thông báo về đợt hiến máu</div>
                </div>
              </div>
              <button
                onClick={() => handleSettingToggle('notifications')}
                className={`w-12 h-6 rounded-full transition-colors ${settings.notifications ? 'bg-destructive' : 'bg-gray-300'
                  }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-destructive" />
                <div>
                  <div className="font-medium text-card-foreground">Thông báo email</div>
                  <div className="text-xs text-muted-foreground">Nhận email về hoạt động</div>
                </div>
              </div>
              <button
                onClick={() => handleSettingToggle('emailNotifications')}
                className={`w-12 h-6 rounded-full transition-colors ${settings.emailNotifications ? 'bg-destructive' : 'bg-gray-300'
                  }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-destructive" />
                <div>
                  <div className="font-medium text-card-foreground">Ngôn ngữ</div>
                  <div className="text-xs text-muted-foreground">Tiếng Việt</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Privacy */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-destructive" />
                <div>
                  <div className="font-medium text-card-foreground">Quyền riêng tư</div>
                  <div className="text-xs text-muted-foreground">Quản lý dữ liệu cá nhân</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-6 bg-card rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-card-foreground mb-3">Vùng nguy hiểm</h3>
          <button className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-100 transition-colors">
            Xóa tài khoản
          </button>
        </div>
      </div>
    </>
  );

  const renderHelp = () => (
    <>
      {/* Header with Back Button */}
      <div className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground pt-8 pb-6 px-4">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentPage('main')} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Trợ giúp & Hỗ trợ</h1>
        </div>
      </div>

      {/* FAQ */}
      <div className="px-4 mt-6">
        <h2 className="font-bold text-card-foreground mb-4">Câu hỏi thường gặp</h2>
        <div className="space-y-3">
          {faqItems.map((faq, index) => (
            <details key={index} className="bg-card rounded-xl shadow-sm overflow-hidden">
              <summary className="p-4 cursor-pointer font-medium text-card-foreground hover:bg-accent transition-colors">
                {faq.question}
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-6 bg-gradient-to-br from-destructive to-destructive/80 rounded-2xl p-6 text-destructive-foreground shadow-lg">
          <h3 className="font-bold mb-4">Liên hệ với chúng tôi</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>support@giotam.vn</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span>1900 xxxx (8:00 - 20:00)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-full bg-muted pb-6">
      {renderPage()}
    </div>
  );
}