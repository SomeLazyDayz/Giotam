import { api } from '../api';
import { useState } from 'react';
import { Bell, Star, X } from 'lucide-react';
import { Button } from './ui/button';
import bgImage from 'figma:asset/d76846a11d75a7ce003c604c14f5361afe3d5e27.png';
import logoImage from 'figma:asset/c819fc914ecaa07ab2a41a79fa5f1bba1493983f.png';

interface AuthProps {
  onLogin: (user?: any) => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    address: '',
    bloodType: 'O',
    agreeToTerms: false,
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try {
        const response = await api.post('/login', {
          email: loginForm.email,
          password: loginForm.password
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        alert('Đăng nhập thành công!');
        onLogin(response.data.user);
      } catch (error: any) {
        alert(error.response?.data?.error || 'Sai email hoặc mật khẩu!');
      }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (registerForm.password !== registerForm.confirmPassword) {
    alert('Mật khẩu không khớp!');
    return;
  }
  if (!registerForm.agreeToTerms) {
    alert('Bạn phải đồng ý với điều khoản và điều kiện!');
    return;
  }

  try {
    await api.post('/register_donor', {
      fullName: registerForm.fullName,
      email: registerForm.email,
      phone: registerForm.phone,
      password: registerForm.password,
      address: registerForm.address,
      bloodType: registerForm.bloodType
    });

    alert('Đăng ký thành công! Mời bạn đăng nhập.');
    setIsLogin(true);
  } catch (error: any) {
    alert(error.response?.data?.error || 'Lỗi đăng ký!');
  }
};

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-[393px] h-[852px] relative overflow-hidden flex flex-col">
        {/* Background with blood cells */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-destructive via-[#B8071A] to-[#8B0510]"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
          }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-destructive/60 via-destructive/40 to-destructive/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between p-6 pt-12">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Logo Giọt Ấm" className="h-12" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <div className="flex-1 flex items-center justify-center px-6 pb-20">
              <div className="w-full max-w-md">
                {/* Glass Card with Red Gradient */}
                <div className="bg-gradient-to-b from-white/15 via-white/10 to-white/5 backdrop-blur-xl border-2 border-white/60 rounded-[40px] p-8 shadow-2xl">
                  <form onSubmit={handleLoginSubmit} className="space-y-10">
                    {/* Email/Phone Input */}
                    <div>
                      <label className="block text-white text-xl font-bold mb-3 drop-shadow-md">
                        Email/Số điện thoại
                      </label>
                      <input
                        type="text"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="w-full bg-transparent border-b border-white text-white placeholder-white/60 pb-2 focus:outline-none focus:border-white transition-colors text-base"
                        required
                      />
                    </div>

                    {/* Password Input */}
                    <div>
                      <label className="block text-white text-xl font-bold mb-3 drop-shadow-md">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full bg-transparent border-b border-white text-white placeholder-white/60 pb-2 focus:outline-none focus:border-white transition-colors text-base"
                        required
                      />
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className="text-white font-bold text-lg hover:underline drop-shadow-md"
                      >
                        Đăng ký
                      </button>
                      <button
                        type="button"
                        className="text-white font-bold text-lg hover:underline drop-shadow-md"
                      >
                        Quên mật khẩu
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Submit Button - Outside the card */}
                <div className="flex justify-center mt-3">
                  <button
                    onClick={handleLoginSubmit}
                    className="w-4/5 bg-white text-destructive font-bold text-xl py-4 rounded-[40px] hover:bg-white/90 transition-colors shadow-2xl"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Register Form
            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4">
              <div className="w-full max-w-md mx-auto">
                {/* Glass Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-2xl">
                  <h2 className="text-white text-xl font-bold mb-6 text-center">Đăng ký tài khoản</h2>
                  
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <input
                        type="text"
                        placeholder="Họ và tên"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/80 pb-2 focus:outline-none focus:border-white transition-colors text-sm"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/80 pb-2 focus:outline-none focus:border-white transition-colors text-sm"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        type="tel"
                        placeholder="Số điện thoại"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/80 pb-2 focus:outline-none focus:border-white transition-colors text-sm"
                        required
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <input
                        type="date"
                        placeholder="Ngày sinh"
                        value={registerForm.dateOfBirth}
                        onChange={(e) => setRegisterForm({ ...registerForm, dateOfBirth: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/80 pb-2 focus:outline-none focus:border-white transition-colors text-sm"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <input
                        type="text"
                        placeholder="Địa chỉ hiện tại"
                        value={registerForm.address}
                        onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/80 pb-2 focus:outline-none focus:border-white transition-colors text-sm"
                        required
                      />
                    </div>

                    {/* Blood Type */}
                    <div>
                      <select
                        value={registerForm.bloodType}
                        onChange={(e) => setRegisterForm({ ...registerForm, bloodType: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/50 text-white pb-2 focus:outline-none focus:border-white transition-colors text-sm"
                        required
                      >
                        <option value="O+" className="text-black">Nhóm máu O+</option>
                        <option value="O-" className="text-black">Nhóm máu O-</option>
                        <option value="A+" className="text-black">Nhóm máu A+</option>
                        <option value="A-" className="text-black">Nhóm máu A-</option>
                        <option value="B+" className="text-black">Nhóm máu B+</option>
                        <option value="B-" className="text-black">Nhóm máu B-</option>
                        <option value="AB+" className="text-black">Nhóm máu AB+</option>
                        <option value="AB-" className="text-black">Nhóm máu AB-</option>
                        <option value="Chưa biết" className="text-black">Chưa biết</option>
                      </select>
                    </div>

                    {/* Password */}
                    <div>
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/80 pb-2 focus:outline-none focus:border-white transition-colors text-sm"
                        required
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/80 pb-2 focus:outline-none focus:border-white transition-colors text-sm"
                        required
                      />
                    </div>

                    {/* Agree to Terms */}
                    <div className="flex items-center pt-2">
                      <input
                        type="checkbox"
                        checked={registerForm.agreeToTerms}
                        onChange={(e) => setRegisterForm({ ...registerForm, agreeToTerms: e.target.checked })}
                        className="w-4 h-4 text-white bg-white/20 border-white/50 rounded focus:ring-2 focus:ring-white/50"
                      />
                      <label className="ml-2 text-sm text-white">
                        Tôi đồng ý với{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowTerms(true);
                          }}
                          className="underline hover:text-white/80"
                        >
                          điều khoản và chính sách
                        </button>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-white text-destructive font-bold py-3 rounded-2xl hover:bg-white/90 transition-colors shadow-lg mt-4"
                    >
                      Đăng ký
                    </button>

                    {/* Back to Login */}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="w-full text-white text-sm font-medium hover:underline mt-2"
                    >
                      Đã có tài khoản? Đăng nhập
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terms and Privacy Policy Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl shadow-2xl w-[350px] h-[700px] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">Điều khoản & Chính sách</h2>
              <button
                onClick={() => setShowTerms(false)}
                className="p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3 text-xs text-foreground">
              {/* ĐIỀU KHOẢN DỊCH VỤ */}
              <h3 className="font-bold text-sm text-destructive mb-2">ĐIỀU KHOẢN DỊCH VỤ</h3>
              
              <h4 className="font-semibold mt-3 mb-1 text-xs">1. Giới thiệu</h4>
              <p className="mb-2 text-foreground/90 leading-relaxed">
                Giọt Ấm là nền tảng hỗ trợ kết nối và kêu gọi hiến máu/hiến tiểu cầu khẩn cấp giữa người hiến tình nguyện và các đơn vị y tế. Khi đăng ký và sử dụng Giọt Ấm, người dùng được xem là đã đọc, hiểu và đồng ý với toàn bộ Điều khoản Dịch vụ này.
              </p>

              <h4 className="font-semibold mt-3 mb-1 text-xs">2. Phạm vi áp dụng</h4>
              <p className="mb-2 text-foreground/90 leading-relaxed">
                Điều khoản này áp dụng cho tất cả người dùng đăng ký tài khoản và sử dụng các chức năng của Giọt Ấm trên ứng dụng di động và/hoặc website (nếu có).
              </p>

              <h4 className="font-semibold mt-3 mb-1 text-xs">3. Điều kiện đăng ký và sử dụng</h4>
              <ul className="list-disc pl-4 mb-2 space-y-0.5 text-foreground/90">
                <li>Người dùng cam kết cung cấp thông tin cá nhân trung thực, chính xác và cập nhật.</li>
                <li>Người dùng phải đủ điều kiện sức khỏe theo quy định của Bộ Y tế Việt Nam để tham gia hiến máu/tiểu cầu.</li>
                <li>Giọt Ấm không thay thế tư vấn y khoa và không chịu trách nhiệm về quyết định hiến máu của người dùng.</li>
              </ul>

              <h4 className="font-semibold mt-3 mb-1 text-xs">4. Quyền và nghĩa vụ của người dùng</h4>
              <p className="font-medium mt-2 mb-0.5 text-xs">4.1. Quyền của người dùng</p>
              <ul className="list-disc pl-4 mb-2 space-y-0.5 text-foreground/90">
                <li>Được sử dụng các chức năng của ứng dụng theo đúng mục đích.</li>
                <li>Được bảo vệ thông tin cá nhân theo Chính sách Quyền riêng tư.</li>
                <li>Có quyền yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân theo quy định.</li>
              </ul>

              <p className="font-medium mt-2 mb-0.5 text-xs">4.2. Nghĩa vụ của người dùng</p>
              <ul className="list-disc pl-4 mb-2 space-y-0.5 text-foreground/90">
                <li>Không sử dụng Giọt Ấm cho mục đích trái pháp luật hoặc gây ảnh hưởng tiêu cực đến cộng đồng.</li>
                <li>Không cung cấp thông tin sai lệch, giả mạo hoặc gây nhầm lẫn.</li>
                <li>Chịu trách nhiệm về các hành động thực hiện thông qua tài khoản của mình.</li>
              </ul>

              <h4 className="font-semibold mt-3 mb-1 text-xs">5. Quyền và trách nhiệm của Giọt Ấm</h4>
              <ul className="list-disc pl-4 mb-2 space-y-0.5 text-foreground/90">
                <li>Giọt Ấm có quyền tạm ngưng hoặc chấm dứt tài khoản nếu phát hiện vi phạm điều khoản.</li>
                <li>Giọt Ấm nỗ lực đảm bảo hệ thống hoạt động ổn định nhưng không cam kết không có gián đoạn kỹ thuật.</li>
                <li>Giọt Ấm không chịu trách nhiệm đối với các rủi ro y tế phát sinh trong quá trình hiến máu.</li>
              </ul>

              <h4 className="font-semibold mt-3 mb-1 text-xs">6. Giới hạn trách nhiệm</h4>
              <p className="mb-2 text-foreground/90 leading-relaxed">
                Giọt Ấm chỉ đóng vai trò trung gian kết nối thông tin. Mọi quyết định tham gia hiến máu là tự nguyện và do người dùng tự chịu trách nhiệm.
              </p>

              <h4 className="font-semibold mt-3 mb-1 text-xs">7. Thay đổi điều khoản</h4>
              <p className="mb-2 text-foreground/90 leading-relaxed">
                Giọt Ấm có quyền cập nhật Điều khoản Dịch vụ khi cần thiết. Các thay đổi sẽ được thông báo trên ứng dụng và có hiệu lực kể từ thời điểm công bố.
              </p>

              <h4 className="font-semibold mt-3 mb-1 text-xs">8. Luật áp dụng</h4>
              <p className="mb-3 text-foreground/90 leading-relaxed">
                Điều khoản này được điều chỉnh và giải thích theo pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
              </p>

              {/* CHÍNH SÁCH QUYỀN RIÊNG TƯ */}
              <div className="border-t border-border pt-3 mt-3">
                <h3 className="font-bold text-sm text-destructive mb-2">CHÍNH SÁCH QUYỀN RIÊNG TƯ</h3>

                <h4 className="font-semibold mt-3 mb-1 text-xs">1. Mục đích thu thập thông tin</h4>
                <p className="mb-1 text-foreground/90">Giọt Ấm thu thập thông tin cá nhân nhằm:</p>
                <ul className="list-disc pl-4 mb-2 space-y-0.5 text-foreground/90">
                  <li>Xác minh danh tính người dùng.</li>
                  <li>Kết nối người hiến với các đợt hiến máu/tiểu cầu phù hợp.</li>
                  <li>Gửi thông báo (notification) về các đợt hiến máu khẩn cấp.</li>
                  <li>Phục vụ nghiên cứu, thống kê (dữ liệu ẩn danh).</li>
                </ul>

                <h4 className="font-semibold mt-3 mb-1 text-xs">2. Loại thông tin thu thập</h4>
                <ul className="list-disc pl-4 mb-2 space-y-0.5 text-foreground/90">
                  <li>Thông tin cá nhân cơ bản: họ tên, số điện thoại, email.</li>
                  <li>Thông tin sức khỏe cơ bản: nhóm máu, chiều cao, cân nặng, tình trạng sức khỏe tự khai.</li>
                  <li>Thông tin sử dụng ứng dụng: lịch sử đăng nhập, tương tác với thông báo.</li>
                </ul>

                <h4 className="font-semibold mt-3 mb-1 text-xs">3. Phạm vi sử dụng thông tin</h4>
                <ul className="list-disc pl-4 mb-2 space-y-0.5 text-foreground/90">
                  <li>Chỉ sử dụng cho mục đích vận hành và phát triển Giọt Ấm.</li>
                  <li>Không bán, cho thuê hoặc chia sẻ thông tin cá nhân cho bên thứ ba vì mục đích thương mại.</li>
                  <li>Thông tin có thể được chia sẻ với đơn vị y tế liên kết khi cần thiết cho hoạt động hiến máu, trên cơ sở tối thiểu và phù hợp.</li>
                </ul>

                <h4 className="font-semibold mt-3 mb-1 text-xs">4. Lưu trữ và bảo mật thông tin</h4>
                <ul className="list-disc pl-4 mb-2 space-y-0.5 text-foreground/90">
                  <li>Thông tin cá nhân được lưu trữ trên hệ thống bảo mật.</li>
                  <li>Giọt Ấm áp dụng các biện pháp kỹ thuật và quản lý hợp lý để bảo vệ dữ liệu khỏi truy cập trái phép, mất mát hoặc rò rỉ.</li>
                </ul>

                <h4 className="font-semibold mt-3 mb-1 text-xs">5. Thời gian lưu trữ</h4>
                <p className="mb-2 text-foreground/90 leading-relaxed">
                  Thông tin cá nhân được lưu trữ cho đến khi người dùng yêu cầu xóa hoặc khi Giọt Ấm ngừng hoạt động, trừ trường hợp pháp luật yêu cầu lưu trữ lâu hơn.
                </p>

                <h4 className="font-semibold mt-3 mb-1 text-xs">6. Quyền của người dùng đối với dữ liệu cá nhân</h4>
                <ul className="list-disc pl-4 mb-2 space-y-0.5 text-foreground/90">
                  <li>Yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân.</li>
                  <li>Rút lại sự đồng ý cho phép xử lý dữ liệu (có thể ảnh hưởng đến một số chức năng).</li>
                </ul>

                <h4 className="font-semibold mt-3 mb-1 text-xs">7. Cookie và công nghệ tương tự (nếu có)</h4>
                <p className="mb-2 text-foreground/90 leading-relaxed">
                  Giọt Ấm có thể sử dụng cookie hoặc công nghệ tương tự nhằm cải thiện trải nghiệm người dùng và hiệu năng hệ thống.
                </p>

                <h4 className="font-semibold mt-3 mb-1 text-xs">8. Thay đổi chính sách</h4>
                <p className="mb-2 text-foreground/90 leading-relaxed">
                  Chính sách Quyền riêng tư có thể được cập nhật để phù hợp với quy định pháp luật và thực tiễn vận hành. Mọi thay đổi sẽ được thông báo đến người dùng.
                </p>

                <h4 className="font-semibold mt-3 mb-1 text-xs">9. Thông tin liên hệ</h4>
                <p className="mb-2 text-foreground/90 leading-relaxed">
                  Mọi thắc mắc liên quan đến Điều khoản Dịch vụ và Chính sách Quyền riêng tư, vui lòng liên hệ đội ngũ Giọt Ấm thông qua kênh hỗ trợ chính thức của dự án.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-3 border-t border-border">
              <Button
                onClick={() => setShowTerms(false)}
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-2.5"
              >
                Đã hiểu
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}