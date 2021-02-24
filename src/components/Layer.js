import React from "react";
import { Box, Column } from "gestalt";
function Layer({ subMenu, children }) {
  return (
    <Box display="flex" direction="row" paddingY={2}>
      <Column span={2}>{subMenu}</Column>
      <Column span={10}>
        <Box color="lightGray" padding={1}>
          <Box color="white" paddingY={2} overflow="hidden">
            {children}
            {/* <Transition {...props}>
            <Switch location={props.location}>
              <Route path="/" exact component={Home} />
              <Route path="/shop/list" component={ShopList} />
            </Switch>
            </Transition> */}
          </Box>
        </Box>
      </Column>
    </Box>
  );
}

export default Layer;
