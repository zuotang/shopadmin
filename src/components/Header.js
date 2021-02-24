import React from "react";
import { Box, Icon, ButtonGroup, Button, IconButton, Divider, Heading, SearchField } from "gestalt";
import { NavLink } from "react-router-dom";
import { clearAllCookie } from "../uitls/tools";
function Header({ history }) {
  const [value, setValue] = React.useState("");
  return (
    <Box color="white" rounding={2} padding={3} display="flex" alignItems="center">
      <Box padding={3}>
        <Icon icon="pinterest" color="red" size={20} accessibilityLabel="Pinterest" />
        {/* <Heading color="red" size="sm">
          后台管理系统
        </Heading> */}
      </Box>
      <Box padding={2}>
        <ButtonGroup>
          <NavLink exact activeClassName="selected" to="/">
            <Button text="主页" color="transparent" />
          </NavLink>
          <Divider />
          <NavLink activeClassName="selected" to="/shop">
            <Button text="商品" color="transparent" />
          </NavLink>
          <NavLink activeClassName="selected" to="/system">
            <Button text="系统" color="transparent" />
          </NavLink>
        </ButtonGroup>
      </Box>
      <Box flex="grow" paddingX={2}>
        {/* <SearchField accessibilityLabel="Demo Search Field" id="searchField" onChange={({ value }) => setValue(value)} placeholder="Search and explore" value={value} /> */}
      </Box>
      {/* <Box paddingX={2}>
        <IconButton accessibilityLabel="Notifications" icon="speech-ellipsis" size="md" />
      </Box> */}
      <Box paddingX={2}>
        <IconButton
          accessibilityLabel="退出"
          icon="logout"
          size="md"
          onClick={(e) => {
            clearAllCookie();
            history.push("/signin");
          }}
        />
      </Box>
    </Box>
  );
}

export default Header;
