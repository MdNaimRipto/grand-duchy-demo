import { useUserContext } from "@/context/AuthContext";
import { IUser } from "@/types/userTypes";
import {
  ClickAwayListener,
  Box,
  Typography,
  CircularProgress,
  Modal,
  Button,
} from "@mui/material";

import React, { RefObject, useState } from "react";
import { ErrorToast } from "./toasts/ErrorToast";
import { useUpdateFontMutation } from "@/redux/features/userApi";
import {
  IApiErrorResponse,
  IApiSuccessResponse,
} from "@/types/apiResponseTypes";
import { SuccessToast } from "./toasts/SuccessToast";
import { UseCommonImports } from "@/utils/UseCommonImports";
import { decryptData } from "@/components/auth/userEncription";
import { colorConfig } from "@/configs/colorConfig";

interface FontModalProps {
  handleClose: () => void;
  open: boolean;
}

const FontModal: React.FC<FontModalProps> = ({ handleClose, open }) => {
  const { user, setUser } = useUserContext();
  const { Cookies } = UseCommonImports();

  const typedUser = user as IUser;

  const [isLoading, setIsLoading] = useState(false);

  const fontSizes = [
    {
      title: "Small",
      value: 18,
    },
    {
      title: "Medium",
      value: 20,
    },
    {
      title: "Large",
      value: 24,
    },
    {
      title: "Extra large",
      value: 30,
    },
  ];

  const [updateFont] = useUpdateFontMutation();

  const handleUpdateFont = async (font: number) => {
    if (!user) {
      window.localStorage.setItem("fontSize", JSON.stringify(font));
      window.dispatchEvent(new Event("fontSizeUpdated"));
      return;
    }

    const option = {
      data: {
        email: typedUser.email,
        fontSize: font,
      },
    };
    try {
      setIsLoading(true);

      const res: IApiSuccessResponse = await updateFont(option).unwrap();
      if (res.success) {
        SuccessToast(res.message);

        const userData = decryptData(String(res.data?.userData));
        setUser(userData);

        Cookies.set("userData", String(res.data?.userData), {
          expires: 3,
        });
        Cookies.set("token", String(res.data?.token), { expires: 3 });
        handleClose();
      }
    } catch (e) {
      const error = e as IApiErrorResponse;
      ErrorToast(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="bg-white shadow-lg p-6 border rounded-3xl border-gray"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 280,
          maxWidth: "90%",
          outline: "none",
        }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-[200px]">
            <CircularProgress />
          </div>
        ) : (
          <>
            <Typography
              variant="subtitle2"
              className="titleFont"
              sx={{
                mb: "8px",
                fontSize: "20px",
                fontWeight: 600,
                textAlign: "center",
                fontFamily: "IM Fell English",
              }}
            >
              Choose Font Size
            </Typography>
            <div className="flex flex-col gap-2">
              {fontSizes.map((font, i) => (
                <Button
                  sx={{
                    color: colorConfig.black,
                    borderColor: colorConfig.primary,
                  }}
                  onClick={() => handleUpdateFont(font.value)}
                  key={i}
                  className="textFont rounded-md hover:bg-gray text-primary hover:text-white "
                  style={{ fontSize: font.value, textTransform: "none" }}
                  fullWidth
                  variant="outlined"
                >
                  {font.title}
                </Button>
              ))}
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default FontModal;
