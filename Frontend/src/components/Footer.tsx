import { useState } from 'react';
import { Mail, Phone, Facebook, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';
import Logo from './Logo';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Cảm ơn bạn đã đăng ký!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="mb-4 text-2xl font-bold uppercase">Liên hệ</h3>
            
            <div className="flex items-center gap-2 mb-3">
              <Logo className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>bloodgroup@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+84 987123418</span>
              </div>
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                <span>blood+</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <span>blood+</span>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4">
              Nêu bạn cũng đang quan tâm đến BLOOD + hãy để lại thông tin để chúng tôi liên hệ và tư vấn nhé
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-300"
                required
              />
              <Button 
                type="submit"
                className="bg-black text-white hover:bg-gray-800 shrink-0"
              >
                Gửi
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}