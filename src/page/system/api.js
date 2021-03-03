import axios from "../../uitls/http";
import { baseUrl } from "../../api";

export async function getList(params) {
  let { data } = await axios.get(baseUrl + "/web/list");
  return { list: data.data };
}
export async function edit(params) {
  let { data } = await axios.post(baseUrl + "/web/edit", params);
  return data;
}
