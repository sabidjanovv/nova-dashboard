// pages/categories.tsx
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Segmented } from "antd";
import {
  useGetAllCategoriesQuery,
  useGetAllCategoriesByTypeQueryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/categories";
import CategoryModal from "../../components/category/CategoryModal";
import CategoryCard from "../../components/category/CategoryCard";
import { FiPlus } from "react-icons/fi";
import { skipToken } from "@reduxjs/toolkit/query";
interface Category {
  id: number;
  name: string;
  type: "interior" | "exterior";
  createdAt: string;
  updatedAt: string;
}

const CategoriesPage: React.FC = () => {
  const [filterType, setFilterType] = useState<
    "barchasi" | "interior" | "exterior"
  >("barchasi");

  // Default barcha kategoriyalar
  const {
    data: allData,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetAllCategoriesQuery(null);

  // Turlarga qarab kategoriyalar
  const {
    data: filteredData,
    isLoading: isLoadingByType,
    isError: isErrorByType,
  } = useGetAllCategoriesByTypeQueryQuery(
    filterType !== "barchasi" ? filterType : skipToken,
    {
      skip: filterType === "barchasi", // skip ishlaydi faqat tanlangan bo‘lsa
    }
  );

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleOpenModal = (category: Category | null = null) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
  };

  const handleSave = async (formData: {
    name: string;
    type: "interior" | "exterior";
  }) => {
    try {
      if (currentCategory) {
        await updateCategory({ id: currentCategory.id, body: formData });
      } else {
        await addCategory(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Saqlashda xatolik:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bu kategoriyani o‘chirmoqchimisiz?")) {
      try {
        await deleteCategory(id);
      } catch (error) {
        console.error("O‘chirishda xatolik:", error);
      }
    }
  };

  const isLoading = filterType === "barchasi" ? isLoadingAll : isLoadingByType;
  const isError = filterType === "barchasi" ? isErrorAll : isErrorByType;
  const data = filterType === "barchasi" ? allData : filteredData;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Yuklanmoqda...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-medium">
          Xatolik yuz berdi. Qayta urinib ko‘ring.
        </p>
      </div>
    );

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Helmet>
          <title>Kategoriyalar</title>
        </Helmet>
        <p className="text-gray-600 text-base">
          Hozircha hech qanday kategoriya mavjud emas.
        </p>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FiPlus size={18} /> Yangi kategoriya
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Kategoriyalar</title>
      </Helmet>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Kategoriyalar
          </h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FiPlus size={18} /> Qo‘shish
          </button>
        </div>

        {/* Segmented filter */}
        <div className="mb-8">
          <Segmented
            options={[
              { label: "Barchasi", value: "barchasi" },
              { label: "Interior", value: "interior" },
              { label: "Exterior", value: "exterior" },
            ]}
            value={filterType}
            onChange={(val) =>
              setFilterType(val as "barchasi" | "interior" | "exterior")
            }
          />
        </div>

        {/* Category list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.map((category: Category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSave}
        initialValues={
          currentCategory
            ? { name: currentCategory.name, type: currentCategory.type }
            : undefined
        }
      />
    </>
  );
};

export default React.memo(CategoriesPage);
