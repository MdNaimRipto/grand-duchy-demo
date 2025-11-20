import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import { colorConfig } from "@/configs/colorConfig";
import { useUpdateBookMutation } from "@/redux/features/booksApi";
import { IAct } from "@/types/bookTypes";
import { Modal, Button, TextField, Card, CardContent } from "@mui/material";
import React, { useState } from "react";

const UpdateActModal = ({
  open,
  setOpen,
  bookId,
  actDetails, // 📌 Pass existing act details
  actIndex, // 📌 Index of the Act being edited
  refetch,
}: {
  open: number | null;
  setOpen: any;
  bookId: string;
  actDetails: IAct | null; // Allow null if no act is selected
  actIndex: number;
  refetch: any;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  // 📌 Initialize state with existing act details
  const [act, setAct] = useState<IAct>(
    actDetails
      ? { ...actDetails } // ✅ Load existing act
      : {
          title: "",
          chapters: [{ title: "", episodes: [{ title: "", content: "" }] }],
        } // Fallback
  );

  // Update act state when actDetails changes
  React.useEffect(() => {
    if (actDetails) {
      setAct({ ...actDetails });
    }
  }, [actDetails]);

  // Handle Act Title Change
  const handleActChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAct({ ...act, title: e.target.value });
  };

  // Handle Chapter and Episode Title/Content Updates
  const handleChapterChange = (index: number, value: string) => {
    setAct((prevAct) => {
      const updatedChapters = [...prevAct.chapters];
      updatedChapters[index] = { ...updatedChapters[index], title: value };
      return { ...prevAct, chapters: updatedChapters };
    });
  };

  const handleEpisodeChange = (
    chapterIndex: number,
    episodeIndex: number,
    field: "title" | "content",
    value: string
  ) => {
    setAct((prevAct) => {
      const updatedChapters = [...prevAct.chapters];
      updatedChapters[chapterIndex] = {
        ...updatedChapters[chapterIndex],
        episodes: updatedChapters[chapterIndex].episodes.map((ep, i) =>
          i === episodeIndex ? { ...ep, [field]: value } : ep
        ),
      };
      return { ...prevAct, chapters: updatedChapters };
    });
  };

  const [updateAct] = useUpdateBookMutation();

  // 📌 Handle Submit for Updating Act
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const option = {
      data: {
        updatePayload: {
          title: act.title,
          chapters: act.chapters,
        },
        bookId: bookId,
        actIndex,
      },
    };

    function optionalTasks() {
      refetch();
      setOpen(false);
    }

    await postApiHandler({
      mutateFn: updateAct,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  return (
    <Modal
      open={open === actIndex}
      onClose={() => setOpen(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        overflowY: "auto",
        maxHeight: "90vh",
      }}
    >
      <div className="max-w-4xl mx-auto p-2 md:p-6 md:mt-4 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl titleFont mb-4 text-center">Edit Act</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Act Title */}
          <TextField
            label="Act Title"
            variant="outlined"
            fullWidth
            required
            value={act.title}
            onChange={handleActChange}
          />

          {/* Chapters Section */}
          {act.chapters.map((chapter, chapterIndex) => (
            <Card
              key={chapterIndex}
              className="md:p-4 bg-white/10 shadow-md rounded-lg"
            >
              <CardContent>
                <TextField
                  label={`Chapter ${chapterIndex + 1} Title`}
                  variant="outlined"
                  fullWidth
                  required
                  value={chapter.title}
                  onChange={(e) =>
                    handleChapterChange(chapterIndex, e.target.value)
                  }
                />

                {/* Episodes Section */}
                {chapter.episodes.map((episode, episodeIndex) => (
                  <div
                    key={episodeIndex}
                    className="mt-2 p-2 bg-white/10 rounded-lg"
                  >
                    <TextField
                      label={`Episode ${episodeIndex + 1} Title`}
                      variant="outlined"
                      fullWidth
                      required
                      value={episode.title}
                      onChange={(e) =>
                        handleEpisodeChange(
                          chapterIndex,
                          episodeIndex,
                          "title",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      label={`Episode ${episodeIndex + 1} Content`}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={12}
                      sx={{ mt: 2 }}
                      required
                      value={episode.content}
                      onChange={(e) =>
                        handleEpisodeChange(
                          chapterIndex,
                          episodeIndex,
                          "content",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLoading ? "Updating..." : "Update Act"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateActModal;
