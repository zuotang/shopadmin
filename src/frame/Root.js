import Frame from "./Frame";
import Signin from "../page/Signin";
import { Route, Switch } from "react-router-dom";

function Root(props) {
  return (
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/" component={Frame} />
    </Switch>
  );
}

export default Root;
