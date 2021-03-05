import React, { useEffect, useState, useContext } from "react";
import { Box, TextField, Heading, Flex, Button, Text, Spinner, Callout } from "gestalt";
import { getList, edit } from "./api";
import { useQuery, useAutoQuery } from "../../uitls/query";
import ShowMessage from "../../components/ShowMessage";
import axios from "axios";
import { baseUrl } from "../../api";
import { getImgSrc } from "../../uitls/tools";
import { WebCtx } from "../../components/WebContext";
import useDebounce from "../../hooks/useDebounce";

function Item({ data, onChange }) {
  if (data.type == "Image") {
    return <ImageItem data={data} onChange={onChange} />;
  } else {
    return <StringItem data={data} onChange={onChange} type={data.type?.toLowerCase()} />;
  }
}

function StringItem({ data, onChange, type = "string" }) {
  let [value, setValue] = useState(data.value);
  let { fetch, error, loading } = useQuery(edit);
  //节流
  let debounce = useDebounce((e) => {
    fetch(
      { ...data, value: e.value },
      {
        onSuccess: () => {
          onChange();
        },
      }
    );
  }, 500);

  return (
    <Box display="flex" wrap>
      <Box flex="grow" paddingX={3} paddingY={3}>
        <TextField
          name={data.name}
          label={data.name}
          id={data.name}
          onChange={(e) => {
            setValue(e.value);
            debounce(e);
          }}
          value={value}
          helperText={data.note}
          type={type}
        />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
      </Box>
    </Box>
  );
}

function ImageItem({ data, onChange }) {
  let [image, setImage] = useState(data.value);
  let { fetch, error, loading } = useQuery(edit);

  function uploadFile(file) {
    let postData = new FormData();
    postData.append("file", file);
    axios
      .post(`${baseUrl}/file/uploadfile`, postData, {
        onUploadProgress: (e) => {
          let pre = Math.floor((e.loaded / e.total) * 100);
        },
      })
      .then((res) => {
        let url = res.data.data.url;
        fetch(
          {
            ...data,
            value: url,
          },
          {
            onSuccess: (msg, res) => {
              setImage(url);
              onChange();
            },
          }
        );
      });
  }
  function uploadFiles(files) {
    for (let item of files) {
      uploadFile(item);
    }
  }

  return (
    <Box display="flex" wrap>
      <Box flex="grow" paddingX={3} paddingY={3}>
        <Text size="sm">{data.name}</Text>
        <img src={getImgSrc(image)} height={50} width={50} alt={data.not} />
        <input
          type="file"
          onChange={(e) => {
            uploadFiles(e.target.files);
          }}
        />
        <Text size="sm">{data.note}</Text>
        <Spinner show={loading} size="sm" accessibilityLabel="Example spinner" />
      </Box>
    </Box>
  );
}

function Web(props) {
  let [message, setMessage] = useState("");
  let { data, error, loading } = useAutoQuery(getList);
  let webCtx = useContext(WebCtx);
  return (
    <Box padding={3}>
      <Flex justifyContent="center">
        <Box direction="column" display="flex" maxWidth={1200} width="100%" wrap>
          <Box flex="grow" paddingX={3} paddingY={3}>
            <Heading accessibilityLevel={2} size="md">
              网站设置
            </Heading>
          </Box>
          <ShowMessage message={message} />
          <Box paddingX={1} paddingY={1}>
            {error && <Callout type="error" iconAccessibilityLabel="Error icon" message={error} />}
          </Box>
          {data.list?.map((item) => (
            <Item
              key={item.id}
              data={item}
              onChange={(e) => {
                webCtx.update();
              }}
            />
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
export default Web;
