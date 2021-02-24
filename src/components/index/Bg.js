import React, { useState, useEffect } from "react"

import Fade from "react-reveal/Fade"

function Bg({ url }) {
  let [bgurl, setBgurl] = useState("")
  useEffect(function() {
    setTimeout(() => {
      setBgurl(url)
    }, 800)
    return () => {}
  })
  return (
    <Fade when={bgurl == url}>
      <div id="show_bg" style={{ backgroundImage: bgurl }}></div>
    </Fade>
  )
}
export default Bg
