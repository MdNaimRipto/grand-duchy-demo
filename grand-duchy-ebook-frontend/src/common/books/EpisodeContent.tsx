import { useUserContext } from "@/context/AuthContext";
import { useGetBooksSummaryQuery } from "@/redux/features/summaryApi";
import { ISummary } from "@/types/summaryTypes";
import { IUser } from "@/types/userTypes";
import React from "react";
import Loader from "../loader/Loader";

const EpisodeContent = ({
  actTitle,
  bookId,
  chapterTitle,
  episodeTitle,
  content,
  localFontSize,
}: {
  bookId: string;
  actTitle: string;
  chapterTitle: string;
  episodeTitle: string;
  content: string;
  localFontSize: string;
}) => {
  const { user } = useUserContext();

  const typedUser = user as IUser;

  const { data, isLoading, error } = useGetBooksSummaryQuery({
    bookId,
    actTitle,
    chapterTitle,
    episodeTitle,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const characters = data.data as ISummary[];

  // Function to replace character names with tooltip
  // const findAndReplaceNameWithTooltip = () => {
  //   let updatedContent = content;

  //   characters.forEach(({ characterName, summary }) => {
  //     const regex = new RegExp(`(\\s)(${characterName})(\\s)`, "g");

  //     updatedContent = updatedContent.replace(
  //       regex,
  //       (match) => `
  //               <span class="group cursor-pointer inline-block">
  //                   <span class="font-extrabold text-error">${match}</span>

  //                   <!-- Tooltip -->
  //                   <span class="absolute z-50 left-1/2 transform -translate-x-1/2 mt-2
  //                       min-w-[96vw] md:min-w-[70vw] xl:min-w-[50vw] p-3 bg-gray text-white text-sm rounded-lg shadow-lg
  //                       opacity-0 scale-95 invisible transition-all duration-200 ease-in-out
  //                       group-hover:opacity-100 group-hover:scale-100 group-hover:visible pointer-events-auto
  //                       max-w-[90vw] max-h-[50vh]">

  //                       <span class="block font-bold text-base mb-1">${characterName}:</span>
  //                       ${summary}
  //                   </span>
  //               </span>
  //           `
  //     );
  //   });

  //   return updatedContent;
  // };

  const findAndReplaceNameWithTooltip = () => {
    let updatedContent = content;

    // Temporarily escape summaries to prevent them from being processed
    const characterMap = new Map();
    characters.forEach(({ characterName, summary }, index) => {
      // Replace summary temporarily with a unique placeholder
      const placeholder = `__CHAR_SUMMARY_PLACEHOLDER_${index}__`;
      characterMap.set(placeholder, { characterName, summary });
      updatedContent = updatedContent.replace(
        new RegExp(`(\\s)(${characterName})(\\s)`, "g"),
        (match) => placeholder
      );
    });

    // Now process visible text only
    characterMap.forEach(({ characterName, summary }, placeholder) => {
      const tooltipHtml = `
      <span class="group cursor-pointer inline-block">
        <span class="font-extrabold text-error">${characterName}</span>
        
        <!-- Tooltip -->
        <span class="absolute z-50 left-1/2 transform -translate-x-1/2 mt-2 
            min-w-[96vw] md:min-w-[70vw] xl:min-w-[50vw] p-3 bg-gray text-white text-sm rounded-lg shadow-lg 
            opacity-0 scale-95 invisible transition-all duration-200 ease-in-out 
            group-hover:opacity-100 group-hover:scale-100 group-hover:visible pointer-events-auto 
            max-w-[90vw] max-h-[50vh]">
            
            <span class="block font-bold text-base mb-1">${characterName}:</span>
            ${summary}
        </span>
      </span>
    `;

      // Replace placeholder back with full tooltip
      updatedContent = updatedContent.replaceAll(placeholder, tooltipHtml);
    });

    return updatedContent;
  };

  return (
    <div
      id="book-content"
      className={`mt-6 space-y-6 leading-relaxed textFont`}
      style={{
        fontSize: typedUser
          ? typedUser.fontSize
          : localFontSize
          ? `${localFontSize}px`
          : "18px",
      }}
      dangerouslySetInnerHTML={{
        __html: findAndReplaceNameWithTooltip(),
      }}
    />
  );
};

export default EpisodeContent;
