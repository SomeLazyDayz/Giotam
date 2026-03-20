import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FBF2E1]" style={{ fontFamily: 'Times New Roman, serif' }}>
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-12 text-4xl font-bold uppercase text-[#930511]">Giới thiệu về GIỌT ẤM</h1>
          
          {/* Mission Section */}
          <section className="bg-white rounded-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#930511] rounded-full flex items-center justify-center text-white shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold uppercase">Sứ mệnh</h2>
                <p className="text-lg">
                  GIỌT ẤM ra đời với sứ mệnh kết nối những người hiến máu tình nguyện với các bệnh viện đang cần máu khẩn cấp tại TP.HCM. Chúng tôi tin rằng mỗi giọt máu đều có thể cứu sống một sinh mạng, và công nghệ có thể làm cho quá trình này nhanh chóng và hiệu quả hơn.
                </p>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="bg-white rounded-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#930511] rounded-full flex items-center justify-center text-white shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold uppercase">Tầm nhìn</h2>
                <p className="text-lg">
                  Chúng tôi hướng đến việc xây dựng một hệ sinh thái hiến máu bền vững, nơi mọi người có thể dễ dàng tham gia vào hoạt động nhân đạo này. Mục tiêu của chúng tôi là không còn ai phải chờ đợi máu trong tình huống khẩn cấp.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="bg-white rounded-lg p-8">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#930511] rounded-full flex items-center justify-center text-white shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold uppercase">Đội ngũ</h2>
                <p className="text-lg mb-8">
                  GIỌT ẤM được xây dựng bởi một nhóm các bạn trẻ đam mê công nghệ và hoạt động xã hội. Chúng tôi tin rằng sự kết hợp giữa công nghệ và lòng nhân ái có thể tạo ra những thay đổi tích cực cho cộng đồng.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3>Nguyễn Văn A</h3>
                <p className="text-gray-600">Nhà sáng lập</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3>Trần Thị B</h3>
                <p className="text-gray-600">Giám đốc công nghệ</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3>Lê Văn C</h3>
                <p className="text-gray-600">Giám đốc vận hành</p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#930511] text-white rounded-lg p-8 text-center">
              <div className="mb-2">500+</div>
              <p>Người hiến máu tình nguyện</p>
            </div>
            <div className="bg-[#930511] text-white rounded-lg p-8 text-center">
              <div className="mb-2">50+</div>
              <p>Bệnh viện hợp tác</p>
            </div>
            <div className="bg-[#930511] text-white rounded-lg p-8 text-center">
              <div className="mb-2">1000+</div>
              <p>Đơn vị máu được hiến</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
