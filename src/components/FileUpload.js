import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../api";
import { Button, Box, IconButton, Text } from "gestalt";
import syled from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";

const ImageBox = syled.div`
  width:200px;
  img{
    width:100%;
  }

`;

function FilesShow({ uploads, remove }) {
  return (
    <>
      {Object.values(uploads).map((item) => (
        <Box display="flex" key={item.url}>
          <Box paddingY={3}>
            {item.pre}%-{item.url}
          </Box>{" "}
          {item.pre == 100 && <IconButton accessibilityLabel="clear" icon="clear" onClick={(e) => remove(item)} />}
        </Box>
      ))}
    </>
  );
}

function ImagesShow({ uploads, remove }) {
  return (
    <Box display="flex" marginBottom={2} wrap>
      {Object.values(uploads).map((item) => (
        <Box position="relative" color="lightGray" margin={1} key={item.url}>
          <ImageBox>
            <img src={`${baseUrl}${item.url}`} />
            <Box position="absolute" color="white" bottom={true}>
              <Text size="sm">
                {item.pre}%-{item.url}
              </Text>
            </Box>
          </ImageBox>
          <Box position="absolute" top={true} right={true}>
            {item.pre == 100 && <IconButton accessibilityLabel="clear" iconColor="white" icon="clear" onClick={(e) => remove(item)} />}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function FileUpload({ name, formCtx, label, type = "image" }) {
  const { control, register } = formCtx;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: name,
  });

  let fileRef = useRef();
  let [uploads, setUploads] = useState({});
  useEffect(() => {
    if (fields) {
      let newUploads = [];
      fields.map((field) => {
        newUploads.push({ url: field.url, pre: 100 });
      });
      setUploads(newUploads);
    }
  }, [fields]);

  function setFileStatus(id, obj) {
    setUploads((data) => ({
      ...data,
      [id]: data[id] ? { fileid: id, ...data[id], ...obj } : obj,
    }));
  }

  function updateFile(file) {
    let data = new FormData();
    data.append("file", file);
    let fileId = file.lastModified;
    setFileStatus(fileId, {
      fileId,
      pre: 0,
      url: "",
    });
    axios
      .post(`${baseUrl}/file/uploadfile`, data, {
        onUploadProgress: (e) => {
          let pre = Math.floor((e.loaded / e.total) * 100);
          setFileStatus(fileId, {
            pre: pre,
          });
          // e.loaded 已经上传的字节数据，e.total 字节数据  转换为1-100的比例值 赋值个pre
        },
      })
      .then(({ data }) => {
        //setFileStatus(fileId, data.data);
        append(data.data);
      });
  }
  function updateFiles(files) {
    for (let item of files) {
      updateFile(item);
    }
  }

  function removeFile(item) {
    // let newUploads = { ...uploads };
    // delete newUploads[item.fileId];
    // setUploads(newUploads);
    let index = fields.findIndex((findItem) => findItem.url == item.url);
    if (index > -1) {
      remove(index);
    }
  }
  return (
    <>
      {type == "file" && <FilesShow uploads={uploads} remove={removeFile} />}
      {type == "image" && <ImagesShow uploads={uploads} remove={removeFile} />}
      {fields.map((field, index) => {
        return (
          <div key={field.id} style={{ display: "none" }}>
            <input name={`${name}[${index}].url`} defaultValue={field.url} ref={register()} />
          </div>
        );
      })}
      <Button
        text={label || "上传文件"}
        onClick={(e) => {
          fileRef.current.click();
        }}
        inline
      />
      <input
        type="file"
        multiple
        ref={fileRef}
        style={{ display: "none" }}
        onChange={(e) => {
          updateFiles(e.target.files);
        }}
      />
    </>
  );
}

export default FileUpload;
