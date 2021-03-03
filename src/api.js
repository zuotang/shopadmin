import axios from "./uitls/http";
export const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:80" : "";
//登录
export async function signin(params) {
  let { data } = await axios.post(baseUrl + "/user/signin", { ...params });
  return data.data;
}

//获取用户消息
export async function userInfo(params) {
  let { data } = await axios.get(baseUrl + "/user/info", { ...params });
  return data.data;
}
