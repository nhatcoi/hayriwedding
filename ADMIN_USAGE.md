# 🚀 Admin Dashboard - Visual Management

## Truy cập
```
Development: http://localhost:3000/admin
Production: https://yourdomain.com/admin
```

## 📋 Tính năng chính

### 🎯 **Data Sections Available:**

| **Section** | **Can Add** | **Can Edit** | **Can Delete** | **Drag & Drop** |
|-------------|-------------|--------------|----------------|-----------------|
| **Dịch Vụ** | ✅ | ✅ | ✅ | ✅ (ID priority) |
| **Dịch Vụ Đặc Biệt** | ❌ | ✅ | ❌ | ✅ (ID priority) |
| **Album Thư Viện** | ✅ | ✅ | ✅ | ✅ (Position) |
| **Ảnh Đánh Giá** | ✅ | ✅ | ✅ | ✅ (Position) |
| **Đánh Giá Trang Chủ** | ❌ | ✅ | ❌ | ✅ (ID priority) |
| **Thư Viện Trang Chủ** | ❌ | ✅ | ❌ | ✅ (Position) |

## 🎮 Cách sử dụng

### 1. **Navigate Sections**
- Click vào section trong sidebar
- Active section được highlight bằng golden border
- Sections có quyền "Add" có biểu tượng `+` xanh

### 2. **View Data Items**
- Tất cả items hiển thị dưới dạng cards trực quan
- Mỗi card hiển thị:
  - **Title/Name** (golden color)
  - **Description/Text** 
  - **Image preview** (60x60px)
  - **Price** (green badge)
  - **Actions** (Edit ✏️, Delete 🗑️)

### 3. **Edit Data**
- Click **✏️** để edit item
- Modal popup với form fields
- Support các field types:
  - `text` - Input đơn giản
  - `textarea` - Multi-line text
  - `url` - Image URLs
  - `array` - Mỗi dòng một item

### 4. **Add New Items** (Chỉ cho phép sections)
- Click **"+ Thêm mới"** 
- Form tương tự edit mode
- Auto-generate ID cho items có ID

### 5. **Delete Items** (Chỉ cho phép sections)
- Click **🗑️** 
- Confirm dialog hiện ra
- Permanent delete sau khi confirm

### 6. **Drag & Drop Reorder**
- **Grab** item bằng drag handle `⋮⋮`
- **Drag** lên/xuống để thay đổi vị trí
- **Drop** tại vị trí mong muốn
- **Auto-update priority:**
  - Items có `id` → ID thấp = ưu tiên cao (1, 2, 3...)
  - Items không có `id` → Thay đổi vị trí trong array

### 7. **Save to JSONBin**
- Click **"Lưu JSONBin"** 
- Upload data với API key: `$2a$10$7nNhAtoX17E0pDp3kPgTMuGQgvPZ5IyxWFJ.FrVEkYHwnpzpIrGRK`
- Success/Error message hiển thị
- Data được lưu với tên: `hayriwedding-{sectionKey}`

## 🎨 Visual Features

### **Modern Glass UI**
- Glassmorphism design với backdrop blur
- Purple gradient background  
- Golden accent colors (#D4AF37)
- Smooth animations với Framer Motion

### **Interactive Elements**
- Hover effects trên tất cả buttons
- Scale animations khi hover cards
- Dragging effects với rotation
- Loading pulse animation

### **Responsive Design**
- **Desktop**: Sidebar + Main content
- **Tablet**: Stacked layout  
- **Mobile**: Single column, optimized touch

## 🔧 Technical Details

### **Drag & Drop Library**
- **@dnd-kit/core** - Modern React 19 compatible
- **@dnd-kit/sortable** - Sortable functionality
- **@dnd-kit/utilities** - Helper utilities

### **Data Structure Example**
```typescript
// Services (with ID)
{
  id: 1,
  title: "Lễ cưới truyền thống",
  description: "Tổ chức lễ cưới theo phong tục Việt Nam",
  icon: "🎊",
  price: "50,000,000 VNĐ",
  image: "https://example.com/image.jpg",
  features: ["Tư vấn", "Trang trí", "MC"]
}

// Testimonials (no ID)
{
  image: "https://example.com/review.jpg"
}
```

### **Priority System**
- **Items với ID**: Kéo thả → Auto-update ID (1, 2, 3...)
- **Items không ID**: Kéo thả → Thay đổi array position

## 🚀 JSONBin Integration

### **API Configuration**
```javascript
API_KEY: '$2a$10$7nNhAtoX17E0pDp3kPgTMuGQgvPZ5IyxWFJ.FrVEkYHwnpzpIrGRK'
ENDPOINT: 'https://api.jsonbin.io/v3'
METHOD: 'POST'
```

### **Bin Naming Convention**
```
hayriwedding-services
hayriwedding-specialServices  
hayriwedding-galleryAlbums
hayriwedding-testimonials
hayriwedding-testimonialsHome
hayriwedding-galleryHome
```

## 🛡️ Security & Access

- **Hidden Route**: Không có navigation link public
- **Direct Access**: Chỉ truy cập được qua `/admin` URL
- **No Authentication**: Cần implement cho production
- **API Key**: Embedded trong code (nên chuyển sang env)

## 📱 Mobile Experience

- **Touch-friendly**: Large touch targets (40px+)
- **Swipe gestures**: Natural mobile interactions
- **Responsive forms**: Vertical layout trên mobile
- **Optimized modals**: Full-width trên màn hình nhỏ

Admin dashboard này cung cấp **trải nghiệm quản lý trực quan và hiện đại** cho tất cả dữ liệu website! 