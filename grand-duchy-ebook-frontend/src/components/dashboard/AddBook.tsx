import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import { colorConfig } from "@/configs/colorConfig";
import { useUploadBookMutation } from "@/redux/features/booksApi";
import { TextField, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";

const AddBook = ({ refetch }: { refetch: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({
    title: "",
    prologue: "",
    acts: [
      {
        title: "",
        chapters: [{ title: "", episodes: [{ title: "", content: "" }] }],
      },
    ],
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Add new Act
  const addAct = () => {
    setBook({
      ...book,
      acts: [
        ...book.acts,
        {
          title: "",
          chapters: [{ title: "", episodes: [{ title: "", content: "" }] }],
        },
      ],
    });
  };

  // Add new Chapter
  const addChapter = (actIndex: number) => {
    const updatedActs = [...book.acts];
    updatedActs[actIndex].chapters.push({
      title: "",
      episodes: [{ title: "", content: "" }],
    });
    setBook({ ...book, acts: updatedActs });
  };

  // Add new Episode
  const addEpisode = (actIndex: number, chapterIndex: number) => {
    const updatedActs = [...book.acts];
    updatedActs[actIndex].chapters[chapterIndex].episodes.push({
      title: "",
      content: "",
    });
    setBook({ ...book, acts: updatedActs });
  };

  // Handle Act, Chapter, and Episode title updates
  const handleActChange = (index: number, value: string) => {
    const updatedActs = [...book.acts];
    updatedActs[index].title = value;
    setBook({ ...book, acts: updatedActs });
  };

  const handleChapterChange = (
    actIndex: number,
    chapterIndex: number,
    value: string
  ) => {
    const updatedActs = [...book.acts];
    updatedActs[actIndex].chapters[chapterIndex].title = value;
    setBook({ ...book, acts: updatedActs });
  };

  const handleEpisodeChange = (
    actIndex: number,
    chapterIndex: number,
    episodeIndex: number,
    field: "title" | "content",
    value: string
  ) => {
    const updatedActs = [...book.acts];
    updatedActs[actIndex].chapters[chapterIndex].episodes[episodeIndex][field] =
      value;
    setBook({ ...book, acts: updatedActs });
  };

  const [uploadBook] = useUploadBookMutation();

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const option = {
      data: book,
    };

    function optionalTasks() {
      setBook({
        title: "",
        prologue: "",
        acts: [
          {
            title: "",
            chapters: [{ title: "", episodes: [{ title: "", content: "" }] }],
          },
        ],
      });
      refetch();
    }

    await postApiHandler({
      mutateFn: uploadBook,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-2 md:p-6 md:mt-4 rounded-lg shadow-md">
      <h2 className="text-2xl titleFont mb-4 text-center">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <TextField
          label="Book Title"
          variant="outlined"
          fullWidth
          required
          name="title"
          value={book.title}
          onChange={handleInputChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused": {
                borderColor: colorConfig.primary,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },
              },
              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: colorConfig.primary,
              },
            },
          }}
        />

        {/* Prologue */}
        <TextField
          label="Prologue"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          required
          name="prologue"
          value={book.prologue}
          onChange={handleInputChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused": {
                borderColor: colorConfig.primary,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },
              },
              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorConfig.primary,
                },
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: colorConfig.primary,
              },
            },
          }}
        />

        {/* Acts Section */}
        {book.acts.map((act, actIndex) => (
          <Card
            key={actIndex}
            className="md:p-4 bg-white/10 shadow-md rounded-lg"
          >
            <CardContent>
              <TextField
                label={`Act ${actIndex + 1} Title`}
                variant="outlined"
                fullWidth
                required
                value={act.title}
                onChange={(e) => handleActChange(actIndex, e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused": {
                      borderColor: colorConfig.primary,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colorConfig.primary,
                      },
                    },
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colorConfig.primary,
                      },
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: colorConfig.primary,
                    },
                  },
                }}
              />

              {/* Chapters Section */}
              {act.chapters.map((chapter, chapterIndex) => (
                <div
                  key={chapterIndex}
                  className="mt-4 p-3 border-l-4 border-gray"
                >
                  <TextField
                    label={`Chapter ${chapterIndex + 1} Title`}
                    variant="outlined"
                    fullWidth
                    required
                    value={chapter.title}
                    onChange={(e) =>
                      handleChapterChange(
                        actIndex,
                        chapterIndex,
                        e.target.value
                      )
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused": {
                          borderColor: colorConfig.primary,
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: colorConfig.primary,
                          },
                        },
                        "&:hover": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: colorConfig.primary,
                          },
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: colorConfig.primary,
                        },
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
                            actIndex,
                            chapterIndex,
                            episodeIndex,
                            "title",
                            e.target.value
                          )
                        }
                        sx={{
                          mb: 2,
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused": {
                              borderColor: colorConfig.primary,
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: colorConfig.primary,
                              },
                            },
                            "&:hover": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: colorConfig.primary,
                              },
                            },
                          },
                          "& .MuiInputLabel-root": {
                            "&.Mui-focused": {
                              color: colorConfig.primary,
                            },
                          },
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
                            actIndex,
                            chapterIndex,
                            episodeIndex,
                            "content",
                            e.target.value
                          )
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused": {
                              borderColor: colorConfig.primary,
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: colorConfig.primary,
                              },
                            },
                            "&:hover": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: colorConfig.primary,
                              },
                            },
                          },
                          "& .MuiInputLabel-root": {
                            "&.Mui-focused": {
                              color: colorConfig.primary,
                            },
                          },
                        }}
                      />
                    </div>
                  ))}

                  {/* Add Episode Button */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => addEpisode(actIndex, chapterIndex)}
                    sx={{
                      borderColor: colorConfig.primary,
                      color: colorConfig.black,
                      mt: 2,
                    }}
                  >
                    + Add Episode
                  </Button>
                </div>
              ))}

              {/* Add Chapter Button */}
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => addChapter(actIndex)}
                sx={{
                  borderColor: colorConfig.primary,
                  color: colorConfig.black,
                  mt: 2,
                }}
              >
                + Add Chapter
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Add Act Button */}
        <Button
          variant="outlined"
          color="primary"
          onClick={addAct}
          sx={{
            borderColor: colorConfig.primary,
            color: colorConfig.primary,
            width: "100%",
          }}
        >
          + Add Act
        </Button>

        {/* Submit Button */}
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
          {isLoading ? "Uploading..." : "Upload Book"}
        </Button>
      </form>
    </div>
  );
};

export default AddBook;
