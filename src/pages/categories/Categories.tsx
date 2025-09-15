// pages/categories.tsx
import React, { useState } from "react";
import Head from "next/head";
import {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/categories";
import CategoryModal from "../../components/category/CategoryModal";
import CategoryCard from "../../components/category/CategoryCard";
import { FiPlus } from "react-icons/fi";

interface Category {
  id: number;
  name: string;
  type: "interior" | "exterior";
  createdAt: string;
  updatedAt: string;
}

const CategoriesPage: React.FC = () => {
  const { data, isLoading, isError } = useGetAllCategoriesQuery(null);
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
      <Head>
        <title>Kategoriyalar</title>
      </Head>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
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

export default CategoriesPage;
