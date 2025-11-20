import { Box, Typography, Modal, Button } from "@mui/material";
import { colorConfig } from "@/configs/colorConfig";

interface FontModalProps {
  handleClose: () => void;
  open: boolean;
}

const FontModal: React.FC<FontModalProps> = ({ handleClose, open }) => {
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

  const handleUpdateFont = async (font: number) => {
    window.localStorage.setItem("fontSize", JSON.stringify(font));
    window.dispatchEvent(new Event("fontSizeUpdated"));
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
      </Box>
    </Modal>
  );
};

export default FontModal;
