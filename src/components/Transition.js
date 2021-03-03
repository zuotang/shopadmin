import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// The duration for each phase of the transition
// So the total duration will be _twice_ this
const timeout = 600;

let pPathName = "";
const Transition = ({ children, history, location }) => {
  //记录上次动画的key，如果页面非替换则播放动画
  if (history.action != "REPLACE") {
    pPathName = location.pathname;
  }
  return (
    <TransitionGroup className="pagebox">
      <CSSTransition appear={true} key={history.action == "REPLACE" ? pPathName : location.pathname} timeout={timeout} classNames="page">
        {/* {(status) => <div style={styles[status]}></div>} */}
        <div>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transition;
