import { ClipboardList, Calendar, Phone, Clock, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const mainActions = [
    {
      id: 'health-declaration',
      title: 'Kê khai\nsức khỏe',
      icon: ClipboardList,
    },
    {
      id: 'register-donation',
      title: 'Đăng ký\nhiến máu',
      icon: Calendar,
    },
    {
      id: 'donation-history',
      title: 'Lịch sử\nhiến máu',
      icon: Clock,
    },
    {
      id: 'hotline',
      title: 'Hotline\nhỗ trợ',
      icon: Phone,
    },
  ];

  const donationRequests = [
    {
      id: 1,
      bloodType: 'O+',
      hospital: 'Bệnh viện Chợ Rẫy',
      location: 'Quận 5, TP.HCM',
      urgency: 'Cần gấp',
      amount: '500ml',
    },
    {
      id: 2,
      bloodType: 'A+',
      hospital: 'Bệnh viện Bình Dân',
      location: 'Quận 3, TP.HCM',
      urgency: 'Khẩn cấp',
      amount: '350ml',
    },
  ];

  const benefits = [
    {
      id: 1,
      title: 'Tăng cường sức khỏe tim mạch',
      description: 'Hiến máu giúp giảm nguy cơ mắc bệnh tim mạch và đột quỵ',
    },
  ];

  return (
    <div className="min-h-full bg-background pb-24">
      {/* Main Actions - 4 buttons in a row */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-4 gap-3">
          {mainActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-2">
                  <Icon className="w-7 h-7 text-muted-foreground" strokeWidth={2} />
                </div>
                <span className="text-xs text-foreground text-center leading-tight whitespace-pre-line">
                  {action.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Blood Request Section */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-destructive">Yêu cầu hiến máu</h2>
          <button className="text-destructive text-sm font-medium flex items-center gap-1">
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable cards */}
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
          {donationRequests.map((request) => (
            <div
              key={request.id}
              className="min-w-[340px] bg-card rounded-3xl p-6 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-4xl font-bold text-destructive mb-1">
                    {request.bloodType}
                  </div>
                  <span className="inline-block px-3 py-1 bg-red-100 text-destructive text-xs font-bold rounded-full">
                    {request.urgency}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Số lượng</div>
                  <div className="text-lg font-bold text-foreground">{request.amount}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-sm font-medium text-foreground">{request.hospital}</div>
                  <div className="text-xs text-muted-foreground">{request.location}</div>
                </div>
                <button className="w-full bg-destructive text-destructive-foreground py-3 rounded-xl font-bold hover:bg-destructive/90 transition-colors mt-4">
                  Đăng ký hiến máu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="px-4 mt-6">
        <h2 className="text-xl font-bold text-destructive mb-4">Lợi ích hiến máu</h2>
        
        <div className="bg-card rounded-3xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-2">
                Tăng cường sức khỏe tim mạch
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hiến máu giúp giảm nguy cơ mắc bệnh tim mạch và đột quỵ. Nghiên cứu cho thấy những người hiến máu thường xuyên có sức khỏe tim mạch tốt hơn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
