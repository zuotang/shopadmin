import React, { useEffect, useState, useRef } from "react";
import { Flyout, Box, Text, Button, Layer, IconButton } from "gestalt";
import styled from "styled-components";
import { useQuery } from "../../../uitls/query";
import { attrEdit } from "../api";
const NumInput = styled.input`
  border: none;
  background: none;
  width: 80px;
  color: var(--g-colorRed100);
  margin: 0 10px;
`;

const ItemBox = styled.div`
  display: flex;
  border-bottom: 1px solid var(--g-colorGray150);
`;

function useWatch(callback, params) {
  let isReady = useRef();
  useEffect(() => {
    if (isReady.current) {
      return callback(arguments);
    }
    isReady.current = true;
  }, params);
}
function Item({ data, onChange }) {
  let [value, setValue] = useState(+data.value);
  let { fetch, loading } = useQuery(attrEdit);

  function setNum(value) {
    let item = { ...data, value };
    fetch(item, {
      onSuccess: () => {
        setValue(value);
        onChange && onChange(item);
      },
    });
  }
  return (
    <ItemBox>
      <Text align="left">{data.name}</Text>
      <NumInput
        value={value}
        onChange={(e) => {
          setNum(+e.target.value);
        }}
        type="number"
      />
      <IconButton
        accessibilityLabel="add"
        disabled={loading}
        color="red"
        icon="add"
        size="xs"
        onClick={(e) => {
          setNum(value + 1);
        }}
      />
      <IconButton
        accessibilityLabel="dash"
        disabled={loading}
        color="red"
        icon="dash"
        size="xs"
        onClick={(e) => {
          setNum(value - 1);
        }}
      />
    </ItemBox>
  );
}

function ListEdit({ num, data, onChange }) {
  const [open, setOpen] = React.useState(false);

  const anchorRef = React.useRef();
  return (
    <Box>
      <Box display="inlineBlock" ref={anchorRef}>
        <Button accessibilityExpanded={!!open} accessibilityHaspopup onClick={() => setOpen(!open)} text={num} />
      </Box>
      {open && (
        <Layer>
          <Flyout anchor={anchorRef.current} idealDirection="down" onDismiss={() => setOpen(false)} positionRelativeToAnchor={false} size="xl">
            <Box padding={3}>
              {data?.map((item, key) => (
                <Item
                  data={item}
                  key={item.id}
                  onChange={(res) => {
                    onChange && onChange(res, key);
                  }}
                />
              ))}
            </Box>
          </Flyout>
        </Layer>
      )}
    </Box>
  );
}
export default ListEdit;
