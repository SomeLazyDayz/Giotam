import { useState, useEffect } from 'react';
import { api } from '../api';
import { Calendar, MapPin, Clock, ChevronRight, ClipboardList, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { PageHeader } from './PageHeader';

interface HealthQuestion {
  id: string;
  answer: boolean | null;
  vaccineType?: string;
}

interface DonateBloodProps {
  onComplete?: () => void;
  onBack?: () => void;
}

export function DonateBlood({ onComplete, onBack }: DonateBloodProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  
  // Health declaration completion state
  const [declarationCompleted, setDeclarationCompleted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Health questions state
  const [healthQuestions, setHealthQuestions] = useState<Record<string, HealthQuestion>>({
    q1: { id: 'q1', answer: null },
    q2: { id: 'q2', answer: null },
    q3_1: { id: 'q3_1', answer: null },
    q3_2: { id: 'q3_2', answer: null },
    q3_3: { id: 'q3_3', answer: null },
    q3_4: { id: 'q3_4', answer: null },
    q3_5: { id: 'q3_5', answer: null },
    q3_6: { id: 'q3_6', answer: null },
    q3_7: { id: 'q3_7', answer: null },
    q3_8: { id: 'q3_8', answer: null, vaccineType: '' },
    q3_9: { id: 'q3_9', answer: null },
    q4_1: { id: 'q4_1', answer: null },
    q4_2: { id: 'q4_2', answer: null },
    q5_1: { id: 'q5_1', answer: null },
    q5_2: { id: 'q5_2', answer: null },
    q6: { id: 'q6', answer: null },
  });

  // 1. Khai báo state để chứa danh sách bệnh viện
  const [locations, setLocations] = useState<any[]>([]);

  // 2. Tự động gọi API khi người dùng mở màn hình này
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await api.get('/hospitals');
        
        // API của bạn trả về { id, name, lat, lng }, ta cần format lại cho khớp với giao diện
        const formattedLocations = response.data.hospitals.map((h: any) => ({
          id: h.id,
          name: h.name,
          address: `Tọa độ: ${h.lat}, ${h.lng}`, // Tạm hiển thị tọa độ vì DB chưa có tên đường
          available: true // Mặc định cho phép chọn
        }));
        
        setLocations(formattedLocations);
      } catch (error) {
        console.error("Lỗi tải danh sách bệnh viện:", error);
      }
    };

    fetchHospitals();
  }, []); 

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
  ];

  const handleAnswerChange = (questionId: string, answer: boolean) => {
    setHealthQuestions({
      ...healthQuestions,
      [questionId]: { ...healthQuestions[questionId], answer },
    });
  };

  const handleVaccineTypeChange = (value: string) => {
    setHealthQuestions({
      ...healthQuestions,
      q3_8: { ...healthQuestions.q3_8, vaccineType: value },
    });
  };

  const allQuestionsAnswered = () => {
    return Object.values(healthQuestions).every((q) => {
      if (q.id === 'q3_8' && q.answer === true) {
        return q.vaccineType && q.vaccineType.trim() !== '';
      }
      return q.answer !== null;
    });
  };

  const canConfirmDeclaration = () => {
    return allQuestionsAnswered() && agreedToTerms;
  };

  const handleConfirmDeclaration = () => {
    if (canConfirmDeclaration()) {
      setDeclarationCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const QuestionRow = ({ questionId, text }: { questionId: string; text: string }) => (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
      <p className="text-sm text-foreground flex-1">{text}</p>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => handleAnswerChange(questionId, true)}
          className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
            healthQuestions[questionId].answer === true
              ? 'border-destructive bg-destructive text-destructive-foreground'
              : 'border-border bg-card text-foreground hover:border-muted-foreground/30'
          }`}
        >
          Có
        </button>
        <button
          onClick={() => handleAnswerChange(questionId, false)}
          className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
            healthQuestions[questionId].answer === false
              ? 'border-destructive bg-destructive text-destructive-foreground'
              : 'border-border bg-card text-foreground hover:border-muted-foreground/30'
          }`}
        >
          Không
        </button>
      </div>
    </div>
  );

  if (declarationCompleted) {
    return (
      <div className="min-h-full bg-muted pb-20">
        {/* Header */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-card-foreground">Hiến máu</h1>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">Đã kê khai</span>
            </div>
          </div>
        </div>

        {/* Appointment Section */}
        <div className="p-4">
          <h2 className="font-bold text-card-foreground mb-3">Đặt lịch hiến máu</h2>

          {/* Select Location */}
          <div className="mb-4">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Chọn điểm hiến máu <span className="text-destructive">*</span>
            </label>
            <div className="space-y-2">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => location.available && setSelectedLocation(location.name)}
                  disabled={!location.available}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedLocation === location.name
                      ? 'border-destructive bg-destructive/5'
                      : location.available
                      ? 'border-border bg-card hover:border-muted-foreground/30'
                      : 'border-border bg-muted opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-card-foreground mb-1">{location.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {location.address}
                      </div>
                    </div>
                    {location.available ? (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <span className="text-xs text-destructive font-medium">Đã đầy</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Select Date */}
          {selectedLocation && (
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Chọn ngày <span className="text-destructive">*</span>
              </label>
              <div className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-card-foreground">Tháng 1, 2026</span>
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-7 gap-2 mt-3">
                  {[22, 23, 24, 25, 26, 27, 28].map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(new Date(2026, 0, day))}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                        selectedDate?.getDate() === day
                          ? 'bg-destructive text-destructive-foreground font-medium'
                          : 'bg-accent text-accent-foreground hover:bg-muted'
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
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Chọn khung giờ <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      selectedTime === slot
                        ? 'border-destructive bg-destructive/5 text-destructive'
                        : 'border-border bg-card text-foreground hover:border-muted-foreground/30'
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1" />
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {selectedLocation && selectedDate && selectedTime && (
            <div className="mt-6">
              <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-6 text-base">
                Xác nhận đăng ký hiến máu
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Bạn sẽ nhận được xác nhận qua SMS và email
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-muted">
      <PageHeader title="Kê khai sức khỏe" onBack={onBack || (() => {})} />
      
      <div className="p-4 space-y-4 pb-20">
        {/* Question 1 */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="font-medium text-foreground mb-3">1. Quý vị đã từng hiến máu chưa?</h3>
          <QuestionRow questionId="q1" text="" />
        </div>

        {/* Question 2 */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="font-medium text-foreground mb-3">
            2. Quý vị đã từng mắc các bệnh như tâm thần, thần kinh, hô hấp, tiêu hóa, vàng da/viêm gan, tim mạch, huyết áp thấp/cao, bệnh thận, ho kéo dài, bệnh máu, lao, ung thư, v.v?
          </h3>
          <QuestionRow questionId="q2" text="" />
        </div>

        {/* Question 3 */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="font-medium text-foreground mb-4">3. Trong vòng 6 tháng gần đây, Quý vị có:</h3>
          <div className="space-y-0">
            <QuestionRow questionId="q3_1" text="Sút cân >= 4kg không rõ nguyên nhân? nổi hạch kéo dài?" />
            <QuestionRow questionId="q3_2" text="Phẫu thuật?" />
            <QuestionRow questionId="q3_3" text="Xăm mình, xỏ lỗ tai, lỗ mũi, châm cứu?" />
            <QuestionRow questionId="q3_4" text="Được truyền máu, chế phẩm máu?" />
            <QuestionRow questionId="q3_5" text="Sử dụng ma túy, tiêm chích?" />
            <QuestionRow questionId="q3_6" text="Quan hệ tình dục với người nhiễm hoặc có nguy cơ lây nhiễm HIV, viêm gan?" />
            <QuestionRow questionId="q3_7" text="Quan hệ tình dục với nhiều người và/hoặc không có biện pháp an toàn tránh lây nhiễm?" />
            
            {/* Vaccine question with input */}
            <div className="flex items-start justify-between gap-4 py-3 border-b border-border">
              <p className="text-sm text-foreground flex-1">Tiêm vắc xin phòng bệnh?</p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleAnswerChange('q3_8', true)}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    healthQuestions.q3_8.answer === true
                      ? 'border-destructive bg-destructive text-destructive-foreground'
                      : 'border-border bg-card text-foreground hover:border-muted-foreground/30'
                  }`}
                >
                  Có
                </button>
                <button
                  onClick={() => handleAnswerChange('q3_8', false)}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    healthQuestions.q3_8.answer === false
                      ? 'border-destructive bg-destructive text-destructive-foreground'
                      : 'border-border bg-card text-foreground hover:border-muted-foreground/30'
                  }`}
                >
                  Không
                </button>
              </div>
            </div>
            {healthQuestions.q3_8.answer === true && (
              <div className="pb-3 px-4">
                <label className="text-xs text-muted-foreground mb-1 block">Loại vắc xin:</label>
                <input
                  type="text"
                  placeholder="Nhập loại vắc xin"
                  value={healthQuestions.q3_8.vaccineType}
                  onChange={(e) => handleVaccineTypeChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-destructive/50"
                />
              </div>
            )}
            
            <QuestionRow questionId="q3_9" text="Có đến/ở vùng có dịch lưu hành (sốt xuất huyết, sốt rét, bò điên, Ebola, Zika, Covid-19,...)?" />
          </div>
        </div>

        {/* Question 4 */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="font-medium text-foreground mb-4">4. Trong vòng 02 tuần gần đây, Quý vị có:</h3>
          <div className="space-y-0">
            <QuestionRow questionId="q4_1" text="Tiếp xúc với người bệnh/nghi ngờ nhiễm Covid-19?" />
            <QuestionRow questionId="q4_2" text="Xuất hiện ít nhất 1 trong các dấu hiệu: sốt, ho, khó thở, đau họng, mệt mỏi, thay đổi vị giác, viêm phổi, tiêu chảy?" />
          </div>
        </div>

        {/* Question 5 */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="font-medium text-foreground mb-4">5. Trong vòng 01 tuần gần đây, Quý vị có:</h3>
          <div className="space-y-0">
            <QuestionRow questionId="q5_1" text="Dùng thuốc kháng sinh, Aspirin, Corticoid,...?" />
            <QuestionRow questionId="q5_2" text="Đi khám sức khỏe, làm xét nghiệm, chữa răng?" />
          </div>
        </div>

        {/* Question 6 */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="font-medium text-foreground mb-3">
            6. Quý vị hiện là đối tượng khuyết tật nặng, nạn nhân chất độc màu da cam không?
          </h3>
          <QuestionRow questionId="q6" text="" />
        </div>

        {/* Commitment Section */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-destructive/30">
          <h3 className="font-medium text-foreground mb-3">Cam kết</h3>
          <div className="text-sm text-foreground space-y-3 mb-4">
            <p>
              Tôi đã đọc, hiểu rõ, trả lời trung thực và cam kết chịu trách nhiệm về các thông tin cá nhân và các câu hỏi dành cho người hiến máu. Nếu phát hiện thấy nguy cơ mắc bệnh của bản thân, tôi sẽ báo ngay nhằm bảo đảm an toàn cho người bệnh.
            </p>
            <p>
              Tôi đồng ý việc đơn vị máu của tôi được xét nghiệm sàng lọc giang mai, viêm gan B, viêm gan C và HIV theo quy định hiện hành. Tôi đã được thông báo về những lợi ích và những phản ứng không mong muốn có thể xảy ra khi tham gia hiến máu.
            </p>
            <p className="font-medium">
              Hôm nay, tôi hoàn toàn khỏe mạnh và tình nguyện sẵn sàng hiến máu.
            </p>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-destructive/5 rounded-lg">
            <input
              type="checkbox"
              id="agreement"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-destructive rounded focus:ring-destructive"
            />
            <label htmlFor="agreement" className="text-sm text-foreground flex-1 cursor-pointer font-medium">
              Tôi cam kết những thông tin trên là đúng sự thật
            </label>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="pt-2">
          <Button
            onClick={handleConfirmDeclaration}
            disabled={!canConfirmDeclaration()}
            className={`w-full py-6 text-base ${
              canConfirmDeclaration()
                ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                : 'bg-muted-foreground/20 text-muted-foreground cursor-not-allowed'
            }`}
          >
            Xác nhận kê khai
          </Button>
          {!allQuestionsAnswered() && (
            <p className="text-xs text-destructive text-center mt-2">
              Vui lòng trả lời tất cả các câu hỏi
            </p>
          )}
        </div>
      </div>
    </div>
  );
}