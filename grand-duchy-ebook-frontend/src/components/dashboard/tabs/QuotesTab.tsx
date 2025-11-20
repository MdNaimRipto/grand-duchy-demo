import { colorConfig } from "@/configs/colorConfig";
import { Button } from "@mui/material";
import QuotesTable from "../quoteComponents/QuotesTable";
import { useState } from "react";
import AddQuotesForm from "../quoteComponents/AddQuotesForm";
import Loader from "@/common/loader/Loader";
import { useGetQuotesQuery } from "@/redux/features/quoteApi";
import { IQuote } from "@/types/quotesType";
import OpacityAnimation from "@/components/animation/OpacityAnimation";

const QuotesTab = () => {
  const [showAddQuoteForm, setShowAddQuoteForm] = useState(false);
  const { data, isLoading, error, refetch } = useGetQuotesQuery({});

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const quotes = data.data as IQuote[];
  return (
    <>
      <OpacityAnimation>
        <>
          <div className="flex justify-between items-center md:p-4">
            <h2 className="text-xl text-primary font-bold">Quotes</h2>
            <Button
              onClick={() => setShowAddQuoteForm(true)}
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
              }}
            >
              Add New Quote
            </Button>
          </div>
          <div className="my-12 mx-0 md:mx-4 md:pe-4 w-full">
            {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-6">
          <h6 className="text-lg text-green font-medium">
            Select Filter Options:
          </h6>
        </div> */}

            <QuotesTable quotesData={quotes} refetch={refetch} />
            {/* <PaginationComponent
          count={pagination.total}
          page={page}
          setPage={setPage}
          limit={limit}
        /> */}
          </div>
        </>
      </OpacityAnimation>
      {showAddQuoteForm && (
        <AddQuotesForm
          setShowAddQuoteForm={setShowAddQuoteForm}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default QuotesTab;
