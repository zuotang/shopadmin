import React, { useState, useEffect, useRef } from "react";
import { Box, Spinner } from "gestalt";
import { Switch, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import System from "../page/system/System";
import Shop from "../page/shop/Shop";
import Home from "../page/Home";
import useUserInfo from "../hooks/useUserInfo";
import { UserContext } from "../components/UserContext";

function IndexPage(props) {
  let userData = useUserInfo(props.history.push);
  if (!userData.id) {
    return (
      <Box paddingY={12}>
        <Spinner show={true} accessibilityLabel="获取用户数据" />
      </Box>
    );
  }
  return (
    <UserContext.Provider value={userData}>
      <Header {...props} />
      <Switch location={props.location}>
        <Route path="/system" component={System} />
        <Route path="/shop" component={Shop} />
        <Route path="/" component={Home} />
      </Switch>
    </UserContext.Provider>
  );
}

export default IndexPage;
