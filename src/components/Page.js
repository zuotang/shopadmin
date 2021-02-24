import React from "react";
import { Box, ButtonGroup, Button, IconButton, Text } from "gestalt";

function Header({ history, page, onChange, total_page = 0 }) {
  let list = Array.from(Array(total_page + 1), (v, k) => k);
  if (total_page == 0) {
    return <></>;
  }
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <ButtonGroup>
          <IconButton
            icon="arrow-back"
            size="sm"
            color="transparent"
            disabled={page == 0}
            onClick={(e) => {
              onChange({ page: page - 1 });
            }}
          />
          {list.map((index) => (
            <Button
              key={index}
              text={index + 1}
              size="sm"
              color={page == index ? "red" : "transparent"}
              onClick={(e) => {
                onChange({ page: index });
              }}
            />
          ))}

          <IconButton
            icon="arrow-forward"
            size="sm"
            color="transparent"
            disabled={page == total_page}
            onClick={(e) => {
              onChange({ page: page + 1 });
            }}
          />
        </ButtonGroup>
        {/* <Text>Total:{total_page}</Text> */}
      </Box>
    </Box>
  );
}

export default Header;
