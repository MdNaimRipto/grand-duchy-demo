import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Mousewheel } from "swiper/modules";
import { useGetBooksQuery } from "@/redux/features/booksApi";
import Loader from "@/common/loader/Loader";
import { IBooks } from "@/types/bookTypes";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery({});
  if (isLoading) {
    return <Loader />;
  }

  if (!data || isError) {
    return <p>Something went wrong</p>;
  }
  const books = data?.data as IBooks[];
  console.log(books);
  return (
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
  );
};

export default Books;
