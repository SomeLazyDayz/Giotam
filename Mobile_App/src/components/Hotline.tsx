import { Phone, MapPin, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface HotlineProps {
  onBack?: () => void;
}

export function Hotline({ onBack }: HotlineProps = {}) {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Số điện thoại',
      items: ['+84 987 123 418', '+84 901 234 567'],
    },
    {
      icon: Mail,
      title: 'Email',
      items: ['giotam@gmail.com', 'support@giotam.vn'],
    },
    {
      icon: MapPin,
      title: 'Địa chỉ',
      items: ['268 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM'],
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      items: ['Thứ 2 - Thứ 6: 8:00 - 17:00', 'Thứ 7 - Chủ nhật: 8:00 - 12:00'],
    },
  ];

  return (
    <div className="min-h-full bg-background">
      <PageHeader title="Hotline hỗ trợ" onBack={onBack || (() => {})} />
      
      {/* Main Content Card */}
      <div className="px-4 pt-4 pb-20">
        <p className="text-sm text-foreground/70 mb-6">
          Liên hệ với chúng tôi để được hỗ trợ 24/7
        </p>

        {/* Emergency Hotline */}
        <div className="bg-gradient-to-br from-destructive to-destructive/80 rounded-3xl p-6 shadow-xl mb-6 text-destructive-foreground">
          <div className="text-center">
            <Phone className="w-12 h-12 mx-auto mb-3" />
            <div className="text-sm opacity-80 mb-2">Đường dây nóng</div>
            <a href="tel:+84987123418" className="text-3xl font-bold block mb-2">
              +84 987 123 418
            </a>
            <div className="text-xs opacity-80">
              Hỗ trợ khẩn cấp 24/7
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-2">{info.title}</h3>
                    {info.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-foreground/70">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-border mb-6">
          <h3 className="font-bold text-foreground mb-3">Theo dõi chúng tôi</h3>
          <div className="flex gap-3">
            <button className="flex-1 h-12 rounded-xl bg-destructive/10 flex items-center justify-center gap-2 hover:bg-destructive/20 transition-colors">
              <Facebook className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium text-destructive">Facebook</span>
            </button>
            <button className="flex-1 h-12 rounded-xl bg-destructive/10 flex items-center justify-center gap-2 hover:bg-destructive/20 transition-colors">
              <Instagram className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium text-destructive">Instagram</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="bg-white border-2 border-destructive text-destructive p-4 rounded-2xl shadow-sm font-bold hover:bg-destructive/5 transition-colors">
            <Phone className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm">Gọi ngay</span>
          </button>
          <button className="bg-white border-2 border-destructive text-destructive p-4 rounded-2xl shadow-sm font-bold hover:bg-destructive/5 transition-colors">
            <Mail className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm">Gửi email</span>
          </button>
        </div>
      </div>
    </div>
  );
}