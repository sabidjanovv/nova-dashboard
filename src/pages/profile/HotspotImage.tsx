import React from "react";

const hotspots = [
  {
    id: 1,
    top: "40%",
    left: "30%",
    title: "Stul modeli",
    image:
      "https://images.unsplash.com/photo-1616628182509-d1c6460d2a4d?w=400&auto=format&fit=crop&q=60", // stul
  },
  {
    id: 2,
    top: "55%",
    left: "60%",
    title: "Divan modeli",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=60", // divan
  },
  {
    id: 3,
    top: "70%",
    left: "45%",
    title: "Kofe stoli",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=60", // stol
  },
];

const HotspotImage = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"
        alt="Room"
        className="w-full rounded-xl shadow-lg"
      />

      {/* Hotspots */}
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          className="absolute"
          style={{
            top: spot.top,
            left: spot.left,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Circle button */}
          <div className="group relative">
            <button className="w-5 h-5 bg-gray-900 rounded-full border-2 border-white shadow-lg"></button>

            {/* Tooltip */}
            <div className="absolute top-[-130%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 transition-all duration-300 pointer-events-none">
              <div className="bg-white p-2 rounded-lg shadow-xl w-32 text-center">
                <img
                  src={spot.image}
                  alt={spot.title}
                  className="w-full h-20 object-cover rounded-md mb-2"
                />
                <p className="text-sm font-medium">{spot.title}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotspotImage;
