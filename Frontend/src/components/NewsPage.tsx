import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, MapPin } from "lucide-react";

export function NewsPage() {
  const news = [
    {
      id: 1,
      title: "Chiến dịch hiến máu tháng 10/2025",
      date: "05/10/2025",
      location: "Bệnh viện Chợ Rẫy",
      description: "Tham gia chiến dịch hiến máu lớn nhất trong năm tại Bệnh viện Chợ Rẫy. Chúng tôi kêu gọi cộng đồng cùng chung tay góp máu cứu người.",
      image: "https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwaGFuZHN8ZW58MXx8fHwxNzYwNDE4MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      title: "Kho máu khẩn cấp cần nhóm O",
      date: "10/10/2025",
      location: "Trung tâm Truyền máu TP.HCM",
      description: "Kho máu đang thiếu hụt nghiêm trọng nhóm máu O. Chúng tôi khẩn thiết kêu gọi những người có nhóm máu O đến hiến máu ngay.",
      image: "https://images.unsplash.com/photo-1758653500437-26660f405fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhvc3BpdGFsfGVufDF8fHx8MTc2MDQxMjYxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 3,
      title: "Hội thảo về hiến máu an toàn",
      date: "12/10/2025",
      location: "Đại học Y Dược TP.HCM",
      description: "Tham gia hội thảo để tìm hiểu về quy trình hiến máu an toàn và lợi ích của việc hiến máu thường xuyên cho sức khỏe.",
      image: "https://images.unsplash.com/photo-1706806595208-0e823368f240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzfGVufDF8fHx8MTc2MDM0NjkzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 4,
      title: "Tri ân người hiến máu tình nguyện",
      date: "20/10/2025",
      location: "Hội trường BLOOD +",
      description: "Chương trình tri ân dành cho những người đã hiến máu nhiều lần. Cùng gặp gỡ và chia sẻ câu chuyện cứu người đầy ý nghĩa.",
      image: "https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwaGFuZHN8ZW58MXx8fHwxNzYwNDE4MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 5,
      title: "Mở rộng mạng lưới điểm hiến máu",
      date: "25/10/2025",
      location: "Các quận tại TP.HCM",
      description: "BLOOD + mở rộng mạng lưới với 5 điểm hiến máu mới tại các quận, giúp việc hiến máu trở nên thuận tiện hơn cho mọi người.",
      image: "https://images.unsplash.com/photo-1758653500437-26660f405fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhvc3BpdGFsfGVufDF8fHx8MTc2MDQxMjYxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 6,
      title: "Câu chuyện cảm động từ người được cứu",
      date: "28/10/2025",
      location: "BLOOD + Media",
      description: "Những câu chuyện cảm động từ những người đã được cứu sống nhờ máu hiến tình nguyện. Mỗi giọt máu là một cơ hội sống mới.",
      image: "https://images.unsplash.com/photo-1706806595208-0e823368f240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzfGVufDF8fHx8MTc2MDM0NjkzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#930511] to-[#7a0410] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">Tin tức & Hoạt động</h1>
          <p className="opacity-95 leading-relaxed">
            Cập nhật những tin tức mới nhất về các chiến dịch, sự kiện và hoạt động của BLOOD +
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-3 text-[#930511]">{item.title}</h3>
                  <div className="flex items-center gap-4 mb-3 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  <button className="mt-4 text-[#930511] hover:text-[#7a0410] transition-colors">
                    Xem chi tiết →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#FBF2E1] to-[#f5e6d3] py-20 px-6 border-t border-[#e8d5c0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-[#930511]">Tham gia cùng chúng tôi</h2>
          <p className="mb-8 text-gray-700 leading-relaxed">
            Đăng ký ngay để không bỏ lỡ các sự kiện và chiến dịch hiến máu sắp tới. Cùng nhau chúng ta có thể cứu sống nhiều người hơn!
          </p>
          <button className="px-8 py-3 bg-[#930511] text-white hover:bg-[#7a0410] transition-all rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Đăng ký tham gia
          </button>
        </div>
      </section>
    </div>
  );
}
