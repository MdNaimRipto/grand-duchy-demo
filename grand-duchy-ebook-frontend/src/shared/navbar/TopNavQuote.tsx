import { IQuote } from "@/types/quotesType";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { Skeleton } from "@mui/material";

const TopNavQuote = ({
  quotes,
  isLoading,
}: {
  quotes: IQuote[];
  isLoading: boolean;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes?.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [quotes?.length]);

  if (isLoading) {
    return (
      <div className="w-full col-span-2 hidden lg:flex items-center gap-4">
        <div>
          <Skeleton
            variant="rectangular"
            sx={{
              bgcolor: "#6b6b6b",
              borderRadius: "10px",
              width: 50,
              height: 50,
            }}
          />
        </div>
        <div className="w-full">
          <Skeleton
            variant="rectangular"
            height={10}
            sx={{
              bgcolor: "#6b6b6b",
              borderRadius: "10px",
              width: "60%",
              mb: 2,
            }}
          />
          <Skeleton
            variant="rectangular"
            height={10}
            sx={{
              bgcolor: "#6b6b6b",
              borderRadius: "10px",
              width: "50%",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-2 hidden lg:flex items-center justify-start gap-4">
      <FaQuoteLeft className="text-darkPaper text-[40px] hidden md:block" />

      <motion.p
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.8 }}
        className="md:text-sm font-light italic"
      >
        <span>&quot;</span>
        {quotes[index]?.quote}
        <span>&quot;</span>

        <span className="text-xs not-italic text-gray font-semibold ml-2">
          ― {quotes[index]?.author}
        </span>
      </motion.p>
    </div>
  );
};

export default TopNavQuote;
