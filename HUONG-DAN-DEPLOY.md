# Hướng dẫn đưa thiệp cưới lên Internet (từng bước)

Thiệp là một trang web tĩnh, đặt miễn phí trên **GitHub Pages**. Làm xong bạn có link dạng:

```
https://TEN-GITHUB.github.io/thiep-cuoi/
```

Tổng thời gian khoảng 30 phút, gồm 6 phần:

1. Tạo tài khoản GitHub
2. Tạo kho chứa (repository)
3. Đưa code lên GitHub (chọn **cách A** hoặc **cách B**)
4. Bật GitHub Pages và sửa ảnh xem trước khi gửi link
5. Kết nối Google Sheet để lưu xác nhận tham dự và lời chúc
6. Kiểm tra trước khi gửi khách

Trong file này, `TEN-GITHUB` là tên đăng nhập GitHub của bạn. Ví dụ tên là `vinhlan2026` thì link sẽ là `https://vinhlan2026.github.io/thiep-cuoi/`.

---

## Phần 1. Tạo tài khoản GitHub (bỏ qua nếu đã có)

1. Vào https://github.com/signup
2. Nhập email, mật khẩu và **tên đăng nhập**. Tên này sẽ nằm trong link thiệp, nên chọn tên ngắn và dễ đọc.
3. Xác nhận email theo thư GitHub gửi tới.

## Phần 2. Tạo kho chứa `thiep-cuoi`

1. Đăng nhập, bấm dấu **+** ở góc trên bên phải, chọn **New repository**.
2. Điền:
   - **Repository name:** `thiep-cuoi`
   - Chọn **Public**. GitHub Pages miễn phí chỉ chạy với kho Public.
   - **Không** tick "Add a README file" và không chọn .gitignore hay license.
3. Bấm **Create repository**. Giữ trang này mở, bước sau sẽ dùng.

> Kho Public nghĩa là ai cũng xem được mã nguồn, gồm số tài khoản và địa chỉ hai nhà. Đó cũng là thông tin in trên thiệp nên chấp nhận được. Trang đã được cài để Google **không** đưa vào kết quả tìm kiếm.

## Phần 3. Đưa code lên GitHub

### Cách A: kéo thả trên trình duyệt (dễ nhất, không cần gõ lệnh)

1. Ở trang kho vừa tạo, bấm dòng **uploading an existing file** (hoặc **Add file → Upload files**).
2. Mở thư mục `/home/vincentchu/PROJECTS/VinhLan/thiep-cuoi` bằng trình quản lý file.
3. Chọn **tất cả** file và thư mục bên trong: `index.html`, `assets`, `apps-script`, `README.md`, `HUONG-DAN-DEPLOY.md`. Kéo thả vào vùng upload của GitHub.
   - Kéo các **mục bên trong** thư mục, không kéo cả thư mục `thiep-cuoi`. Nếu kéo cả thư mục, link sẽ bị thừa một cấp `/thiep-cuoi/thiep-cuoi/`.
   - File `.nojekyll` là file ẩn. Nếu không thấy thì bấm `Ctrl+H` để hiện file ẩn rồi kéo luôn. Thiếu file này trang vẫn chạy.
4. Đợi thanh tải lên chạy xong (tổng khoảng 6 MB), ô "Commit changes" ghi `Thiệp cưới`, bấm **Commit changes**.

Sửa sau này: mở file trên GitHub, bấm biểu tượng bút chì để sửa, hoặc **Add file → Upload files** để tải đè file mới.

### Cách B: dùng lệnh git (code đã commit sẵn trên máy)

1. Tạo **token** thay cho mật khẩu, vì GitHub không nhận mật khẩu khi push:
   - Vào https://github.com/settings/tokens?type=beta, bấm **Generate new token**.
   - **Token name:** `thiep-cuoi`. **Expiration:** 90 days.
   - **Repository access:** *Only select repositories*, chọn `thiep-cuoi`.
   - **Permissions → Repository permissions → Contents:** chọn **Read and write**.
   - Bấm **Generate token** và **copy** chuỗi bắt đầu bằng `github_pat_…`. Token chỉ hiện một lần, coi như mật khẩu, không gửi cho ai.
2. Mở Terminal, chạy lần lượt (thay `TEN-GITHUB`):

```bash
cd /home/vincentchu/PROJECTS/VinhLan/thiep-cuoi
```

```bash
git remote add origin https://github.com/TEN-GITHUB/thiep-cuoi.git
```

