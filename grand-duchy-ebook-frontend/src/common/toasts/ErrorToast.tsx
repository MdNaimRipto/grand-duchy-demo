import React from "react";
import { createRoot } from "react-dom/client";
import { Toast } from "./Toast";
import { colorConfig } from "@/configs/colorConfig";

export function ErrorToast(message: string) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const root = createRoot(div);

  const handleClose = () => {
    root.unmount();
    document.body.removeChild(div);
  };

  root.render(
    <Toast
      bg={colorConfig.error}
      severity="error"
      message={message}
      onClose={handleClose}
    />
  );
}
