import React from 'react'
import classNames from 'classnames'

function Loading({loading}){
  return  <div className={classNames("center-loading",loading && "loading")}><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
}
export default Loading