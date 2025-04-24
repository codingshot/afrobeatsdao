
import { Link } from "react-router-dom";
import { danceCurriculum } from "@/data/dance-curriculum";

const Dance = () => {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">
          Learn African Dance
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(danceCurriculum).map(([category, dances]) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold text-afro-yellow mb-4">{category}</h2>
              <div className="space-y-4">
                {dances.map((dance) => (
                  <Link
                    key={dance.id}
                    to={`/dance/${category}/${dance.id}`}
                    className="block bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-white">{dance.name}</h3>
                    <p className="text-sm text-gray-400">{dance.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dance;
