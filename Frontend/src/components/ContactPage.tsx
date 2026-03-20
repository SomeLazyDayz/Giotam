import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  // State để lưu dữ liệu người dùng nhập
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // State để quản lý trạng thái đang gửi (loading)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hàm xử lý khi người dùng gõ phím
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Hàm xử lý khi bấm nút Gửi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Chặn reload trang
    setIsSubmitting(true); // Bật loading

    try {
      const response = await fetch('http://localhost:5000/contact_support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gửi thất bại');
      }

      // Thành công
      toast.success('Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi sớm.');
      // Reset form về rỗng
      setFormData({ name: '', email: '', phone: '', message: '' });

    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false); // Tắt loading
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF2E1] py-12 px-4" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#930511] mb-4 uppercase">Liên hệ với chúng tôi</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại thông tin bên dưới.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cột thông tin liên hệ (Bên trái) */}
          <div className="md:col-span-1 space-y-6">
            <Card className="bg-[#930511] text-white border-none">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-4">Thông tin liên hệ</h3>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Địa chỉ</p>
                    <p className="text-white/80 text-sm">123 Đường Nguyễn Văn Linh, Quận Hải Châu, TP. Đà Nẵng</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Hotline</p>
                    <p className="text-white/80 text-sm">1900 1234</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-white/80 text-sm">lienhe@giotam.vn</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form điền thông tin (Bên phải) */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên</Label>
                      <Input 
                        id="name" 
                        placeholder="Nguyễn Văn A" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="nguyenvana@gmail.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="0905xxxxxx" 
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nội dung</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Bạn cần hỗ trợ gì?..." 
                      className="min-h-[150px]"
                      value={formData.message}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#930511] text-white hover:bg-[#7a0410]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang gửi tin nhắn...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Gửi tin nhắn
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}