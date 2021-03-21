import axios from "../../uitls/http";
import { baseUrl } from "../../api";

export async function webInfo() {
  let { data } = await axios.get(baseUrl + "/web/homeinfo");

  return data.data;
}
export async function heightUser() {
  let { data } = await axios.get(baseUrl + "/user/height_user");
  return data;
}
