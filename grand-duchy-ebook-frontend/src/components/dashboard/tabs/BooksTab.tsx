import React, { useState } from "react";
import { useGetBooksQuery } from "@/redux/features/booksApi";
import { IBooks } from "@/types/bookTypes";
import Loader from "@/common/loader/Loader";
import AddBook from "@/components/dashboard/AddBook";
import Books from "@/components/dashboard/Books";
import { Modal, Button } from "@mui/material";
import { colorConfig } from "@/configs/colorConfig";
import OpacityAnimation from "@/components/animation/OpacityAnimation";

const BooksTab = () => {
  const { data, isLoading, error, refetch } = useGetBooksQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const books = data.data as IBooks[];

  return (
    <OpacityAnimation>
      <>
        {books.length ? (
          <>
            <Books books={books} refetch={refetch} />
            <div className="mt-4 flex justify-center">
              <Button
                variant="contained"
                sx={{ backgroundColor: colorConfig.primary, fontWeight: 600 }}
                onClick={() => setIsModalOpen(true)}
              >
                + Add Book
              </Button>
            </div>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
                <AddBook refetch={refetch} />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4"
                  fullWidth
                >
                  Close
                </Button>
              </div>
            </Modal>
          </>
        ) : (
          <div className="">
            <AddBook refetch={refetch} />
          </div>
        )}
      </>
    </OpacityAnimation>
  );
};

export default BooksTab;
