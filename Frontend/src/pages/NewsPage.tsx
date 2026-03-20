import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function NewsPage() {
  const news = [
    {
      id: 1,
      title: 'Chiến dịch hiến máu "Giọt hồng yêu thương" tháng 10',
      date: '15/10/2025',
      location: 'Công viên Tao Đàn, Quận 1',
      description: 'Tham gia cùng chúng tôi trong chiến dịch hiến máu lớn nhất tháng 10 tại Công viên Tao Đàn. Sự kiện sẽ diễn ra từ 8h sáng đến 5h chiều với sự tham gia của hơn 20 bệnh viện.',
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'GIỌT ẤM đạt mốc 500 người đăng ký hiến máu',
      date: '10/10/2025',
      location: 'TP. Hồ Chí Minh',
      description: 'Chúng tôi vô cùng tự hào thông báo rằng GIỌT ẤM đã đạt được mốc 500 người đăng ký hiến máu tình nguyện chỉ sau 3 tháng ra mắt. Cảm ơn sự ủng hộ của cộng đồng!',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Hội thảo về tầm quan trọng của hiến máu',
      date: '05/10/2025',
      location: 'Đại học Y Dược TP.HCM',
      description: 'Tham gia hội thảo với các chuyên gia y tế hàng đầu để hiểu rõ hơn về quá trình hiến máu, lợi ích sức khỏe và cách chúng ta có thể góp phần cứu sống nhiều người.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Kết nối thành công với Bệnh viện Chợ Rẫy',
      date: '01/10/2025',
      location: 'Bệnh viện Chợ Rẫy',
      description: 'GIỌT ẤM chính thức hợp tác với Bệnh viện Chợ Rẫy - một trong những bệnh viện lớn nhất TP.HCM, mở rộng mạng lưới kết nối giữa người hiến máu và các cơ sở y tế.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop',
    },
    {
      id: 5,
      title: 'Chiến dịch hiến máu tại các trường đại học',
      date: '25/09/2025',
      location: 'Các trường đại học tại TP.HCM',
      description: 'Chúng tôi sẽ tổ chức các điểm hiến máu lưu động tại 10 trường đại học lớn trên địa bàn TP.HCM, khuyến khích sinh viên tham gia hoạt động hiến máu tình nguyện.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
    },
    {
      id: 6,
      title: 'Cảm ơn những người hùng thầm lặng',
      date: '20/09/2025',
      location: 'TP. Hồ Chí Minh',
      description: 'Câu chuyện cảm động về những người hiến máu đã cứu sống nhiều bệnh nhân. Mỗi giọt máu đều mang ý nghĩa vô cùng to lớn đối với những người đang cần được cứu chữa.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF2E1]" style={{ fontFamily: 'Times New Roman, serif' }}>
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-12 text-4xl font-bold uppercase text-[#930511]">Tin tức & Hoạt động</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-3">{item.title}</h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
