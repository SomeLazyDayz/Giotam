import React, { useState } from 'react';
// Cập nhật đường dẫn import để trỏ vào thư mục api
import { createAlert } from './api/api'; 

// --- Định nghĩa kiểu dữ liệu (Interfaces) ---
interface UserData {
  id: number;
  name: string;
  phone: string;
  blood_type: string;
}

interface SearchResultItem {
  user: UserData;
  distance_km: number;
  ai_score: number;
}

// --- Component Trang ---
const FindDonorsPage: React.FC = () => {
  // --- Quản lý trạng thái (State) ---
  const [bloodType, setBloodType] = useState('O+');
  const [radius, setRadius] = useState(10);
  const [foundUsers, setFoundUsers] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Hàm xử lý sự kiện tìm kiếm ---
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setFoundUsers([]);

    const searchData = {
      hospital_id: 1, // Tạm thời cố định là BV Chợ Rẫy
      blood_type: bloodType,
      radius_km: radius
    };

    try {
      const result = await createAlert(searchData);
      if (result && result.top_50_users) {
        setFoundUsers(result.top_50_users);
      } else {
        setFoundUsers([]);
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra khi tìm kiếm, vui lòng thử lại.");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Giao diện (Render) ---
  return (
    <main style={{ padding: '2rem', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>Tìm kiếm người hiến máu</h2>
        <p>Chọn nhóm máu và bán kính để tìm những người hiến phù hợp nhất gần bạn.</p>
        
        <div style={{ margin: '20px 0', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} style={{ padding: '10px', fontSize: '1rem' }}>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <input 
            type="number" 
            value={radius} 
            onChange={(e) => setRadius(parseInt(e.target.value, 10))} 
            style={{ padding: '10px', width: '80px', fontSize: '1rem' }}
          />
          <span>km</span>
          <button onClick={handleSearch} disabled={isLoading} style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '1rem', marginLeft: 'auto' }}>
            {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
          </button>
        </div>

        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

        <div style={{ marginTop: '30px' }}>
          <h3>Kết quả: {foundUsers.length > 0 ? `${foundUsers.length} người phù hợp` : 'Chưa có'}</h3>
          {foundUsers.map(item => (
            <div key={item.user.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h4>{item.user.name}</h4>
              <p><strong>SĐT:</strong> {item.user.phone}</p>
              <p><strong>Khoảng cách:</strong> {item.distance_km} km</p>
              <p><strong>Điểm phù hợp (AI):</strong> {item.ai_score}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FindDonorsPage;

