import React from "react";
import { TransitionGroup, Transition as ReactTransition } from "react-transition-group";

// The duration for each phase of the transition
// So the total duration will be _twice_ this
const timeout = 200;

const styles = {
  entering: {
    position: "absolute",
    opacity: 0,
    transform: "scale(1.1,1.1)",
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out,transform ${timeout}ms ease-in-out`,
    opacity: 1,
    transform: "scale(1,1)",
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out,transform ${timeout}ms ease-in-out`,
    opacity: 0,
    transform: "scale(0.9,0.9)",
  },
};
let pPathName = "";
const Transition = ({ children, history, location }) => {
  //记录上次动画的key，如果页面非替换则播放动画
  if (history.action != "REPLACE") {
    pPathName = location.pathname;
  }
  return (
    <TransitionGroup>
      <ReactTransition key={history.action == "REPLACE" ? pPathName : location.pathname} timeout={timeout}>
        {(status) => <div style={styles[status]}>{children}</div>}
      </ReactTransition>
    </TransitionGroup>
  );
};

export default Transition;
