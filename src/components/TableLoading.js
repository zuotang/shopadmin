import React from "react";
import { Box, IconButton, Spinner } from "gestalt";
function TableLoading({ loading, update }) {
  return (
    <Box position="absolute" right={true} display="flex" alignItems="center">
      <Box marginEnd={1}>
        <Spinner show={loading} accessibilityLabel="加载中" size="sm" />
      </Box>
      <IconButton accessibilityLabel="更新" icon="refresh" onClick={update} />
    </Box>
  );
}
export default TableLoading;
