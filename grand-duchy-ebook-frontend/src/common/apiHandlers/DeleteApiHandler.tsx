import { CircularProgress, IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { colorConfig } from "@/configs/colorConfig";
import {
  IApiErrorResponse,
  IApiSuccessResponse,
} from "@/types/apiResponseTypes";
import { SuccessToast } from "../toasts/SuccessToast";
import { ErrorToast } from "../toasts/ErrorToast";

const DeleteApiHandler = ({
  deleteFn,
  refetch,
  id,
}: {
  deleteFn: any;
  refetch: any;
  id: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      const res: IApiSuccessResponse = await deleteFn({ id }).unwrap();
      if (res.success) {
        SuccessToast(res.message);
        refetch();
      }
    } catch (e) {
      const error = e as IApiErrorResponse;
      ErrorToast(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IconButton onClick={() => handleDelete()} disabled={isLoading}>
      {isLoading ? (
        <CircularProgress color="error" size={22} />
      ) : (
        <DeleteForeverIcon sx={{ color: colorConfig.error }} />
      )}
    </IconButton>
  );
};

export default DeleteApiHandler;
