import React from "react";
import { Box, Column, Button, Divider } from "gestalt";
import { Switch, Route, NavLink } from "react-router-dom";
import Transition from "../../components/Transition";
import List from "./List";
import Add from "./Add";
function Shop(props) {
  return (
    <Box display="flex" direction="row" paddingY={2}>
      <Column span={2}>
        <Box color="lightGray" padding={1}>
          <Box color="white" paddingY={2}>
            <NavLink exact activeClassName="selected" to="/shop">
              <Button text="商品列表" color="transparent" />
            </NavLink>
            <Divider />
            <NavLink activeClassName="selected" to="/shop/add">
              <Button text="添加商品" color="transparent" />
            </NavLink>
            <Divider />
            <NavLink activeClassName="selected" to="/shop/recovery?status=1">
              <Button text="回收站" color="transparent" />
            </NavLink>
          </Box>
        </Box>
      </Column>
      <Column span={10}>
        <Box color="lightGray" padding={1}>
          <Box color="white" paddingY={2} minHeight={900}>
            <Switch>
              <Route path="/shop/add" component={Add} />
              <Route path="/shop/edit/:id" component={Add} />
              <Route path="/shop/recovery" component={List} />
              <Route path="/shop" component={List} />
            </Switch>
          </Box>
        </Box>
      </Column>
    </Box>
  );
}

export default Shop;
