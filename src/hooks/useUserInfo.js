import React, { useEffect } from "react";
import { useAutoQuery } from "../uitls/query";
import { userInfo } from "../api";

function useUserInfo(push) {
  let { data, update, error, loading } = useAutoQuery(userInfo, null, {
    onError(msg, e) {
      push("/signin");
    },
    onSuccess(msg, data) {
      if (data.role !== "admin") {
        push("/signin");
      }
    },
  });

  return { data, update, error, loading };
}

export default useUserInfo;
