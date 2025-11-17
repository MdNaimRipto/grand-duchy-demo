import Image from "next/image";
import banner from "@/assets/images/banner.jpeg";
import Link from "next/link";
import { Button } from "@mui/material";
import { colorConfig } from "@/configs/colorConfig";
import { GoArrowUpRight } from "react-icons/go";
import { useReadListContext } from "@/Layouts/MainLayout";
import { IReadList } from "@/types/readListTypes";

const Banner = () => {
  const context = useReadListContext();
  const readList = context ? (context.readList as IReadList) : null;

  return (
    <div className="my-16 h-[400px] md:h-[600px] relative flex flex-col gap-6 justify-center px-4 xl:px-16">
      <div className="bg-gradient-to-r from-customBlack/50 from-40% to-customBlack/10 absolute z-10 top-0 left-0 w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <Image
          src={banner}
          alt="Banner-image"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <h1 className="relative z-40 text-white text-2xl md:text-6xl xl:text-7xl titleFont w-full md:w-[680px]">
        Explore The World of Grand Duchy
      </h1>
      <p className="relative z-40 text-white text-xs md:text-lg textFont w-full md:w-[680px] text-left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque harum
        esse ad odit alias tempora suscipit itaque non autem. Nesciunt ut
        quidem, deserunt eum laudantium odio debitis consectetur ad. Similique.
      </p>
      <Link
        href={`/book/${
          readList ? readList?.bookId : "67b74628fdf15484e3fc0e96"
        }`}
        className="relative z-40"
      >
        <Button
          sx={{
            backgroundColor: colorConfig.darkPaper,
            color: colorConfig.white,
            borderRadius: "20px",
            fontSize: "12px",
            textTransform: "capitalize",
            py: "8px",
            px: "16px",
          }}
        >
          Continue reading <GoArrowUpRight className="text-lg ml-1" />
        </Button>
      </Link>
    </div>
  );
};

export default Banner;
