import { Stack } from "@mui/material";
import React from "react";

const NoAccess = () => {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      you cannot access this page
    </Stack>
  );
};

export default NoAccess;
