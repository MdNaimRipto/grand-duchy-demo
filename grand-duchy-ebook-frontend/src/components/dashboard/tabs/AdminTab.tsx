import OpacityAnimation from "@/components/animation/OpacityAnimation";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { colorConfig } from "@/configs/colorConfig";
import { useState } from "react";
import AddAdminNoteForm from "../adminNotes/AddAdminNoteForm";
import {
  useDeleteNoteMutation,
  useGetAllNotesQuery,
} from "@/redux/features/notesApi";
import Loader from "@/common/loader/Loader";
import { INote } from "@/types/noteTypes";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteApiHandler from "@/common/apiHandlers/DeleteApiHandler";
import UpdateNoteForm from "../adminNotes/UpdateNoteForm";

const AdminTab = () => {
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  const [updateNoteForm, setUpdateNoteForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  const { data, isLoading, error, refetch } = useGetAllNotesQuery({});
  const [deleteNote] = useDeleteNoteMutation();

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const notes = data.data as INote[];

  return (
    <>
      <OpacityAnimation>
        <>
          <div className="flex justify-between items-center md:p-4">
            <h2 className="text-xl text-primary font-bold">Admin Notes</h2>
            <Button
              onClick={() => setShowAddNoteForm(true)}
              variant="contained"
              sx={{
                color: colorConfig.white,
                background: colorConfig.primary,
                fontWeight: 600,
                padding: {
                  xs: "8px 10px",
                  sm: "12px 24px",
                },
                transition: ".8s",
                "&:hover": {
                  color: colorConfig.primary,
                  borderColor: colorConfig.primary,
                  background: colorConfig.secondary,
                },
              }}
            >
              Add New Note
            </Button>
          </div>
          <div className="my-12 mx-0 md:mx-4 md:pe-4 w-full">
            {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-6">
          <h6 className="text-lg text-green font-medium">
            Select Filter Options:
          </h6>
        </div> */}

            <div>
              <TableContainer
                component={Paper}
                sx={{ minHeight: "70vh", maxHeight: "70vh", overflow: "auto" }}
              >
                <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableHead sx={{ position: "sticky", top: 0, zIndex: 30 }}>
                    <TableRow
                      sx={{ background: "#e2e2e2 !important", fontWeight: 600 }}
                    >
                      <TableCell align="center">Id</TableCell>
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="center">Note</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notes.map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell component="th" align="center">
                          {data.title}
                        </TableCell>
                        <TableCell
                          component="th"
                          align="left"
                          dangerouslySetInnerHTML={{
                            __html: data.note,
                          }}
                        />

                        <TableCell component="th" align="center">
                          <div className="flex items-center justify-center gap-4">
                            <button
                              onClick={() => {
                                setSelectedNote(data);
                                setUpdateNoteForm(true);
                              }}
                            >
                              <EditNoteIcon sx={{ fontSize: "30px" }} />
                            </button>
                            <DeleteApiHandler
                              deleteFn={deleteNote}
                              id={String(data._id)}
                              refetch={refetch}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {/* <PaginationComponent
          count={pagination.total}
          page={page}
          setPage={setPage}
          limit={limit}
        /> */}
          </div>
        </>
      </OpacityAnimation>
      {showAddNoteForm && (
        <AddAdminNoteForm
          setShowAddNoteForm={setShowAddNoteForm}
          refetch={refetch}
        />
      )}

      {updateNoteForm && selectedNote && (
        <UpdateNoteForm
          setUpdateNoteForm={setUpdateNoteForm}
          note={selectedNote}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default AdminTab;
