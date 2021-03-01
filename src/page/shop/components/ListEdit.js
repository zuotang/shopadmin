import React,{useEffect} from 'react';
import {Flyout,Box,Text,Button,Layer} from 'gestalt';
function ListEdit(){
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef();

    return (
      <Box>
        <Box display="inlineBlock" ref={anchorRef}>
          <Button
            accessibilityExpanded={!!open}
            accessibilityHaspopup
            onClick={() => setOpen(!open)}
            text="库存"
          />
        </Box>
        {open &&
          <Layer>
            <Flyout
              anchor={anchorRef.current}
              idealDirection="up"
              onDismiss={() => setOpen(false)}
              positionRelativeToAnchor={false}
              size="md"
            >
              <Box padding={3} display="flex" alignItems="center" direction="column" column={12}>
                <Text align="center">
                  Need help with something? Check out our Help Center.
                </Text>
                <Box paddingX={2} marginTop={3}>
                  <Button color="red" text="Visit the help center" />
                </Box>
              </Box>
            </Flyout>
          </Layer>}
      </Box>)
}
export default ListEdit