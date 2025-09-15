import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form ma'lumotlari uchun schema
const categorySchema = z.object({
  name: z.string().min(1, "Ism kiritilishi shart"),
  type: z.enum(["interior", "exterior"]),
});

type FormData = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialValues?: FormData;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    } else {
      reset({ name: "", type: "interior" });
    }
  }, [initialValues, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          {initialValues ? "Kategoriyani tahrirlash" : "Yangi kategoriya"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="name">
              Ism
            </label>
            <input
              id="name"
              {...register("name")}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="type">
              Turi
            </label>
            <select
              id="type"
              {...register("type")}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
            >
              <option value="interior">Interior</option>
              <option value="exterior">Exterior</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
