import axios from "./uitls/http";
export const baseUrl = process.env.NODE_ENV == "development" ? "/api" : "";
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

export async function getWebConfig() {
  let { data } = await axios.get(baseUrl + "/web/config/");
  return data.data;
}
