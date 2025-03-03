# Server Authentication

## Giới thiệu
Server này cung cấp các API để xác thực người dùng qua Firebase Admin, kiểm tra quyền admin và khởi tạo URL video trên Cloudflare R2.

## Công nghệ sử dụng
- **Node.js** (Express.js)
- **Firebase Admin SDK**
- **Cloudflare R2**

## Cấu hình
Trước khi chạy server, cần thiết lập các biến môi trường:

```env
FIREBASE_SERVICE_ACCOUNT = <base64>
CLOUDFLARE_R2_ACCESS_KEY= your_access_key
CLOUDFLARE_R2_SECRET_KEY= your_secrec_key
CLOUDFLARE_R2_BUCKET= your_bucket_name
CLOUDFLARE_R2_ENDPOINT= your_endpoint
```

## Cài đặt
```sh
git clone https://github.com/Nguyenanhne/auth.git
cd server-auth
npm install
```

## Chạy server
```sh
npm start
```

## API Endpoints

### 1. Xác thực Firebase Token
- **Endpoint:** `POST /api/auth/check-user`
- **Mô tả:** Kiểm tra token Firebase và trả về thông tin người dùng
- **Header:**
  ```json
  {
    "Authorization": "Bearer <Firebase ID Token>"
  }
  ```
- **Response:**
  ```json
  {
      "message: token hợp lệ",
      "email": "user@example.com",
      "role": user
  }
  ```

### 2. Kiểm tra quyền Admin
- **Endpoint:** `GET /api/auth/check-admin`
- **Mô tả:** Kiểm tra xem người dùng có quyền admin không
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <Firebase ID Token>"
  }
  ```
- **Response:**
  ```json
  {
   "message: token hợp lệ",
   "email": "user@example.com",
   "role": admin
  }
  ```

### 3. Khởi tạo URL video trên R2
- **Endpoint:** `POST /api/get-video-url`
- **Mô tả:** Tạo URL video lưu trong Cloudflare R2
- **Header**
  ```json
  {
    "film_id": ""
  }
  ```
- **Response:**
  ```json
  {
    "videoURL": "https://r2.example.com/upload/video.mp4"
  }
  ```

## Ghi chú
- Người dùng cần có token hợp lệ từ Firebase để truy cập API.
- Chỉ admin mới có quyền sử dụng các API quản trị.

## Liên hệ
Nếu có vấn đề hoặc câu hỏi, vui lòng liên hệ qua [email@example.com](mailto:email@example.com).

