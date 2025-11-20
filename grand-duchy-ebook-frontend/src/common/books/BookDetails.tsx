import {
  useGetBookByIdQuery,
  useGetEpisodeCountByIdQuery,
} from "@/redux/features/booksApi";
import { IBookDetails } from "@/types/bookTypes";
import React, { useEffect, useState } from "react";
import FetchBookDetails from "./FetchBookDetails";
import Loader from "../loader/Loader";
import { IReadList } from "@/types/readListTypes";

import { useParams } from "next/navigation";
import ComingSoonPage from "../ComingSoonPage";

const BookDetails = ({
  readListDetails,
  readListRefetch,
}: {
  readListDetails: IReadList | null;
  readListRefetch: any;
}) => {
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState<string | null>(
    null
  );

  const { bookId } = useParams();

  const [loadingMore, setLoadingMore] = useState(false);
  const [epIndex, setEpIndex] = useState(
    readListDetails ? readListDetails.currentIndex : 0
  );
  const [isEnd, setIsEnd] = useState(false); // Track if we reached the end of episodes

  // Redux query to fetch book details
  const { data, isLoading, isError, isFetching } = useGetBookByIdQuery({
    id: String(bookId),
    epIndex: epIndex,
  });

  const {
    data: count,
    isLoading: countLoading,
    isError: countError,
  } = useGetEpisodeCountByIdQuery({
    id: String(bookId),
  });

  // Scroll event listener to detect when the user reaches the bottom
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      const bottom =
        !isFetching &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 1;

      // Trigger fetching more episodes when at the bottom of the page
      if (bottom && !isEnd && !isFetching) {
        // Don't load more if we've reached the end
        setLoadingMore(true);
        setEpIndex((prevIndex) => prevIndex + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadingMore, isLoading, isEnd, isFetching]);

  // If loading, show loading spinner
  if ((isLoading || countLoading) && epIndex === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* <CircularProgress /> */}
        <Loader />
      </div>
    );
  }

  // If error, show error message
  if (!data || !count) {
    return <Loader />;
  }

  // Render content if data is available
  if (!data || data === null) {
    return <p>No book details found</p>;
  }

  const book = data?.data as IBookDetails;

  return (
    <>
      {book.prologue === "Coming soon..." ? (
        <ComingSoonPage book={book} />
      ) : (
        <FetchBookDetails
          book={book}
          epIndex={epIndex}
          isEnd={isEnd}
          loadingMore={loadingMore}
          setIsEnd={setIsEnd}
          count={count.data}
          bookId={String(bookId)}
          readListDetails={readListDetails}
          setCurrentEpisodeTitle={setCurrentEpisodeTitle}
          readListRefetch={readListRefetch}
        />
      )}
    </>
  );
};

export default BookDetails;
