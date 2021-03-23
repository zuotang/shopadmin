import axios from "../../uitls/http";
import { baseUrl } from "../../api";

export async function webInfo(params) {
  let { data } = await axios.get(baseUrl + "/web/homeinfo", { params });

  return data.data;
}
export async function heightUser(params) {
  let { data } = await axios.get(baseUrl + "/user/height_user", { params });
  return data;
}

export async function newUser(params) {
  let { data } = await axios.get(baseUrl + "/user/new_user", { params });
  return data;
}

export async function cookies(params) {
  let { data } = await axios.get(baseUrl + "/core/cookies", { params });
  return data;
}

export async function delCode(params) {
  let { data } = await axios.post(baseUrl + "/user/delcode", params);
  return data;
}
export async function delUser(params) {
  let { data } = await axios.post(baseUrl + "/user/deluser", params);
  return data;
}
