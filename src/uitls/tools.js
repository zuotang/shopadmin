import { useState, useEffect } from "react";
import { baseUrl } from "../api";
//解析url请求参数
export function parseQuery(query) {
  var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
  var obj = {};
  while (reg.exec(query)) {
    obj[RegExp.$1] = RegExp.$2;
  }
  return obj;
}

export function getVideoData() {
  let sourceList = JSON.parse(localStorage.getItem("sourceList"));
  let queryData = parseQuery(window.location.search.slice(1));
  return sourceList.find((item) => item.id == queryData.id);
}

export function useVideo() {
  let [data, setData] = useState({});
  useEffect(() => {
    setData(getVideoData());
  }, []);
  return data;
}

export function getImgSrc(src) {
  return src && src.startsWith("http") ? src : `${baseUrl}${src}`;
}
export function getThumbSrc(src, size = "sm") {
  return src && src.startsWith("http") ? src : `${baseUrl}/file/thumb?img=${src}&size=${size}`;
}

export function clearAllCookie() {
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  console.log("需要删除的cookie名字：" + keys);
  if (keys) {
    for (var i = keys.length; i--; ) document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
  }
}
