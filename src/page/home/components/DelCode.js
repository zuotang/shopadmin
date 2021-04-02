import React, { useState } from "react";
import { Box, Heading, Column, Text, TextArea } from "gestalt";
import ShowMessage from "../../../components/ShowMessage";
import AskButton from "../../../components/AskButton";
import { useQuery } from "../../../uitls/query";
import { delCode } from "../api";

function DelCode() {
  let [message, setMessage] = useState("");
  let { fetch, loading } = useQuery(delCode, null, {
    onSuccess: (msg, data) => {
      setMessage(data.message);
    },
  });
  let [codes, setCodes] = useState();
  return (
    <Box>
      <ShowMessage message={{ message }} time={10000} color="red" />
      <Text size="sm" color="gray">
        每个兑换码使用单独一行
      </Text>
      <Box width="100%" height={365} marginEnd={1}>
        <TextArea id="codes" onChange={(e) => setCodes(e.value)} value={codes} rows={12} />
      </Box>
      <AskButton
        text="注销"
        title="确定注销该兑换码？"
        content="注销兑换码会连同绑定用户一起注销。"
        onConfirm={(e) => {
          if (codes) {
            let list = codes.split("\n").map((item) => item.trim());
            fetch({ list });
          }
        }}
      />
    </Box>
  );
}

export default DelCode;
