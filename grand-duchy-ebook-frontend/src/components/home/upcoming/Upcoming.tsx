import { colorConfig } from "@/configs/colorConfig";
import { useReadListContext } from "@/Layouts/MainLayout";
import { IReadList } from "@/types/readListTypes";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import Countdown from "react-countdown";
import { GoArrowUpRight } from "react-icons/go";
import bg from "@/assets/images/banner.jpeg";

const Upcoming = () => {
  const context = useReadListContext();
  const readList = context ? (context.readList as IReadList) : null;

  return (
    <div
      style={{
        background: `
  linear-gradient(
    60deg,
    rgba(255, 246, 236, 0.95) 20%,
    rgba(201, 155, 100, 0.35) 60%,
    rgba(201, 155, 100, 0.25) 100%
  ),
  url(${bg.src})
`,

        height: "500px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      <Box
        sx={{
          background: {
            xs: `linear-gradient(
    89deg,
    rgba(235, 220, 205, 0.95) 40.04%,
    rgb(235 220 205) 43%,
    rgb(235 220 205) 46.55%,
    rgb(235 220 205) 49.27%,
    rgb(235 220 205 / 88%) 55.76%,
    rgb(235 220 205 / 72%) 64.69%
  )`,
            md: `linear-gradient(
    89deg,
    rgba(235, 220, 205, 0.95) 40.04%,
    rgb(235 220 205) 43%,
    rgb(235 220 205 / 86%) 46.55%,
    rgb(235 220 205 / 80%) 49.27%,
    rgb(235 220 205 / 60%) 55.76%,
    rgb(235 220 205 / 50%) 64.69%
  )`,
          },
        }}
      >
        <div className="flex flex-col gap-4 w-full lg:w-3/5 xl:w-2/5 items-center justify-center h-[500px] text-black">
          <h2 className="text-5xl titleFont font-semibold text-center">
            Upcoming Episode
          </h2>
          <p className="w-4/5 md:w-2/5 lg:w-2/5 text-center titleFont text-sm leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
            laboriosam!
          </p>
          <Countdown
            date={Date.now() + 604800000}
            className="text-3xl titleFont"
            autoStart
          />
          <Link
            href={`/book/${
              readList ? readList?.bookId : "67b74628fdf15484e3fc0e96"
            }`}
            className="relative z-40"
          >
            <Button
              sx={{
                backgroundColor: colorConfig.paper,
                color: colorConfig.darkPaper,
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
      </Box>
    </div>
  );
};

export default Upcoming;