```bash
git push -u origin main
```

3. Khi được hỏi: **Username** là tên GitHub, **Password** là dán token vừa copy (khi dán sẽ không hiện ký tự, cứ Enter).

Mỗi lần sửa sau này:

```bash
git add -A && git commit -m "Cập nhật thiệp" && git push
```

## Phần 4. Bật GitHub Pages

1. Trong kho `thiep-cuoi`, vào **Settings**, menu trái chọn **Pages**.
2. Mục **Build and deployment**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main`, thư mục `/ (root)`, bấm **Save**.
3. Đợi 1–3 phút rồi tải lại trang Settings → Pages. Khi thấy dòng **"Your site is live at https://TEN-GITHUB.github.io/thiep-cuoi/"** là xong.
4. **Sửa ảnh xem trước khi gửi qua Zalo hoặc Messenger.** Mở `index.html`, tìm 2 dòng chứa `TEN-GITHUB` (khoảng dòng 10–12) và thay bằng tên GitHub thật. Lưu và đưa lên lại: cách A thì upload đè file `index.html`, cách B thì chạy lệnh cập nhật ở trên. Thiếu bước này thì link gửi đi sẽ không có ảnh thumbnail.

> Zalo và Facebook giữ ảnh xem trước cũ một thời gian. Nếu đã lỡ gửi link trước khi sửa, dán link vào https://developers.facebook.com/tools/debug/ và bấm **Scrape Again** để Messenger cập nhật.

## Phần 5. Kết nối Google Sheet (lưu xác nhận tham dự và lời chúc)

Chưa làm phần này thì khách vẫn xem thiệp bình thường, nhưng bấm gửi xác nhận hoặc lời chúc sẽ chỉ hiện lời nhắc "báo trực tiếp cho cô dâu chú rể". Không có dữ liệu nào được lưu.

1. Vào https://sheets.google.com, tạo **bảng tính trống**, đặt tên ví dụ `Thiệp cưới – phản hồi`.
2. Menu **Tiện ích mở rộng (Extensions) → Apps Script**. Một tab mới mở ra.
3. Xoá hết code mẫu trong `Code.gs`. Mở file `apps-script/Code.gs` trong thư mục thiệp, copy **toàn bộ** và dán vào. Bấm biểu tượng 💾 **Lưu**.
4. Bấm **Triển khai (Deploy) → Tùy chọn triển khai mới (New deployment)**.
   - Bấm bánh răng ⚙ cạnh "Chọn loại", chọn **Ứng dụng web (Web app)**.
   - **Mô tả:** `thiep`
   - **Thực thi với tư cách (Execute as):** **Tôi (Me)**
   - **Người có quyền truy cập (Who has access):** **Bất kỳ ai (Anyone)**
   - Bấm **Triển khai**.
5. Google hỏi cấp quyền: **Cho phép truy cập**, chọn tài khoản. Nếu hiện "Google chưa xác minh ứng dụng này", bấm **Nâng cao (Advanced) → Đi tới … (không an toàn)**, rồi **Cho phép**. Đây là script của chính bạn, chỉ ghi vào Sheet này.
6. Copy **URL ứng dụng web**, có dạng `https://script.google.com/macros/s/AKfy…/exec`.
7. Mở `assets/js/config.js`, tìm dòng:

```js
  sheetUrl: "",
```

   Dán URL vào giữa hai dấu ngoặc kép:

```js
  sheetUrl: "https://script.google.com/macros/s/AKfy…/exec",
```

8. Lưu và đưa file lên GitHub (cách A: upload đè `assets/js/config.js`; cách B: lệnh cập nhật).

**Dữ liệu nằm ở đâu:** trong chính Google Sheet đó, Sheet tự tạo 2 tab:

| Tab | Cột |
|---|---|
| `RSVP` | Thời gian, Họ tên, Khách của (Nhà Trai/Gái), Tham dự, Số người, Lời nhắn |
| `LoiChuc` | Thời gian, Tên, Lời chúc, Hiển thị |

- Muốn **ẩn** một lời chúc khỏi thiệp: đổi ô cột **Hiển thị** của dòng đó thành `FALSE`.
- Muốn đếm khách: dùng bộ lọc của Google Sheet trên tab `RSVP`, ví dụ lọc "Tham dự = Có" rồi cộng cột Số người.
- Nếu sau này sửa `Code.gs`: **Triển khai → Quản lý các lần triển khai → ✏ Chỉnh sửa → Phiên bản: Phiên bản mới → Triển khai**. URL giữ nguyên, không cần sửa `config.js`.

