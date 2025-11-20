import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import { colorConfig } from "@/configs/colorConfig";
import { useUploadActMutation } from "@/redux/features/booksApi";
import {
  Modal,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "98%",
    md: 800,
  },
  height: {
    xs: 400,
    md: 600,
  },
  bgcolor: "background.paper",
  border: `1px solid ${colorConfig.primary}`,
  borderRadius: "4px",
  boxShadow: 24,
  py: 4,
  px: {
    xs: 2,
    sm: 4,
  },
  overflow: "auto",
};

const AddActModal = ({
  open,
  setOpen,
  bookId,
  refetch,
}: {
  open: boolean;
  setOpen: any;
  bookId: string;
  refetch: any;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = (setOpen: any) => {
    setOpen(false);
  };

  const [act, setAct] = useState({
    title: "",
    chapters: [{ title: "", episodes: [{ title: "", content: "" }] }],
  });

  // Handle Act Title Change
  const handleActChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAct({ ...act, title: e.target.value });
  };

  // Add new Chapter
  const addChapter = () => {
    setAct({
      ...act,
      chapters: [
        ...act.chapters,
        { title: "", episodes: [{ title: "", content: "" }] },
      ],
    });
  };

  // Add new Episode
  const addEpisode = (chapterIndex: number) => {
    const updatedChapters = [...act.chapters];
    updatedChapters[chapterIndex].episodes.push({ title: "", content: "" });
    setAct({ ...act, chapters: updatedChapters });
  };

  // Handle Chapter and Episode Title/Content Updates
  const handleChapterChange = (index: number, value: string) => {
    const updatedChapters = [...act.chapters];
    updatedChapters[index].title = value;
    setAct({ ...act, chapters: updatedChapters });
  };

  const handleEpisodeChange = (
    chapterIndex: number,
    episodeIndex: number,
    field: "title" | "content",
    value: string
  ) => {
    const updatedChapters = [...act.chapters];
    updatedChapters[chapterIndex].episodes[episodeIndex][field] = value;
    setAct({ ...act, chapters: updatedChapters });
  };

  const [uploadAct] = useUploadActMutation();

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const option = {
      data: act,
      id: bookId,
    };

    function optionalTasks() {
      refetch();
      setAct({
        title: "",
        chapters: [{ title: "", episodes: [{ title: "", content: "" }] }],
      });
      setOpen(false);
    }

    await postApiHandler({
      mutateFn: uploadAct,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose(setOpen)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="max-w-4xl mx-auto p-2 md:p-6 md:mt-4 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl titleFont mb-4 text-center">Add New Act</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Act Title */}
          <TextField
            label="Act Title"
            variant="outlined"
            fullWidth
            required
            value={act.title}
            onChange={handleActChange}
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
                        mb: 2,
                      }}
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
                        handleEpisodeChange(
                          chapterIndex,
                          episodeIndex,
                          "content",
                          e.target.value
                        )
                      }
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
                  </div>
                ))}
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => addEpisode(chapterIndex)}
                  sx={{
                    borderColor: colorConfig.primary,
                    color: colorConfig.black,
                    mt: 2,
                  }}
                >
                  + Add Episode
                </Button>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="outlined"
            color="primary"
            onClick={addChapter}
            sx={{
              borderColor: colorConfig.primary,
              color: colorConfig.primary,
              width: "100%",
            }}
          >
            + Add Chapter
          </Button>

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
            {isLoading ? "Uploading..." : "Upload Act"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddActModal;
