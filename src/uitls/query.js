import { useState, useEffect, useRef } from "react";

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

function useBaseFetch(ql, { defaultData }) {
  let [data, setData] = useState(defaultData || {});
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  let stateRef = useRef();
  useEffect(() => {
    stateRef.current = true;
    return () => {
      stateRef.current = false;
    };
  }, []);

  function fetch(params, { onError, onSuccess, updateQuery, title = "请求" }) {
    // 初始数据
    setLoading(true);
    //setData({});
    setError(null);
    ql(params)
      .then((res) => {
        if (!stateRef.current) {
          return;
        }
        onSuccess && onSuccess({ type: "success", message: `${title}成功` }, res);
        setLoading(false);
        if (updateQuery) {
          res = updateQuery(data, res, params);
        }
        setData(res);
      })
      .catch(function (error) {
        if (!stateRef.current) {
          return;
        }
        setLoading(false);
        setError(error.message);
        onError && onError({ type: "error", message: `${error.message || error.msg}` });
      });
  }
  //更新缓存数据
  function updateCache(fun) {
    setData(fun(data));
  }
  return { fetch, data, loading, error, setError, updateCache, setLoading };
}
export function useQuery(ql, params, options) {
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
  console.log(defaultData);
  useEffect(() => {
    if (!defaultData || Object.keys(defaultData).length == 0) {
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
  }, [...handleOption(params), defaultData]);

  return {
    ...context,
    fetchMore: (newParams, newOptions, updateQuery) => {
      context.fetch({ ...params, ...newParams }, { updateQuery, ...options, ...newOptions });
    },
    update: () => {
      context.fetch(params, options);
    },
  };
}
