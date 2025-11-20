import { colorConfig } from "@/configs/colorConfig";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiInputField from "@/common/MuiInputField";
import { useState } from "react";
import { useAddQuoteMutation } from "@/redux/features/quoteApi";
import { postApiHandler } from "@/common/apiHandlers/postApiHandler";

interface AddQuotesFormProps {
  setShowAddQuoteForm: (show: boolean) => void;
  refetch: any;
}

const AddQuotesForm: React.FC<AddQuotesFormProps> = ({
  setShowAddQuoteForm,
  refetch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [addQuote] = useAddQuoteMutation();

  const handleUpload = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const quote = form.quote.value;
    const author = form.author.value;

    const option = {
      data: {
        quote,
        author,
      },
    };

    function optionalTasks() {
      refetch();
      setShowAddQuoteForm(false);
      form.reset();
    }

    await postApiHandler({
      mutateFn: addQuote,
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
            Add new quote
          </h2>
          <div
            onClick={() => setShowAddQuoteForm(false)}
            className="text-error text-2xl font-bold cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>

        {/* Modal Content */}
        <form className="w-full" onSubmit={handleUpload}>
          <MuiInputField
            required={true}
            label="Author Name"
            type="text"
            name="author"
          />
          <MuiInputField
            required={true}
            label="Quote"
            type="text"
            name="quote"
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
              {isLoading ? "Loading..." : "Add Quote"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuotesForm;
