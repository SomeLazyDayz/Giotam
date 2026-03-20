/**
 * pushNotifications.ts
 * Khởi tạo và đăng ký push notification qua Firebase + Capacitor.
 * Gọi hàm initPushNotifications(userId) ngay sau khi user đăng nhập thành công.
 */

import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { api } from '../api';

/**
 * Khởi tạo push notification cho thiết bị Android.
 * @param userId - ID của user vừa đăng nhập
 */
export async function initPushNotifications(userId: number): Promise<void> {
  // Chỉ chạy trên thiết bị native (Android/iOS), không chạy trên browser web
  if (!Capacitor.isNativePlatform()) {
    console.log('[Push] Không phải thiết bị native, bỏ qua đăng ký push.');
    return;
  }

  try {
    // 1. Xin quyền thông báo từ người dùng
    const permResult = await PushNotifications.requestPermissions();
    if (permResult.receive !== 'granted') {
      console.warn('[Push] Người dùng từ chối quyền thông báo.');
      return;
    }

    // 2. Đăng ký với FCM để nhận token
    await PushNotifications.register();

    // 3. Lắng nghe sự kiện nhận được token → gửi lên server
    PushNotifications.addListener('registration', async (tokenData) => {
      const fcmToken = tokenData.value;
      console.log('[Push] Nhận được FCM token:', fcmToken);

      try {
        await api.post('/register_push_token', {
          user_id: userId,
          token: fcmToken,
        });
        console.log('[Push] ✅ Đã gửi token lên server thành công!');
      } catch (err) {
        console.error('[Push] ❌ Lỗi gửi token lên server:', err);
      }
    });

    // 4. Xử lý khi đăng ký thất bại
    PushNotifications.addListener('registrationError', (err) => {
      console.error('[Push] Lỗi đăng ký FCM:', err);
    });

    // 5. Xử lý khi nhận được notification lúc app đang MỞ (foreground)
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('[Push] 🔔 Nhận notification lúc app đang mở:', notification);
      // Hiển thị alert hoặc toast tuỳ ý — notification vẫn sẽ "ting" system
      alert(`🩸 ${notification.title}\n\n${notification.body}`);
    });

    // 6. Xử lý khi người dùng TAP vào notification (app ở background/closed)
    PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      console.log('[Push] Người dùng tap notification:', action);
      // Có thể navigate tới màn hình cụ thể ở đây nếu cần
    });

    console.log('[Push] ✅ Push notification đã được khởi tạo thành công!');
  } catch (error) {
    console.error('[Push] Lỗi không mong đợi khi khởi tạo push:', error);
  }
}
