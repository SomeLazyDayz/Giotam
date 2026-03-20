import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { Button } from './ui/button';

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-full bg-muted pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <h1 className="text-xl font-bold text-destructive uppercase">Thông tin liên hệ</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Contact Information Cards */}
        <div className="space-y-3">
          {/* Address */}
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-destructive-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Địa chỉ</h3>
                <p className="text-sm text-foreground">
                  268 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-destructive-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Số điện thoại</h3>
                <p className="text-sm text-foreground">+84 987 123 418</p>
                <p className="text-sm text-foreground">+84 901 234 567</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-destructive-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Email</h3>
                <p className="text-sm text-foreground">giotam@gmail.com</p>
                <p className="text-sm text-foreground">support@giotam.vn</p>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-destructive-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Giờ làm việc</h3>
                <p className="text-sm text-foreground">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                <p className="text-sm text-foreground">Thứ 7 - Chủ nhật: 8:00 - 12:00</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <h3 className="font-bold text-foreground mb-3">Theo dõi chúng tôi</h3>
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/90 transition-colors">
                <Facebook className="w-6 h-6 text-destructive-foreground" />
              </button>
              <button className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/90 transition-colors">
                <Instagram className="w-6 h-6 text-destructive-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-destructive/30">
          <h2 className="font-bold text-destructive uppercase mb-4">Gửi tin nhắn cho chúng tôi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Họ và tên <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên của bạn"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/50"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Số điện thoại
              </label>
              <input
                type="tel"
                placeholder="Nhập số điện thoại của bạn"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/50"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Tin nhắn <span className="text-destructive">*</span>
              </label>
              <textarea
                placeholder="Nhập nội dung tin nhắn"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/50 resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-3 text-base"
            >
              Gửi tin nhắn
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
