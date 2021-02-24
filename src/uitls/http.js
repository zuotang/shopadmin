import axios from "axios";

// 创建axios实例
const instance = axios.create({
  //baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
  timeout: 12000, // 请求的超时时间
  withCredentials: true,
});

instance.interceptors.response.use((response) => {
  if (response.data.status !== 0) {
    console.log("错误", response.data.message);
    throw new Error(response.data.message);
  }
  return response;
});

export default instance;
