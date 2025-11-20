import MuiInputField from "@/common/MuiInputField";
import { colorConfig } from "@/configs/colorConfig";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IQuote } from "@/types/quotesType";
import { useState } from "react";
import { useUpdateQuoteMutation } from "@/redux/features/quoteApi";
import { postApiHandler } from "@/common/apiHandlers/postApiHandler";

const UpdateQuotesForm = ({
  setShowUpdateQuoteForm,
  quote: details,
  refetch,
}: {
  setShowUpdateQuoteForm: (show: boolean) => void;
  refetch: any;
  quote: IQuote;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [updateCharacter] = useUpdateQuoteMutation();

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const author = form.author.value;
    const quote = form.quote.value;

    const option = {
      data: {
        author,
        quote,
      },
      id: String(details._id),
    };

    function optionalTasks() {
      refetch();
      setShowUpdateQuoteForm(false);
      form.reset();
    }

    await postApiHandler({
      mutateFn: updateCharacter,
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
            onClick={() => setShowUpdateQuoteForm(false)}
            className="text-error text-2xl font-bold cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>

        {/* Modal Content */}
        <form className="w-full" onSubmit={handleUpdate}>
          <MuiInputField
            required={true}
            label="Author Name"
            type="text"
            name="author"
            defaultValue={details ? details.author : ""}
          />
          <MuiInputField
            required={true}
            label="Quote"
            type="text"
            name="quote"
            defaultValue={details ? details.quote : ""}
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
              {isLoading ? "Loading..." : "Update Quote"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuotesForm;
