import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import Logo from '../components/Logo';
import { Loader2, AlertCircle } from 'lucide-react'; // Import thêm icon

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Thêm 2 state mới để quản lý trạng thái
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset lỗi cũ và bật trạng thái loading
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Đăng nhập thành công!');
      navigate('/account');
    } catch (error: any) {
      // Lấy thông báo lỗi cụ thể từ Backend (ví dụ: "Email hoặc mật khẩu không chính xác")
      // Nếu không có message từ backend thì dùng câu mặc định
      const msg = error.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
      
      setErrorMessage(msg); // Hiển thị dòng chữ đỏ
      toast.error(msg);     // Vẫn hiện toast cho chắc chắn
    } finally {
      // Tắt trạng thái loading dù thành công hay thất bại
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF2E1] flex items-center justify-center py-16 px-4" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Logo className="w-12 h-12" />
          </Link>
          <h1 className="mb-2 text-3xl font-bold uppercase">Đăng nhập</h1>
          <p className="text-gray-600">Chào mừng trở lại với GIỌT ẤM</p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hiển thị thông báo lỗi màu đỏ nếu có */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(null); // Xóa lỗi khi người dùng nhập lại
                }}
                required
                disabled={isLoading} // Khóa ô nhập khi đang loading
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage(null); // Xóa lỗi khi người dùng nhập lại
                }}
                required
                disabled={isLoading} // Khóa ô nhập khi đang loading
                className="mt-2"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#930511] text-white hover:bg-[#7a0410]"
              disabled={isLoading} // Khóa nút khi đang loading
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-[#930511] hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}