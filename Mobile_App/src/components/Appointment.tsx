import { Calendar, MapPin, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { PageHeader } from './PageHeader';

interface AppointmentProps {
  hasHealthDeclaration: boolean;
  onNavigateToDeclaration: () => void;
  onBack?: () => void;
}

export function Appointment({ hasHealthDeclaration, onNavigateToDeclaration, onBack }: AppointmentProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const locations = [
    { id: 1, name: 'Bệnh viện Chợ Rẫy', address: 'Q.5, TP.HCM', available: true },
    { id: 2, name: 'Bệnh viện Bình Dân', address: 'Q.3, TP.HCM', available: true },
    { id: 3, name: 'Bệnh viện Nhi Đồng 1', address: 'Q.10, TP.HCM', available: false },
    { id: 4, name: 'Bệnh viện 115', address: 'Q.10, TP.HCM', available: true },
  ];

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
  ];

  // Show warning if no health declaration
  if (!hasHealthDeclaration) {
    return (
      <div className="min-h-full bg-background">
        <div className="bg-card rounded-t-[32px] px-4 pt-6 mt-4 min-h-[calc(100vh-140px)]">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            
            <h2 className="text-xl font-bold text-foreground mb-3 text-center">
              Chưa có kê khai sức khỏe
            </h2>
            
            <p className="text-sm text-foreground/70 text-center mb-8 px-6">
              Bạn cần hoàn thành kê khai sức khỏe trước khi đăng ký hiến máu để đảm bảo an toàn cho người hiến và người nhận.
            </p>

            <div className="w-full px-6 space-y-3">
              <button
                onClick={onNavigateToDeclaration}
                className="w-full bg-destructive text-destructive-foreground py-4 rounded-2xl font-bold hover:bg-destructive/90 transition-colors shadow-lg"
              >
                Kê khai sức khỏe ngay
              </button>
              
              <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4">
                <h4 className="font-bold text-destructive text-sm mb-2">Lưu ý:</h4>
                <ul className="text-xs text-foreground/70 space-y-1">
                  <li>• Kê khai phải được thực hiện trước mỗi lần hiến máu</li>
                  <li>• Thông tin kê khai giúp đảm bảo chất lượng máu</li>
                  <li>• Mất khoảng 5-10 phút để hoàn thành</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background">
      <PageHeader title="Đăng ký hiến máu" onBack={onBack || (() => {})} />
      
      {/* Main Content Card */}
      <div className="px-4 pt-4 pb-20">
        {/* Select Location */}
        <div className="mb-6">
          <label className="text-sm font-bold text-foreground mb-3 block">
            Chọn điểm hiến máu <span className="text-destructive">*</span>
          </label>
          <div className="space-y-2">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => location.available && setSelectedLocation(location.name)}
                disabled={!location.available}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedLocation === location.name
                    ? 'border-destructive bg-destructive/5'
                    : location.available
                    ? 'border-border bg-white hover:border-destructive/30'
                    : 'border-border bg-gray-100 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-bold text-foreground mb-1">{location.name}</div>
                    <div className="text-sm text-foreground/60 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {location.address}
                    </div>
                  </div>
                  {location.available ? (
                    <ChevronRight className="w-5 h-5 text-foreground/40" />
                  ) : (
                    <span className="text-xs text-destructive font-medium bg-destructive/10 px-2 py-1 rounded-full">
                      Đã đầy
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Select Date */}
        {selectedLocation && (
          <div className="mb-6">
            <label className="text-sm font-bold text-foreground mb-3 block">
              Chọn ngày <span className="text-destructive">*</span>
            </label>
            <div className="bg-white rounded-2xl p-4 border-2 border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-foreground">Tháng 1, 2026</span>
                <Calendar className="w-5 h-5 text-foreground/40" />
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[22, 23, 24, 25, 26, 27, 28].map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(2026, 0, day))}
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium ${
                      selectedDate?.getDate() === day
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-gray-100 text-foreground hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Select Time */}
        {selectedDate && selectedLocation && (
          <div className="mb-6">
            <label className="text-sm font-bold text-foreground mb-3 block">
              Chọn khung giờ <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`p-4 rounded-2xl border-2 font-medium transition-all ${
                    selectedTime === slot
                      ? 'border-destructive bg-destructive/5 text-destructive'
                      : 'border-border bg-white text-foreground hover:border-destructive/30'
                  }`}
                >
                  <Clock className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">{slot}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedLocation && selectedDate && selectedTime && (
          <div className="pb-6">
            <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-6 text-base rounded-2xl font-bold shadow-lg">
              Xác nhận đăng ký hiến máu
            </Button>
            <p className="text-xs text-foreground/60 text-center mt-3">
              Bạn sẽ nhận được xác nhận qua SMS và email
            </p>
          </div>
        )}
      </div>
    </div>
  );
}