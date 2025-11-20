import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import { colorConfig } from "@/configs/colorConfig";
import { useUploadChapterMutation } from "@/redux/features/booksApi";
import { Modal, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const AddChapterModal = ({
  open,
  setOpen,
  bookId,
  actTitle,
  refetch,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  bookId: string;
  actTitle: string;
  refetch: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [chapter, setChapter] = useState({
    title: "",
    episodes: [{ title: "", content: "" }],
  });

  // Handle Chapter Title Change
  const handleChapterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChapter({ ...chapter, title: e.target.value });
  };

  // Add new Episode
  const addEpisode = () => {
    setChapter({
      ...chapter,
      episodes: [...chapter.episodes, { title: "", content: "" }],
    });
  };

  // Handle Episode Title/Content Updates
  const handleEpisodeChange = (
    episodeIndex: number,
    field: "title" | "content",
    value: string
  ) => {
    const updatedEpisodes = [...chapter.episodes];
    updatedEpisodes[episodeIndex][field] = value;
    setChapter({ ...chapter, episodes: updatedEpisodes });
  };

  const [uploadChapter] = useUploadChapterMutation();

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const option = {
      data: { title: chapter.title, episodes: chapter.episodes },
      id: bookId,
      actTitle,
    };

    await postApiHandler({
      mutateFn: uploadChapter,
      options: option,
      setIsLoading,
      optionalTasksFn: () => {
        refetch();
        setChapter({ title: "", episodes: [{ title: "", content: "" }] });
        setOpen(false);
      },
    });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="max-w-4xl mx-auto p-6 mt-4 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Chapter</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Chapter Title"
            variant="outlined"
            fullWidth
            required
            value={chapter.title}
            onChange={handleChapterChange}
          />

          {chapter.episodes.map((episode, episodeIndex) => (
            <div key={episodeIndex} className="mt-2 p-2 bg-gray-100 rounded-lg">
              <TextField
                label={`Episode ${episodeIndex + 1} Title`}
                variant="outlined"
                fullWidth
                required
                value={episode.title}
                onChange={(e) =>
                  handleEpisodeChange(episodeIndex, "title", e.target.value)
                }
              />
              <TextField
                label={`Episode ${episodeIndex + 1} Content`}
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                required
                value={episode.content}
                onChange={(e) =>
                  handleEpisodeChange(episodeIndex, "content", e.target.value)
                }
                sx={{ mt: 2 }}
              />
            </div>
          ))}

          <Button
            variant="outlined"
            color="inherit"
            onClick={addEpisode}
            fullWidth
          >
            + Add Episode
          </Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLoading ? "Uploading..." : "Upload Chapter"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddChapterModal;
