import React, { useState, useEffect, useRef } from "react";
import { Box, Spinner } from "gestalt";
import { Switch, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import System from "../page/system/System";
import Shop from "../page/shop/Shop";
import Home from "../page/home/Home";
import useUserInfo from "../hooks/useUserInfo";
import { UserContext } from "../components/UserContext";
import { getWebConfig } from "../api";
import { useAutoQuery } from "../uitls/query";
import { WebCtx } from "../components/WebContext";

function IndexPage(props) {
  let { data, update, loading } = useAutoQuery(getWebConfig, {}, { cachePolicy: "local" });
  let { data: userData, update: userUpdate } = useUserInfo(props.history.push);
  if (!userData.id) {
    return (
      <Box paddingY={12}>
        <Spinner show={true} accessibilityLabel="获取用户数据" />
      </Box>
    );
  }
  return (
    <WebCtx.Provider value={{ ...data, update }}>
      <UserContext.Provider value={{ ...userData, update: userUpdate }}>
        <Header {...props} />
        <Switch location={props.location}>
          <Route path="/system" component={System} />
          <Route path="/shop" component={Shop} />
          <Route path="/" component={Home} />
        </Switch>
      </UserContext.Provider>
    </WebCtx.Provider>
  );
}

export default IndexPage;
