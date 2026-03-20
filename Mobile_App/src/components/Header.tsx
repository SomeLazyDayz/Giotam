import { Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <div className="bg-destructive text-destructive-foreground px-4 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C10 0 0 8 0 14C0 19.5228 4.47715 24 10 24C15.5228 24 20 19.5228 20 14C20 8 10 0 10 0Z" fill="#930510"/>
          </svg>
        </div>
        <span className="font-bold text-xl">Giọt Ấm</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button
          onClick={onMenuClick}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}