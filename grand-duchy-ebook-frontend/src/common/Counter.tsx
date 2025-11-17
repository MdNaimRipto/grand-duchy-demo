import { useGetTimerQuery } from "@/redux/features/timerApi";
import Countdown from "react-countdown";
import { CircularProgress } from "@mui/material";
import { colorConfig } from "@/configs/colorConfig";

// { targetDate }: { targetDate: string }

const Counter = () => {
  const { data, isLoading, error } = useGetTimerQuery({});

  if (isLoading) {
    return (
      <CircularProgress
        sx={{
          color: colorConfig.primary,
        }}
      />
    );
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const targetDate = data?.data[0];

  return (
    <div className="flex gap-4 text-center my-4">
      <Countdown
        date={new Date(targetDate?.time)}
        renderer={({ days, hours, minutes, seconds }) => (
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{days}</span>
              <span className="text-sm">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{hours}</span>
              <span className="text-sm">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{minutes}</span>
              <span className="text-sm">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{seconds}</span>
              <span className="text-sm">Seconds</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Counter;
