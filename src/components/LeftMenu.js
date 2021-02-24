import React from "react";
import { Box, Button, Divider } from "gestalt";
import { Link } from "react-router-dom";

function LeftMenu() {
  return (
    <Box color="lightGray" padding={1}>
      <Box color="white" paddingY={2}>
        <Link to="/shop/add">
          <Button text="添加商品" color="transparent" />
        </Link>
        <Divider />
        <Link to="/shop/list">
          <Button text="商品列表" color="transparent" />
        </Link>
      </Box>
    </Box>
  );
}

export default LeftMenu;
