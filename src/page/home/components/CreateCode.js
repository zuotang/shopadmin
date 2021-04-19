import React, { useState } from "react";
import { Box, Button, SelectList, Text, RadioButton, TextField, Column } from "gestalt";
import ShowMessage from "../../../components/ShowMessage";
import { baseUrl } from "../../../api";

function SelectType({ value, setValue }) {
  return (
    <Box display="flex" direction="column">
      <Text size="sm">类型</Text>
      <Box paddingY={1}>
        <RadioButton checked={value === "0"} id="favoriteDog" label="用户" name="favorite" onChange={() => setValue("0")} value={"0"} />
      </Box>
      <Box paddingY={1}>
        <RadioButton checked={value === "1"} id="favoriteCat" label="代理" name="favorite" onChange={() => setValue("1")} value={"1"} />
      </Box>
    </Box>
  );
}

function DelCode() {
  let [message, setMessage] = useState("");
  let [day, setDay] = useState("7");
  let [num, setNum] = useState("20");
  let [remarks, setRemarks] = useState("");
  let [type, setType] = useState("0");
  console.log(type);
  return (
    <Box>
      <ShowMessage message={{ message }} time={10000} color="red" />

      <SelectList
        id="selectlistexample10"
        onChange={(e) => {
          setDay(+e.value);
        }}
        options={[
          { label: "7天", value: "7" },
          { label: "一个月", value: "30" },
          { label: "一季度", value: "92" },
          { label: "一年", value: "365" },
          { label: "终身", value: "36500" },
        ]}
        size="lg"
        label="时长"
      />
      <Box marginTop={2}>
        <TextField id="num" label="数量" type="number" value={num} onChange={(e) => setNum(e.value)} />
      </Box>
      <Box marginTop={2}>
        <SelectType value={type} setValue={setType} />
      </Box>
      <Box marginTop={2}>
        <TextField id="remarks" label="备注" value={remarks} onChange={(e) => setRemarks(e.value)} />
      </Box>
      <Box marginTop={2}>
        <Button text="生成" inline role="link" href={baseUrl + `/user/new_code?day=${day}&num=${num}&type=${type}&remarks=${remarks}`} target="blank" />
      </Box>
    </Box>
  );
}

export default DelCode;
