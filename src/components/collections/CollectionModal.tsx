// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useGetAllCategoriesQuery } from "../../redux/api/categories";
// import { CollectionDto } from "../../types";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: CollectionDto) => void;
//   initialValues?: Partial<CollectionDto>;
// }

// const CollectionModal: React.FC<Props> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   initialValues,
// }) => {
//   const { register, handleSubmit, reset, setValue } = useForm<CollectionDto>({
//     defaultValues: {
//       title: "",
//       description_uz: "",
//       description_ru: "",
//       description_en: "",
//       category_id: 1,
//       files: null,
//       ...initialValues,
//     },
//   });

//   const { data: categories, isLoading } = useGetAllCategoriesQuery(null);

//   useEffect(() => {
//     if (initialValues) {
//       reset(initialValues);
//     }
//   }, [initialValues, reset]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg border border-gray-100">
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">
//           {initialValues ? "Kolleksiyani tahrirlash" : "Yangi kolleksiya"}
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Category */}
//           <div>
//             <label
//               className="block text-sm text-gray-600 mb-1"
//               htmlFor="category_id"
//             >
//               Kategoriya
//             </label>
//             <select
//               id="category_id"
//               {...register("category_id", { valueAsNumber: true })}
//               className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
//             >
//               {isLoading ? (
//                 <option>Yuklanmoqda...</option>
//               ) : (
//                 categories?.map((c: any) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name} ({c.type})
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>

//           {/* Title */}
//           <div>
//             <label className="block text-sm text-gray-600 mb-1" htmlFor="title">
//               Sarlavha
//             </label>
//             <input
//               id="title"
//               type="text"
//               {...register("title")}
//               className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
//             />
//           </div>

//           {/* Descriptions */}
//           <textarea
//             {...register("description_uz")}
//             placeholder="Tavsif (UZ)"
//             className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
//           />
//           <textarea
//             {...register("description_ru")}
//             placeholder="Описание (RU)"
//             className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
//           />
//           <textarea
//             {...register("description_en")}
//             placeholder="Description (EN)"
//             className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
//           />

//           {/* Files */}
//           <div>
//             <label className="block text-sm text-gray-600 mb-1" htmlFor="files">
//               Fayllar
//             </label>
//             <input
//               id="files"
//               type="file"
//               multiple
//               onChange={(e) => {
//                 if (e.target.files) {
//                   setValue("files", e.target.files, { shouldValidate: true });
//                 }
//               }}
//               className="w-full text-sm"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end space-x-2 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
//             >
//               Bekor qilish
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
//             >
//               Saqlash
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CollectionModal;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetAllCategoriesQuery } from "../../redux/api/categories";
import { CollectionDto } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CollectionDto) => void;
  initialValues?: Partial<CollectionDto>;
}

const CollectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<CollectionDto>({
    defaultValues: {
      title: "",
      description_uz: "",
      description_ru: "",
      description_en: "",
      category_id: 1,
      files: null,
      ...initialValues,
    },
  });

  const { data: categories, isLoading } = useGetAllCategoriesQuery(null);

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {initialValues ? "Kolleksiyani tahrirlash" : "Yangi kolleksiya"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Category */}
          <div>
            <label
              className="block text-sm text-gray-600 mb-1"
              htmlFor="category_id"
            >
              Kategoriya
            </label>
            <select
              id="category_id"
              {...register("category_id", { valueAsNumber: true })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
            >
              {isLoading ? (
                <option>Yuklanmoqda...</option>
              ) : (
                categories?.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.type})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="title">
              Sarlavha
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Descriptions */}
          <textarea
            {...register("description_uz")}
            placeholder="Tavsif (UZ)"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
          />
          <textarea
            {...register("description_ru")}
            placeholder="Описание (RU)"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
          />
          <textarea
            {...register("description_en")}
            placeholder="Description (EN)"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
          />

          {/* Files - faqat create paytida */}
          {!initialValues && (
            <div>
              <label
                className="block text-sm text-gray-600 mb-1"
                htmlFor="files"
              >
                Fayllar
              </label>
              <input
                id="files"
                type="file"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setValue("files", e.target.files, { shouldValidate: true });
                  }
                }}
                className="w-full text-sm"
              />
            </div>
          )}

          {/* Buttons */}
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
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionModal;
