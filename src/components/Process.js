import { motion } from "framer-motion";
import Image from "next/image"; // Import Next.js Image component

const processStages = [
  { id: 1, src: "/images/plant.svg", angle: -90, label: "Planting" }, // Planting
  { id: 2, src: "/images/harvest.svg", angle: 0, label: "Harvesting" }, // Harvesting
  { id: 3, src: "/images/plant2.png", angle: 90, label: "Processing" }, // Processing
  { id: 4, src: "/images/package.svg", angle: 180, label: "Packaging" }, // Packaging
];

export default function ProductionCycle() {
  const radius = 200; // Adjust spacing
  const centerX = 158; // Center X
  const centerY = 100; // Center Y

  return (
    <div className="flex flex-col items-center py-12 bg-gray-50">


      {/* Cycle Container */}
      <div className="relative w-[250px] h-[250px] mt-12">
        {/* Rotating Background Circle */}
        <motion.div
          className="absolute w-full h-full border-[3px] border-dashed border-custom-brown rounded-full ml-20 mt-5"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        />

        {/* Steps with SVG Images */}
        {processStages.map((stage, index) => {
          const angleRad = (stage.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius + centerX;
          const y = Math.sin(angleRad) * radius + centerY;

          return (
            <motion.div
              key={stage.id}
              className="absolute flex flex-col items-center"
              style={{
                top: `${y}px`,
                left: `${x}px`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >


              {/* Step Vector Image */}
              <motion.div className="mt-2" whileHover={{ scale: 1.2 }}>
                <Image src={stage.src} alt={stage.label} width={50} height={50} />
              </motion.div>


              
                <div className="inset-0 flex items-center justify-center gap-2 mt-2">
         {/* Step Number */}
              <motion.div
                className="flex items-center justify-center w-5 h-5 text-sm font-bold text-white rounded-full shadow-lg bg-custom-brown"
                whileHover={{ scale: 1.2 }}
              >
                {stage.id}
              </motion.div>

              
              {/* Step Label */}
              <motion.div className="mt-1 text-sm font-semibold text-gray-800">
                {stage.label}
              </motion.div>
                </div>
              
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
