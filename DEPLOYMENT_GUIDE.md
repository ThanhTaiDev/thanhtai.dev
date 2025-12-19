# Hướng Dẫn Deploy Portfolio Website

## Tổng Quan

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Database**: PostgreSQL (Koyeb - đã có)

---

## BƯỚC 1: DEPLOY BACKEND LÊN RENDER

### 1.1. Chuẩn Bị Backend

1. **Kiểm tra `backend/.env` có các biến:**
   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/portfolio
   PORT=5000
   CLOUDINARY_CLOUD_NAME=deecoyq80
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   NODE_ENV=production
   ```

2. **Đảm bảo `backend/package.json` có script `start`:**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
   }
   ```

### 1.2. Tạo Web Service trên Render

1. Đăng nhập vào [Render](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect repository GitHub của bạn
4. Chọn repo `Portfolio-vip`
5. Cấu hình:
   - **Name**: `portfolio-backend` (hoặc tên bạn muốn)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `npm start`
   - **Plan**: Free (hoặc paid nếu cần)

6. **Environment Variables** (trong Render Dashboard):
   ```
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/portfolio
   PORT=5000
   CLOUDINARY_CLOUD_NAME=deecoyq80
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   NODE_ENV=production
   ```

7. Click **"Create Web Service"**

8. **Lưu lại URL** của backend (ví dụ: `https://portfolio-backend-xxxx.onrender.com`)

### 1.3. Kiểm Tra Backend Deploy

- Render sẽ tự động build và deploy
- Kiểm tra logs để đảm bảo không có lỗi
- Test endpoint: `https://your-backend-url.onrender.com/api/health`

---

## BƯỚC 2: DEPLOY FRONTEND LÊN VERCEL

### 2.1. Chuẩn Bị Frontend

1. **Tạo file `.env.production`** trong root project:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

2. **Kiểm tra `src/utils/api.ts`** sử dụng `VITE_API_URL`:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
   ```

### 2.2. Deploy trên Vercel

#### Cách 1: Deploy qua Vercel Dashboard

1. Đăng nhập vào [Vercel](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import repository GitHub `Portfolio-vip`
4. Cấu hình:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root của project)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables** (trong Vercel Dashboard):
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

6. Click **"Deploy"**

#### Cách 2: Deploy qua Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd C:\Users\VHDN\Portfolio-vip
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (chọn account của bạn)
# - Link to existing project? No
# - Project name? portfolio-vip
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add VITE_API_URL production
# Nhập: https://your-backend-url.onrender.com

# Redeploy với env variable
vercel --prod
```

### 2.3. Kiểm Tra Frontend Deploy

- Vercel sẽ tự động build và deploy
- Kiểm tra URL được tạo (ví dụ: `https://portfolio-vip.vercel.app`)
- Test website và đảm bảo API calls hoạt động

---

## BƯỚC 3: CẤU HÌNH CORS (QUAN TRỌNG)

### 3.1. Cập Nhật Backend CORS

Trong `backend/server.js`, đảm bảo CORS cho phép domain Vercel:

```javascript
const cors = require('cors')

const corsOptions = {
  origin: [
    'http://localhost:5173', // Local dev
    'https://your-frontend-url.vercel.app', // Vercel production
    'https://portfolio-vip.vercel.app', // Vercel default domain
    // Thêm các domain khác nếu có custom domain
  ],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
```

**Lưu ý**: Sau khi update, commit và push lên GitHub, Render sẽ tự động redeploy.

---

## BƯỚC 4: KIỂM TRA VÀ TEST

### 4.1. Test Backend

```bash
# Health check
curl https://your-backend-url.onrender.com/api/health

# Test comments API
curl https://your-backend-url.onrender.com/api/comments
```

### 4.2. Test Frontend

1. Truy cập URL Vercel
2. Test các chức năng:
   - Load comments từ backend
   - Submit comment mới
   - Upload profile photo
   - Tất cả API calls phải hoạt động

### 4.3. Kiểm Tra Console

Mở Browser DevTools → Console, đảm bảo không có lỗi:
- CORS errors
- API connection errors
- Missing environment variables

---

## BƯỚC 5: CUSTOM DOMAIN (OPTIONAL)

### 5.1. Custom Domain cho Vercel

1. Vào Vercel Dashboard → Project → Settings → Domains
2. Add domain của bạn (ví dụ: `www.thanhtai.dev`)
3. Follow instructions để add DNS records

### 5.2. Custom Domain cho Render

1. Vào Render Dashboard → Service → Settings → Custom Domain
2. Add domain (ví dụ: `api.thanhtai.dev`)
3. Update CORS trong backend để include domain mới
4. Update `VITE_API_URL` trong Vercel environment variables

---

## TROUBLESHOOTING

### Lỗi CORS

**Vấn đề**: Frontend không thể call API từ backend

**Giải pháp**:
1. Kiểm tra `corsOptions.origin` trong `backend/server.js` có đúng domain Vercel
2. Đảm bảo backend đã redeploy sau khi update CORS
3. Kiểm tra browser console để xem lỗi CORS cụ thể

### Lỗi Database Connection

**Vấn đề**: Backend không kết nối được PostgreSQL

**Giải pháp**:
1. Kiểm tra `DATABASE_URL` trong Render environment variables
2. Đảm bảo Koyeb database cho phép connections từ Render IPs
3. Kiểm tra Render logs để xem lỗi connection

### Environment Variables không hoạt động

**Vấn đề**: Frontend không nhận được `VITE_API_URL`

**Giải pháp**:
1. Vercel chỉ apply env vars khi **redeploy**
2. Sau khi add env var, phải **Redeploy** project
3. Kiểm tra `import.meta.env.VITE_API_URL` trong browser console

### Build Fail trên Vercel

**Vấn đề**: Vercel build bị lỗi

**Giải pháp**:
1. Kiểm tra build logs trong Vercel Dashboard
2. Đảm bảo `package.json` có đúng `build` script
3. Kiểm tra TypeScript errors: `npm run build` local trước

### Backend Timeout trên Render

**Vấn đề**: Render free tier có thể timeout nếu không có traffic

**Giải pháp**:
1. Render free tier sẽ "sleep" sau 15 phút không có traffic
2. Request đầu tiên sau khi sleep sẽ mất ~30s để wake up
3. Có thể upgrade lên paid plan để tránh sleep
4. Hoặc dùng service như [UptimeRobot](https://uptimerobot.com) để ping backend mỗi 5 phút

---

## CHECKLIST TRƯỚC KHI DEPLOY

### Backend:
- [ ] `DATABASE_URL` đúng và accessible
- [ ] `CLOUDINARY_*` variables đã được set
- [ ] `backend/package.json` có script `start`
- [ ] CORS configured cho Vercel domain
- [ ] Test `npm start` local hoạt động

### Frontend:
- [ ] `.env.production` có `VITE_API_URL` (hoặc sẽ set trong Vercel)
- [ ] `src/utils/api.ts` sử dụng `import.meta.env.VITE_API_URL`
- [ ] Build thành công local: `npm run build`
- [ ] Kiểm tra không có TypeScript errors

---

## TÓM TẮT COMMANDS

### Render (Backend):
- Build: `npm install && npx prisma generate && npx prisma migrate deploy`
- Start: `npm start`
- URL: `https://portfolio-backend-xxxx.onrender.com`

### Vercel (Frontend):
- Build: `npm run build`
- Output: `dist/`
- URL: `https://portfolio-vip.vercel.app`

---

## LƯU Ý QUAN TRỌNG

1. **Render Free Tier**: Có thể sleep sau 15 phút không traffic → request đầu tiên sẽ chậm
2. **Vercel**: Rất nhanh và không sleep, perfect cho frontend
3. **Environment Variables**: Phải set trong cả Render và Vercel dashboards
4. **CORS**: Phải update backend CORS sau khi có Vercel URL
5. **Database**: Koyeb PostgreSQL đã có, chỉ cần connect từ Render

---

## NEXT STEPS SAU KHI DEPLOY

1. Test toàn bộ chức năng
2. Setup custom domain (nếu có)
3. Setup monitoring/analytics
4. Setup CI/CD (tự động deploy khi push code)

