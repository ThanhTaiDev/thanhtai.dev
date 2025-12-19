# Cloudinary Setup Guide

Hướng dẫn setup Cloudinary để upload ảnh đại diện cho comments.

## Bước 1: Tạo tài khoản Cloudinary

1. Truy cập: https://cloudinary.com/users/register_free
2. Đăng ký tài khoản miễn phí (có 25GB storage và 25GB bandwidth/tháng)
3. Xác nhận email

## Bước 2: Lấy Credentials

1. Sau khi đăng nhập, vào **Dashboard**
2. Tìm phần **Account Details** (hoặc click vào biểu tượng gear ở góc trên bên phải)
3. Copy các thông tin sau:
   - **Cloud name**: Tên cloud của bạn (ví dụ: `demos-cloud`)
   - **API Key**: Số API key
   - **API Secret**: Bấm vào "Reveal" để xem API Secret

## Bước 3: Thêm vào file .env

Mở file `backend/.env` và thêm:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Ví dụ:**
```env
CLOUDINARY_CLOUD_NAME=demos-cloud
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## Bước 4: Restart Backend Server

Sau khi cập nhật `.env`, restart backend server:

```bash
# Dừng server (Ctrl+C)
# Sau đó chạy lại
npm run dev
```

## Kiểm tra

1. Start backend server
2. Thử upload ảnh qua frontend
3. Kiểm tra Cloudinary Dashboard > Media Library để xem ảnh đã được upload chưa
4. Ảnh sẽ được lưu trong folder `portfolio/comments/`

## Tính năng

- Ảnh được tự động resize về 200x200px (square crop)
- Tự động optimize quality
- URL an toàn (HTTPS)
- Lưu trữ trong folder `portfolio/comments/` trên Cloudinary

## Lưu ý

- Miễn phí có giới hạn 25GB storage và bandwidth/tháng
- Kích thước file tối đa: 5MB
- Chỉ hỗ trợ file ảnh (image/*)

