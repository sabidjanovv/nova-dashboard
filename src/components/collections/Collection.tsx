import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Collection } from "../../types";
import { Popconfirm, message } from "antd";

// Vite uchun environment variable
const BASE_URL = import.meta.env.VITE_PUBLIC_IMAGE_URL || "";

type Props = {
  collection: Collection;
  onEdit: (c: Collection) => void;
  onDelete: (id: number) => void;
};

const CollectionCard: React.FC<Props> = ({ collection, onEdit, onDelete }) => {
  const imageUrl = `${BASE_URL}/${collection.mainImage.image_url}`;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/collections/${collection.id}`)}
      className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 overflow-hidden"
    >
      <img
        src={imageUrl}
        alt={collection.title}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {collection.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 capitalize">
          {collection.category.name} • {collection.category.type}
        </p>
        <p className="text-sm text-gray-700 mt-3 line-clamp-3">
          {collection.description_uz}
        </p>

        <div className="mt-5 flex justify-end items-center space-x-3">
          {/* EDIT tasdiq */}
          <Popconfirm
            title="Tasdiqlash"
            description="Ushbu kolleksiyani tahrirlashni xohlaysizmi?"
            okText="Ha"
            cancelText="Yo‘q"
            onConfirm={(e) => {
              e?.stopPropagation();
              onEdit(collection);
              message.success("Tahrirlash boshlandi");
            }}
            onCancel={(e) => e?.stopPropagation()}
          >
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
              title="Tahrirlash"
            >
              <FiEdit2 size={18} />
            </button>
          </Popconfirm>

          {/* DELETE tasdiq */}
          <Popconfirm
            title="Tasdiqlash"
            description="Ushbu kolleksiyani o‘chirmoqchimisiz?"
            okText="Ha"
            cancelText="Yo‘q"
            onConfirm={(e) => {
              e?.stopPropagation();
              onDelete(collection.id);
              message.success("Kolleksiya o‘chirildi");
            }}
            onCancel={(e) => e?.stopPropagation()}
          >
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
              title="O'chirish"
            >
              <FiTrash2 size={18} />
            </button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
