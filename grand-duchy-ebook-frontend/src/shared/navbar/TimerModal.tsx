import { useUserContext } from "@/context/AuthContext";
import { useGetActiveTimeStatusQuery } from "@/redux/features/userApi";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { MdWatchLater } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { CgSandClock } from "react-icons/cg";

const TimerModal = ({
  setOpenTimerModal,
}: {
  setOpenTimerModal: (value: boolean) => void;
}) => {
  const { user } = useUserContext();
  const [formattedTime, setFormattedTime] = useState("00:00:00");

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      setFormattedTime(date.toLocaleTimeString());
    };
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const { data, isLoading, error } = useGetActiveTimeStatusQuery({
    email: user ? user?.email : "",
  });

  if (isLoading) {
    return <div></div>;
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const times = data.data as {
    allUsersTotalActiveTime: number;
    loggedInUserActiveTime: null | {
      totalActive: number;
    };
  };

  const formatActiveTime = (totalActive: number) => {
    // Convert milliseconds to total minutes
    const totalMinutes = Math.floor(totalActive / (1000 * 60));

    // Calculate hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Return formatted string (e.g., "2 hours 30 minutes")
    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white/90 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={() => setOpenTimerModal(false)}
          className="absolute top-2 lg:top-4 right-2 lg:right-4  hover:text-black transition duration-200"
        >
          <CloseIcon className="w-6 h-6 text-error" />
        </button>

        {/* Header */}
        <div className="text-center space-y-4 lg:space-y-6">
          <h2 className="text-lg lg:text-2xl font-semibold leading-relaxed text-black">
            &quot;Time is the most valuable thing a man can spend.&quot; –{" "}
            <span className="italic">Theophrastus</span>
          </h2>
          <p className="text-sm lg:text-lg text-black">
            So only time you can spend here. The book is free. Money wise...
          </p>
          {/* Animated Clock */}
          <div className="text-xl lg:text-4xl font-mono text-primary font-bold tracking-widest  p-3 rounded-lg shadow-md flex items-center justify-center gap-4 md:w-1/2 mx-auto">
            <MdWatchLater /> {formattedTime}
          </div>

          {/* Time Stats */}
          <div className="rounded-md p-2 lg:p-4 space-y-2 lg:space-y-4">
            <p className="text-sm lg:text-lg font-medium flex flex-wrap items-center justify-center gap-4 text-black">
              <CgSandClock /> Total time spent by users:{" "}
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2.5 }}
                className="text-primary font-bold lg:text-2xl"
              >
                <CountUp
                  start={0}
                  end={Math.floor(times.allUsersTotalActiveTime / (1000 * 60))}
                  duration={3}
                />{" "}
                mins ({formatActiveTime(times.allUsersTotalActiveTime)})
              </motion.span>
            </p>

            {times.loggedInUserActiveTime !== null && (
              <p className="text-sm lg:text-lg font-medium flex flex-wrap items-center justify-center gap-4 text-black">
                <IoTrophyOutline /> Your total time here:{" "}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 2.5 }}
                  className="text-green-600 font-bold lg:text-2xl"
                >
                  <CountUp
                    start={0}
                    end={Math.floor(
                      times.loggedInUserActiveTime.totalActive / (1000 * 60)
                    )}
                    duration={3}
                  />{" "}
                  mins (
                  {formatActiveTime(times.loggedInUserActiveTime.totalActive)})
                </motion.span>
              </p>
            )}
            {times.loggedInUserActiveTime !== null && (
              <p className="text-xs text-black lg:text-base">
                Thank you for your time—it’s the greatest gift of all. ✨
              </p>
            )}
          </div>

          {/* Login CTA */}
          {!user && (
            <div className="mt-4">
              <Link
                href="/auth/login"
                className="inline-block w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition duration-200"
              >
                Login to know your time
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
