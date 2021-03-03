import axios from "../../uitls/http";
import { baseUrl } from "../../api";

export async function getShop(params) {
  let { data } = await axios.get(baseUrl + "/shop/shop/" + params.id);
  let res = data.data;
  if (res.attr.length == 0) {
    res.attr = [{}];
  }
  return res;
}
export async function addShop(params) {
  let { data } = await axios.post(baseUrl + "/shop/add", { ...params });
  return data.data;
}

export async function editShop(params) {
  let { data } = await axios.post(baseUrl + "/shop/edit", { ...params });
  return data.data;
}
export async function delShop(params) {
  let { data } = await axios.post(baseUrl + "/shop/status", { id: params.id, status: 1 });
  return data.data;
}

export async function reShop(params) {
  let { data } = await axios.post(baseUrl + "/shop/status", { id: params.id, status: 0 });
  return data.data;
}

export async function shops(params) {
  let { data } = await axios.get(baseUrl + "/shop/list", { params });
  return data.data;
}

export async function attrEdit(params) {
  let { data } = await axios.post(baseUrl + "/shop/attr/edit", { ...params });
  return data.data;
}
