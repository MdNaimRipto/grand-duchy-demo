import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import ImageUpload from "@/common/ImageUpload";
import Loader from "@/common/loader/Loader";
import { ErrorToast } from "@/common/toasts/ErrorToast";
import { useGetBooksQuery } from "@/redux/features/booksApi";
import { useAddSummaryMutation } from "@/redux/features/summaryApi";
import { IBooks } from "@/types/bookTypes";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

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

const AddSummaryModal = ({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: any;
  refetch: any;
}) => {
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedAct, setSelectedAct] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [addSummary] = useAddSummaryMutation();

  const handleUploadSummary = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const bookId = form.bookId.value;
    const actTitle = form.actTitle.value;
    const chapterTitle = form.chapterTitle.value;
    const episodeTitle = form.episodeTitle.value;
    const summary = form.summary.value;
    const characterName = form.characterName.value;

    if (!image.length) {
      ErrorToast("Please upload an image");
      return;
    }
    const option = {
      data: {
        bookId,
        actTitle,
        chapterTitle,
        episodeTitle,
        summary,
        characterName,
        image,
      },
    };

    function optionalTasks() {
      refetch();
      form.reset();
      setOpen(false);
    }

    await postApiHandler({
      mutateFn: addSummary,
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

  const books = data.data as IBooks[];

  const getActs = () => {
    const selectedBookData = books.find((book) => book._id === selectedBook);
    return selectedBookData ? selectedBookData.acts : [];
  };

  const getChapters = () => {
    const selectedActData = getActs().find((act) => act.title === selectedAct);
    return selectedActData ? selectedActData.chapters : [];
  };

  const getEpisodes = () => {
    const selectedChapterData = getChapters().find(
      (chapter) => chapter.title === selectedChapter
    );
    return selectedChapterData ? selectedChapterData.episodes : [];
  };

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h5>Add Character Summary</h5>
        <form
          onSubmit={handleUploadSummary}
          className="mt-4 flex flex-col gap-4"
        >
          <ImageUpload image={image} setImage={setImage} />
          <select
            name="bookId"
            onChange={(e) => setSelectedBook(e.target.value)}
            className="w-full p-2 border border-gray"
            required
          >
            <option value="">Select Book</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
          <select
            name="actTitle"
            onChange={(e) => setSelectedAct(e.target.value)}
            className="w-full p-2 border border-gray disabled:opacity-30"
            disabled={!selectedBook.length}
            required
          >
            <option value="">Select Act</option>
            {selectedBook &&
              getActs().map((act) => (
                <option key={act.title} value={act.title}>
                  {act.title}
                </option>
              ))}
          </select>
          <select
            name="chapterTitle"
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full p-2 border border-gray disabled:opacity-30"
            disabled={!selectedAct.length}
            required
          >
            <option value="">Select Chapter</option>
            {selectedAct &&
              getChapters().map((chapter) => (
                <option key={chapter.title} value={chapter.title}>
                  {chapter.title}
                </option>
              ))}
          </select>
          <select
            name="episodeTitle"
            onChange={(e) => setSelectedEpisode(e.target.value)}
            className="w-full p-2 border border-gray disabled:opacity-30"
            disabled={!selectedChapter.length}
            required
          >
            <option value="">Select Episode</option>
            {selectedChapter &&
              getEpisodes().map((episode) => (
                <option key={episode.title} value={episode.title}>
                  {episode.title}
                </option>
              ))}
          </select>
          <input
            className="w-full p-2 border border-gray disabled:opacity-30"
            name="characterName"
            required
            disabled={!selectedEpisode.length}
            placeholder="Enter Character Name"
          />
          <textarea
            name="summary"
            rows={10}
            className="w-full p-2 border border-gray disabled:opacity-30"
            placeholder="Write Summary"
            required
            disabled={!selectedEpisode.length}
          />
          <Button type="submit" variant="contained" color="primary">
            {loading ? "Loading..." : "Add Summary"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddSummaryModal;
