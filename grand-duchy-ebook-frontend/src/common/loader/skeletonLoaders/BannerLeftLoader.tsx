import { Skeleton } from "@mui/material";
import React from "react";

const BannerLeftLoader = () => {
  return (
    <div className="w-full h-full col-span-4 p-5">
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
        height={280}
        sx={{
          bgcolor: "#6b6b6b",
          borderRadius: "10px",
          width: "100%",
          mb: 3,
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
              sm: "block",
            },
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
              sm: "block",
            },
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
              sm: "block",
            },
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
      <div className="hidden xl:grid grid-cols-1 lg:grid-cols-2 mr-24 gap-4">
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

export default BannerLeftLoader;
