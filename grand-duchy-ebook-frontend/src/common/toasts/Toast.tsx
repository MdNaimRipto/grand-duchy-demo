import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { colorConfig } from "@/configs/colorConfig";

interface IToast {
  message: string;
  onClose: () => void;
  severity: "success" | "error" | "info" | "warning";
  bg: string;
}

export function Toast({ message, onClose, severity, bg }: IToast) {
  return (
    <Snackbar
      open={true}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          backgroundColor: `${bg} !important`,
          color: colorConfig.white,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
