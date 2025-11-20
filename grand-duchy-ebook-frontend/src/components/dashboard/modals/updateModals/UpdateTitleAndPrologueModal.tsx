import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import ImageUpload from "@/common/ImageUpload";
import { colorConfig } from "@/configs/colorConfig";
import { useUpdateBookMutation } from "@/redux/features/booksApi";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";

const UpdateTitleAndPrologueModal = ({
  open,
  setOpen,
  bookId,
  bookTitle,
  prologue,
  refetch,
  image,
}: {
  open: boolean;
  setOpen: any;
  bookId: string;
  bookTitle: string;
  prologue: string;
  image: string;
  refetch: any;
}) => {
  const [bookImage, setBookImage] = useState(image !== "empty" ? image : "");
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({
    title: bookTitle || "",
    content: prologue || "",
  });

  // Handle book Title Change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, title: e.target.value });
  };

  // Handle book Content Change
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, content: e.target.value });
  };

  const [updateBook] = useUpdateBookMutation();

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const option = {
      data: {
        bookId,
        updatePayload: {
          title: book.title,
          prologue: book.content,
          image: bookImage ? bookImage : "empty",
        },
      },
    };

    await postApiHandler({
      mutateFn: updateBook,
      options: option,
      setIsLoading,
      optionalTasksFn: () => {
        refetch();
        setOpen(false);
        setBookImage("");
      },
    });
  };

  useEffect(() => {
    if (!open) return;
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl titleFont text-primary font-semibold">
            Update Book
          </h2>
          <div
            onClick={() => setOpen(false)}
            className="text-error text-2xl font-bold cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Book Title"
            variant="outlined"
            fullWidth
            required
            value={book.title}
            onChange={handleTitleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": { borderColor: colorConfig.primary },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colorConfig.primary,
              },
            }}
          />
          <TextField
            label="Prologue"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            required
            value={book.content}
            onChange={handleContentChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": { borderColor: colorConfig.primary },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colorConfig.primary,
              },
            }}
          />

          {/* Image Upload */}
          <ImageUpload image={bookImage} setImage={setBookImage} />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colorConfig.primary,
              color: colorConfig.white,
              width: "100%",
              "&:hover": { backgroundColor: colorConfig.gray },
            }}
          >
            {isLoading ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTitleAndPrologueModal;
