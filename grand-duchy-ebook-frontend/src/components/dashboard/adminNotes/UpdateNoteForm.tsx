import MuiInputField from "@/common/MuiInputField";
import { colorConfig } from "@/configs/colorConfig";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import { INote } from "@/types/noteTypes";
import { useUpdateNoteMutation } from "@/redux/features/notesApi";

const UpdateNoteForm = ({
  setUpdateNoteForm,
  note: details,
  refetch,
}: {
  setUpdateNoteForm: (show: boolean) => void;
  refetch: any;
  note: INote;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [updateNote] = useUpdateNoteMutation();

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const note = form.note.value;

    const option = {
      data: {
        title,
        note,
      },
      id: String(details._id),
    };

    function optionalTasks() {
      refetch();
      setUpdateNoteForm(false);
      form.reset();
    }

    await postApiHandler({
      mutateFn: updateNote,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className=" flex justify-between items-center">
          <h2 className="capitalize text-xl text-primary font-semibold">
            Update quote
          </h2>
          <div
            onClick={() => setUpdateNoteForm(false)}
            className="text-error text-2xl font-bold cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>

        {/* Modal Content */}
        <form className="w-full" onSubmit={handleUpdate}>
          <MuiInputField
            required={true}
            label="Title"
            type="text"
            name="title"
            defaultValue={details ? details.title : ""}
          />
          <MuiInputField
            required={true}
            label="Note"
            type="text"
            name="note"
            defaultValue={details ? details.note : ""}
          />
          <div> </div>

          {/* Button submit */}
          <div className="flex justify-center">
            <Button
              // onClick={() => setShowEventForm(true)}
              variant="contained"
              type="submit"
              sx={{
                color: colorConfig.white,
                background: colorConfig.primary,
                fontWeight: 500,
                padding: {
                  xs: "8px 10px",
                  sm: "12px 60px",
                },
                transition: ".8s",
                "&:hover": {
                  color: colorConfig.white,
                  background: colorConfig.gray,
                },
              }}
            >
              {isLoading ? "Loading..." : "Update Note"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNoteForm;
