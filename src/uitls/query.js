import { useState, useEffect, useRef } from "react";

//缓存处理
const cache = {
  data: {},
  set(name, value, policy) {
    if (policy == "memory") {
      cache.data[name] = value;
    } else if (policy == "local") {
      localStorage.setItem(name, JSON.stringify(value));
    }
  },
  get(name, policy) {
    if (policy == "memory") {
      return cache.data[name];
    } else if (policy == "local") {
      return JSON.parse(localStorage.getItem(name));
    }
  },
  his(name, policy) {
    if (policy == "memory") {
      return !!cache.data[name];
    } else if (policy == "local") {
      return localStorage.hisItem(name);
    }
  },
  remove(name, policy) {
    if (policy == "memory") {
      delete cache.data[name];
    } else if (policy == "local") {
      return localStorage.removeItem(name);
    }
  },
};

function handleOption(opt) {
  let newList = [];
  function work(opt) {
    if (Array.isArray(opt)) {
      opt.forEach(work);
    } else if (opt instanceof Object) {
      Object.values(opt).forEach(work);
    } else {
      newList.push(opt);
    }
  }
  work(opt);
  return newList;
}

//获取查询函数的特征
function getQlKey(ql, params) {
  let paramsStr = handleOption(params).join("-");
  return `${ql.name}_${ql.toString().length}_${paramsStr}`;
}

function useBaseFetch(ql, { defaultData }) {
  let [data, setData] = useState(defaultData || {});
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  let mountRef = useRef();
  let cacheRef = useRef();
  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  }, []);
  async function fetch(params, { onError, onSuccess, updateQuery, title = "请求", cachePolicy = "none", isUpdate = false }) {
    cacheRef.current = {
      key: getQlKey(ql, params),
      policy: cachePolicy,
    };
    //更新时不取缓存
    let res = !isUpdate && cache.get(cacheRef.current.key, cacheRef.current.policy);

    //如果不存在缓存则取请求
    if (!res) {
      // 初始数据
      setLoading(true);
      setError(null);
      res = await ql(params)
        .then((resData) => {
          cache.set(cacheRef.current.key, resData, cacheRef.current.policy);
          return resData;
        })
        .catch(function (error) {
          if (!mountRef.current) {
            return;
          }
          setLoading(false);
          setError(error.message);
          onError && onError({ type: "error", message: `${error.message || error.msg}` });
        });
    }

    if (res) {
      if (!mountRef.current) {
        return;
      }
      onSuccess && onSuccess({ type: "success", message: `${title}成功` }, res);
      setLoading(false);
      if (updateQuery) {
        res = updateQuery(data, res, params);
      }
      setData(res);
    }
  }

  //更新缓存数据
  function updateCache(fun) {
    let res = fun({ ...data });
    if (cacheRef.current) {
      cache.set(cacheRef.current.key, res, cacheRef.current.policy);
    }
    if (mountRef.current) {
      setData(res);
    }
  }
  return { fetch, data, loading, error, setError, updateCache, setLoading };
}
export function useQuery(ql, params, options = {}) {
  let context = useBaseFetch(ql, options);
  return {
    ...context,
    fetch: (newParams, newOptions) => {
      context.fetch({ ...params, ...newParams }, { ...options, ...newOptions });
    },
  };
}

export function useAutoQuery(ql, params = {}, options = {}) {
  let context = useBaseFetch(ql, options);
  let defaultData = options.defaultData;

  let notDefault = useRef();
  useEffect(() => {
    //如果存在defaultData 则第一次不需要请求数据, notDefault是用来记录是否是第一次
    let isFetch = notDefault.current || !defaultData || Object.keys(defaultData).length == 0;
    notDefault.current = true;
    if (isFetch) {
      //是否等待
      if (options.stop) {
        //停止不需要加载效果
      } else if (options.hold) {
        //hold需要加载效果
        context.setLoading(true);
      } else {
        context.fetch(params, options);
      }
    }
  }, handleOption(params));

  return {
    ...context,
    fetchMore: (newParams, newOptions, updateQuery) => {
      context.fetch({ ...params, ...newParams }, { updateQuery, ...options, ...newOptions });
    },
    update: () => {
      //更新时必须去服务器拉取数据
      context.fetch(params, { ...options, isUpdate: true });
    },
  };
}
