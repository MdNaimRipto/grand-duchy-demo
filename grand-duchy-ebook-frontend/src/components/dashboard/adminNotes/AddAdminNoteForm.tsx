import MuiInputField from "@/common/MuiInputField";
import { colorConfig } from "@/configs/colorConfig";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import { useAddNoteMutation } from "@/redux/features/notesApi";

interface AddAdminNoteFormProps {
  setShowAddNoteForm: (value: boolean) => void;
  refetch: any;
}

const AddAdminNoteForm = ({
  setShowAddNoteForm,
  refetch,
}: AddAdminNoteFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [addNote] = useAddNoteMutation();
  const handleNote = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const note = form.note.value;

    const option = {
      data: {
        title,
        note,
      },
    };

    function optionalTasks() {
      form.reset();
      setShowAddNoteForm(false);
      refetch();
    }

    await postApiHandler({
      mutateFn: addNote,
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
            Add new note
          </h2>
          <div
            onClick={() => setShowAddNoteForm(false)}
            className="text-error text-2xl font-bold cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>

        {/* Modal Content */}
        <form className="w-full" onSubmit={handleNote}>
          <MuiInputField
            required={true}
            label="Title"
            type="text"
            name="title"
          />
          <MuiInputField required={true} label="Note" type="text" name="note" />

          {/* Button submit */}
          <div className="flex justify-center">
            <Button
              type="submit"
              onClick={() => setShowAddNoteForm(true)}
              variant="contained"
              sx={{
                color: colorConfig.white,
                background: colorConfig.primary,
                fontWeight: 600,
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
              {isLoading ? "Loading..." : "Add Note"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminNoteForm;
