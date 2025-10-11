import { Button, Popconfirm, message } from "antd";
import {
  useGetAllTeamQuery,
  useDeleteTeamMutation,
} from "../../redux/api/team";

const TeamList = ({ onEdit }: { onEdit: (data: any) => void }) => {
  const { data: members = [], isLoading } = useGetAllTeamQuery();
  const [deleteTeam, { isLoading: deleting }] = useDeleteTeamMutation();
  const imageUrl = import.meta.env.VITE_PUBLIC_IMAGE_URL;

  const handleDelete = async (id: number) => {
    try {
      await deleteTeam({ id }).unwrap();
      message.success("Team a’zosi muvaffaqiyatli o‘chirildi!");
    } catch (error) {
      message.error("Xatolik yuz berdi, qayta urinib ko‘ring!");
      console.error(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {members.map((m: any) => {
        const fullImageUrl =
          m?.image_url && !m.image_url.startsWith("http")
            ? `${imageUrl.replace(/\/$/, "")}/${m.image_url}`
            : m?.image_url || "/default.png";

        return (
          <div
            key={m.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={fullImageUrl}
                alt={m.full_name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            <h2 className="text-lg font-semibold mt-3">{m.full_name}</h2>
            <p className="text-sm text-gray-700">{m.position}</p>
            <p className="text-sm text-gray-500">{m.phone}</p>
            <p className="text-sm mt-1">
              Holat:{" "}
              <span className={m.is_active ? "text-green-600" : "text-red-600"}>
                {m.is_active ? "Active ✅" : "Inactive ❌"}
              </span>
            </p>

            <div className="flex gap-2 mt-3">
              <Button
                type="primary"
                onClick={() => onEdit(m)}
                style={{ backgroundColor: "black", borderColor: "black" }}
                className="w-full"
              >
                Edit
              </Button>

              <Popconfirm
                title="Ushbu a’zoni o‘chirmoqchimisiz?"
                onConfirm={() => handleDelete(m.id)}
                okText="Ha"
                cancelText="Yo‘q"
              >
                <Button danger loading={deleting} className="w-full">
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamList;
