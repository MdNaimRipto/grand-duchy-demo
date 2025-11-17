import Loader from "@/common/loader/Loader";
import MainLayout from "@/Layouts/MainLayout";
import { useGetSummaryQuery } from "@/redux/features/summaryApi";
import { useGetBooksTitleQuery } from "@/redux/features/booksApi";
import { ISummary } from "@/types/summaryTypes";
import { IBookTitles } from "@/types/bookTypes";
import { ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { colorConfig } from "@/configs/colorConfig";
import OpacityAnimation from "@/components/animation/OpacityAnimation";
import {
  useMediaQuery,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import Image from "next/image";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: colorConfig.white,
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "start",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: colorConfig.primary,
  }),
}));

const Bookmark = () => {
  const storedTheme = window.localStorage.getItem("theme");
  const [uiTheme, setUiTheme] = useState<"dark" | "light">(
    storedTheme && storedTheme === "dark" ? "dark" : "light"
  );
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const [selectedBook, setSelectedBook] = useState("");
  const [selectedAct, setSelectedAct] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState("");

  const {
    data: summariesData,
    isLoading,
    error,
  } = useGetSummaryQuery({
    limit: "null",
    bookId: selectedBook?.length ? selectedBook : "",
    actTitle: selectedAct?.length ? selectedAct : "",
    chapterTitle: selectedChapter?.length ? selectedChapter : "",
    episodeTitle: selectedEpisode?.length ? selectedEpisode : "",
  });

  const { data: booksData, isLoading: titlesLoading } = useGetBooksTitleQuery(
    {}
  );

  if (isLoading || titlesLoading) return <Loader />;
  if (!summariesData || error || !booksData) return <p>Something went wrong</p>;

  const summaries = summariesData.data.data as ISummary[];
  const books = booksData.data as IBookTitles[];

  // No need to filter summaries on the frontend if backend handles it
  const uniqueActs = Array.from(
    new Set(summaries.map((item) => item.actTitle))
  );

  const uniqueChapters = selectedAct
    ? Array.from(
        new Set(
          summaries
            .filter((item) => item.actTitle === selectedAct)
            .map((item) => item.chapterTitle)
        )
      )
    : [];

  const uniqueEpisodes = selectedChapter
    ? Array.from(
        new Set(
          summaries
            .filter((item) => item.chapterTitle === selectedChapter)
            .map((item) => item.episodeTitle)
        )
      )
    : [];

  return (
    <OpacityAnimation>
      <div className="my-12">
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: {
              xs: 1,
              md: 2,
            },
            mb: 4,
          }}
        >
          {/* Book Selection */}
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              displayEmpty
              value={selectedBook}
              onChange={(e) => {
                setSelectedBook(e.target.value ? e.target.value : "");
                setSelectedAct("");
                setSelectedChapter("");
                setSelectedEpisode("");
              }}
              sx={{
                color: colorConfig.primary,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },
                "& .MuiSvgIcon-root": {
                  fill: colorConfig.primary,
                },
              }}
            >
              <MenuItem value="" sx={{ color: colorConfig.primary }}>
                All Books
              </MenuItem>
              {books.map((book) => (
                <MenuItem key={book._id} value={book._id}>
                  {book.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Act Selection */}
          <FormControl sx={{ minWidth: 200 }} disabled={!selectedBook}>
            <Select
              displayEmpty
              value={selectedAct}
              onChange={(e) => {
                setSelectedAct(e.target.value);
                setSelectedChapter("");
                setSelectedEpisode("");
              }}
              sx={{
                color: colorConfig.primary,

                "& .MuiSelect-select": {
                  color: colorConfig.primary,
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },

                "& .MuiSvgIcon-root": {
                  fill: colorConfig.primary,
                },
                "&.Mui-disabled": {
                  "& .MuiSelect-select": {
                    color: `${colorConfig.primary} !important`,
                    WebkitTextFillColor: `${colorConfig.primary} !important`,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorConfig.primary,
                  },
                  "& .MuiSvgIcon-root": {
                    fill: colorConfig.primary,
                  },
                },
              }}
            >
              <MenuItem value="">All Acts</MenuItem>
              {uniqueActs.map((act, index) => (
                <MenuItem key={index} value={act}>
                  {act}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Chapter Selection */}
          <FormControl sx={{ minWidth: 200 }} disabled={!selectedAct}>
            <Select
              displayEmpty
              value={selectedChapter}
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                setSelectedEpisode("");
              }}
              sx={{
                color: colorConfig.primary,

                "& .MuiSelect-select": {
                  color: colorConfig.primary,
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },

                "& .MuiSvgIcon-root": {
                  fill: colorConfig.primary,
                },
                "&.Mui-disabled": {
                  "& .MuiSelect-select": {
                    color: `${colorConfig.primary} !important`,
                    WebkitTextFillColor: `${colorConfig.primary} !important`,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorConfig.primary,
                  },
                  "& .MuiSvgIcon-root": {
                    fill: colorConfig.primary,
                  },
                },
              }}
            >
              <MenuItem value="">All Chapters</MenuItem>
              {uniqueChapters.map((chapter, index) => (
                <MenuItem key={index} value={chapter}>
                  {chapter}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Episode Selection */}
          <FormControl sx={{ minWidth: 200 }} disabled={!selectedChapter}>
            <Select
              displayEmpty
              value={selectedEpisode}
              onChange={(e) => setSelectedEpisode(e.target.value)}
              sx={{
                color: colorConfig.primary,

                "& .MuiSelect-select": {
                  color: colorConfig.primary,
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },

                "& .MuiSvgIcon-root": {
                  fill: colorConfig.primary,
                },
                "&.Mui-disabled": {
                  "& .MuiSelect-select": {
                    color: `${colorConfig.primary} !important`,
                    WebkitTextFillColor: `${colorConfig.primary} !important`,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorConfig.primary,
                  },
                  "& .MuiSvgIcon-root": {
                    fill: colorConfig.primary,
                  },
                },
              }}
            >
              <MenuItem value="">All Episodes</MenuItem>
              {uniqueEpisodes.map((episode, index) => (
                <MenuItem key={index} value={episode}>
                  {episode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Display Summaries */}
        <Box
          sx={{
            color: colorConfig.primary,
            borderColor: colorConfig.primary,
            borderRadius: 2,
          }}
        >
          <Masonry
            columns={isMobile ? 1 : isTablet ? 2 : 3}
            spacing={2}
            sx={{
              margin: "0 !important",
            }}
          >
            {summaries.map((data, index) => (
              <Item
                key={index}
                sx={{
                  backgroundColor: `#00000000 !important`,
                  border: `1px solid ${colorConfig.secondary}`,
                  borderRadius: "10px",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  // display: "flex",
                  // flexDirection: "unset",

                  gap: 2,
                }}
              >
                <div className="w-full h-full overflow-hidden text-primary mb-3">
                  <Image
                    className="w-full h-full object-contain"
                    width={150}
                    height={150}
                    src={data.image && data.image !== "empty" ? data.image : ""}
                    alt={
                      data.image && data.image !== "empty"
                        ? "Character Image"
                        : "Image wasn't found"
                    }
                  />
                </div>
                <div>
                  <div className="flex justify-between">
                    <h4 className="text-xl font-semibold mb-2 text-darkGray">
                      {data.characterName}
                    </h4>
                  </div>
                  <p className="text-sm font-medium mb-2 text-primary">
                    Act: <span className="font-semibold">{data.actTitle}</span>
                  </p>
                  <p className="text-sm font-medium mb-2 text-primary">
                    Chapter:{" "}
                    <span className="font-semibold">{data.chapterTitle}</span>
                  </p>
                  <p className="text-sm font-medium mb-2 text-primary">
                    Episode:{" "}
                    <span className="font-semibold">{data.episodeTitle}</span>
                  </p>
                  <p className="text-base text-primary">{data.summary}</p>
                </div>
              </Item>
            ))}
          </Masonry>
        </Box>
      </div>
    </OpacityAnimation>
  );
};

export default Bookmark;

Bookmark.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
