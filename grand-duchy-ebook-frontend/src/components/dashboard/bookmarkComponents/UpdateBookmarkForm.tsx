import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import ImageUpload from "@/common/ImageUpload";
import Loader from "@/common/loader/Loader";
import { ErrorToast } from "@/common/toasts/ErrorToast";
import { useGetBooksQuery } from "@/redux/features/booksApi";
import { useUpdateSummaryMutation } from "@/redux/features/summaryApi";
import { IBooks } from "@/types/bookTypes";
import { ISummary } from "@/types/summaryTypes";
import { Box, Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateBookmarkForm = ({
  open,
  setOpen,
  refetch,
  summary,
}: {
  open: boolean;
  setOpen: any;
  refetch: any;
  summary: ISummary | null;
}) => {
  const [image, setImage] = useState("");
  console.log(summary, image);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (summary && summary.image && summary.image !== "empty") {
      setImage(summary.image);
    }
  }, [summary]);

  const [updateSummary] = useUpdateSummaryMutation();
  const handleUpdateSummary = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const summaryText = form.summary.value;
    const characterName = form.characterName.value;

    if (!image.length) {
      ErrorToast("Please upload an image");
      return;
    }

    const option = {
      data: {
        summary: summaryText,
        characterName,
        image,
      },
      id: String(summary?._id),
    };

    function optionalTasks() {
      refetch();
      form.reset();
      setOpen(false);
      setImage("");
    }

    await postApiHandler({
      mutateFn: updateSummary,
      options: option,
      setIsLoading: setLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  const { data, isLoading, error } = useGetBooksQuery({});

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const handleClose = () => {
    setOpen(false);
    setImage("");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h5>Update Character Summary</h5>
        <form
          onSubmit={handleUpdateSummary}
          className="mt-4 flex flex-col gap-4"
        >
          <ImageUpload image={image} setImage={setImage} />

          <input
            defaultValue={summary ? summary.characterName : ""}
            className="w-full p-2 border border-gray disabled:opacity-30"
            name="characterName"
            required
            placeholder="Enter Character Name"
          />
          <textarea
            defaultValue={summary ? summary.summary : ""}
            name="summary"
            rows={10}
            className="w-full p-2 border border-gray disabled:opacity-30"
            placeholder="Write Summary"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {loading ? "Loading..." : "Add Summary"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateBookmarkForm;
