import { X, Heart } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl max-w-sm w-full max-h-[85vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors z-10"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        <div className="p-5">
          {/* Header */}
          <h2 className="text-xl font-bold text-foreground text-center mb-1">
            Quyên góp ủng hộ
          </h2>
          <p className="text-xs text-muted-foreground text-center mb-4">
            Mỗi đóng góp của bạn đều góp phần giúp chúng tôi lan tỏa thông điệp hiến máu nhân đạo
          </p>

          {/* QR Code Section */}
          <div className="bg-muted rounded-xl p-4 mb-4">
            <div className="bg-card rounded-lg p-4 flex items-center justify-center mb-2">
              {/* QR Code Placeholder - Using a simple grid pattern */}
              <div className="w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Simple QR-like pattern */}
                  <rect x="0" y="0" width="20" height="20" fill="black"/>
                  <rect x="5" y="5" width="10" height="10" fill="white"/>
                  <rect x="25" y="0" width="5" height="5" fill="black"/>
                  <rect x="30" y="0" width="5" height="5" fill="black"/>
                  <rect x="35" y="0" width="5" height="5" fill="black"/>
                  <rect x="40" y="0" width="5" height="5" fill="black"/>
                  <rect x="50" y="0" width="5" height="5" fill="black"/>
                  <rect x="55" y="5" width="5" height="5" fill="black"/>
                  <rect x="80" y="0" width="20" height="20" fill="black"/>
                  <rect x="85" y="5" width="10" height="10" fill="white"/>
                  
                  <rect x="0" y="5" width="5" height="5" fill="black"/>
                  <rect x="15" y="5" width="5" height="5" fill="black"/>
                  <rect x="25" y="5" width="5" height="5" fill="black"/>
                  <rect x="40" y="5" width="5" height="5" fill="black"/>
                  <rect x="50" y="5" width="5" height="5" fill="black"/>
                  <rect x="80" y="5" width="5" height="5" fill="black"/>
                  <rect x="95" y="5" width="5" height="5" fill="black"/>
                  
                  <rect x="0" y="10" width="5" height="5" fill="black"/>
                  <rect x="5" y="10" width="5" height="5" fill="black"/>
                  <rect x="10" y="10" width="5" height="5" fill="black"/>
                  <rect x="15" y="10" width="5" height="5" fill="black"/>
                  <rect x="30" y="10" width="5" height="5" fill="black"/>
                  <rect x="45" y="10" width="5" height="5" fill="black"/>
                  <rect x="60" y="10" width="5" height="5" fill="black"/>
                  <rect x="65" y="10" width="5" height="5" fill="black"/>
                  <rect x="80" y="10" width="5" height="5" fill="black"/>
                  <rect x="85" y="10" width="5" height="5" fill="black"/>
                  <rect x="90" y="10" width="5" height="5" fill="black"/>
                  <rect x="95" y="10" width="5" height="5" fill="black"/>
                  
                  <rect x="0" y="15" width="5" height="5" fill="black"/>
                  <rect x="5" y="15" width="5" height="5" fill="black"/>
                  <rect x="10" y="15" width="5" height="5" fill="black"/>
                  <rect x="15" y="15" width="5" height="5" fill="black"/>
                  <rect x="35" y="15" width="5" height="5" fill="black"/>
                  <rect x="50" y="15" width="5" height="5" fill="black"/>
                  <rect x="70" y="15" width="5" height="5" fill="black"/>
                  <rect x="80" y="15" width="5" height="5" fill="black"/>
                  <rect x="85" y="15" width="5" height="5" fill="black"/>
                  <rect x="90" y="15" width="5" height="5" fill="black"/>
                  <rect x="95" y="15" width="5" height="5" fill="black"/>
                  
                  <rect x="0" y="20" width="5" height="5" fill="black"/>
                  <rect x="15" y="20" width="5" height="5" fill="black"/>
                  <rect x="40" y="20" width="5" height="5" fill="black"/>
                  <rect x="60" y="20" width="5" height="5" fill="black"/>
                  <rect x="65" y="20" width="5" height="5" fill="black"/>
                  <rect x="80" y="20" width="5" height="5" fill="black"/>
                  <rect x="95" y="20" width="5" height="5" fill="black"/>
                  
                  <rect x="0" y="25" width="20" height="20" fill="black"/>
                  <rect x="5" y="30" width="10" height="10" fill="white"/>
                  <rect x="25" y="25" width="5" height="5" fill="black"/>
                  <rect x="35" y="25" width="5" height="5" fill="black"/>
                  <rect x="45" y="25" width="5" height="5" fill="black"/>
                  <rect x="50" y="25" width="5" height="5" fill="black"/>
                  <rect x="55" y="25" width="5" height="5" fill="black"/>
                  <rect x="65" y="25" width="5" height="5" fill="black"/>
                  <rect x="75" y="25" width="5" height="5" fill="black"/>
                  <rect x="95" y="25" width="5" height="5" fill="black"/>
                  
                  <rect x="30" y="30" width="5" height="5" fill="black"/>
                  <rect x="40" y="30" width="5" height="5" fill="black"/>
                  <rect x="50" y="30" width="5" height="5" fill="black"/>
                  <rect x="60" y="30" width="5" height="5" fill="black"/>
                  <rect x="70" y="30" width="5" height="5" fill="black"/>
                  <rect x="80" y="30" width="5" height="5" fill="black"/>
                  <rect x="85" y="30" width="5" height="5" fill="black"/>
                  <rect x="90" y="30" width="5" height="5" fill="black"/>
                  
                  <rect x="25" y="35" width="5" height="5" fill="black"/>
                  <rect x="30" y="35" width="5" height="5" fill="black"/>
                  <rect x="35" y="35" width="5" height="5" fill="black"/>
                  <rect x="45" y="35" width="5" height="5" fill="black"/>
                  <rect x="60" y="35" width="5" height="5" fill="black"/>
                  <rect x="75" y="35" width="5" height="5" fill="black"/>
                  <rect x="95" y="35" width="5" height="5" fill="black"/>
                  
                  <rect x="25" y="40" width="5" height="5" fill="black"/>
                  <rect x="30" y="40" width="5" height="5" fill="black"/>
                  <rect x="35" y="40" width="5" height="5" fill="black"/>
                  <rect x="40" y="40" width="5" height="5" fill="black"/>
                  <rect x="45" y="40" width="5" height="5" fill="black"/>
                  <rect x="60" y="40" width="5" height="5" fill="black"/>
                  <rect x="75" y="40" width="5" height="5" fill="black"/>
                  <rect x="85" y="40" width="5" height="5" fill="black"/>
                  <rect x="90" y="40" width="5" height="5" fill="black"/>
                  <rect x="95" y="40" width="5" height="5" fill="black"/>
                  
                  <rect x="50" y="45" width="5" height="5" fill="black"/>
                  <rect x="55" y="45" width="5" height="5" fill="black"/>
                  <rect x="60" y="45" width="5" height="5" fill="black"/>
                </svg>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Quét mã QR để quyên góp
            </p>
          </div>

          {/* Bank Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-destructive" fill="currentColor" />
              <h3 className="font-bold text-foreground">Thông tin chuyển khoản</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Ngân hàng:</span>
                <span className="text-sm font-medium text-foreground">Vietcombank</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Số tài khoản:</span>
                <span className="text-sm font-medium text-foreground">1234567890</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Chủ tài khoản:</span>
                <span className="text-sm font-medium text-foreground">Tổ chức Giọt Ấm</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Nội dung:</span>
                <span className="text-sm font-medium text-destructive">Ung ho Giot Am</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm italic text-muted-foreground">
              Cảm ơn tấm lòng hảo tâm của quý vị! 🙏
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}