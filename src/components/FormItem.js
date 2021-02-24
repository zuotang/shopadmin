import React, { forwardRef, useState } from "react";

const FormItem = forwardRef(function ({ defaultValue, onChange, com, ...other }, ref) {
  let [value, setValue] = useState(defaultValue);
  const Com = com;
  return (
    <Com
      {...other}
      id={other.name}
      onChange={(e) => {
        setValue(e.value);
        onChange && onChange(e);
      }}
      value={value}
      ref={ref}
    />
  );
});

export default FormItem;
