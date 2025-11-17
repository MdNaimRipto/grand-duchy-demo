import { ICharacter } from "@/types/characterTypes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CharacterDetails = ({
  characterData,
}: {
  characterData: ICharacter[];
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % characterData?.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [characterData?.length]);
  return (
    <>
      <motion.div
        key={characterData[index]?._id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="hidden xl:flex flex-col gap-2 border-2 border-gray p-4 rounded-se-3xl rounded-es-3xl shadow-md"
      >
        <h3 className="text-xl m-2 2xl:text-2xl titleFont">
          {characterData[index]?.name}
        </h3>
        <p className="text-sm 2xl:text-lg text-justify tracking-wider">
          {characterData[index]?.summery}
        </p>
      </motion.div>
    </>
  );
};

export default CharacterDetails;
