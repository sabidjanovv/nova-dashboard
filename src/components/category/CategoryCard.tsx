import React from "react";
import { Pencil, Trash2, Home, Building2 } from "lucide-react";

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
  const isInterior = category.type === "interior";

  const typeIcon = isInterior ? (
    <Home className="text-amber-500" size={22} />
  ) : (
    <Building2 className="text-blue-500" size={22} />
  );

  const typeColor = isInterior
    ? "border-amber-200 bg-amber-50/60"
    : "border-blue-200 bg-blue-50/60";

  return (
    <div
      className={`border ${typeColor} p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">{typeIcon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 capitalize truncate">
            {category.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 capitalize">
            {category.type}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(category)}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          title="Tahrirlash"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="p-2 rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          title="O‘chirish"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(CategoryCard);
