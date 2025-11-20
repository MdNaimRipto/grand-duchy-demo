import { colorConfig } from "@/configs/colorConfig";
import { Button } from "@mui/material";
import BookmarkTable from "../bookmarkComponents/BookmarkTable";
import { useState } from "react";
import AddSummaryModal from "@/components/summary/AddSummaryModal";
import Loader from "@/common/loader/Loader";
import { useGetSummaryQuery } from "@/redux/features/summaryApi";
import { ISummary } from "@/types/summaryTypes";
import OpacityAnimation from "@/components/animation/OpacityAnimation";
import SearchTermInputField from "@/common/SearchTermInputField";

const BookmarkTab = () => {
  const [showAddBookmarkForm, setShowAddBookmarkForm] = useState(false);

  const [search, setSearch] = useState("");

  const { data, isLoading, error, refetch } = useGetSummaryQuery({
    searchTerm: search,
    limit: "null",
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const summaries = data.data.data as ISummary[];
  return (
    <>
      <OpacityAnimation>
        <>
          <div className="flex justify-between items-center md:p-4">
            <h2 className="text-xl text-primary font-bold">Bookmarks</h2>
            <div className="flex items-center gap-4 w-2/5">
              <SearchTermInputField
                placeholder="Search Summaries..."
                setSearchTerm={setSearch}
              />
              <Button
                onClick={() => setShowAddBookmarkForm(true)}
                variant="contained"
                sx={{
                  color: colorConfig.white,
                  background: colorConfig.primary,
                  fontWeight: 600,
                  padding: {
                    xs: "8px 10px",
                    sm: "12px 24px",
                  },
                  transition: ".8s",
                  "&:hover": {
                    color: colorConfig.primary,
                    borderColor: colorConfig.primary,
                    background: colorConfig.secondary,
                  },
                  minWidth: "250px",
                }}
              >
                Add New Bookmark
              </Button>
            </div>
          </div>
          <div className="my-12 mx-0 md:mx-4 md:pe-4 w-full">
            {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-6">
          <h6 className="text-lg text-green font-medium">
            Select Filter Options:
          </h6>
        </div> */}

            <BookmarkTable summaries={summaries} refetch={refetch} />
            {/* <PaginationComponent
          count={pagination.total}
          page={page}
          setPage={setPage}
          limit={limit}
        /> */}
          </div>
        </>
      </OpacityAnimation>
      {showAddBookmarkForm && (
        <AddSummaryModal
          open={showAddBookmarkForm}
          setOpen={setShowAddBookmarkForm}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default BookmarkTab;
