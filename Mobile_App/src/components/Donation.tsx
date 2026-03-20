import { CreditCard, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from './PageHeader';

interface DonationProps {
  onBack?: () => void;
}

export function Donation({ onBack }: DonationProps = {}) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankInfo = {
    bankName: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
    accountNumber: '1234567890',
    accountName: 'QUỸ HIẾN MÁU NHÂN ĐẠO GIỌT ẤM',
    branch: 'Chi nhánh TP. Hồ Chí Minh',
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-full bg-background">
      <PageHeader title="Quyên góp ủng hộ" onBack={onBack || (() => {})} />
      
      {/* Main Content Card */}
      <div className="px-4 pt-4 pb-20">
        <p className="text-sm text-foreground/70 mb-6">
          Mọi đóng góp của bạn sẽ giúp chúng tôi lan tỏa thông điệp nhân đạo đến nhiều người hơn
        </p>

        {/* Bank Card */}
        <div className="bg-gradient-to-br from-destructive to-destructive/80 rounded-3xl p-6 shadow-xl mb-6 text-destructive-foreground">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs opacity-80">Chuyển khoản ngân hàng</div>
                <div className="font-bold text-lg">Vietcombank</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Account Number */}
            <div>
              <div className="text-xs opacity-80 mb-1">Số tài khoản</div>
              <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="font-bold text-xl tracking-wider">{bankInfo.accountNumber}</div>
                <button
                  onClick={() => handleCopy(bankInfo.accountNumber, 'account')}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {copiedField === 'account' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Account Name */}
            <div>
              <div className="text-xs opacity-80 mb-1">Chủ tài khoản</div>
              <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="font-bold">{bankInfo.accountName}</div>
                <button
                  onClick={() => handleCopy(bankInfo.accountName, 'name')}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {copiedField === 'name' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-border mb-6">
          <h3 className="font-bold text-foreground mb-3">Thông tin chi tiết</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-foreground/70">Ngân hàng:</span>
              <span className="font-medium text-foreground text-right flex-1 ml-4">{bankInfo.bankName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-foreground/70">Chi nhánh:</span>
              <span className="font-medium text-foreground">{bankInfo.branch}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-foreground/70">Nội dung:</span>
              <span className="font-medium text-foreground">Ung ho Giot Am [Ten cua ban]</span>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border mb-6">
          <h3 className="font-bold text-foreground mb-3 text-center">Quét mã QR để chuyển khoản</h3>
          <div className="w-48 h-48 bg-gray-200 rounded-xl mx-auto flex items-center justify-center">
            <span className="text-gray-400 text-sm">QR Code</span>
          </div>
          <p className="text-xs text-center text-foreground/60 mt-3">
            Sử dụng app ngân hàng để quét mã QR
          </p>
        </div>

        {/* Note */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 mb-6">
          <h4 className="font-bold text-destructive text-sm mb-2">Lưu ý:</h4>
          <ul className="text-xs text-foreground/70 space-y-1">
            <li>• Vui lòng ghi rõ nội dung chuyển khoản để chúng tôi có thể xác nhận</li>
            <li>• Mọi khoản đóng góp đều được công khai minh bạch</li>
            <li>• Chúng tôi sẽ gửi email xác nhận sau khi nhận được đóng góp</li>
          </ul>
        </div>

        <div className="text-center pb-6">
          <p className="text-sm text-foreground/60">
            Cảm ơn sự đóng góp của bạn! ❤️
          </p>
        </div>
      </div>
    </div>
  );
}