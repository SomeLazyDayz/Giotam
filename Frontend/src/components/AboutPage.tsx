import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Users, Target, Award } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#930511] to-[#7a0410] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">Về chúng tôi</h1>
          <p className="opacity-95 leading-relaxed">
            BLOOD + - Kết nối những giọt máu cứu người, xây dựng cộng đồng hiến máu nhân ái
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-20 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="mb-6 text-[#930511]">Sứ mệnh của chúng tôi</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                BLOOD + được thành lập với sứ mệnh kết nối người hiến máu và các cơ sở y tế, giúp cứu sống hàng ngàn người mỗi năm. Chúng tôi tin rằng mỗi giọt máu đều có giá trị và có thể tạo nên sự khác biệt lớn trong cuộc sống của người khác.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Thông qua nền tảng của mình, chúng tôi mong muốn xây dựng một cộng đồng hiến máu tình nguyện mạnh mẽ, sẵn sàng chia sẻ và giúp đỡ những người đang cần máu khẩn cấp.
              </p>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758653500437-26660f405fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhvc3BpdGFsfGVufDF8fHx8MTc2MDQxMjYxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Medical team"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#930511] to-[#7a0410] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-[#930511]">Nhân ái</h3>
              <p className="text-gray-600">Chia sẻ yêu thương qua mỗi giọt máu</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#930511] to-[#7a0410] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-[#930511]">Cộng đồng</h3>
              <p className="text-gray-600">Xây dựng mạng lưới kết nối mạnh mẽ</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#930511] to-[#7a0410] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-[#930511]">Hiệu quả</h3>
              <p className="text-gray-600">Kết nối nhanh chóng và chính xác</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-[#930511] to-[#7a0410] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-[#930511]">Tận tâm</h3>
              <p className="text-gray-600">Phục vụ cộng đồng với trái tim</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-br from-[#FBF2E1] to-[#f5e6d3] py-20 px-6 border-y border-[#e8d5c0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-12 text-[#930511]">Đội ngũ của chúng tôi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Văn A",
                role: "Giám đốc dự án",
                image: "https://images.unsplash.com/photo-1706806595208-0e823368f240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzfGVufDF8fHx8MTc2MDM0NjkzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              {
                name: "Trần Thị B",
                role: "Trưởng phòng Y tế",
                image: "https://images.unsplash.com/photo-1706806595208-0e823368f240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzfGVufDF8fHx8MTc2MDM0NjkzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              {
                name: "Lê Văn C",
                role: "Điều phối viên",
                image: "https://images.unsplash.com/photo-1706806595208-0e823368f240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzfGVufDF8fHx8MTc2MDM0NjkzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#930511]"
                />
                <h3 className="mb-2 text-[#930511]">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-12 text-[#930511]">Thành tích của chúng tôi</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="mb-2 text-[#930511]">10,000+</div>
              <p className="text-gray-600">Người hiến máu</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="mb-2 text-[#930511]">50,000+</div>
              <p className="text-gray-600">Đơn vị máu đã hiến</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="mb-2 text-[#930511]">100+</div>
              <p className="text-gray-600">Bệnh viện liên kết</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="mb-2 text-[#930511]">5,000+</div>
              <p className="text-gray-600">Người được cứu sống</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
