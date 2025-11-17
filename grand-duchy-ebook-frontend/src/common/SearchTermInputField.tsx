import { OutlinedInput } from "@mui/material";
import React from "react";

const SearchTermInputField = ({
  placeholder,
  setSearchTerm,
}: {
  placeholder: string;
  setSearchTerm: any;
}) => {
  return (
    <OutlinedInput
      placeholder={placeholder}
      size="small"
      sx={{
        width: "100%",
        fontSize: 12,
      }}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchTermInputField;
