import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAddTeamMutation, useEditTeamMutation } from "../../redux/api/team";

interface TeamForm {
  full_name: string;
  position?: string;
  description?: string;
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

  const { register, handleSubmit, reset, setValue, watch } = useForm<TeamForm>({
    defaultValues: {
      full_name: "",
      position: "",
      description: "",
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
        description: editData.description,
        phone: editData.phone,
        is_active: editData.is_active,
        image: null,
      });
    } else {
      reset({
        full_name: "",
        position: "",
        description: "",
        phone: "",
        is_active: true,
        image: null,
      });
    }
  }, [editData, reset]);

  if (!open) return null;

  const onSubmit = async (values: TeamForm) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    if (values.position) formData.append("position", values.position);
    if (values.description) formData.append("description", values.description);
    if (values.phone) formData.append("phone", values.phone);
    formData.append("is_active", String(values.is_active));

    // add va update uchun mos nom bilan file qo‘shish
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

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tavsif</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
            />
          </div>

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

export default TeamModal;
