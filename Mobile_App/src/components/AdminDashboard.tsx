import { useState, useEffect } from 'react';
import { Users, Hospital, LogOut, CheckCircle, Filter, Droplets, RefreshCw } from 'lucide-react';
import { api } from '../api';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface PendingRecord {
  record_id: number;
  user_name: string;
  phone: string;
  blood_type: string;
  donation_date: string;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState({ users: 0, hospitals: 0, accepted: 0 });
  const [pendingRecords, setPendingRecords] = useState<PendingRecord[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PendingRecord | null>(null);
  const [amountMl, setAmountMl] = useState('350');
  const [donationType, setDonationType] = useState('whole_blood');
  const [donationDate, setDonationDate] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isLoadingPending, setIsLoadingPending] = useState(false);

  // Stats filter state
  const [filterBloodType, setFilterBloodType] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [donationStats, setDonationStats] = useState<{ total_donations: number; total_ml: number; by_blood_type: Record<string, number>; by_donation_type: Record<string, number> } | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const fetchPendingDonations = async () => {
    setIsLoadingPending(true);
    try {
      const pendingRes = await api.get('/admin/pending_donations');
      setPendingRecords(pendingRes.data.pending_donations || []);
    } catch (error) {
      console.error('Lỗi khi tải danh sách pending:', error);
    } finally {
      setIsLoadingPending(false);
    }
  };

  const fetchDonationStats = async () => {
    setIsLoadingStats(true);
    try {
      const params: Record<string, string> = {};
      if (filterBloodType) params.blood_type = filterBloodType;
      if (filterDateFrom) params.date_from = filterDateFrom;
      if (filterDateTo) params.date_to = filterDateTo;
      const res = await api.get('/admin/donation_stats', { params });
      setDonationStats(res.data);
    } catch (e) {
      console.error('Lỗi tải thống kê:', e);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await api.get('/users');
        const hospitalRes = await api.get('/hospitals');
        setStats({ users: userRes.data.count || 0, hospitals: hospitalRes.data.count || 0, accepted: 0 });
      } catch (error) {
        console.error('Error fetching admin stats', error);
        setStats({ users: 0, hospitals: 0, accepted: 0 });
      }
    };
    fetchStats();
    fetchPendingDonations();
    fetchDonationStats();
  }, []);

  const handleOpenConfirm = (record: PendingRecord) => {
    setSelectedRecord(record);
    setAmountMl('350');
    setDonationType('whole_blood');
    const dateStr = record.donation_date ? new Date(record.donation_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    setDonationDate(dateStr);
    setShowConfirmModal(true);
  };

  const handleConfirmDonation = async () => {
    if (!selectedRecord) return;
    try {
      await api.post(`/admin/confirm_donation/${selectedRecord.record_id}`, {
        amount_ml: parseInt(amountMl, 10),
        donation_type: donationType,
        donation_date: donationDate
      });
      setShowConfirmModal(false);
      setToastMessage('Ghi nhận thành công');
      setTimeout(() => setToastMessage(''), 3000);

      // Refresh list
      fetchPendingDonations();
    } catch (error) {
      console.error('Lỗi khi xác nhận hiến máu:', error);
      alert('Có lỗi xảy ra khi xác nhận!');
    }
  };


  return (
    <div className="min-h-full bg-background pb-24 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg animate-in slide-in-from-top-4">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-destructive px-6 pt-12 pb-6 rounded-b-[40px] shadow-lg sticky top-0 z-10 w-[393px]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button onClick={onLogout} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-white/80 mt-2 text-sm">Quản lý hệ thống Giọt Ấm</p>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center border border-muted">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-destructive" />
            </div>
            <div className="text-xl font-bold text-foreground">{stats.users}</div>
            <div className="text-[10px] text-muted-foreground mt-1 text-center">Tình nguyện viên</div>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center border border-muted">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <Hospital className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-xl font-bold text-foreground">{stats.hospitals}</div>
            <div className="text-[10px] text-muted-foreground mt-1 text-center">Bệnh viện</div>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center border border-primary/20">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-xl font-bold text-foreground">{stats.accepted}</div>
            <div className="text-[10px] text-muted-foreground mt-1 text-center font-bold text-green-600">Ca chờ hiến</div>
          </div>
        </div>

        {/* Donation Stats Section */}
        <div className="bg-card rounded-3xl p-6 shadow-lg border border-muted">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-5 h-5 text-destructive" />
            <h2 className="text-lg font-bold text-foreground">Thống kê hiến máu thực tế</h2>
          </div>

          {/* Filters */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bộ lọc</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Nhóm máu</label>
                <select
                  value={filterBloodType}
                  onChange={(e) => setFilterBloodType(e.target.value)}
                  className="w-full h-9 bg-muted/50 border border-border rounded-xl px-3 text-sm focus:outline-none"
                >
                  <option value="">Tất cả</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={fetchDonationStats}
                  disabled={isLoadingStats}
                  className="w-full h-9 bg-destructive hover:bg-destructive/90 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStats ? 'animate-spin' : ''}`} />
                  {isLoadingStats ? 'Đang tải...' : 'Lọc'}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Từ ngày</label>
                <input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="w-full h-9 bg-muted/50 border border-border rounded-xl px-3 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Đến ngày</label>
                <input type="date" value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)}
                  className="w-full h-9 bg-muted/50 border border-border rounded-xl px-3 text-sm focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Stats Results */}
          {donationStats ? (
            <div className="space-y-3">
              {/* Total cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-destructive">{donationStats.total_donations}</div>
                  <div className="text-xs text-muted-foreground mt-1">Lượt hiến</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">{(donationStats.total_ml / 1000).toFixed(1)}L</div>
                  <div className="text-xs text-muted-foreground mt-1">Tổng lượng máu</div>
                </div>
              </div>

              {/* By blood type */}
              {Object.keys(donationStats.by_blood_type).length > 0 && (
                <div className="bg-muted/40 rounded-2xl p-4">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Theo nhóm máu</div>
                  <div className="space-y-2">
                    {Object.entries(donationStats.by_blood_type).map(([bt, count]) => (
                      <div key={bt} className="flex items-center gap-3">
                        <span className="bg-destructive/10 text-destructive text-xs font-bold px-2 py-0.5 rounded-lg w-10 text-center shrink-0">{bt}</span>
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-destructive h-full rounded-full transition-all"
                            style={{ width: `${(count / donationStats.total_donations) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-foreground w-6 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* By donation type */}
              {Object.keys(donationStats.by_donation_type).length > 0 && (
                <div className="bg-muted/40 rounded-2xl p-4">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Theo loại hiến</div>
                  <div className="space-y-1.5">
                    {Object.entries(donationStats.by_donation_type).map(([dt, count]) => {
                      const labels: Record<string, string> = { whole_blood: '🩸 Toàn phần', platelets: '🧤 Tiểu cầu', plasma: '💧 Huyết tương', red_cells: '🔴 Hồng cầu', white_cells: '⚪ Bạch cầu' };
                      return (
                        <div key={dt} className="flex justify-between items-center text-sm">
                          <span className="text-foreground">{labels[dt] || dt}</span>
                          <span className="font-bold text-foreground">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {donationStats.total_donations === 0 && (
                <div className="text-center py-4 text-muted-foreground text-sm italic">Chưa có dữ liệu hiến máu</div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm">Nhấn "Lọc" để xem thống kê</div>
          )}
        </div>

        {/* Pending Donations Table */}
        <div className="bg-card rounded-3xl p-6 shadow-lg border border-muted mt-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Người đã xác nhận tham gia</h2>
            <button
              onClick={fetchPendingDonations}
              disabled={isLoadingPending}
              className="flex items-center gap-1.5 text-xs bg-destructive/10 hover:bg-destructive/20 disabled:opacity-50 text-destructive px-3 py-1.5 rounded-xl font-semibold transition-colors border border-destructive/20"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingPending ? 'animate-spin' : ''}`} />
              {isLoadingPending ? 'Đang tải...' : 'Làm mới'}
            </button>
          </div>
          <div className="space-y-4 pt-2">
            {pendingRecords.length === 0 ? (
              <div className="text-center py-8 text-foreground/60 italic border border-dashed border-muted rounded-2xl">
                Không có sự kiện mới chưa xác nhận
              </div>
            ) : (
              pendingRecords.map((record) => (
                <div key={record.record_id} className="bg-background border border-muted rounded-2xl p-4 shadow-sm relative overflow-hidden">
                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-destructive/60"></div>
                  
                  <div className="flex justify-between items-start mb-3 pl-2">
                    <div>
                      <h3 className="font-bold text-foreground text-base tracking-tight">{record.user_name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 font-medium">{record.phone}</p>
                    </div>
                    <div className="bg-destructive/10 text-destructive text-sm font-bold px-3 py-1.5 rounded-xl border border-destructive/20 shadow-sm">
                      {record.blood_type || 'Chưa rõ'}
                    </div>
                  </div>
                  
                  <div className="pl-2 mt-4">
                    <button
                      onClick={() => handleOpenConfirm(record)}
                      className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white py-3 rounded-xl font-bold transition-all shadow-md shadow-green-500/20"
                    >
                      Xác nhận thông tin
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-foreground mb-2">Xác nhận hiến máu</h3>
            <p className="text-sm text-muted-foreground mb-6">Vui lòng nhập dung tích máu thực tế (ml)</p>

            <div className="mb-6 space-y-4">
              {/* Trường Chọn Loại Hiến */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">🩸 Loại hiến máu</label>
                <select
                  value={donationType}
                  onChange={(e) => setDonationType(e.target.value)}
                  className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-destructive/20 focus:border-destructive transition-all"
                >
                  <option value="whole_blood">🩸 Máu toàn phần (tất cả thành phần)</option>
                  <option value="platelets">🧤 Tiểu cầu (gạn tách)</option>
                  <option value="plasma">💧 Huyết tương (gạn tách)</option>
                  <option value="red_cells">🔴 Hồng cầu lắng (gạn tách)</option>
                  <option value="white_cells">⚪ Bạch cầu (gạn tách)</option>
                </select>
              </div>

              {/* Thêm trường Ngày Hiến Máu */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ngày hiến máu</label>
                <input
                  type="date"
                  value={donationDate}
                  onChange={(e) => setDonationDate(e.target.value)}
                  className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-destructive/20 focus:border-destructive transition-all"
                />
              </div>

              {/* Phần Dung tích máu giữ nguyên */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Chọn mức thể tích</label>
                <div className="flex gap-2">
                  <button onClick={() => setAmountMl('250')} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors border ${amountMl === '250' ? 'border-destructive bg-destructive/10 text-destructive' : 'border-border text-foreground hover:bg-muted'}`}>250 ml</button>
                  <button onClick={() => setAmountMl('350')} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors border ${amountMl === '350' ? 'border-destructive bg-destructive/10 text-destructive' : 'border-border text-foreground hover:bg-muted'}`}>350 ml</button>
                  <button onClick={() => setAmountMl('450')} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors border ${amountMl === '450' ? 'border-destructive bg-destructive/10 text-destructive' : 'border-border text-foreground hover:bg-muted'}`}>450 ml</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Hoặc nhập dung tích khác (ml)</label>
                <input
                  type="number"
                  value={amountMl}
                  onChange={(e) => setAmountMl(e.target.value)}
                  className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-destructive/20 focus:border-destructive transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-muted text-foreground font-bold rounded-xl hover:bg-muted/80 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDonation}
                className="flex-1 py-3 bg-destructive text-white font-bold rounded-xl hover:bg-destructive/90 transition-colors shadow-lg shadow-destructive/30"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
