import { Button } from "antd";
import { useGetAllTeamQuery } from "../../redux/api/team";

const TeamList = ({ onEdit }: { onEdit: (data: any) => void }) => {
  const { data: members = [], isLoading } = useGetAllTeamQuery();
  const imageUrl = import.meta.env.VITE_PUBLIC_IMAGE_URL;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {members.map((m: any) => {
        // To‘liq image URL yaratish
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

            <Button
              type="primary"
              className="mt-3 w-full"
              onClick={() => onEdit(m)}
              style={{ backgroundColor: "black", borderColor: "black" }}
            >
              Edit
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default TeamList;
