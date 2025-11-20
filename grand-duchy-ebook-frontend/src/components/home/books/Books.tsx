import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import { useGetBooksQuery } from "@/redux/features/booksApi";
import Loader from "@/common/loader/Loader";
import { IBooks } from "@/types/bookTypes";
import placeholder from "@/assets/images/placeholder.png";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery({});
  if (isLoading) {
    return <div></div>;
  }

  if (!data || isError) {
    return <p>Something went wrong</p>;
  }
  const books = data?.data as IBooks[];
  console.log(books);
  return (
    <div>
      <h3 className="text-center text-beige text-[80px] md:text-[140px] lg:text-[200px]">
        Books
      </h3>
      <div className="md:-mt-20 lg:-mt-28 mb-20 max-w-[250px] mx-auto md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl overflow-hidden">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
            1440: { slidesPerView: 7 },
          }}
          spaceBetween={40}
          speed={1500}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          mousewheel={{ forceToAxis: true }}
          loop={true}
          modules={[Autoplay, Mousewheel]}
          className="overflow-hidden w-full"
        >
          {books.map((data, index) => (
            <SwiperSlide key={index}>
              <Link href={`/book/${data._id}`}>
                <div className="w-full h-full  overflow-hidden">
                  <Image
                    className="w-full h-full object-contain"
                    src={data.image}
                    alt={data.title}
                    priority
                    width={600}
                    height={600}
                    placeholder="blur"
                    blurDataURL={placeholder.src}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Books;
