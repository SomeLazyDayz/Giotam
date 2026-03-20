import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function DonationInfoPage() {
  return (
    <div className="min-h-screen bg-[#FBF2E1]" style={{ fontFamily: 'Times New Roman, serif' }}>
      <Header />
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-4 text-4xl font-bold uppercase text-[#930511]">
            Tiêu chuẩn hiến máu nhân đạo
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Thông tin quan trọng dành cho tình nguyện viên hiến máu
          </p>

          {/* Age and Weight Requirements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#930511]">Yêu cầu về độ tuổi và cân nặng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Độ tuổi:</p>
                  <p>Từ 18 đến 60 tuổi (lần hiến đầu tiên không quá 60 tuổi)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Cân nặng:</p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Nam giới: ≥ 45 kg</li>
                    <li>Nữ giới: ≥ 42 kg</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Conditions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#930511]">Tình trạng sức khỏe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Được phép hiến máu khi:
                </h3>
                <ul className="space-y-2 ml-7">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Sức khỏe tốt, không mắc bệnh cấp tính hoặc mãn tính</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Huyết áp: Tâm thu 100-160 mmHg, Tâm trương 60-100 mmHg</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Mạch: 60-100 lần/phút, đều</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Nhiệt độ cơ thể: {'<'} 37.5°C</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Da niêm không vàng, không xuất huyết bất thường</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Không được hiến máu khi:
                </h3>
                <ul className="space-y-2 ml-7">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Mắc các bệnh truyền nhiễm: HIV/AIDS, viêm gan B, C, giang mai, sốt rét</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Đang mắc bệnh cấp tính hoặc bệnh mãn tính đang tiến triển</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Phụ nữ đang mang thai, cho con bú hoặc trong thời kỳ hành kinh</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Đang sử dụng ma túy, nghiện rượu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Có hành vi nguy cơ cao lây nhiễm HIV</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Time Intervals */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#930511]">Khoảng cách giữa các lần hiến máu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-[#930511] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-2">Thời gian chờ tối thiểu:</p>
                  <ul className="space-y-2">
                    <li>• Hiến toàn phần: Tối thiểu 12 tuần (3 tháng) giữa 2 lần hiến</li>
                    <li>• Số lần hiến tối đa: 5 lần/năm đối với nam, 4 lần/năm đối với nữ</li>
                    <li>• Thể tích hiến mỗi lần: 250-350ml (tùy cân nặng và tình trạng sức khỏe)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle Considerations */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#930511]">Lưu ý về sinh hoạt và thuốc men</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Hoãn hiến máu khi:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Đang sử dụng thuốc kháng sinh (chờ 1 tuần sau khi ngừng thuốc)</li>
                  <li>• Vừa tiêm vaccine (chờ từ 2-4 tuần tùy loại vaccine)</li>
                  <li>• Vừa nhổ răng (chờ 1 tuần)</li>
                  <li>• Vừa phẫu thuật nhỏ (chờ 6 tháng)</li>
                  <li>• Vừa xăm mình, xỏ khuyên (chờ 12 tháng)</li>
                  <li>• Vừa đi du lịch vùng dịch sốt rét (chờ 12 tháng)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#930511]">Lợi ích của việc hiến máu</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#930511] text-xl">•</span>
                  <span><strong>Giảm nguy cơ bệnh tim mạch:</strong> Hiến máu giúp giảm độ nhớt của máu, cải thiện lưu thông máu</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#930511] text-xl">•</span>
                  <span><strong>Kích thích tạo máu:</strong> Cơ thể sẽ sản xuất tế bào máu mới, duy trì sức khỏe hệ tuần hoàn</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#930511] text-xl">•</span>
                  <span><strong>Kiểm tra sức khỏe miễn phí:</strong> Được xét nghiệm nhóm máu, tầm soát các bệnh truyền nhiễm</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#930511] text-xl">•</span>
                  <span><strong>Góp phần cứu người:</strong> Mỗi lần hiến máu có thể cứu sống tới 3 người</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#930511] text-xl">•</span>
                  <span><strong>Đốt cháy calo:</strong> Mỗi lần hiến máu đốt cháy khoảng 650 calo</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Before and After */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#930511]">Lưu ý trước và sau khi hiến máu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3">Trước khi hiến máu:</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Ngủ đủ giấc (ít nhất 6-8 tiếng)</li>
                  <li>• Ăn uống đầy đủ, không hiến máu khi đói</li>
                  <li>• Uống nhiều nước (2-3 cốc nước trước khi hiến)</li>
                  <li>• Tránh đồ uống có cồn trước 24 giờ</li>
                  <li>• Mang theo CMND/CCCD</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Sau khi hiến máu:</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Nghỉ ngơi 10-15 phút tại chỗ</li>
                  <li>• Uống nhiều nước, ăn nhẹ</li>
                  <li>• Không tháo băng trong vòng 4 giờ</li>
                  <li>• Tránh vận động mạnh trong 24 giờ</li>
                  <li>• Không lái xe máy, xe ô tô ngay sau khi hiến</li>
                  <li>• Bổ sung dinh dưỡng: Thịt, cá, trứng, rau xanh</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="bg-[#930511] text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Bạn đã sẵn sàng hiến máu?</h2>
            <p className="text-lg mb-6">
              Nếu bạn đáp ứng các tiêu chuẩn trên, hãy đăng ký ngay để tham gia vào hoạt động hiến máu nhân đạo!
            </p>
            <a href="/register">
              <button className="bg-white text-[#930511] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Đăng ký ngay
              </button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
