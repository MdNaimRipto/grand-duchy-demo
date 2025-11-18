import { colorConfig } from "@/configs/colorConfig";
import { Button } from "@mui/material";

const ShareThoughts = () => {
  return (
    <div className="container flex flex-col justify-center items-center h-[600px] gap-4 mt-8">
      <h5 className="titleFont text-5xl text-center">Share Your Thoughts</h5>
      <form className="w-full lg:w-[30%] mt-6 flex flex-col gap-4">
        <div>
          <label className="mb-2 block titleFont text-lg">Username</label>
          <input
            className="w-full border border-gray bg-primary/0 rounded-lg p-2"
            placeholder="Enter your Name"
          />
        </div>
        <div>
          <label className="mb-2 block titleFont text-lg">Email</label>
          <input
            className="w-full border border-gray bg-primary/0 rounded-lg p-2"
            placeholder="Enter your Email"
          />
        </div>
        <div>
          <label className="mb-2 block titleFont text-lg">Your Thoughts</label>
          <textarea
            className="w-full border border-gray bg-primary/0 rounded-lg p-2"
            placeholder="Share your thoughts"
            rows={5}
          />
        </div>
        <Button
          sx={{
            backgroundColor: colorConfig.darkPaper,
            color: colorConfig.white,
            borderRadius: "20px",
            fontSize: "14px",
            textTransform: "capitalize",
            py: "8px",
            px: "16px",
            width: 200,
            mx: "auto",
          }}
        >
          Share Now
        </Button>
      </form>
    </div>
  );
};

export default ShareThoughts;
