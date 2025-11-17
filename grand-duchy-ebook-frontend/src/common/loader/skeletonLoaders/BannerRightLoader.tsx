import { Skeleton } from "@mui/material";
import React from "react";

const BannerRightLoader = () => {
  return (
    <div className="w-full h-full col-span-3 p-5">
      <Skeleton
        variant="rectangular"
        height={20}
        sx={{
          bgcolor: "#6b6b6b",
          borderRadius: "10px",
          width: "80%",
          mb: 2,
        }}
      />
      <Skeleton
        variant="rectangular"
        height={15}
        sx={{
          bgcolor: "#6b6b6b",
          borderRadius: "10px",
          width: "50%",
          mb: 3,
        }}
      />
      <Skeleton
        variant="rectangular"
        height={200}
        sx={{
          bgcolor: "#6b6b6b",
          borderRadius: "10px",
          width: "100%",
          mb: 3,
        }}
      />
      <div>
        <Skeleton
          variant="rectangular"
          height={20}
          sx={{
            bgcolor: "#6b6b6b",
            borderRadius: "10px",
            width: "80%",
            mb: 3,
          }}
        />
        <div className="md:w-3/5 grid grid-cols-4 gap-4">
          <Skeleton
            variant="rectangular"
            height={80}
            sx={{
              bgcolor: "#6b6b6b",
              borderRadius: "10px",
              width: "100%",
              mb: 3,
            }}
          />
          <Skeleton
            variant="rectangular"
            height={80}
            sx={{
              bgcolor: "#6b6b6b",
              borderRadius: "10px",
              width: "100%",
              mb: 3,
            }}
          />
          <Skeleton
            variant="rectangular"
            height={80}
            sx={{
              bgcolor: "#6b6b6b",
              borderRadius: "10px",
              width: "100%",
              mb: 3,
            }}
          />
          <Skeleton
            variant="rectangular"
            height={80}
            sx={{
              bgcolor: "#6b6b6b",
              borderRadius: "10px",
              width: "100%",
              mb: 3,
            }}
          />
        </div>
      </div>
      <Skeleton
        variant="rectangular"
        height={300}
        sx={{
          bgcolor: "#6b6b6b",
          borderRadius: "10px",
          width: "100%",
          mb: 3,
        }}
      />
      <div className="grid xl:hidden grid-cols-1 gap-4">
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{
            bgcolor: "#6b6b6b",
            borderRadius: "10px",
            width: "100%",
            mb: 3,
          }}
        />
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
            bgcolor: "#6b6b6b",
            borderRadius: "10px",
            width: "100%",
            mb: 3,
          }}
        />
      </div>
    </div>
  );
};

export default BannerRightLoader;
