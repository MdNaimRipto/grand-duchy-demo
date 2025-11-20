import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import { useUpdateBookMutation } from "@/redux/features/booksApi";
import { IEpisode } from "@/types/bookTypes";
import { Modal, Button, TextField, Card, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";

const UpdateEpisodeModal = ({
  open,
  setOpen,
  bookId,
  actIndex,
  chapterIndex,
  episodeDetails,
  episodeIndex,
  refetch,
}: {
  open: number | null;
  setOpen: any;
  bookId: string;
  actIndex: number;
  chapterIndex: number;
  episodeDetails: IEpisode | null;
  episodeIndex: number;
  refetch: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize state with existing episode details
  const [episode, setEpisode] = useState<IEpisode>(
    episodeDetails ? { ...episodeDetails } : { title: "", content: "" }
  );

  useEffect(() => {
    if (episodeDetails) {
      setEpisode({ ...episodeDetails });
    }
  }, [episodeDetails]);

  // Handle Title Change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpisode({ ...episode, title: e.target.value });
  };

  // Handle Content Change
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpisode({ ...episode, content: e.target.value });
  };

  const [updateEpisode] = useUpdateBookMutation();

  // Handle Submit for Updating Episode
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const option = {
      data: {
        updatePayload: {
          title: episode.title,
          content: episode.content,
        },
        bookId,
        actIndex,
        chapterIndex,
        episodeIndex,
      },
    };

    function optionalTasks() {
      refetch();
      setOpen(null);
    }

    await postApiHandler({
      mutateFn: updateEpisode,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  return (
    <Modal
      open={open === episodeIndex}
      onClose={() => setOpen(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflowY: "auto", maxHeight: "90vh" }}
    >
      <div className="max-w-2xl mx-auto p-4 md:p-6 md:mt-4 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl titleFont mb-4 text-center">Edit Episode</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-white shadow-md rounded-lg p-4">
            <CardContent>
              <TextField
                label="Episode Title"
                variant="outlined"
                fullWidth
                required
                value={episode.title}
                onChange={handleTitleChange}
              />
              <TextField
                label="Episode Content"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                sx={{ mt: 2 }}
                required
                value={episode.content}
                onChange={handleContentChange}
              />
            </CardContent>
          </Card>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLoading ? "Updating..." : "Update Episode"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateEpisodeModal;
