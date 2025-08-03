import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../styles/Admin.css';

// Import all data
import galleryAlbumsData from '../data/galleryAlbums.json';
import galleryHomeData from '../data/galleryHome.json';
import servicesData from '../data/services.json';
import specialServicesData from '../data/specialServices.json';
import testimonialsData from '../data/testimonials.json';

const JSONBIN_API_KEY = process.env.REACT_APP_JSONBIN_API_KEY || '';
const JSONBIN_BASE_URL = process.env.REACT_APP_JSONBIN_BASE_URL || 'https://api.jsonbin.io/v3';


interface DataItem {
  id?: number;
  [key: string]: any;
}

interface DataSection {
  key: string;
  title: string;
  canAdd: boolean;
  data: DataItem[];
  fields: { key: string; label: string; type: 'text' | 'textarea' | 'url' | 'array' | 'category' | 'images' }[];
}

const Admin: React.FC = () => {
  const [activeSection, setActiveSection] = useState('services');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [originalItem, setOriginalItem] = useState<DataItem | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  const [dataSections, setDataSections] = useState<Record<string, DataSection>>({
    services: {
      key: 'services',
      title: 'Dịch Vụ',
      canAdd: true,
      data: servicesData,
      fields: [
        { key: 'title', label: 'Tên dịch vụ', type: 'text' },
        { key: 'description', label: 'Mô tả', type: 'textarea' },
        { key: 'icon', label: 'Icon', type: 'text' },
        { key: 'price', label: 'Giá', type: 'text' },
        { key: 'image', label: 'Hình ảnh', type: 'url' },
        { key: 'features', label: 'Tính năng', type: 'array' }
      ]
    },
    specialServices: {
      key: 'specialServices',
      title: 'Dịch Vụ Đặc Biệt',
      canAdd: false,
      data: specialServicesData,
      fields: [
        { key: 'title', label: 'Tên dịch vụ', type: 'text' },
        { key: 'description', label: 'Mô tả', type: 'textarea' },
        { key: 'icon', label: 'Icon', type: 'text' },
        { key: 'price', label: 'Giá', type: 'text' },
        { key: 'image', label: 'Hình ảnh', type: 'url' }
      ]
    },
    galleryAlbums: {
      key: 'galleryAlbums',
      title: 'Album Thư Viện',
      canAdd: true,
      data: galleryAlbumsData,
      fields: [
        { key: 'title', label: 'Tiêu đề album', type: 'text' },
        { key: 'description', label: 'Mô tả album', type: 'textarea' },
        { key: 'thumbnail', label: 'Ảnh đại diện', type: 'url' },
        { key: 'category', label: 'Danh mục', type: 'category' },
        { key: 'images', label: 'Danh sách ảnh', type: 'images' }
      ]
    },
    testimonials: {
      key: 'testimonials',
      title: 'Ảnh Đánh Giá',
      canAdd: true,
      data: testimonialsData,
      fields: [
        { key: 'image', label: 'Hình ảnh', type: 'url' }
      ]
    },

    galleryHome: {
      key: 'galleryHome',
      title: 'Tác Phẩm Đẹp',
      canAdd: false,
      data: galleryHomeData.map((url: string, index: number) => ({ id: index, image: url })),
      fields: [
        { key: 'image', label: 'Hình ảnh', type: 'url' }
      ]
    }
  });

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveToJsonBin = async (sectionKey: string) => {
    setIsLoading(true);
    try {
      const section = dataSections[sectionKey];
      let dataToSave = section.data;

      // Convert back to original format for galleryHome
      if (sectionKey === 'galleryHome') {
        dataToSave = section.data.map((item: any) => item.image);
      }

      const response = await fetch(`${JSONBIN_BASE_URL}/b`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY,
          'X-Bin-Name': `hayriwedding-${sectionKey}`
        },
        body: JSON.stringify(dataToSave)
      });

      if (response.ok) {
        showMessage(`Đã lưu ${section.title} lên JSONBin thành công!`);
      } else {
        throw new Error('Failed to save to JSONBin');
      }
    } catch (error) {
      console.error('Error saving to JSONBin:', error);
      showMessage('Lỗi khi lưu dữ liệu!', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const section = dataSections[activeSection];

      const oldIndex = section.data.findIndex((item, index) => {
        const itemId = item.id || `item-${index}-${JSON.stringify(item).slice(0, 20)}`;
        return itemId === active.id;
      });

      const newIndex = section.data.findIndex((item, index) => {
        const itemId = item.id || `item-${index}-${JSON.stringify(item).slice(0, 20)}`;
        return itemId === over?.id;
      });

      const newData = arrayMove(section.data, oldIndex, newIndex);

      // Update IDs for items with id field (lower id = higher priority)
      if (newData[0]?.id !== undefined) {
        newData.forEach((item, index) => {
          item.id = index + 1;
        });
      }

      setDataSections(prev => ({
        ...prev,
        [activeSection]: {
          ...prev[activeSection],
          data: newData
        }
      }));
    }
  };

  const handleEdit = (item: DataItem) => {
    setEditingItem({ ...item });
    setOriginalItem({ ...item });
    setIsAddMode(false);
  };

  const handleAdd = () => {
    const section = dataSections[activeSection];
    const newItem: DataItem = {};

    // Set default values based on section
    if (section.key === 'services' || section.key === 'specialServices') {
      newItem.id = Math.max(...section.data.map(item => item.id || 0)) + 1;
      newItem.title = '';
      newItem.description = '';
      newItem.icon = '🎊';
      newItem.price = '0 VNĐ';
      newItem.image = '';
      if (section.key === 'services') {
        newItem.features = [];
      }
    } else if (section.key === 'galleryAlbums') {
      newItem.id = Math.max(...section.data.map(item => item.id || 0)) + 1;
      newItem.title = '';
      newItem.description = '';
      newItem.thumbnail = '';
      newItem.category = { id: 1, name: 'Nghi lễ truyền thống' };
      newItem.images = [];
    } else if (section.key === 'testimonials') {
      newItem.image = '';
    } else if (section.key === 'testimonialsHome') {
      newItem.id = Math.max(...section.data.map(item => item.id || 0)) + 1;
      newItem.name = '';
      newItem.text = '';
    } else if (section.key === 'galleryHome') {
      newItem.id = Math.max(...section.data.map(item => item.id || 0)) + 1;
      newItem.image = '';
    }

    setEditingItem(newItem);
    setOriginalItem(null);
    setIsAddMode(true);
  };

  const handleSave = () => {
    if (!editingItem) return;

    const section = dataSections[activeSection];
    let newData: DataItem[];

    if (isAddMode) {
      newData = [...section.data, editingItem];
    } else {
      // For items with ID, compare by ID
      if (editingItem.id !== undefined) {
        newData = section.data.map(item =>
            item.id === editingItem.id ? editingItem : item
        );
      } else {
        // For items without ID, find by original data and replace
        const originalItemIndex = section.data.findIndex(item =>
            JSON.stringify(item) === JSON.stringify(originalItem)
        );
        newData = section.data.map((item, index) =>
            index === originalItemIndex ? editingItem : item
        );
      }
    }

    setDataSections(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        data: newData
      }
    }));

    setEditingItem(null);
    setOriginalItem(null);
    setIsAddMode(false);
    showMessage(isAddMode ? 'Đã thêm mới!' : 'Đã cập nhật!');
  };

  const handleDelete = (item: DataItem) => {


    const section = dataSections[activeSection];
    let newData: DataItem[];

    // For items with ID, compare by ID
    if (item.id !== undefined) {
      newData = section.data.filter(dataItem => dataItem.id !== item.id);
    } else {
      // For items without ID, compare by index or object reference
      const itemIndex = section.data.findIndex(dataItem =>
          JSON.stringify(dataItem) === JSON.stringify(item)
      );
      newData = section.data.filter((_, index) => index !== itemIndex);
    }

    setDataSections(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        data: newData
      }
    }));

    showMessage('Đã xóa!');
  };

  const getPlaceholder = (field: { key: string; label: string; type: string }, sectionKey: string) => {
    const placeholders: Record<string, Record<string, string>> = {
      services: {
        title: 'Ví dụ: Lễ cưới truyền thống Việt Nam',
        description: 'Dịch vụ trang trí theo phong cách truyền thống với sắc đỏ và vàng, thể hiện sự trang nghiêm ....',
        icon: '🎊',
        price: '50,000,000 VNĐ',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
        features: 'Tư vấn phong tục\nTrang trí truyền thống\nMC chuyên nghiệp\nChụp ảnh cưới'
      },
      specialServices: {
        title: 'Ví dụ: Gói cưới hoàn hảo',
        description: 'Gói dịch vụ all-in-one cho ngày cưới của bạn...',
        icon: '💎',
        price: '100,000,000 VNĐ',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc'
      },
      galleryAlbums: {
        title: 'Ví dụ: Lễ cưới Linh & Minh',
        description: 'Album ảnh cưới đẹp với phong cách truyền thống...',
        thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92',
        category: 'Nghi lễ truyền thống',
        images: 'https://images.unsplash.com/photo-1519741497674-611481863552\nhttps://images.unsplash.com/photo-1511285560929-80b456fea0bc\nhttps://images.unsplash.com/photo-1606216794074-735e91aa2c92'
      },
      testimonials: {
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552'
      },
      testimonialsHome: {
        name: 'Linh & Minh',
        text: 'HayriWedding đã tạo nên một lễ cưới hoàn hảo cho chúng tôi...'
      },
      galleryHome: {
        image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92'
      }
    };

    return placeholders[sectionKey]?.[field.key] || `Nhập ${field.label.toLowerCase()}...`;
  };

  const renderEditForm = () => {
    if (!editingItem) return null;

    const section = dataSections[activeSection];

    return (
        <motion.div
            className="edit-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
          <div className="edit-modal-content">
            <h3>{isAddMode ? 'Thêm mới' : 'Chỉnh sửa'} {section.title}</h3>

            <div className="edit-form">
              {section.fields.map(field => (
                  <div key={field.key} className="form-group">
                    <label>{field.label}:</label>
                    {field.type === 'textarea' ? (
                        <textarea
                            value={editingItem[field.key] || ''}
                            onChange={(e) => setEditingItem(prev => prev ? {...prev, [field.key]: e.target.value} : null)}
                            placeholder={getPlaceholder(field, section.key)}
                            rows={3}
                        />
                    ) : field.type === 'array' ? (
                        <textarea
                            value={(editingItem[field.key] || []).join('\n')}
                            onChange={(e) => setEditingItem(prev => prev ? {...prev, [field.key]: e.target.value.split('\n').filter(line => line.trim())} : null)}
                            rows={10}
                            placeholder={getPlaceholder(field, section.key)}
                        />
                    ) : field.type === 'category' ? (
                        <div className="category-section">
                          <select
                              value={editingItem[field.key]?.id || 1}
                              onChange={(e) => {
                                const categoryId = parseInt(e.target.value);
                                const categoryNames = {
                                  1: 'Nghi lễ truyền thống',
                                  2: 'Trang trí tiệc cưới',
                                  3: 'Tiệc cưới',
                                  4: 'Chụp ảnh cưới'
                                };
                                setEditingItem(prev => prev ? {
                                  ...prev,
                                  [field.key]: {
                                    id: categoryId,
                                    name: categoryNames[categoryId as keyof typeof categoryNames]
                                  }
                                } : null);
                              }}
                              className="category-select"
                          >
                            <option value={1}>Nghi lễ truyền thống</option>
                            <option value={2}>Trang trí tiệc cưới</option>
                            <option value={3}>Tiệc cưới</option>
                            <option value={4}>Chụp ảnh cưới</option>
                          </select>
                        </div>
                    ) : field.type === 'images' ? (
                        <div className="images-section">
                    <textarea
                        value={(editingItem[field.key] || []).join('\n')}
                        onChange={(e) => {
                          const lines = e.target.value.split('\n').filter(line => line.trim());
                          setEditingItem(prev => prev ? {...prev, [field.key]: lines} : null);
                        }}
                        rows={8}
                        placeholder="Mỗi dòng một URL ảnh"
                    />
                          <div className="image-picker">
                            <h4>Chọn từ Tác Phẩm Đẹp:</h4>
                            <div className="gallery-grid">
                              {dataSections.galleryHome.data.map((item: any, index) => (
                                  <div
                                      key={index}
                                      className="gallery-item"
                                      onClick={() => {
                                        const currentImages = editingItem[field.key] || [];
                                        if (!currentImages.includes(item.image)) {
                                          setEditingItem(prev => prev ? {
                                            ...prev,
                                            [field.key]: [...currentImages, item.image]
                                          } : null);
                                        }
                                      }}
                                  >
                                    <img src={item.image} alt="" />
                                    <div className="overlay">+</div>
                                  </div>
                              ))}
                            </div>
                          </div>
                          <small className="form-help">
                            Nhập URL hoặc click chọn từ Tác Phẩm Đẹp
                          </small>
                        </div>
                    ) : field.key === 'thumbnail' ? (
                        <div className="thumbnail-section">
                          <input
                              type="text"
                              value={editingItem[field.key] || ''}
                              onChange={(e) => setEditingItem(prev => prev ? {...prev, [field.key]: e.target.value} : null)}
                              placeholder={getPlaceholder(field, section.key)}
                          />
                          <div className="image-picker">
                            <h4>Chọn từ Tác Phẩm Đẹp:</h4>
                            <div className="gallery-grid">
                              {dataSections.galleryHome.data.map((item: any, index) => (
                                  <div
                                      key={index}
                                      className="gallery-item"
                                      onClick={() => {
                                        setEditingItem(prev => prev ? {
                                          ...prev,
                                          [field.key]: item.image
                                        } : null);
                                      }}
                                  >
                                    <img src={item.image} alt="" />
                                    <div className="overlay">📷</div>
                                  </div>
                              ))}
                            </div>
                          </div>
                          <small className="form-help">
                            Nhập URL hoặc click chọn từ Tác Phẩm Đẹp
                          </small>
                        </div>
                    ) : (
                        <input
                            type="text"
                            value={editingItem[field.key] || ''}
                            onChange={(e) => setEditingItem(prev => prev ? {...prev, [field.key]: e.target.value} : null)}
                            placeholder={getPlaceholder(field, section.key)}
                        />
                    )}
                  </div>
              ))}
            </div>

            <div className="form-actions">
              <button className="btn-save" onClick={handleSave}>
                {isAddMode ? 'Thêm' : 'Lưu'}
              </button>
              <button className="btn-cancel" onClick={() => {
                setEditingItem(null);
                setOriginalItem(null);
              }}>
                Hủy
              </button>
            </div>
          </div>
        </motion.div>
    );
  };

  const SortableItem = ({ item, index }: { item: DataItem; index: number }) => {
    const section = dataSections[activeSection];

    // Create unique ID for items without ID
    const itemId = item.id || `item-${index}-${JSON.stringify(item).slice(0, 20)}`;

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: itemId });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`data-item ${isDragging ? 'dragging' : ''}`}
            whileHover={{ scale: 1.02 }}
        >
          <div className="item-content">
            <div className="item-info">
              {item.title && <h4>{item.title}</h4>}
              {item.name && <h4>{item.name}</h4>}
              {(item.image || item.thumbnail) && <img src={item.image || item.thumbnail} alt="" className="item-image" />}
              {item.description && <p>{item.description}</p>}
              {item.text && <p>{item.text}</p>}
              {item.category && (
                  <span className="category-badge">
                📁 {item.category.name}
              </span>
              )}
              {item.images && Array.isArray(item.images) && item.images.length > 0 && (
                  <div className="images-preview">
                    <div className="images-grid">
                      {item.images.slice(0, 4).map((imageUrl: string, idx: number) => (
                          <img
                              key={idx}
                              src={imageUrl}
                              alt=""
                              className="preview-image"
                          />
                      ))}
                      {item.images.length > 4 && (
                          <div className="more-images">
                            +{item.images.length - 4}
                          </div>
                      )}
                    </div>
                    <span className="images-count">
                  🖼️ {item.images.length} ảnh
                </span>
                  </div>
              )}
              {item.price && <span className="price">{item.price}</span>}
            </div>

            <div className="item-actions">
              <button
                  className="btn-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(item);
                  }}
              >
                ✏️
              </button>
              {section.canAdd && (
                  <button
                      className="btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                  >
                    🗑️
                  </button>
              )}
            </div>
          </div>

          <div className="drag-handle" {...listeners}>⋮⋮</div>
        </motion.div>
    );
  };

  const renderDataItem = (item: DataItem, index: number) => {
    return <SortableItem key={item.id || index} item={item} index={index} />;
  };

  return (
      <div className="admin-page">
        <div className="admin-header">
          <h1>Quản lý</h1>
          <p>Quản lý dữ liệu HayriWedding</p>
          {message && (
              <div className={`message ${message.includes('Lỗi') ? 'error' : 'success'}`}>
                {message}
              </div>
          )}
        </div>

        <div className="admin-layout">
          {/* Sidebar */}
          <div className="admin-sidebar">
            {Object.values(dataSections).map(section => (
                <motion.button
                    key={section.key}
                    className={`section-btn ${activeSection === section.key ? 'active' : ''}`}
                    onClick={() => setActiveSection(section.key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                  <span className="section-title-admin">{section.title}</span>
                  <span className="section-count">({section.data.length} items)</span>
                  {section.canAdd && <span className="can-add">+</span>}
                </motion.button>
            ))}
          </div>

          {/* Main Content */}
          <div className="admin-main">
            <div className="section-header">
              <div>
                <h2>{dataSections[activeSection].title}</h2>
                <p>{dataSections[activeSection].data.length} items</p>
              </div>

              <div className="section-actions">
                {dataSections[activeSection].canAdd && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Thêm mới
                    </button>
                )}
                <button
                    className="btn-save-jsonbin"
                    onClick={() => saveToJsonBin(activeSection)}
                    disabled={isLoading}
                >
                  {isLoading ? 'Đang lưu...' : 'Lưu JSONBin'}
                </button>
              </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
              <SortableContext
                  items={dataSections[activeSection].data.map((item, index) =>
                      item.id || `item-${index}-${JSON.stringify(item).slice(0, 20)}`
                  )}
                  strategy={verticalListSortingStrategy}
              >
                <div className="data-list">
                  {dataSections[activeSection].data.map((item, index) =>
                      renderDataItem(item, index)
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        <AnimatePresence>
          {editingItem && renderEditForm()}
        </AnimatePresence>
      </div>
  );
};

export default Admin;
