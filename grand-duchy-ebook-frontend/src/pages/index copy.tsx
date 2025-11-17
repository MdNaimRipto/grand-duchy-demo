import Loader from "@/common/loader/Loader";
import BannerLeftLoader from "@/common/loader/skeletonLoaders/BannerLeftLoader";
import BannerRightLoader from "@/common/loader/skeletonLoaders/BannerRightLoader";
import OpacityAnimation from "@/components/animation/OpacityAnimation";
import BannerCenter from "@/components/home-old/banner/BannerCenter";
import BannerLeft from "@/components/home-old/banner/BannerLeft";
import BannerRight from "@/components/home-old/banner/BannerRight";
import MainLayout, { useReadListContext } from "@/Layouts/MainLayout";
import { useGetFormattedBookByIdQuery } from "@/redux/features/booksApi";
import { useGetCharacterQuery } from "@/redux/features/characterApi";
import { IBookDetails } from "@/types/bookTypes";
import { ICharacter } from "@/types/characterTypes";
import { Skeleton } from "@mui/material";
import { ReactElement } from "react";

export default function Home() {
  const context = useReadListContext();
  const readList = context ? context.readList : null;

  console.log({ readList });

  const { data, isLoading, isError } = useGetFormattedBookByIdQuery({
    id: readList ? readList.bookId : "67b74628fdf15484e3fc0e96",
  });
  const {
    data: characterData,
    isLoading: isChapterLoading,
    isError: isChapterError,
  } = useGetCharacterQuery({});

  if (!data || isError) {
    return (
      <div className="mt-8 xl:mt-24 grid grid-cols-1 xl:grid-cols-9 xl:gap-4">
        <BannerLeftLoader />
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
        <BannerRightLoader />
      </div>
    );
  }

  if (!characterData || isChapterError) {
    return (
      <div className="mt-8 xl:mt-24 grid grid-cols-1 xl:grid-cols-9 xl:gap-4">
        <BannerLeftLoader />
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
        <BannerRightLoader />
      </div>
    );
  }
  const book = data.data as IBookDetails;
  console.log({ book });
  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const character = shuffleArray(characterData.data as ICharacter[]);

  const currentIndex = book.episodes.findIndex(
    (ep) => ep.episodeTitle === readList?.lastEpisodeTitle
  );

  // Get filtered episodes
  // const filteredEpisodes =
  //   currentIndex !== -1 ? book.episodes.slice(currentIndex) : [];

  const filteredEpisodes = book.episodes.slice(currentIndex);

  // Create a new book object with filtered episodes
  const filteredBook = {
    ...book,
    episodes: filteredEpisodes,
  };

  console.log({ filteredEpisodes });

  return (
    <OpacityAnimation>
      <div className="mt-8 xl:mt-24 grid grid-cols-1 xl:grid-cols-9 xl:gap-4">
        <BannerLeft book={readList ? filteredBook : book} />
        <BannerCenter
          characterData={character}
          isChapterLoading={isChapterLoading}
        />
        <BannerRight
          book={readList ? filteredBook : book}
          characterData={character}
          isChapterLoading={isChapterLoading}
          isLoading={isLoading}
        />
      </div>
    </OpacityAnimation>
  );
}

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
