import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import { colorConfig } from "@/configs/colorConfig";
import { useUploadEpisodeMutation } from "@/redux/features/booksApi";
import { Modal, Button, TextField } from "@mui/material";
import React, { act, useState } from "react";

const AddEpisodeModal = ({
  open,
  setOpen,
  bookId,
  chapterTitle,
  actTitle,
  refetch,
}: {
  open: boolean;
  setOpen: any;
  bookId: string;
  actTitle: string;
  chapterTitle: string;
  refetch: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [episode, setEpisode] = useState({
    title: "",
    content: "",
  });

  // Handle Episode Title Change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpisode({ ...episode, title: e.target.value });
  };

  // Handle Episode Content Change
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpisode({ ...episode, content: e.target.value });
  };

  const [uploadEpisode] = useUploadEpisodeMutation();

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const option = {
      data: { title: episode.title, content: episode.content },
      id: bookId,
      chapterTitle: chapterTitle,
      actTitle: actTitle,
    };

    await postApiHandler({
      mutateFn: uploadEpisode,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: () => {
        refetch();
        setEpisode({ title: "", content: "" });
        setOpen(false);
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="max-w-2xl mx-auto p-4 md:p-6 mt-4 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl titleFont mb-4 text-center">Add New Episode</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Episode Title"
            variant="outlined"
            fullWidth
            required
            value={episode.title}
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
            label="Episode Content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            value={episode.content}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: colorConfig.primary,
              color: colorConfig.white,
              width: "100%",
            }}
          >
            {isLoading ? "Uploading..." : "Upload Episode"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddEpisodeModal;
