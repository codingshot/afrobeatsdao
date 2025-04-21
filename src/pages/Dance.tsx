
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DanceOfDay = () => {
  const danceExample = {
    name: "Gwara Gwara",
    origin: "South Africa",
    description: "A popular dance move that involves a rolling hand movement while stepping side to side. Made globally famous after being featured in several music videos.",
    difficulty: "Medium",
    videoUrl: "https://www.youtube.com/watch?v=example",
    tips: [
      "Start with the basic side step",
      "Add the hand movement gradually",
      "Practice the timing with music"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Dance of the Day</h1>
        
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">{danceExample.name}</h2>
          <p className="text-sm text-gray-500 mb-4">Origin: {danceExample.origin}</p>
          
          <div className="aspect-video bg-gray-100 mb-6 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Video preview placeholder</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{danceExample.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Difficulty</h3>
              <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {danceExample.difficulty}
              </span>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Pro Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {danceExample.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <Button className="w-full mt-4">
              Learn Full Tutorial
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DanceOfDay;
