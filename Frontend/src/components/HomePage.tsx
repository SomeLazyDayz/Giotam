import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FBF2E1] to-[#f5e6d3] py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwaGFuZHN8ZW58MXx8fHwxNzYwNDE4MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Blood donation"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h1 className="mb-6 text-[#930511]">BLOOD +</h1>
            <p className="mb-6 text-gray-700 leading-relaxed">
              BLOOD + là nền tảng kết nối thông minh giữa người hiến máu tình nguyện và các bệnh viện đang cần máu khẩn cấp tại TP.HCM. Dự án hướng đến mục tiêu xây dựng một hệ thống điều phối máu nhanh chóng, chính xác và nhân văn – nơi mỗi giọt máu được trao đi là một cơ hội sống được gửi lại.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white py-20 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-[#930511]">Trao giọt máu - Trao sự sống</h2>
          <p className="mb-8 text-gray-600 leading-relaxed">
            Hãy đăng ký và điền thông tin liên hệ của bạn ngay hôm nay để chúng tôi có thể liên hệ khi có nhu cầu của máu khẩn cấp. Chính bạn là nguồn cảm hứng để chúng tôi tiếp tục xây dựng một hệ thống kết nối máu khẩn cấp hiệu quả, nhân văn và bền vững
          </p>
          <button
            onClick={() => onNavigate("register")}
            className="px-8 py-3 bg-[#930511] text-white hover:bg-[#7a0410] transition-all rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Đăng ký ngay
          </button>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-br from-[#930511] to-[#7a0410] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Tình trạng thiếu máu nghiêm trọng tại TP.HCM</h2>
              <p className="mb-6 leading-relaxed opacity-95">
                TP.HCM đang đối mặt với tình trạng thiếu máu nghiêm trọng, đặc biệt trong mùa hè và các tháng cao điểm. Kho máu dự trữ chỉ đáp ứng khoảng 70-80% nhu cầu điều trị, khiến nhiều bệnh viện phải khẩn cấp kêu gọi người dân hiến máu để đảm bảo cấp cứu.
              </p>
            </div>
            <div className="aspect-video bg-black/20 rounded-xl shadow-xl flex items-center justify-center overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Blood Donation Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
