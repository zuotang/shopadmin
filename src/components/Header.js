import React, { useContext } from "react";
import { Box, Icon, ButtonGroup, Button, IconButton, Divider, Heading, SearchField } from "gestalt";
import { NavLink } from "react-router-dom";
import { clearAllCookie, getImgSrc } from "../uitls/tools";
import { WebCtx } from "./WebContext";
function Header({ history }) {
  const [value, setValue] = React.useState("");
  let web = useContext(WebCtx);
  return (
    <Box color="white" rounding={2} padding={3} display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <Box>
          <img src={getImgSrc(web.logo)} width={35} height={35} />
        </Box>
        <Box padding={2}>
          <Heading color="red" size="sm">
            {web.title}
          </Heading>
        </Box>
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
