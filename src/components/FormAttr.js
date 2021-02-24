import React, { useEffect, useState } from "react";
import { Box, TextField, IconButton, Text } from "gestalt";
import FormItem from "./FormItem";
import { useFieldArray } from "react-hook-form";
import ToastExample from "./ShowMessage";

function FormAttr({ name, formCtx: { control, register } }) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: name,
  });

  useEffect(() => {
    if (fields.length == 0) {
      append({});
    }
  }, []);

  return (
    <>
      {fields.map(
        (field, index) =>
          field && (
            <Box display="flex" wrap key={field.id}>
              <Box column={3} paddingX={3} paddingY={3}>
                <FormItem com={TextField} name={`${name}[${index}].name`} defaultValue={field.name} label="大类" ref={register()} />
              </Box>
              <Box column={2} paddingX={3} paddingY={3}>
                <FormItem com={TextField} name={`${name}[${index}].value`} defaultValue={field.value} label="值" type="number" ref={register()} />
              </Box>
              <Box marginTop={9}>
                <IconButton
                  accessibilityLabel="clear"
                  icon="cancel"
                  onClick={(e) => {
                    remove(index);
                  }}
                />
              </Box>
              <Box marginTop={9}>
                <IconButton
                  accessibilityLabel="添加"
                  icon="add"
                  onClick={(e) => {
                    if (index == fields.length - 1) {
                      append({});
                    } else {
                      insert(index + 1, {});
                    }
                  }}
                />
              </Box>
            </Box>
          )
      )}
      {/* <Box marginStart={12}>
        <Text>合计:{total + ""}</Text>
      </Box> */}
    </>
  );
}

export default FormAttr;
