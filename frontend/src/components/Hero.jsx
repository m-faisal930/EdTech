import { useEffect, useState } from "react";
import { World } from "./ui/globe";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

export const Hero = () => {
  
    const arcData = [
        {
          startLat: 40.7128, startLng: -74.0060, // New York
          endLat: 51.5074, endLng: -0.1278,     // London
          color: "#ff7ac6",
          arcAlt: 0.3,
          order: 0,
        },
        {
          startLat: 35.6895, startLng: 139.6917, // Tokyo
          endLat: 37.7749, endLng: -122.4194,   // San Francisco
          color: "#d89afc",
          arcAlt: 0.25,
          order: 1,
        },
        {
          startLat: -33.8688, startLng: 151.2093, // Sydney
          endLat: 1.3521, endLng: 103.8198,       // Singapore
          color: "#e7c94d",
          arcAlt: 0.2,
          order: 2,
        },
        {
          startLat: 28.6139, startLng: 77.2090,  // Delhi
          endLat: 55.7558, endLng: 37.6173,      // Moscow
          color: "#1836b2",
          arcAlt: 0.3,
          order: 3,
        },
        {
          startLat: 48.8566, startLng: 2.3522,   // Paris
          endLat: 34.0522, endLng: -118.2437,    // Los Angeles
          color: "#8c52ff",
          arcAlt: 0.25,
          order: 4,
        }
      ];      

  return (
    <BackgroundBeamsWithCollision className="relative z-10">
      <div className="flex flex-col md:flex-row justify-between pt-4 px-4">
        {/* text div */}
        <div className="flex flex-col mt-8 md:mt-32 px-4 md:px-8">
          <h1 className="text-2xl md:text-6xl font-outfit font-bold text-[#003060] mb-4">
            Education for the Next Generation.
          </h1>
          <p className="text-lg text-black w-48 md:w-[480px]">
            Learn smarter, teach better. Build courses, engage in real time, and explore AI-powered education — all in one immersive platform.
          </p>
        </div>

        {/* 3D Globe */}
        <div className="relative mt-8 mb-12 w-[600px] h-[420px] md:w-[720px] md:h-[420px] overflow-hidden rounded-lg">
          <World globeConfig={{ globeColor: "#1d072e" }} data={arcData} />
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};
