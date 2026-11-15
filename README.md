# Thiệp cưới online · Chu Vinh & Vũ Lan

Trang tĩnh (HTML/CSS/JS thuần, không cần build). Host miễn phí trên **GitHub Pages**.

👉 **Hướng dẫn đưa lên Internet từng bước: [HUONG-DAN-DEPLOY.md](HUONG-DAN-DEPLOY.md)**

```
index.html              Khung trang
tao-link.html           Trang tạo link riêng cho từng khách
assets/js/config.js     ← TOÀN BỘ nội dung (tên, giờ, địa chỉ, STK, URL Google Sheet). Sửa ở đây.
assets/js/main.js       Logic: mở thiệp, đổi màu, đếm ngược, album, RSVP, lời chúc, nhạc
assets/css/style.css    Giao diện 2 màu: Đỏ (data-theme="do") và Trắng (data-theme="trang")
assets/img/             Ảnh cưới + QR chuyển khoản
assets/music/           Nhạc nền (nhac-nen.mp3)
apps-script/Code.gs     Script dán vào Google Sheet để lưu RSVP + lời chúc
```

## Link gửi khách

Tạo link cho cả danh sách khách: mở **`tao-link.html`** (vd. `https://<user>.github.io/<repo>/tao-link.html`), dán danh sách tên, bấm sao chép link hoặc lời nhắn để gửi Zalo.


| Link | Kết quả |
|---|---|
| `https://<user>.github.io/<repo>/` | Thiệp chung, chào "Quý Khách" |
| `…/?khach=Anh%20Tuấn%20và%20gia%20đình` | Hiện "Kính gửi Anh Tuấn và gia đình" ở bìa và lời mời, tự điền tên vào form |
| `…/?mau=do` | Mở sẵn bản màu Đỏ (mặc định Trắng, đổi trong `config.js` → `defaultTheme`; khách vẫn tự đổi được) |

Khách tự chọn màu **Đỏ / Trắng** ở màn hình mở thiệp. Đỏ mở ra ảnh áo dài đỏ (TTD_3661), Trắng mở ra ảnh vest trắng đen (TTD_3428).

## 1. Đưa lên GitHub Pages

1. Đăng nhập github.com → **New repository**, ví dụ tên `thiep-cuoi`, để **Public**, không tick thêm README.
2. Trong thư mục này chạy (thay `<user>`):
   ```bash
   git remote add origin https://github.com/<user>/thiep-cuoi.git
   git push -u origin main
   ```
3. Trên GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, chọn `main` / `/ (root)` → Save.
4. Sau 1–2 phút, link là `https://<user>.github.io/thiep-cuoi/`.

Mỗi lần sửa: `git add -A && git commit -m "Cập nhật" && git push`. Pages tự cập nhật sau khoảng một phút.

> Repo public nên ai cũng xem được mã nguồn (gồm STK và địa chỉ, vốn đã in trên thiệp).

## 2. Kết nối Google Sheet (RSVP + Sổ lưu bút)

1. Tạo Google Sheet mới (vd. "Thiệp cưới – phản hồi").
2. **Extensions (Tiện ích mở rộng) → Apps Script**. Xoá code mẫu, dán toàn bộ `apps-script/Code.gs`, bấm Lưu.
3. **Deploy → New deployment** → biểu tượng bánh răng chọn **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   → Deploy → cấp quyền (Advanced → Go to … → Allow).
4. Copy **Web app URL** (dạng `https://script.google.com/macros/s/…/exec`), dán vào `sheetUrl` trong `assets/js/config.js`, rồi commit + push.
5. Sheet tự tạo 2 tab: **RSVP** và **LoiChuc**. Muốn ẩn một lời chúc, đổi cột "Hiển thị" thành `FALSE`.

> Sửa Code.gs sau này: **Deploy → Manage deployments → Edit → Version: New version** (giữ nguyên URL).

## 3. Chạy thử trên máy

```bash
python3 -m http.server 8080
```
Mở http://localhost:8080 (nên bật chế độ điện thoại trong DevTools).

## Ghi chú
- Giờ tiệc 28/11 đã để **15:00** (thiệp giấy ghi 16:00).
- Nhạc nền chỉ phát sau khi khách bấm "Mở thiệp" (quy định của trình duyệt). Muốn đổi bài: thay file `assets/music/nhac-nen.mp3`.
- "Die With A Smile" là bài có bản quyền; file nằm trong repo public nên ai cũng tải được.
