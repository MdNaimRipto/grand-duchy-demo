import Image from "next/image";
import userImage from "@/assets/images/user.webp";
import { Button } from "@mui/material";
import { colorConfig } from "@/configs/colorConfig";
import Link from "next/link";
import { useGetQuotesQuery } from "@/redux/features/quoteApi";
import { IQuote } from "@/types/quotesType";
import logo from "@/assets/images/GrayishoneblackMOREGRASTROKED.png";
import TopNavQuote from "./TopNavQuote";
import ThemeToggler from "./ThemeToggler";

const TopNav = ({
  setUiTheme,
  uiTheme,
}: {
  setUiTheme: any;
  uiTheme: "light" | "dark";
}) => {
  const { data, isLoading: isQuoteLoading, error } = useGetQuotesQuery({});

  if (!data || error) {
    return <div></div>;
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const quotes = shuffleArray(data?.data as IQuote[]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
      <div className="flex lg:hidden items-center justify-between gap-4 pb-4 lg:pb-0">
        <Link href={"/"} className="block w-10">
          <Image
            className="w-full h-full"
            src={logo}
            alt="The Grand duchy logo"
            priority={true}
          />
        </Link>
        <div className="flex items-center gap-1 lg:gap-4">
          <div className="lg:hidden">
            <ThemeToggler setUiTheme={setUiTheme} uiTheme={uiTheme} />
          </div>
          <Link href="https://grand-duchy-ebook.vercel.app" target="_blank">
            <Button
              sx={{
                backgroundColor: colorConfig.primary,
                color: colorConfig.white,
                textTransform: "capitalize",
                fontWeight: "600",
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.875rem",
                },
              }}
            >
              Visit The Grand Duchy
            </Button>
          </Link>
        </div>
      </div>
      {/* Quote */}
      <TopNavQuote quotes={quotes} isLoading={isQuoteLoading} />
      <div className="flex justify-end gap-4">
        <div className="hidden lg:flex items-center">
          <ThemeToggler setUiTheme={setUiTheme} uiTheme={uiTheme} />
        </div>

        <div className="hidden lg:flex items-center justify-end gap-1 md:gap-4">
          <Link href="https://grand-duchy-ebook.vercel.app" target="_blank">
            <Button
              sx={{
                backgroundColor: colorConfig.darkPaper,
                color: colorConfig.white,
                textTransform: "capitalize",
                fontWeight: "600",
              }}
            >
              Visit The Grand Duchy
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
