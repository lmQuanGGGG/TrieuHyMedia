# Website chính thức TRIEU HY MEDIA

Website doanh nghiệp song ngữ của **TRIEU HY MEDIA COMPANY LIMITED**, xây dựng bằng Next.js App Router, TypeScript và Tailwind CSS. Dự án có đầy đủ trang Giới thiệu, Dịch vụ, Liên hệ, Chính sách bảo mật, Điều khoản sử dụng, metadata, canonical URL, sitemap, robots.txt và Organization JSON-LD.

## Yêu cầu

- Node.js 22.13 trở lên.
- npm 10 trở lên.

## Cài đặt và chạy

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`. Route gốc chuyển đến phiên bản tiếng Anh tại `/en`.

## Kiểm tra dự án

```bash
npm run lint
npm run type-check
npm run build
```

## Thông tin doanh nghiệp và dịch vụ

Toàn bộ dữ liệu doanh nghiệp và danh sách dịch vụ nằm tại `src/config/company.ts`. Khi có thay đổi pháp lý, chỉ cập nhật nguồn cấu hình này. Nội dung giao diện song ngữ nằm tại `src/content/site.ts`.

Các cờ `showRepresentative`, `showPhone` và `showVietnameseLegalName` cho phép kiểm soát những thông tin tương ứng trên giao diện mà không cần sửa component.

## Thay logo

Header và footer hiện dùng wordmark dạng chữ. Để thay logo:

1. Đặt tệp logo đã tối ưu trong thư mục `public`.
2. Cập nhật component `src/components/layout/Header.tsx`.
3. Giữ lại tên thương hiệu dưới dạng chữ hoặc `aria-label` để bảo đảm khả năng truy cập.

Không thêm logo, chứng nhận hoặc nhãn đối tác chưa được xác minh.

## Form liên hệ

Form có kiểm tra dữ liệu ở trình duyệt và API, honeypot chống spam, trạng thái đang gửi, thành công và lỗi. Nếu chưa cấu hình dịch vụ gửi email, form không báo thành công giả mà hiển thị liên kết `mailto:`.

Để bật gửi email:

1. Sao chép `.env.example` thành `.env.local`.
2. Tạo API key tại Resend.
3. Xác minh tên miền gửi.
4. Điền `RESEND_API_KEY` và `CONTACT_FROM_EMAIL`.
5. Khởi động lại ứng dụng và gửi thử biểu mẫu.

Không commit `.env.local` hoặc bất kỳ secret nào.

## Cập nhật Chính sách bảo mật

Nội dung tiếng Anh và tiếng Việt nằm trong mục `privacy` của `src/content/site.ts`. Khi thêm analytics, cookie không thiết yếu hoặc nhà cung cấp mới, cần cập nhật chính sách trước khi kích hoạt. Ngày hiệu lực nằm trong `src/config/company.ts`.

## Deploy lên Vercel

1. Đưa source code lên Git repository riêng của doanh nghiệp.
2. Tạo dự án mới trên Vercel và import repository.
3. Chọn framework Next.js.
4. Thêm biến môi trường của form liên hệ nếu sử dụng Resend.
5. Deploy và kiểm tra toàn bộ route `/en` và `/vi`.

## Kết nối tên miền và HTTPS

1. Trong Vercel, thêm `trieuhymedia.net` và `www.trieuhymedia.net`.
2. Cập nhật DNS theo hướng dẫn hiển thị trong Vercel.
3. Đặt `trieuhymedia.net` làm tên miền chính.
4. Giữ redirect vĩnh viễn từ `www.trieuhymedia.net` về `trieuhymedia.net`.
5. Sau khi DNS hợp lệ, Vercel tự cấp và gia hạn chứng chỉ HTTPS.

Sau khi kết nối tên miền, kiểm tra:

- `https://trieuhymedia.net/en`
- `https://trieuhymedia.net/vi`
- `https://trieuhymedia.net/sitemap.xml`
- `https://trieuhymedia.net/robots.txt`
- Redirect từ phiên bản `www`.
