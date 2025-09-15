import React, { useState } from "react";
import Head from "next/head";
import {
  useGetAllCollectionsQuery,
  useAddCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
} from "../../redux/api/collections";
import CollectionModal from "../../components/collections/CollectionModal";

import { FiPlus } from "react-icons/fi";
import { Collection, CollectionDto } from "../../types";
import CollectionCard from "../../components/collections/Collection";

const CollectionsPage: React.FC = () => {
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetAllCollectionsQuery({});
  const [addCollection] = useAddCollectionMutation();
  const [updateCollection] = useUpdateCollectionMutation();
  const [deleteCollection] = useDeleteCollectionMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(
    null
  );

  const handleOpenModal = (collection: Collection) => {
    setCurrentCollection(collection);
    setIsModalOpen(true);
  };

  const handleNewModal = () => {
    setCurrentCollection(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentCollection(null);
    setIsModalOpen(false);
  };

  const handleSave = async (formData: CollectionDto) => {
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "files" && value instanceof FileList) {
        Array.from(value).forEach((file) => fd.append("files", file));
      } else {
        fd.append(key, value as any);
      }
    });

    try {
      if (currentCollection) {
        await updateCollection({ id: currentCollection.id, body: fd });
      } else {
        await addCollection(fd);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Saqlashda xatolik:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Haqiqatdan ham o‘chirmoqchimisiz?")) {
      try {
        await deleteCollection(id);
      } catch (error) {
        console.error("O‘chirishda xatolik:", error);
      }
    }
  };

  const collections: Collection[] = apiResponse?.data?.items || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-xl font-medium">Yuklanmoqda...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-xl font-medium">
          Xatolik yuz berdi. Ma'lumotlar yuklanmadi.
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Kolleksiyalar</title>
      </Head>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Kolleksiyalar</h1>

          <button
            onClick={handleNewModal}
            className="flex items-center gap-2 py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FiPlus size={18} /> Qo‘shish
          </button>
        </div>

        {collections.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50 rounded-xl p-8">
            <p className="text-gray-500 text-lg mb-4">
              Hozircha hech qanday kolleksiya mavjud emas.
            </p>
            <button
              onClick={handleNewModal}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors transform hover:scale-105"
            >
              Birinchi kolleksiyani qo‘shish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collections.map((c: Collection) => (
              <CollectionCard
                key={c.id}
                collection={c}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <CollectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSave}
        initialValues={
          currentCollection
            ? {
                title: currentCollection.title,
                description_uz: currentCollection.description_uz,
                description_ru: currentCollection.description_ru,
                description_en: currentCollection.description_en,
                category_id: currentCollection.category_id,
              }
            : undefined
        }
      />
    </>
  );
};

export default CollectionsPage;
