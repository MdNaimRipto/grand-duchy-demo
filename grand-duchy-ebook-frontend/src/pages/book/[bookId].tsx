import MainLayout from "@/Layouts/MainLayout";
import { ReactElement } from "react";
import BookDetails from "@/common/books/BookDetails";
import { useGetReadListDetailsQuery } from "@/redux/features/readListApi";
import { IReadList } from "@/types/readListTypes";
import OpacityAnimation from "@/components/animation/OpacityAnimation";
import Loader from "@/common/loader/Loader";
import { useRouter } from "next/router";

const Books = () => {
  const router = useRouter();
  const { bookId } = router.query;

  console.log({ bookId });

  const { data, isLoading, refetch } = useGetReadListDetailsQuery({
    email: "",
    bookId: String(bookId),
  });

  if (isLoading) {
    return <Loader />;
  }

  const readListDetails = data.data as IReadList;

  return (
    <OpacityAnimation>
      <div className="overflow-x-hidden max-w-7xl mx-auto">
        <BookDetails
          readListDetails={readListDetails}
          readListRefetch={refetch}
        />
      </div>
    </OpacityAnimation>
  );
};

export default Books;

Books.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
