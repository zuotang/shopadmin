import React, { useState, useEffect } from "react";
import { Box, Toast } from "gestalt";
function ToastExample({ message = { type: "", message: "" }, time = 2000 }) {
  let [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (message.message) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, time);
    }
  }, [message.message]);
  return (
    <Box
      fit
      dangerouslySetInlineStyle={{
        __style: {
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
      paddingX={1}
      position="fixed"
    >
      {showToast && <Toast text={message.message || ""} />}
    </Box>
  );
}
export default ToastExample;
