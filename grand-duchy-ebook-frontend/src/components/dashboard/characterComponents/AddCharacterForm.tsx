import MuiInputField from "@/common/MuiInputField";
import { colorConfig } from "@/configs/colorConfig";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction, useState } from "react";
import ImageUpload from "@/common/ImageUpload";
import { ErrorToast } from "@/common/toasts/ErrorToast";
import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import { useAddCharacterMutation } from "@/redux/features/characterApi";

interface AddCharacterFormProps {
  setShowCharacterForm: Dispatch<SetStateAction<boolean>>;
  refetch: any;
}

const AddCharacterForm = ({
  setShowCharacterForm,
  refetch,
}: AddCharacterFormProps) => {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addCharacter] = useAddCharacterMutation();

  const handleUpload = async (e: any) => {
    e.preventDefault();

    if (!image.length) {
      return ErrorToast("Please Upload Image First!");
    }

    const form = e.target;
    const name = form.name.value;
    const summery = form.summery.value;

    const option = {
      data: {
        image,
        name,
        summery,
      },
    };

    function optionalTasks() {
      refetch();
      setShowCharacterForm(false);
      form.reset();
    }

    await postApiHandler({
      mutateFn: addCharacter,
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
            Add new character summary
          </h2>
          <div
            onClick={() => setShowCharacterForm(false)}
            className="text-error text-2xl font-bold cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>

        {/* Image upload */}
        <ImageUpload image={image} setImage={setImage} />

        {/* Modal Content */}
        <form className="w-full" onSubmit={handleUpload}>
          <MuiInputField
            required={true}
            label="Character Name"
            type="text"
            name="name"
          />
          <MuiInputField
            required={true}
            label="Summery"
            type="text"
            name="summery"
          />

          {/* Button submit */}
          <div className="flex justify-center">
            <Button
              type="submit"
              // onClick={() => setShowEventForm(true)}
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
              {isLoading ? "Loading..." : "Add Character Summary"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCharacterForm;
