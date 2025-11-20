import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import { useUpdateBookMutation } from "@/redux/features/booksApi";
import { IChapter } from "@/types/bookTypes";
import { Modal, Button, TextField, Card, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";

const UpdateChapterModal = ({
  open,
  setOpen,
  bookId,
  actIndex,
  chapterDetails,
  chapterIndex,
  refetch,
}: {
  open: number | null;
  setOpen: any;
  bookId: string;
  actIndex: number;
  chapterDetails: IChapter | null;
  chapterIndex: number;
  refetch: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize state with existing chapter details
  const [chapter, setChapter] = useState<IChapter>(
    chapterDetails
      ? { ...chapterDetails }
      : { title: "", episodes: [{ title: "", content: "" }] }
  );

  useEffect(() => {
    if (chapterDetails) {
      setChapter({ ...chapterDetails });
    }
  }, [chapterDetails]);

  // Handle Chapter Title Change
  const handleChapterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChapter({ ...chapter, title: e.target.value });
  };

  // Handle Episode Title and Content Updates
  const handleEpisodeChange = (
    episodeIndex: number,
    field: "title" | "content",
    value: string
  ) => {
    setChapter((prevChapter) => {
      const updatedEpisodes = prevChapter.episodes.map((ep, i) =>
        i === episodeIndex ? { ...ep, [field]: value } : ep
      );
      return { ...prevChapter, episodes: updatedEpisodes };
    });
  };

  const [updateChapter] = useUpdateBookMutation();

  // Handle Submit for Updating Chapter
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const option = {
      data: {
        updatePayload: {
          title: chapter.title,
          episodes: chapter.episodes,
        },
        bookId: bookId,
        actIndex,
        chapterIndex,
      },
    };

    function optionalTasks() {
      refetch();
      setOpen(false);
    }

    await postApiHandler({
      mutateFn: updateChapter,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  return (
    <Modal
      open={open === chapterIndex}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflowY: "auto", maxHeight: "90vh" }}
    >
      <div className="max-w-4xl mx-auto p-2 md:p-6 md:mt-4 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl titleFont mb-4 text-center">Edit Chapter</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Chapter Title */}
          <TextField
            label="Chapter Title"
            variant="outlined"
            fullWidth
            required
            value={chapter.title}
            onChange={handleChapterChange}
          />

          {/* Episodes Section */}
          {chapter.episodes.map((episode, episodeIndex) => (
            <Card
              key={episodeIndex}
              className="md:p-4 bg-white/10 shadow-md rounded-lg mt-4"
            >
              <CardContent>
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
                  rows={6}
                  sx={{ mt: 2 }}
                  required
                  value={episode.content}
                  onChange={(e) =>
                    handleEpisodeChange(episodeIndex, "content", e.target.value)
                  }
                />
              </CardContent>
            </Card>
          ))}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLoading ? "Updating..." : "Update Chapter"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateChapterModal;
