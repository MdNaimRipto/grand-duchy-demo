import MainLayout from "@/Layouts/MainLayout";
import { ReactElement } from "react";
import BookDetails from "@/common/books/BookDetails";
import { useGetReadListDetailsQuery } from "@/redux/features/readListApi";
import { IReadList } from "@/types/readListTypes";
import { useUserContext } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import OpacityAnimation from "@/components/animation/OpacityAnimation";
import Loader from "@/common/loader/Loader";

const Books = () => {
  const { user } = useUserContext();

  const { bookId } = useParams();

  const { data, isLoading, refetch } = useGetReadListDetailsQuery({
    email: user ? user.email : "",
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
