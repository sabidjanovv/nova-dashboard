import React from "react";
import { Pencil, Trash2 } from "lucide-react"; // ikonkalar

interface Category {
  id: number;
  name: string;
  type: "interior" | "exterior";
  createdAt: string;
  updatedAt: string;
}

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-medium text-gray-800 capitalize">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-gray-500">{category.type}</p>
      </div>

      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(category)}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
          title="Tahrirlash"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="p-2 rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 transition"
          title="O‘chirish"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
