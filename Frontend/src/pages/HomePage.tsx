import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import Logo from '../components/Logo';
import { Heart, Users, Droplet, CheckCircle, Building2, Phone, Mail, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useState, useEffect } from 'react';

// Counter component with animation
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FBF2E1]" style={{ fontFamily: 'Times New Roman, serif' }}>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Logo className="w-64 h-64" />
              </div>
              <div>
                <h1 className="mb-6 text-5xl font-bold uppercase tracking-wide text-[#930511]">GIỌT ẤM</h1>
                <p className="text-lg mb-6">
                  GIỌT ẤM là nền tảng kết nối thông minh giữa người hiến máu tình nguyện và các bệnh viện đang cần máu khẩn cấp tại TP.HCM. Dự án hướng đến mục tiêu xây dựng một hệ thống điều phối máu nhanh chóng, chính xác và nhân văn – nơi mỗi giọt máu đều trở đi là một cơ hội sống được gửi lại.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="mb-6 text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#930511]">Trao giọt máu - Trao sự sống</h2>
            <p className="text-lg mb-8">
              Hãy đăng ký và điền thông tin liên hệ của bạn ngay hôm nay để chúng tôi có thể liên hệ khi có nhu cầu máu khẩn cấp. Chính bạn là nguồn cảm hứng để chúng tôi tiếp tục xây dựng hệ thống kết nối máu khẩn cấp qua, nhân văn và bền vững
            </p>
            <Link to="/register">
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-6">
                Đăng ký ngay
              </Button>
            </Link>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#930511]">
              Tác động của chúng tôi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-[#930511] border-2">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-3 text-[#930511]" />
                  <div className="text-3xl font-bold text-[#930511] mb-2">
                    <AnimatedCounter target={1250} suffix="+" />
                  </div>
                  <p className="text-base">Tình nguyện viên đã đăng ký</p>
                </CardContent>
              </Card>
              
              <Card className="border-[#930511] border-2">
                <CardContent className="p-6 text-center">
                  <Droplet className="w-12 h-12 mx-auto mb-3 text-[#930511]" />
                  <div className="text-3xl font-bold text-[#930511] mb-2">
                    <AnimatedCounter target={3500} suffix="+" />
                  </div>
                  <p className="text-base">Lít máu đã hiến tặng</p>
                </CardContent>
              </Card>
              
              <Card className="border-[#930511] border-2">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-3 text-[#930511]" />
                  <div className="text-3xl font-bold text-[#930511] mb-2">
                    <AnimatedCounter target={890} suffix="+" />
                  </div>
                  <p className="text-base">Ca cấp cứu được hỗ trợ</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#930511]">
              Quy trình đơn giản
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-[#930511] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold">
                  1
                </div>
                <h3 className="mb-4 text-2xl font-bold uppercase">Đăng ký</h3>
                <p className="text-lg">
                  Điền thông tin cá nhân, nhóm máu và địa chỉ của bạn vào hệ thống
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-[#930511] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold">
                  2
                </div>
                <h3 className="mb-4 text-2xl font-bold uppercase">Chờ thông báo</h3>
                <p className="text-lg">
                  Bệnh viện sẽ liên hệ với bạn qua SMS/Email khi có nhu cầu máu khẩn cấp
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-[#930511] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold">
                  3
                </div>
                <h3 className="mb-4 text-2xl font-bold uppercase">Hiến máu</h3>
                <p className="text-lg">
                  Đến bệnh viện gần nhất để thực hiện hiến máu và cứu sống người khác
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blood Shortage Info Section */}
        <section className="bg-[#930511] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="mb-6 text-3xl md:text-4xl font-bold uppercase tracking-wide text-white">Tình trạng thiếu máu nghiêm trọng tại TP.HCM</h2>
                <p className="text-lg">
                  TP.HCM đang đối mặt với tình trạng thiếu máu nghiêm trọng, đặc biệt trong mùa hè và các tháng cao điểm. Kho máu dự trữ hiện chỉ đáp ứng khoảng 70–80% nhu cầu điều trị, khiến nhiều bệnh viện phải kêu gọi người dân hiến máu để đáp bảo cứu các cấp cứu.
                </p>
              </div>
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/kaymIKp0iM4"
                  title="Video về tình trạng thiếu máu"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#930511]">
              Chia sẻ thực tế
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-[#930511]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#930511] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      NH
                    </div>
                    <div>
                      <h4 className="font-bold text-base">Nguyễn Hoàng - Tình nguyện viên</h4>
                      <p className="text-xs text-gray-600">Nhóm máu O+</p>
                    </div>
                  </div>
                  <p className="text-base italic">
                    "Tôi đã hiến máu được 5 lần qua hệ thống GIỌT ẤM. Mỗi lần nhận được tin nhắn từ bệnh viện, tôi cảm thấy mình thực sự có ích cho cộng đồng. Đặc biệt có một lần tôi được biết máu của mình đã cứu được một em bé, cảm giác hạnh phúc không thể diễn tả được!"
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-[#930511]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#930511] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      PT
                    </div>
                    <div>
                      <h4 className="font-bold text-base">Phạm Thị Mai - Người nhà bệnh nhân</h4>
                      <p className="text-xs text-gray-600">Bệnh viện Chợ Rẫy</p>
                    </div>
                  </div>
                  <p className="text-base italic">
                    "Con tôi bị tai nạn giao thông và mất rất nhiều máu. May mắn thay, bệnh viện đã liên hệ được với người hiến máu qua GIỌT ẤM chỉ trong vòng 2 giờ. Tôi vô cùng biết ơn những tình nguyện viên đã cho con tôi cơ hội được sống."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#930511]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#930511] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      LQ
                    </div>
                    <div>
                      <h4 className="font-bold text-base">Lê Văn Quang - Tình nguyện viên</h4>
                      <p className="text-xs text-gray-600">Nhóm máu AB+</p>
                    </div>
                  </div>
                  <p className="text-base italic">
                    "Lần đầu hiến máu tôi rất lo lắng, nhưng quy trình qua GIỌT ẤM rất chuyên nghiệp. Bệnh viện liên hệ rõ ràng, nhân viên y tế tận tình hướng dẫn. Giờ tôi thường xuyên cập nhật thông tin để sẵn sàng giúp đỡ bất cứ lúc nào."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#930511]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#930511] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      HT
                    </div>
                    <div>
                      <h4 className="font-bold text-base">Huỳnh Thị Thanh - Y tá</h4>
                      <p className="text-xs text-gray-600">Bệnh viện Nhân dân 115</p>
                    </div>
                  </div>
                  <p className="text-base italic">
                    "Là người làm việc trong ngành y, tôi thấy GIỌT ẤM thực sự hữu ích trong việc kết nối nhanh chóng với người hiến máu. Nhiều ca cấp cứu được cứu sống nhờ hệ thống này. Tôi luôn khuyến khích mọi người đăng ký tham gia."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partner Hospitals Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#930511]">
              Bệnh viện liên kết
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-gray-200">
                <CardContent className="p-6">
                  <Building2 className="w-10 h-10 text-[#930511] mb-3" />
                  <h4 className="font-bold mb-2">Bệnh viện Chợ Rẫy</h4>
                  <p className="text-sm mb-3">201B Nguyễn Chí Thanh, Quận 5</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>(028) 3855 4269</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>info@choray.vn</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-gray-200">
                <CardContent className="p-6">
                  <Building2 className="w-10 h-10 text-[#930511] mb-3" />
                  <h4 className="font-bold mb-2">Bệnh viện Nhân dân 115</h4>
                  <p className="text-sm mb-3">527 Sư Vạn Hạnh, Quận 10</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>(028) 3865 4269</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>info@bv115.vn</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-gray-200">
                <CardContent className="p-6">
                  <Building2 className="w-10 h-10 text-[#930511] mb-3" />
                  <h4 className="font-bold mb-2">Bệnh viện Từ Dũ</h4>
                  <p className="text-sm mb-3">284 Cống Quỳnh, Quận 1</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>(028) 3829 5024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>info@tudu.vn</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold uppercase tracking-wide text-[#930511]">
              Câu hỏi thường gặp
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-[#930511]">
                <AccordionTrigger className="text-lg">
                  Ai có thể hiến máu?
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  Người từ 18-60 tuổi, cân nặng từ 45kg trở lên, sức khỏe tốt, không mắc các bệnh truyền nhiễm như HIV, viêm gan B, C, giang mai. Phải đủ 3 tháng kể từ lần hiến máu trước.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-[#930511]">
                <AccordionTrigger className="text-lg">
                  Hiến máu có đau không?
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  Bạn sẽ chỉ cảm thấy hơi đau nhẹ khi kim chích vào tĩnh mạch, tương tự như khi bạn lấy máu xét nghiệm. Quá trình hiến máu diễn ra an toàn và nhanh chóng, chỉ mất khoảng 10-15 phút.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-[#930511]">
                <AccordionTrigger className="text-lg">
                  Tôi cần chuẩn bị gì trước khi hiến máu?
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  Ngủ đủ giấc, ăn uống đầy đủ trước khi hiến máu, uống nhiều nước. Mang theo CMND/CCCD. Tránh uống rượu bia 24 giờ trước khi hiến máu. Không nên hiến máu khi đang đói hoặc mệt mỏi.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-[#930511]">
                <AccordionTrigger className="text-lg">
                  Sau khi hiến máu tôi cần làm gì?
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  Nghỉ ngơi 10-15 phút sau khi hiến máu, uống nhiều nước, ăn nhẹ. Tránh vận động mạnh trong 24 giờ. Giữ băng gạc sạch sẽ trong vài giờ. Nếu cảm thấy chóng mặt, hãy nằm xuống và nâng chân cao.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-[#930511]">
                <AccordionTrigger className="text-lg">
                  Tôi có nhận được gì khi hiến máu?
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  Bạn sẽ được xét nghiệm sức khỏe miễn phí, nhận giấy chứng nhận hiến máu. Quan trọng hơn, bạn sẽ nhận được sự hài lòng khi biết mình đã cứu sống một người. Một số bệnh viện còn cấp phiếu ưu tiên sử dụng máu khi cần.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}