import { colorConfig } from "@/configs/colorConfig";
import { TextField } from "@mui/material";

interface MuiInputFieldProps {
  name: string;
  type: string;
  label: string;
  required: boolean;
  defaultValue?: string;
}

const MuiInputField = ({
  name,
  type,
  label,
  required,
  defaultValue,
}: MuiInputFieldProps) => {
  return (
    <div className="py-2">
      <TextField
        name={name}
        type={type}
        label={label}
        required={required}
        defaultValue={defaultValue}
        variant="outlined"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: colorConfig.primary,
            },
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& fieldset": {
              borderColor: colorConfig.primary,
            },
          },
        }}
      />
    </div>
  );
};

export default MuiInputField;
