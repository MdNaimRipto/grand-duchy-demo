import { colorConfig } from "@/configs/colorConfig";
import { IBookDetails, IBooks } from "@/types/bookTypes";
import { Button } from "@mui/material";
import { GoArrowUpRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Mousewheel } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useGetBooksQuery } from "@/redux/features/booksApi";
import { IReadList } from "@/types/readListTypes";
import { useReadListContext } from "@/Layouts/MainLayout";
import BannerLeftLoader from "@/common/loader/skeletonLoaders/BannerLeftLoader";

const BannerLeft = ({ book }: { book: IBookDetails }) => {
  const { data, isLoading, isError } = useGetBooksQuery({});

  const context = useReadListContext();
  const readList = context ? (context.readList as IReadList) : null;

  const lastEpisodeRead = () => {
    if (!readList) {
      return null;
    }
    const result = book.episodes.find(
      (b) => b.episodeTitle === readList.lastEpisodeTitle
    );
    return result;
  };

  const lastEpisode = lastEpisodeRead();

  if (isLoading) {
    return <BannerLeftLoader />;
  }

  if (!data || isError) {
    return <BannerLeftLoader />;
  }
  const books = data?.data as IBooks[];
  console.log(book);
  console.log(lastEpisode);
  return (
    <div className="col-span-4">
      {/* Last episode read for mobile */}
      <div className="flex flex-col gap-2 mb-8 ">
        <h2 className="text-3xl 2xl:text-4xl titleFont">
          The last episode read
        </h2>
        <p className="font-medium">
          {lastEpisode
            ? lastEpisode.episodeTitle
            : book?.episodes[0].episodeTitle}
        </p>
        <p
          className="text-sm 2xl:text-lg text-justify tracking-wider mb-2 flex flex-col gap-4 leading-6"
          dangerouslySetInnerHTML={{
            __html: lastEpisode
              ? lastEpisode.content.slice(0, 500) + "..."
              : book?.episodes[0].content.slice(0, 500) + "...",
          }}
        />
        <Link
          href={`/book/${
            readList ? readList?.bookId : "67b74628fdf15484e3fc0e96"
          }`}
        >
          <Button
            sx={{
              backgroundColor: colorConfig.primary,
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
      {/* the latest episode */}
      <div className="mb-8 xl:hidden">
        <h1 className="text-2xl  titleFont mb-4">Here is the latest episode</h1>
        <p
          className="text-sm text-justify tracking-wider mb-6 flex flex-col gap-4 leading-6"
          dangerouslySetInnerHTML={{
            __html: lastEpisode
              ? lastEpisode.content.slice(0, 500) + "..."
              : book?.episodes[0].content.slice(0, 500) + "...",
          }}
        />
      </div>
      {/* Book */}
      <div className="mb-8">
        <Swiper
          breakpoints={{
            768: {
              slidesPerView: 4,
            },
            1536: {
              slidesPerView: 5,
            },
          }}
          slidesPerView={2}
          spaceBetween={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          mousewheel={{ forceToAxis: true }}
          loop={true}
          modules={[Autoplay, Mousewheel]}
          className="mySwiper"
        >
          {books.map((data, index) => (
            <SwiperSlide key={index} className="m-auto cursor-grab">
              <Link href={`/book/${data._id}`}>
                <div className="px-2">
                  <Image
                    className="w-full h-full"
                    src={data.image}
                    alt={data.title}
                    priority={true}
                    width={600}
                    height={600}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Cards */}
      <div className="hidden xl:grid grid-cols-1 md:grid-cols-2 gap-4">
        {book?.episodes.slice(1, 3).map((data, index) => (
          <div
            key={index}
            className="shadow-md hover:shadow-xl hover:scale-105 rounded-lg p-6 border border-secondary"
          >
            <h4 className="text-xl titleFont mb-2 min-h-[70px] leading-9">
              {data.episodeTitle}
            </h4>
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{
                __html: data.content.slice(0, 120) + "...",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerLeft;
