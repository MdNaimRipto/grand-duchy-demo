import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, TextField } from "@mui/material";
import { colorConfig } from "@/configs/colorConfig";
import {
  useGetTimerQuery,
  useUpdateTimerMutation,
} from "@/redux/features/timerApi";
import { useState } from "react";
import { postApiHandler } from "@/common/apiHandlers/postApiHandler";
import OpacityAnimation from "@/components/animation/OpacityAnimation";
import dayjs from "dayjs";
import Loader from "@/common/loader/Loader";

const UpdateTimerTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    data,
    isLoading: isTimerLoading,
    error,
    refetch,
  } = useGetTimerQuery({});
  const [updateTime] = useUpdateTimerMutation();
  if (isLoading || isTimerLoading) {
    return (
      <p>
        <Loader />
      </p>
    );
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const targetDate = data.data[0]?.time;

  const handleUpdateTime = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;

    const option = {
      data: {
        time: date,
      },
    };

    function optionalTasks() {
      form.reset();
      refetch();
    }

    await postApiHandler({
      mutateFn: updateTime,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  const formattedTime = dayjs(targetDate).format("MMMM DD, YYYY [at] hh:mm A");

  return (
    <OpacityAnimation>
      <div className="h-[70vh]">
        <div className="md:p-4">
          <h2 className="text-xl text-primary font-bold mb-8">
            Update Timer for upcoming episodes
          </h2>
          <p className="text-lg">Selected Time: {formattedTime}</p>
        </div>

        <form
          onSubmit={handleUpdateTime}
          className="my-12 mx-0 md:mx-4 md:pe-4 w-full"
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 pt-4">
              <div>
                <DatePicker
                  label="Date"
                  name="date"
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        sx={{
                          marginBottom: 2,

                          // Label color
                          "& label": {
                            color: "#afafaf !important",
                          },
                          "& label.Mui-focused": {
                            color: "#afafaf !important",
                          },

                          // Border color
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#afafaf !important",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#afafaf !important",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#afafaf !important",
                            },

                          // Icon color
                          "& .MuiSvgIcon-root": {
                            fill: "#afafaf !important",
                          },
                        }}
                      />
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    color: colorConfig.primary,
                    borderColor: colorConfig.primary,
                  }}
                >
                  {isLoading ? "Updating..." : "Update Time & Date"}
                </Button>
              </div>
            </div>
          </LocalizationProvider>
        </form>
      </div>
    </OpacityAnimation>
  );
};

export default UpdateTimerTab;
