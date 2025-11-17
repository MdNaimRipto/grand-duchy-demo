import Image from "next/image";
import { ICharacter } from "@/types/characterTypes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CharacterDetails from "@/common/CharacterDetails";
import { Skeleton } from "@mui/material";

const BannerCenter = ({
  characterData,
  isChapterLoading,
}: {
  characterData: ICharacter[];
  isChapterLoading: boolean;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % characterData.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [characterData?.length]);

  if (isChapterLoading) {
    return (
      <div className="col-span-2 flex items-center justify-center h-full">
        <Skeleton
          variant="rectangular"
          // height={280}
          sx={{
            bgcolor: "#6b6b6b",
            borderRadius: "10px",
            width: {
              xs: "80%",
              sm: "50%",
              lg: "100%",
            },
            height: {
              xs: 500,
              lg: "80%",
            },
            mb: 3,
          }}
        />
      </div>
    );
  }

  return (
    <div className="col-span-2 flex flex-col justify-end items-center mb-8 lg:mb-0">
      <div className="hidden xl:flex justify-center items-end relative overflow-hidden w-full">
        <motion.div
          key={characterData[index]?._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={characterData[index]?.image}
            alt="Grand dutchy character image"
            width={500}
            height={500}
            priority={true}
          />
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4 xl:hidden">
        <div>
          <motion.div
            key={characterData[index]?._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={characterData[index]?.image}
              alt="Grand dutchy character image"
              width={500}
              height={500}
              priority={true}
            />
          </motion.div>
        </div>

        <div>
          <motion.div
            key={characterData[index]?._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col gap-2 border-2 border-gray p-4 rounded-se-3xl rounded-es-3xl shadow-md xl:hidden"
          >
            <h3 className="text-xl m-2 2xl:text-2xl titleFont">
              {characterData[index]?.name}
            </h3>
            <p className="text-sm 2xl:text-lg text-justify tracking-wider">
              {characterData[index]?.summery}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerCenter;
