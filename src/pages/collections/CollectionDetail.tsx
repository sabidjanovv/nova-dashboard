import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Popconfirm, message, Spin, Modal } from "antd";
import {
  useGetCollectionByIdQuery,
  useUpdateMainImageMutation,
} from "../../redux/api/collections";
import {
  useAddImagesMutation,
  useDeleteImageMutation,
} from "../../redux/api/images";
import { DeleteOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const VITE_PUBLIC_IMAGE_URL = import.meta.env.VITE_PUBLIC_IMAGE_URL || "";

interface CollectionImage {
  id: number;
  image_url: string;
}

interface CollectionData {
  id: number;
  title: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  main_image_id?: number;
  mainImage?: { image_url: string };
  images: CollectionImage[];
}

const CollectionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, refetch } = useGetCollectionByIdQuery(
    Number(id),
    { skip: !id }
  );
  const [addImages] = useAddImagesMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [updateCollection] = useUpdateMainImageMutation(); // ✅ qo‘shildi
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) {
      message.warning("Iltimos, kamida bitta rasm tanlang.");
      return;
    }

    setIsUploading(true);
    try {
      await addImages({ collectionId: data?.data.id || 0, files }).unwrap();
      message.success("Rasmlar qo‘shildi");
      refetch();
      setIsUploadModalVisible(false);
      setSelectedFiles([]);
    } catch {
      message.error("Rasm qo‘shishda xatolik");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (imageId: number) => {
    try {
      await deleteImage(imageId).unwrap();
      message.success("Rasm o‘chirildi");
      refetch();
      setActiveImageIndex(null);
    } catch {
      message.error("Rasm o‘chirishda xatolik");
    }
  };

  // ✅ Asosiy rasm qilish funksiyasi
  const handleSetMainImage = async (imageId: number) => {
    try {
      await updateCollection({
        id: Number(id),
        main_image_id: imageId,
      }).unwrap();
      console.log(imageId)
      message.success("Asosiy rasm o‘rnatildi");
      refetch();
    } catch {
      message.error("Asosiy rasmni o‘rnatishda xatolik");
    }
  };

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleCloseModal = () => setActiveImageIndex(null);

  const handleUploadModalOpen = () => setIsUploadModalVisible(true);
  const handleUploadModalCancel = () => {
    setIsUploadModalVisible(false);
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );

  if (error || !data?.data)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500">
          Kolleksiya topilmadi yoki xatolik yuz berdi.
        </p>
      </div>
    );

  const {
    title,
    mainImage,
    main_image_id,
    description_uz,
    description_ru,
    description_en,
    images,
  } = data.data as CollectionData;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-light text-gray-900">{title}</h1>
        <Button
          onClick={handleUploadModalOpen}
          type="primary"
          ghost
          size="large"
          className="border-gray-300 text-gray-700 hover:border-gray-400"
        >
          + Yangi rasm
        </Button>
      </div>

      {/* Upload Modal */}
      <Modal
        title="Rasm Yuklash"
        open={isUploadModalVisible}
        onCancel={handleUploadModalCancel}
        footer={[
          <Button key="cancel" onClick={handleUploadModalCancel}>
            Bekor qilish
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => handleUpload(selectedFiles)}
            loading={isUploading}
            disabled={selectedFiles.length === 0}
          >
            Yuklash
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {selectedFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* Main Image */}
      {mainImage && (
        <div className="flex justify-center mb-8">
          <img
            src={`${VITE_PUBLIC_IMAGE_URL}/${mainImage.image_url}`}
            alt={title}
            className="w-full md:w-2/3 lg:w-1/2 h-auto rounded-xl shadow-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = "/fallback-image.jpg";
            }}
          />
        </div>
      )}

      {/* Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-medium text-gray-600 mb-1">UZ</h3>
          <p className="text-gray-700 leading-relaxed">
            {description_uz || "Tavsif yo‘q"}
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-600 mb-1">RU</h3>
          <p className="text-gray-700 leading-relaxed">
            {description_ru || "Описание отсутствует"}
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-600 mb-1">EN</h3>
          <p className="text-gray-700 leading-relaxed">
            {description_en || "No description available"}
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <h2 className="text-xl font-light text-gray-900 mb-6 flex justify-between items-center">
          Interyer & Eksteryer Rasmlari
          {images.length > 0 && (
            <span className="text-sm text-gray-500">({images.length} ta)</span>
          )}
        </h2>
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div key={img.id} className="relative group">
                <img
                  src={`${VITE_PUBLIC_IMAGE_URL}/${img.image_url}`}
                  alt={`3D Dizayn ${img.id}`}
                  className="w-full h-auto rounded-lg shadow-md cursor-pointer object-cover"
                  onClick={() => handleImageClick(index)}
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-image.jpg";
                  }}
                />
                {/* Hover Actions */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="small"
                    type={main_image_id === img.id ? "primary" : "default"}
                    icon={
                      main_image_id === img.id ? (
                        <StarFilled />
                      ) : (
                        <StarOutlined />
                      )
                    }
                    className="rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={() => handleSetMainImage(img.id)}
                    title="Asosiy rasm qilish"
                  />
                  <Popconfirm
                    title="Rasmni o‘chirishni tasdiqlaysizmi?"
                    okText="Ha"
                    cancelText="Yo‘q"
                    onConfirm={() => handleDelete(img.id)}
                  >
                    <Button
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      className="rounded-full w-8 h-8 flex items-center justify-center"
                    />
                  </Popconfirm>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Hozircha rasm yo‘q. Birinchi 3D dizayn yuklang.</p>
          </div>
        )}
      </div>

      {/* Fullscreen Swiper Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              initialSlide={activeImageIndex}
              spaceBetween={20}
              slidesPerView={1}
              className="w-full"
            >
              {images.map((swiperImg) => (
                <SwiperSlide key={swiperImg.id}>
                  <img
                    src={`${VITE_PUBLIC_IMAGE_URL}/${swiperImg.image_url}`}
                    alt={`3D Dizayn ${swiperImg.id}`}
                    className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-image.jpg";
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
