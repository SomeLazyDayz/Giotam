import { X, Settings, Globe, LogOut, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onProfileClick?: () => void;
}

export function SettingsMenu({ isOpen, onClose, onLogout, onProfileClick }: SettingsMenuProps) {
  const [userName, setUserName] = useState('Đang tải...');

  useEffect(() => {
    if (isOpen) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUserName(userData.name || 'Người dùng');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = () => {
    onClose();
    onLogout();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-[340px] bg-[#F5F1E8] z-50 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-white p-4 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          {/* User Badge */}
          <div className="absolute top-4 left-4 bg-[#FFD700] text-foreground px-3 py-1 rounded-full text-sm font-bold">
            5G
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 mt-12">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-lg">{userName.toUpperCase()}</h3>
              <button 
                onClick={() => {
                  if (onProfileClick) onProfileClick();
                }}
                className="text-destructive text-sm font-medium flex items-center gap-1 hover:underline"
              >
                Hồ sơ người dùng
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {/* Cấu hình */}
          <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-destructive" />
              </div>
              <span className="font-medium text-foreground">Cấu hình</span>
            </div>
            <ChevronRight className="w-5 h-5 text-foreground/40" />
          </button>

          {/* Cài đặt */}
          <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Cài đặt</span>
                <span className="bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  NEW
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-foreground/40" />
          </button>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3 bg-white border-t border-border">
          {/* Language */}
          <button className="w-full bg-[#F5F1E8] rounded-2xl p-4 flex items-center justify-between hover:bg-[#EBE7DE] transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-foreground" />
              <span className="font-medium text-foreground">Ngôn ngữ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-destructive font-medium">Tiếng Việt</span>
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <rect fill="#DA251D" width="36" height="36"/>
                  <polygon fill="#FFCD05" points="18,7 20.4,14.7 28.5,14.7 21.9,19.5 24.3,27.2 18,22.4 11.7,27.2 14.1,19.5 7.5,14.7 15.6,14.7"/>
                </svg>
              </div>
            </div>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full bg-[#F5F1E8] rounded-2xl p-4 flex items-center gap-3 hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5 text-destructive" />
            <span className="font-medium text-destructive">Đăng xuất</span>
          </button>

          {/* Version */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/60 font-medium">v28.5.61 (5)</span>
            <button className="bg-destructive text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-destructive/90 transition-colors">
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
}