## Phần 6. Kiểm tra trước khi gửi khách

Mở link trên **điện thoại** (thử cả trong Zalo) và trên **laptop**:

- [ ] Bìa hiện đúng. Chọn **Đỏ** thì mở ra ảnh áo dài đỏ, chọn **Trắng** thì mở ra ảnh vest.
- [ ] Bấm mở thì có nhạc. Nút 🎵 góc dưới bật và tắt được.
- [ ] Hai nút **Xem bản đồ** mở đúng nhà trai và nhà gái.
- [ ] **Thêm vào lịch** thêm được vào Google Calendar hoặc lịch iPhone.
- [ ] **Quét thử 2 mã QR** bằng app ngân hàng: đúng tên CHU VAN VINH (Vietcombank) và VU THI LAN (Techcombank).
- [ ] Gửi 1 xác nhận tham dự và 1 lời chúc thử, rồi xem đã có dòng mới trong Google Sheet chưa. Lời chúc thử có thể xoá dòng trong Sheet sau.
- [ ] Dán link vào Zalo thì có ảnh xem trước (cần làm phần 4, bước 4).

## Gửi link cho khách

### Cách nhanh: trang tạo link

Mở `https://TEN-GITHUB.github.io/thiep-cuoi/tao-link.html`:

1. Dán danh sách khách, **mỗi dòng một người** (vd. `Anh Tuấn và gia đình`).
2. Chọn màu thiệp khi mở (mặc định Trắng).
3. Sửa lời nhắn gửi kèm nếu muốn (`{ten}` là tên khách, `{link}` là link).
4. Bấm **Sao chép lời nhắn** ở từng khách rồi dán vào Zalo/Messenger, hoặc **Sao chép tất cả** để lấy cả danh sách.

Danh sách được lưu tạm trên trình duyệt bạn dùng, lần sau mở lại vẫn còn. Trang này không hiện trên Google và không gửi danh sách đi đâu.

### Tự gõ link


| Muốn | Link |
|---|---|
| Thiệp chung, chào "Quý Khách" | `https://TEN-GITHUB.github.io/thiep-cuoi/` |
| Ghi tên riêng từng khách | `https://TEN-GITHUB.github.io/thiep-cuoi/?khach=Anh Tuấn và gia đình` |
| Mở sẵn bản màu Đỏ (mặc định là Trắng) | `https://TEN-GITHUB.github.io/thiep-cuoi/?mau=do` |
| Vừa tên riêng vừa màu Đỏ | `https://TEN-GITHUB.github.io/thiep-cuoi/?khach=Chị Hoa&mau=do` |

Gõ tên tiếng Việt có dấu và dấu cách thẳng vào link được. Zalo hoặc trình duyệt sẽ tự mã hoá.

## Sửa nội dung sau này

Mọi chữ, giờ, địa chỉ, số tài khoản, link bản đồ nằm trong **`assets/js/config.js`**. Sửa file đó rồi đưa lên lại như phần 3. Trang tự cập nhật sau khoảng 1 phút. Nếu điện thoại vẫn thấy bản cũ, tải lại trang.

## Khi gặp lỗi

| Hiện tượng | Cách xử lý |
|---|---|
| Link báo **404** | Đợi thêm vài phút sau khi bật Pages. Kiểm tra `index.html` nằm ngay gốc kho, không nằm trong thư mục con. |
| Trang hiện nhưng **không có ảnh hoặc giao diện vỡ** | Thư mục `assets` chưa được tải lên đủ. Vào kho xem có `assets/img`, `assets/css`, `assets/js` chưa. |
| `git push` báo **Authentication failed** | Ô Password phải dán **token**, không phải mật khẩu GitHub. Kiểm tra token có quyền *Contents: Read and write* cho kho `thiep-cuoi`. |
| Gửi xác nhận báo **"chưa kết nối"** | `sheetUrl` trong `config.js` còn trống hoặc chưa đưa lên GitHub. |
| Gửi xác nhận xong nhưng **Sheet không có dòng mới** | Lúc triển khai Apps Script chưa chọn *Who has access: Anyone*. Vào **Quản lý các lần triển khai** sửa lại. |
| **Không có nhạc** | Trình duyệt chỉ cho phát nhạc sau khi khách bấm. Bấm nút 🎵 để bật. iPhone ở chế độ im lặng sẽ không phát tiếng. |
