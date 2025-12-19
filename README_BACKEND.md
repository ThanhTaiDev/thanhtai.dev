# Backend Setup Guide

Hướng dẫn setup backend cho Portfolio website với PostgreSQL.

## Bước 1: Cài đặt PostgreSQL

### Windows:
1. Download PostgreSQL từ: https://www.postgresql.org/download/windows/
2. Cài đặt và nhớ password của user `postgres`
3. PostgreSQL sẽ chạy tự động sau khi cài đặt

### Mac:
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Linux (Ubuntu):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Bước 2: Tạo Database

Mở terminal và chạy:
```bash
# Kết nối vào PostgreSQL
psql -U postgres

# Tạo database
CREATE DATABASE portfolio;

# Thoát
\q
```

## Bước 3: Setup Backend

1. Vào thư mục backend:
```bash
cd backend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env`:
```bash
# Copy từ .env.example
# Windows:
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

4. Chỉnh sửa file `.env` với thông tin database của bạn:

**Nếu dùng PostgreSQL local:**
```
PORT=5000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/portfolio
```
(Thay `your_password` bằng password bạn đã đặt khi cài PostgreSQL)

**Nếu dùng Koyeb/Cloud PostgreSQL:**
```
PORT=5000
DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/portfolio
```
Lưu ý: Khi dùng cloud database, bạn có thể bỏ qua bước tạo database local. Chỉ cần chạy migrations để tạo bảng.

5. Chạy Prisma migrations để tạo bảng:
```bash
# Nếu dùng cloud database (Koyeb, Supabase, etc.), dùng:
npx prisma migrate deploy

# Nếu dùng local database, dùng:
npx prisma migrate dev --name init
```

**Lưu ý:** Trước khi chạy migrations, hãy chắc chắn rằng bạn đã generate Prisma Client:
```bash
npx prisma generate
```

6. (Tùy chọn) Seed database với dữ liệu mẫu:
```bash
npx prisma db seed
```

7. Khởi động server:
```bash
# Development mode (tự động restart khi có thay đổi)
npm run dev

# Hoặc production mode
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

## Bước 4: Setup Cloudinary (cho upload ảnh)

1. Tạo tài khoản Cloudinary tại: https://cloudinary.com/users/register_free

2. Vào Dashboard và lấy thông tin:
   - Cloud Name
   - API Key
   - API Secret

3. Thêm vào file `.env` trong thư mục `backend`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Cài đặt dependencies mới:
```bash
cd backend
npm install
```

## Bước 5: Setup Frontend

1. Tạo file `.env` ở thư mục root (cùng cấp với `package.json`):
```
VITE_API_URL=http://localhost:5000/api
```

2. Khởi động frontend:
```bash
npm run dev
```

## Kiểm tra

1. Backend: Mở browser và truy cập `http://localhost:5000/api/health`
   - Nếu thấy `{"status":"OK","message":"Server is running"}` là thành công

2. Frontend: Truy cập `http://localhost:3000` và thử post comment
   - Comment sẽ được lưu vào PostgreSQL database

## Prisma Studio (GUI để xem database)

Chạy lệnh sau để mở Prisma Studio (giao diện web để xem và chỉnh sửa database):
```bash
npx prisma studio
```

Sẽ mở tại: `http://localhost:5555`

## Troubleshooting

### Lỗi kết nối database:
- Kiểm tra PostgreSQL đang chạy: `pg_isready` (Mac/Linux) hoặc kiểm tra Services (Windows)
- Kiểm tra DATABASE_URL trong `.env` có đúng không
- Kiểm tra username và password

### Lỗi port đã được sử dụng:
- Đổi PORT trong `.env` sang port khác (ví dụ: 5001)
- Hoặc kill process đang dùng port 5000

### Lỗi Prisma:
- Chạy: `npx prisma generate` để generate Prisma Client
- Chạy lại: `npx prisma migrate dev`

### Lỗi upload ảnh Cloudinary:
- Kiểm tra các biến môi trường CLOUDINARY_* trong `.env` có đúng không
- Kiểm tra kết nối internet
- Kiểm tra Cloudinary dashboard để xem có quota không

