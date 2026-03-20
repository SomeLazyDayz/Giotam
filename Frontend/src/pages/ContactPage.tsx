import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FBF2E1]" style={{ fontFamily: 'Times New Roman, serif' }}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#930511] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 text-white text-4xl font-bold uppercase">Liên hệ với chúng tôi</h1>
          <p className="text-lg">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với GIỌT ẤM để được tư vấn!
          </p>
        </div>
      </section>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Contact Information */}
            <div className="space-y-6">
              <h2 className="text-[#930511] mb-8 text-3xl font-bold uppercase">Thông tin liên hệ</h2>

              {/* Address Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#930511] rounded-full flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[#930511] mb-2">Địa chỉ</h3>
                    <p>268 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM</p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#930511] rounded-full flex items-center justify-center text-white shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[#930511] mb-2">Số điện thoại</h3>
                    <p>+84 987 123 418</p>
                    <p>+84 901 234 567</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#930511] rounded-full flex items-center justify-center text-white shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[#930511] mb-2">Email</h3>
                    <p>bloodgroup@gmail.com</p>
                    <p>support@bloodplus.vn</p>
                  </div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#930511] rounded-full flex items-center justify-center text-white shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[#930511] mb-2">Giờ làm việc</h3>
                    <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                    <p>Thứ 7 - Chủ nhật: 8:00 - 12:00</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-[#930511] mb-4">Theo dõi chúng tôi</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#930511] rounded-full flex items-center justify-center text-white hover:bg-[#7a0410] transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#930511] rounded-full flex items-center justify-center text-white hover:bg-[#7a0410] transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-[#930511] mb-6 text-2xl font-bold uppercase">Gửi tin nhắn cho chúng tôi</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-[#930511]">
                      Họ và tên <span className="text-[#930511]">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Nhập họ và tên của bạn"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="mt-2 bg-[#FBF2E1] border-[#FBF2E1] focus:border-[#930511]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#930511]">
                      Email <span className="text-[#930511]">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="mt-2 bg-[#FBF2E1] border-[#FBF2E1] focus:border-[#930511]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-[#930511]">
                      Số điện thoại
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Nhập số điện thoại của bạn"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="mt-2 bg-[#FBF2E1] border-[#FBF2E1] focus:border-[#930511]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#930511]">
                      Tin nhắn <span className="text-[#930511]">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Nhập nội dung tin nhắn"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      rows={6}
                      className="mt-2 bg-[#FBF2E1] border-[#FBF2E1] focus:border-[#930511] resize-none"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-[#930511] text-white hover:bg-[#7a0410]"
                  >
                    Gửi tin nhắn
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-[#930511] text-center mb-8 text-3xl font-bold uppercase">Vị trí của chúng tôi</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative w-full h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.566288394438!2d106.66525431533412!3d10.771376262214262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed189de803f%3A0xd8e8b1f7f3a4c5d!2s268%20L%C3%BD%20Th%C6%B0%E1%BB%9Dng%20Ki%E1%BB%87t%2C%20Ph%C6%B0%E1%BB%9Dng%2014%2C%20Qu%E1%BA%ADn%2010%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2svn!4v1639123456789!5m2!1svi!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vị trí GIỌT ẤM"
                ></iframe>
              </div>
              <div className="p-6 bg-[#FBF2E1]">
                <h3 className="mb-2">268 B, Lý Thường Kiệt</h3>
                <p className="text-gray-700 mb-4">
                  268 B, Lý Thường Kiệt, Phường 14,<br />
                  Quận 10, Thành phố Hồ Chí Minh
                </p>
                <a
                  href="https://www.google.com/maps/dir//268+L%C3%BD+Th%C6%B0%E1%BB%9Dng+Ki%E1%BB%87t,+Ph%C6%B0%E1%BB%9Dng+14,+Qu%E1%BA%ADn+10,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#930511] hover:underline inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Chỉ đường
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
