import { Clock, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageHeader } from './PageHeader';

interface NewsProps {
  onBack?: () => void;
}

export function News({ onBack }: NewsProps = {}) {
  const categories = ['Tất cả', 'Sự kiện', 'Thông báo', 'Tin tức', 'Câu chuyện'];
  
  const news = [
    {
      id: 1,
      title: 'Chiến dịch hiến máu "Giọt hồng nhân ái" 2025',
      excerpt: 'Tham gia chiến dịch hiến máu lớn nhất trong năm, góp phần cứu sống hàng ngàn bệnh nhân...',
      image: 'https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwbWVkaWNhbHxlbnwxfHx8fDE3Njg5NDI2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Sự kiện',
      time: '2 giờ trước',
      views: 1234,
    },
    {
      id: 2,
      title: 'Thiếu hụt máu nghiêm trọng tại các bệnh viện',
      excerpt: 'Các ngân hàng máu đang trong tình trạng báo động đỏ, cần sự chung tay của cộng đồng...',
      image: 'https://images.unsplash.com/photo-1613377512507-92803ec4ef17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGNsaW5pY3xlbnwxfHx8fDE3Njg5OTQzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Thông báo',
      time: '5 giờ trước',
      views: 856,
    },
    {
      id: 3,
      title: 'Câu chuyện cảm động: Hành trình vượt qua bệnh tật',
      excerpt: 'Chia sẻ về hành trình điều trị và sự tri ân sâu sắc đến những người hiến máu...',
      image: 'https://images.unsplash.com/photo-1602021727639-deddded5dc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbmV3c3xlbnwxfHx8fDE3NjkwNTE0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Câu chuyện',
      time: '1 ngày trước',
      views: 2341,
    },
    {
      id: 4,
      title: 'Hướng dẫn chuẩn bị trước khi hiến máu',
      excerpt: 'Những điều cần lưu ý để quá trình hiến máu diễn ra an toàn và hiệu quả nhất...',
      image: 'https://images.unsplash.com/photo-1727956824599-9b66b1efcc6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwaGVybyUyMGJhbm5lcnxlbnwxfHx8fDE3NjkwNTE0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Tin tức',
      time: '2 ngày trước',
      views: 945,
    },
  ];

  return (
    <div className="min-h-full bg-muted">
      <PageHeader title="Tin tức & Sự kiện" onBack={onBack || (() => {})} />
      
      {/* Categories */}
      <div className="px-4 py-3 bg-card border-b border-border overflow-x-auto">
        <div className="flex space-x-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                index === 0
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-accent text-accent-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured News */}
      <div className="p-4">
        <div className="bg-card rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-48">
            <ImageWithFallback
              src={news[0].image}
              alt={news[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-medium">
                {news[0].category}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h2 className="font-bold text-card-foreground mb-2">{news[0].title}</h2>
            <p className="text-sm text-muted-foreground mb-3">{news[0].excerpt}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {news[0].time}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {news[0].views}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="px-4 pb-4 space-y-3">
        {news.slice(1).map((item) => (
          <div key={item.id} className="bg-card rounded-xl shadow-sm overflow-hidden flex">
            <div className="w-28 h-28 flex-shrink-0">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-3">
              <div className="mb-2">
                <span className="text-xs text-destructive font-medium">{item.category}</span>
              </div>
              <h3 className="font-medium text-card-foreground text-sm mb-2 line-clamp-2">
                {item.title}
              </h3>
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.time}
                </span>
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {item.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}