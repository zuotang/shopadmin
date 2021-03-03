import React from "react";
import { Box, Column, Button, Divider } from "gestalt";
import { Switch, Route, Link } from "react-router-dom";
import Transition from "../../components/Transition";
import Building from "../Building";
import Web from "./Web";

function System(props) {
  return (
    <Box display="flex" direction="row" paddingY={2}>
      <Column span={2}>
        <Box color="lightGray" padding={1}>
          <Box color="white" paddingY={2}>
            <Link to="/system/">
              <Button text="网站设置" color="transparent" />
            </Link>
            <Divider />
            <Link to="/system/config">
              <Button text="环境变量" color="transparent" />
            </Link>
          </Box>
        </Box>
      </Column>
      <Column span={10}>
        <Box color="lightGray" padding={1}>
          <Box color="white" paddingY={2} overflow="hidden" minHeight={800}>
            <Transition {...props}>
              <Switch location={props.location}>
                <Route exact path="/system/" component={Web} />
                <Route path="/system/config" component={Building} />
              </Switch>
            </Transition>
          </Box>
        </Box>
      </Column>
    </Box>
  );
}

export default System;
