import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddTeamMutation, useEditTeamMutation } from "../../redux/api/team";

interface TeamForm {
  full_name: string;
  position?: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
  phone?: string;
  is_active: boolean;
  image?: FileList | null;
}

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  editData?: any;
}

const TeamModal: React.FC<Props> = ({ open, setOpen, editData }) => {
  const [addTeam] = useAddTeamMutation();
  const [editTeam] = useEditTeamMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm<TeamForm>({
    defaultValues: {
      full_name: "",
      position: "",
      description_uz: "",
      description_ru: "",
      description_en: "",
      phone: "",
      is_active: true,
      image: null,
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        full_name: editData.full_name,
        position: editData.position,
        description_uz: editData.description_uz,
        description_ru: editData.description_ru,
        description_en: editData.description_en,
        phone: editData.phone,
        is_active: editData.is_active,
        image: null,
      });
    } else {
      reset({
        full_name: "",
        position: "",
        description_uz: "",
        description_ru: "",
        description_en: "",
        phone: "",
        is_active: true,
        image: null,
      });
    }
  }, [editData, reset]);


  if (!open) return null;

  const onSubmit = async (values: TeamForm) => {
    if (isSubmitting) return; // oldini olish uchun
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("full_name", values.full_name);
    if (values.position) formData.append("position", values.position);
    if (values.description_uz)
      formData.append("description_uz", values.description_uz);
    if (values.description_ru)
      formData.append("description_ru", values.description_ru);
    if (values.description_en)
      formData.append("description_en", values.description_en);
    if (values.phone) formData.append("phone", values.phone);
    formData.append("is_active", String(values.is_active));

    if (values.image && values.image.length > 0) {
      formData.append(editData ? "file" : "image", values.image[0]);
    }

    try {
      if (editData) {
        await editTeam({ id: editData.id, body: formData }).unwrap();
      } else {
        await addTeam(formData).unwrap();
      }
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Error saving team:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {editData ? "Jamoa aʼzosini tahrirlash" : "Yangi jamoa aʼzosi"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              To‘liq ism
            </label>
            <input
              type="text"
              {...register("full_name", { required: true })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Lavozimi</label>
            <input
              type="text"
              {...register("position")}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Descriptions */}
          {(["uz", "ru", "en"] as const).map((lang) => (
            <div key={lang}>
              <label className="block text-sm text-gray-600 mb-1">
                Tavsif (
                {lang === "uz"
                  ? "O‘zbekcha"
                  : lang === "ru"
                  ? "Ruscha"
                  : "Inglizcha"}
                )
              </label>
              <textarea
                {...register(
                  `description_${lang}` as
                    | "description_uz"
                    | "description_ru"
                    | "description_en"
                )}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
              />
            </div>
          ))}

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Telefon raqam
            </label>
            <input
              type="text"
              {...register("phone")}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Active */}
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("is_active")} />
            <span className="text-sm text-gray-700">Faol</span>
          </label>

          {/* Image upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Rasm</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setValue("image", e.target.files, { shouldValidate: true })
              }
              className="w-full text-sm"
            />
            {watch("image")?.[0] && (
              <p className="text-xs text-gray-500 mt-1">
                Tanlangan: {watch("image")?.[0]?.name}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(TeamModal);

