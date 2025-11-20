import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Fragment, useState } from "react";
import { colorConfig } from "@/configs/colorConfig";
import { IBooks } from "@/types/bookTypes";
import AddActModal from "./modals/AddActModal";
import AddChapterModal from "./modals/AddChapterModal";
import AddEpisodeModal from "./modals/AddEpisodeModal";
import { FaEdit } from "react-icons/fa";
import UpdateTitleAndPrologueModal from "./modals/updateModals/UpdateTitleAndPrologueModal";
import UpdateActModal from "./modals/updateModals/UpdateActModal";
import UpdateChapterModal from "./modals/updateModals/UpdateChapterModal";
import UpdateEpisodeModal from "./modals/updateModals/UpdateEpisodeModal";
import Image from "next/image";

const Books = ({ books, refetch }: { books: IBooks[]; refetch: any }) => {
  // Default expand first act & first chapter
  const [expandedAct, setExpandedAct] = useState<number | null>(0);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(0);

  // Modals
  const [openActModal, setOpenActModal] = useState(false);
  const [openChapterModal, setOpenChapterModal] = useState(false);
  const [openEpisodeModal, setOpenEpisodeModal] = useState(false);

  // Update Modal States
  const [selectedBook, setSelectedBook] = useState<IBooks | null>(null);
  const [selectedAct, setSelectedAct] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const [openUpdateTitleAndPrologueModal, setOpenUpdateTitleAndPrologueModal] =
    useState(false);

  const [updateActModal, setUpdateActModal] = useState<{
    bookId: string;
    actIndex: number;
  } | null>(null);

  const [updateChapterModal, setUpdateChapterModal] = useState<{
    bookId: string;
    actIndex: number;
    chapterIndex: number;
  } | null>(null);

  const [updateEpisodeModal, setUpdateEpisodeModal] = useState<{
    bookId: string;
    actIndex: number;
    chapterIndex: number;
    episodeIndex: number;
  } | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {books.map((book, i) => (
        <Fragment key={i}>
          <div className="w-full flex items-center py-10 lg:px-10">
            <div className="ml-10 w-full">
              <div className="flex items-start justify-between w-full">
                <div>
                  <h1 className="text-start text-4xl font-extrabold tracking-widest uppercase titleFont">
                    {book.title}
                  </h1>
                  <p className="text-start mt-2 mb-5 text-lg italic">
                    by Sabri BÜLBÜL
                  </p>
                </div>
                <Tooltip title="Edit Book Title & Prologue">
                  <IconButton
                    onClick={() => {
                      setOpenUpdateTitleAndPrologueModal(true);
                      setSelectedBook(book);
                    }}
                  >
                    <FaEdit />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="md:flex items-center gap-8">
                <p
                  className="mt-3 text-lg flex flex-col gap-4"
                  dangerouslySetInnerHTML={{
                    __html: book.prologue.slice(0, 600) + "...",
                  }}
                />
                {book.image !== "empty" && (
                  <div className="w-96 h-64 overflow-hidden mt-5">
                    <Image
                      src={book.image}
                      alt="Grand-Duchy Book Image"
                      width={400}
                      height={400}
                      priority
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Update Title & Prologue Modal */}
            {selectedBook &&
              openUpdateTitleAndPrologueModal &&
              selectedBook._id === book._id && (
                <UpdateTitleAndPrologueModal
                  bookId={String(selectedBook._id)}
                  bookTitle={selectedBook.title}
                  prologue={selectedBook.prologue}
                  image={selectedBook.image}
                  open={openUpdateTitleAndPrologueModal}
                  setOpen={setOpenUpdateTitleAndPrologueModal}
                  refetch={refetch}
                />
              )}
          </div>

          {/* Story Structure */}
          <div className="max-w-5xl mx-auto p-2 md:p-6">
            {book.acts.map((act, actIndex) => (
              <Accordion
                key={actIndex}
                className="mt-4 bg-white/10 backdrop-blur-lg border border-gray rounded-lg"
                expanded={expandedAct === actIndex}
                onChange={() =>
                  setExpandedAct(expandedAct === actIndex ? null : actIndex)
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="titleFont" />}
                >
                  <div className="flex items-center gap-4">
                    <Typography
                      variant="h5"
                      className="titleFont font-semibold pt-1"
                    >
                      {act.title}
                    </Typography>
                    <Tooltip title={`Edit ${act.title} Act`}>
                      <IconButton
                        // onClick={() => {
                        //   setOpenUpdateActModal(actIndex);
                        //   setSelectedBook(book);
                        // }}
                        onClick={() =>
                          setUpdateActModal({
                            bookId: String(book._id),
                            actIndex,
                          })
                        }
                      >
                        <FaEdit />
                      </IconButton>
                    </Tooltip>
                  </div>
                  {/* Update Act Modal */}
                  {updateActModal &&
                    updateActModal.bookId === book._id &&
                    updateActModal.actIndex === actIndex && (
                      <UpdateActModal
                        open={updateActModal.actIndex}
                        setOpen={() => setUpdateActModal(null)}
                        bookId={book._id}
                        actIndex={actIndex}
                        refetch={refetch}
                        actDetails={act}
                      />
                    )}
                </AccordionSummary>
                <AccordionDetails>
                  {act.chapters.map((chapter, chapterIndex) => (
                    <Accordion
                      key={chapterIndex}
                      className="mt-3 bg-white/10 rounded-lg border border-gray"
                      expanded={
                        expandedAct === actIndex &&
                        expandedChapter === chapterIndex
                      }
                      onChange={() =>
                        setExpandedChapter(
                          expandedChapter === chapterIndex ? null : chapterIndex
                        )
                      }
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className="flex items-center gap-4">
                          <Typography className="font-medium pt-2">
                            {chapter.title}
                          </Typography>
                          <Tooltip title={`Edit ${chapter.title} Chapter`}>
                            <IconButton
                              onClick={() =>
                                setUpdateChapterModal({
                                  bookId: String(book._id),
                                  actIndex,
                                  chapterIndex,
                                })
                              }
                            >
                              <FaEdit />
                            </IconButton>
                          </Tooltip>
                        </div>
                        {updateChapterModal &&
                          updateChapterModal.bookId === book._id &&
                          updateChapterModal.actIndex === actIndex &&
                          updateChapterModal.chapterIndex === chapterIndex && (
                            <UpdateChapterModal
                              open={updateChapterModal.chapterIndex}
                              setOpen={() => setUpdateChapterModal(null)}
                              bookId={book._id}
                              actIndex={actIndex}
                              chapterIndex={chapterIndex}
                              refetch={refetch}
                              chapterDetails={chapter}
                            />
                          )}
                      </AccordionSummary>
                      <AccordionDetails>
                        {chapter.episodes.map((episode, episodeIndex) => (
                          <div
                            key={episodeIndex}
                            className={`p-3 bg-white/10 rounded-lg mb-6 shadow-md border-l-4`}
                          >
                            <div className="flex items-center gap-4">
                              <Typography className="font-semibold">
                                {episode.title}
                              </Typography>
                              <Tooltip title={`Edit ${act.title} Act`}>
                                <IconButton
                                  // onClick={() => {
                                  //   setOpenUpdateEpisodeModal(episodeIndex);
                                  //   setSelectedBook(book);
                                  // }}
                                  onClick={() =>
                                    setUpdateEpisodeModal({
                                      bookId: String(book._id),
                                      actIndex,
                                      chapterIndex,
                                      episodeIndex,
                                    })
                                  }
                                >
                                  <FaEdit />
                                </IconButton>
                              </Tooltip>
                              {/* Update Episode Modal */}
                              {updateEpisodeModal &&
                                updateEpisodeModal.bookId === book._id &&
                                updateEpisodeModal.actIndex === actIndex &&
                                updateEpisodeModal.chapterIndex ===
                                  chapterIndex &&
                                updateEpisodeModal.episodeIndex ===
                                  episodeIndex && ( // ✅ Fixed this condition
                                  <UpdateEpisodeModal
                                    actIndex={actIndex}
                                    chapterIndex={chapterIndex}
                                    episodeIndex={episodeIndex}
                                    episodeDetails={episode}
                                    bookId={String(book._id)}
                                    open={updateEpisodeModal.episodeIndex} // ✅ Ensure modal opens
                                    setOpen={() => setUpdateEpisodeModal(null)} // ✅ Properly close modal
                                    refetch={refetch}
                                  />
                                )}
                            </div>
                            <p
                              className="text-gray flex flex-col gap-4"
                              dangerouslySetInnerHTML={{
                                __html: episode.content.slice(0, 600) + "...",
                              }}
                            />
                          </div>
                        ))}
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          sx={{
                            borderColor: colorConfig.primary,
                            color: colorConfig.black,
                            my: 2,
                          }}
                          onClick={() => {
                            setSelectedBook(book); // ✅ Store correct book
                            setSelectedAct(act.title); // ✅ Store correct act
                            setSelectedChapter(chapter.title); // ✅ Store correct chapter
                            setOpenEpisodeModal(true);
                          }}
                        >
                          + Add Episode {chapter.episodes.length + 1}
                        </Button>
                      </AccordionDetails>
                      {/* Add Episode Modal */}
                      <AddEpisodeModal
                        open={openEpisodeModal}
                        setOpen={setOpenEpisodeModal}
                        bookId={selectedBook ? String(selectedBook._id) : ""}
                        actTitle={selectedAct || ""}
                        chapterTitle={selectedChapter || ""}
                        refetch={refetch}
                      />
                    </Accordion>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      borderColor: colorConfig.primary,
                      color: colorConfig.black,
                      my: 2,
                    }}
                    onClick={() => {
                      setSelectedBook(book); // ✅ Store correct book
                      setSelectedAct(act.title); // ✅ Store correct act
                      setOpenChapterModal(true);
                    }}
                  >
                    + Add Chapter {act.chapters.length + 1}
                  </Button>
                </AccordionDetails>
                {/* Add Chapter Modal */}
                <AddChapterModal
                  open={openChapterModal}
                  setOpen={setOpenChapterModal}
                  bookId={selectedBook ? String(selectedBook._id) : ""}
                  actTitle={selectedAct || ""}
                  refetch={refetch}
                />
              </Accordion>
            ))}
            <Button
              variant="outlined"
              color="primary"
              className="w-full"
              sx={{
                borderColor: colorConfig.primary,
                color: colorConfig.black,
                maxWidth: {
                  xs: "100%",
                  sm: "30%",
                },
                p: 2,
                mt: 3,
              }}
              onClick={() => {
                setSelectedBook(book); // ✅ Store correct book
                setOpenActModal(true);
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: colorConfig.primary }}
                className="font-semibold"
              >
                + Add Act {book.acts.length + 1}
              </Typography>
            </Button>
          </div>
          {/* Add Act Modal */}
          <AddActModal
            open={openActModal}
            setOpen={setOpenActModal}
            bookId={selectedBook ? String(selectedBook._id) : ""}
            refetch={refetch}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default Books;
