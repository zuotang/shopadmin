import React from "react";
import { Box, IconButton, Spinner } from "gestalt";
function TableLoading({ loading, update, isFix = true }) {
  return (
    <Box position={isFix ? "absolute" : "relative"} right={true} top={true} display="flex" alignItems="center">
      <Box marginEnd={1} position="absolute">
        <Spinner show={loading} accessibilityLabel="加载中" size="sm" />
      </Box>
      <IconButton accessibilityLabel="更新" icon="refresh" onClick={update} />
    </Box>
  );
}
export default TableLoading;
