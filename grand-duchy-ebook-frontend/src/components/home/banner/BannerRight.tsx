import CharacterDetails from "@/common/CharacterDetails";
import Loader from "@/common/loader/Loader";
import BannerRightLoader from "@/common/loader/skeletonLoaders/BannerRightLoader";
import { colorConfig } from "@/configs/colorConfig";
import { useReadListContext } from "@/Layouts/MainLayout";
import { useGetLatestEpisodeQuery } from "@/redux/features/booksApi";
import { IBookDetails, IEpisode } from "@/types/bookTypes";
import { ICharacter } from "@/types/characterTypes";
import { IReadList } from "@/types/readListTypes";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const Counter = dynamic(() => import("../../../common/Counter"), {
  ssr: false,
});

const BannerRight = ({
  book,
  characterData,
  isLoading: isBookLoading,
  isChapterLoading,
}: {
  book: IBookDetails;
  characterData: ICharacter[];
  isLoading: boolean;
  isChapterLoading: boolean;
}) => {
  const { data, isLoading } = useGetLatestEpisodeQuery({});

  if (isLoading || isBookLoading || isChapterLoading) {
    return <BannerRightLoader />;
  }

  if (!data) {
    return <BannerRightLoader />;
  }

  const latestEpisode = data?.data as IEpisode;

  return (
    <div className="col-span-3">
      {/* Top */}
      <div className="hidden xl:flex flex-col gap-4">
        <h1 className="text-3xl titleFont titleFont">
          Here is the latest episode
        </h1>
        <p
          className="text-sm 2xl:text-lg text-justify tracking-wider mb-6 flex flex-col gap-4 leading-6"
          dangerouslySetInnerHTML={{
            __html: latestEpisode?.content?.slice(0, 400) + "...",
          }}
        />
      </div>
      {/* Center */}
      <div className="mb-8 hidden xl:block">
        <h3 className="text-xl font-medium">Next episode coming on</h3>
        <Counter />
      </div>
      {/* Bottom */}
      <CharacterDetails characterData={characterData} />
      {/* Count for mobile */}
      <div className="my-8 flex flex-col items-center xl:hidden">
        <h3 className="text-xl font-medium">Next episode coming on</h3>
        <Counter />
      </div>
      {/* Episode cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
        {book?.episodes.slice(1, 3).map((data, index) => (
          <div
            key={index}
            className="shadow-md hover:shadow-xl hover:scale-105 rounded-lg p-6 border border-secondary"
          >
            <h4 className="text-xl titleFont mb-2 min-h-[70px] leading-9">
              {data.episodeTitle}
            </h4>
            <p
              className="text-sm text-justify"
              dangerouslySetInnerHTML={{
                __html: data.content.slice(0, 60) + "...",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerRight;
