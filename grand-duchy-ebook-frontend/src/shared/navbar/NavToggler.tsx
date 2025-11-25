import { colorConfig } from "@/configs/colorConfig";
import { IconButton } from "@mui/material";
import { MdOutlineSettings } from "react-icons/md";

interface NavTogglerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavToggler = ({ isOpen, setIsOpen }: NavTogglerProps) => {
  return (
    <IconButton
      onClick={() => setIsOpen(!isOpen)}
      sx={{
        position: "fixed",
        bottom: 25,
        right: 5,
        background: `linear-gradient(45deg, ${colorConfig.darkPaper}, ${colorConfig.darkPaper}) !important`,
        borderRadius: 1,
        zIndex: 1,
      }}
    >
      <MdOutlineSettings
        className="animate-spin"
        style={{
          fontSize: "2rem",
          color: "white",
          animation: "spin 4s linear infinite",
        }}
      />
    </IconButton>
  );
};

export default NavToggler;
