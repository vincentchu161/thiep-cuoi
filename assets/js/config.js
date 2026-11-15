/*
 * TOÀN BỘ NỘI DUNG THIỆP NẰM Ở ĐÂY — sửa file này là đủ, không cần đụng HTML/JS khác.
 * Giờ dùng định dạng 24h, ngày dạng YYYY-MM-DD, múi giờ Việt Nam (+07:00).
 */
window.WEDDING = {
  groom: { short: "Chu Vinh", full: "Chu Văn Vinh", initial: "V" },
  bride: { short: "Vũ Lan", full: "Vũ Thị Lan", initial: "L" },
  mainDate: "2026-11-29T09:00:00+07:00", // mốc đếm ngược
  mainDateText: "29.11.2026",

  families: {
    trai: {
      label: "Nhà Trai",
      father: "Ông Chu Văn Vũ",
      mother: "Bà Phạm Thị Phúc",
      address: "Tổ dân phố Ngọc Thanh, phường Xuân Hoà, tỉnh Phú Thọ",
      mapUrl: "https://maps.app.goo.gl/fPdCMtSKRCVtH9SU8",
    },
    gai: {
      label: "Nhà Gái",
      father: "Ông Vũ Văn Thơ",
      mother: "Bà Nguyễn Thị Lộc",
      address: "Số 158 Thắng Lợi, phường Nam Viêm, phường Phúc Yên, tỉnh Phú Thọ",
      mapUrl: "https://maps.app.goo.gl/UFh7DtyinwN8PWGr6",
    },
  },

  // Mỗi sự kiện: family = "trai" | "gai" (lấy địa chỉ từ families)
  events: [
    {
      title: "Tiệc Cưới",
      family: "gai",
      start: "2026-11-28T15:00:00+07:00",
      end: "2026-11-28T19:00:00+07:00",
      lunar: "Tức ngày 20 tháng 10 năm Bính Ngọ",
    },
    {
      title: "Tiệc Cưới",
      family: "trai",
      start: "2026-11-28T15:00:00+07:00",
      end: "2026-11-28T19:00:00+07:00",
      lunar: "Tức ngày 20 tháng 10 năm Bính Ngọ",
    },
    {
      title: "Lễ Vu Quy",
      family: "gai",
      start: "2026-11-29T09:00:00+07:00",
      end: "2026-11-29T11:00:00+07:00",
      lunar: "Tức ngày 21 tháng 10 năm Bính Ngọ",
    },
    {
      title: "Lễ Thành Hôn",
      family: "trai",
      start: "2026-11-29T09:00:00+07:00",
      end: "2026-11-29T11:00:00+07:00",
      lunar: "Tức ngày 21 tháng 10 năm Bính Ngọ",
    },
  ],

  gifts: [
    { who: "Mừng cưới chú rể", bank: "Vietcombank", account: "1040718859", holder: "CHU VAN VINH", qr: "assets/img/qr-trai.png" },
    { who: "Mừng cưới cô dâu", bank: "Techcombank", account: "8361838686", holder: "VU THI LAN", qr: "assets/img/qr-gai.png" },
  ],

  // Dán URL Web App của Google Apps Script vào đây (xem README.md). Để trống = form vẫn hiện nhưng báo chưa kết nối.
  sheetUrl: "https://script.google.com/macros/s/AKfycbwKCGuPB5JIlSM9cOHrLcd0eQUwLgOkn98OEc_lqYHfPxg7dUOKvpem20sCxpOnfnYV9A/exec",

  music: "assets/music/nhac-nen.mp3",

  defaultTheme: "trang", // màu mặc định khi mở link: "trang" hoặc "do"

  // Ảnh mở thiệp + hero cho từng màu
  themes: {
    do: { hero: "assets/img/ao-dai-3661.jpg", label: "Đỏ" },
    trang: { hero: "assets/img/ngau-3428.jpg", label: "Trắng" },
  },

  // Album: bản Đỏ ưu tiên ảnh áo dài, bản Trắng ưu tiên ảnh "ngầu"
  album: {
    aoDai: ["ao-dai-3544", "ao-dai-3581", "ao-dai-3661", "ao-dai-3724", "ao-dai-3745", "ao-dai-3754"],
    ngau: ["ngau-3111", "ngau-3159", "ngau-3222", "ngau-3238", "ngau-3428", "ngau-3485"],
    wide: "ao-dai-3788", // ảnh ngang dùng làm dải ảnh rộng
  },
};
