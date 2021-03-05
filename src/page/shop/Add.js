import React, { useEffect, useState } from "react";
import { Box, TextField, Heading, Flex, Button, Callout } from "gestalt";
import FormItem from "../../components/FormItem";
import FileUpload from "../../components/FileUpload";
import { useForm, useFieldArray } from "react-hook-form";
import { addShop, editShop, getShop, reShop } from "./api";
import { useQuery, useAutoQuery } from "../../uitls/query";
import FormAttr from "../../components/FormAttr";
import ShowMessage from "../../components/ShowMessage";
//import Edit from "../../components/Edit";

function Add(props) {
  let [message, setMessage] = useState("");
  let { id } = props.match.params;
  let isEdit = typeof id !== "undefined";
  const { control, register, reset, handleSubmit, watch } = useForm();
  let formCtx = {
    control,
    register,
    reset,
    handleSubmit,
    watch,
  };
  let { fetch, error } = useQuery(isEdit ? editShop : addShop, null, {
    onSuccess: (msg, data) => {
      setMessage(msg);
      props.history.replace("/shop");
    },
  });
  let { fetch: reShopFetch } = useQuery(reShop, { id: id }, { onSuccess: setMessage });

  let { data } = useAutoQuery(getShop, { id: id }, { stop: !id, onSuccess: (msg, res) => reset(res) });

  const onSubmit = (data) => fetch(isEdit ? { id, ...data } : data);
  return (
    <Box padding={3}>
      <Flex justifyContent="center">
        <Box direction="column" display="flex" maxWidth={1200} width="100%" wrap>
          <Box flex="grow" paddingX={3} paddingY={3}>
            <Heading accessibilityLevel={2} size="md">
              添加商品
            </Heading>
          </Box>
          <ShowMessage message={message} />
          <Box paddingX={1} paddingY={1}>
            {error && <Callout type="error" iconAccessibilityLabel="Error icon" message={error} />}
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" wrap>
              <Box flex="grow" paddingX={3} paddingY={3}>
                <FormItem com={TextField} name="brand" label="品牌" ref={register()} />
              </Box>
            </Box>

            <Box display="flex" wrap>
              <Box flex="grow" paddingX={3} paddingY={3}>
                <FormItem com={TextField} name="name" label="名字" ref={register()} />
              </Box>
              <Box flex="grow" paddingX={3} paddingY={3}>
                <FormItem com={TextField} name="proxy_name" label="代理名字" ref={register()} />
              </Box>
            </Box>

            <Box display="flex" wrap>
              <Box flex="grow" paddingX={3} paddingY={3}>
                <FormItem com={TextField} name="price" label="价格" type="number" ref={register()} />
              </Box>
              <Box flex="grow" paddingX={3} paddingY={3}>
                <FormItem com={TextField} name="proxy_price" label="代理价格" type="number" ref={register()} />
              </Box>
            </Box>

            <Box flex="grow" paddingX={3} paddingY={3}>
              <FileUpload name="photo" label="上传封面" formCtx={formCtx} />
            </Box>

            <Box flex="grow" paddingX={3} paddingY={3}>
              <Heading accessibilityLevel={2} size="sm">
                附加属性
              </Heading>
            </Box>

            <FormAttr name="attr" formCtx={formCtx} />

            <Box display="flex" justifyContent="end" paddingX={3} paddingY={3} marginTop={2}>
              <Box margin={1}>
                <Button text="返回" inline onClick={(e) => props.history.goBack()} />
              </Box>
              {data.status == 1 && (
                <Box margin={1}>
                  <Button text="从回收站恢复" inline onClick={(e) => reShopFetch()} />
                </Box>
              )}
              <Box margin={1}>
                <Button text="保存商品" color="red" inline type="submit" />
              </Box>
            </Box>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
export default Add;
