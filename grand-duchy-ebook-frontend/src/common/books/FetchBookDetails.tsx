import { IBookDetails } from "@/types/bookTypes";
import { CircularProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import EpisodeContent from "./EpisodeContent";

import { colorConfig } from "@/configs/colorConfig";
import { IReadList } from "@/types/readListTypes";

const FetchBookDetails = ({
  book,
  epIndex,
  isEnd,
  setIsEnd,
  loadingMore,
  count,
  bookId,
  readListDetails,
  setCurrentEpisodeTitle,
}: {
  book: IBookDetails;
  epIndex: number;
  isEnd: boolean;
  setIsEnd: any;
  loadingMore: boolean;
  count: number;
  bookId: string;
  readListDetails: IReadList | null;
  setCurrentEpisodeTitle: any;
  readListRefetch: any;
}) => {
  const storedFont = JSON.parse(
    window.localStorage.getItem("fontSize") as string
  );
  const [localFontSize, setLocalFontSize] = useState(
    storedFont ? storedFont : "18"
  );

  // Scroll effect when readListDetails is available
  useEffect(() => {
    if (readListDetails?.lastEpisodeTitle) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          const targetElement = document.getElementById(
            `episode-${readListDetails.lastEpisodeTitle}`
          );
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      }, 500); // Delay ensures content is fully rendered before scrolling
    }
  }, [readListDetails, book]);

  useEffect(() => {
    // If we've loaded all episodes, set isEnd to true
    if (book.episodes.length && count <= book.episodes.length) {
      setIsEnd(true);
    } else {
      setIsEnd(false); // Otherwise, reset isEnd if there are more episodes to load
    }
  }, [book, count, setIsEnd]);

  // Local fontSize
  useEffect(() => {
    const handleFontSizeUpdate = () => {
      const newFontSize = JSON.parse(
        window.localStorage.getItem("fontSize") as string
      );
      setLocalFontSize(newFontSize);
    };

    window.addEventListener("fontSizeUpdated", handleFontSizeUpdate);

    return () => {
      window.removeEventListener("fontSizeUpdated", handleFontSizeUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-8 ">
        <h1 className="text-center text-3xl md:text-4xl tracking-widest uppercase titleFont">
          {book.title}
        </h1>
        <p className="text-center text-lg italic">by Sabri BÜLBÜL</p>

        <h2 className="mt-6 text-xl md:text-2xl font-bold border-b-2 border-primary md:pb-2">
          Prologue
        </h2>
        <div
          id="book-content"
          className={`mt-6 space-y-6 leading-relaxed textFont`}
          style={{
            fontSize: localFontSize ? `${localFontSize}px` : "18px",
          }}
          dangerouslySetInnerHTML={{ __html: book.prologue }}
        />
      </div>

      {book.episodes.slice(0, epIndex + 1).map((details, index) => (
        <Fragment key={index}>
          {details.actTitle !== book.episodes[index - 1]?.actTitle && (
            <h2 className="mt-6 text-xl md:text-2xl font-bold border-b-2 border-primary md:pb-2">
              {details.actTitle}
            </h2>
          )}

          {details.chapterTitle !== book.episodes[index - 1]?.chapterTitle && (
            <h2 className="mt-6 text-xl md:text-2xl font-bold border-b-2 border-primary md:pb-2">
              {details.chapterTitle}
            </h2>
          )}

          <h2
            id={`episode-${details.episodeTitle}`}
            className="mt-6 text-xl md:text-2xl font-bold border-b-2 border-primary md:pb-2"
            onChange={() => setCurrentEpisodeTitle(details.episodeTitle)}
          >
            {details.episodeTitle}
          </h2>
          <EpisodeContent
            bookId={bookId}
            actTitle={details.actTitle}
            chapterTitle={details.chapterTitle}
            episodeTitle={details.episodeTitle}
            content={details.content}
            localFontSize={localFontSize}
          />
        </Fragment>
      ))}

      {/* Show loading spinner when more episodes are loading */}
      {loadingMore && !isEnd && (
        <div className="flex items-center justify-center h-[200px]">
          <CircularProgress
            sx={{
              color: colorConfig.primary,
            }}
          />
        </div>
      )}

      {/* Display "No more episodes" when end is reached */}
      {isEnd && (
        <div className="text-center mt-4">
          <p className="text-xl font-semibold text-gray-500">The End</p>
        </div>
      )}
    </div>
  );
};

export default FetchBookDetails;
