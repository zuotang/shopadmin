import { useState } from "react";
import { Box, Layer, ButtonGroup, Modal, Text, Button } from "gestalt";

function AskButton({ title = "确定删除？", content = "删除后将无法恢复！", onCancel, onConfirm, ...buttonProps }) {
  const [showModal, setShowModal] = useState(false);

  function handleConcel() {
    if (onCancel) onCancel();
    setShowModal(false);
  }
  return (
    <Box>
      <Button
        {...buttonProps}
        onClick={(e) => {
          setShowModal(true);
          if (buttonProps.onClick) buttonProps.onClick(e);
        }}
      />
      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel={content}
            heading={title}
            size="sm"
            onDismiss={() => {
              handleConcel();
            }}
            footer={
              <Box display="flex" justifyContent="center">
                <ButtonGroup>
                  <Button
                    size="lg"
                    text="取 消"
                    onClick={() => {
                      handleConcel();
                    }}
                  />
                  <Button
                    size="lg"
                    color="red"
                    text="确 定"
                    onClick={() => {
                      if (onConfirm) onConfirm();
                      setShowModal(!showModal);
                    }}
                  />
                </ButtonGroup>
              </Box>
            }
            role="alertdialog"
            size="sm"
          >
            <Box paddingX={8}>
              <Text align="center">{content}</Text>
            </Box>
          </Modal>
        </Layer>
      )}
    </Box>
  );
}

export default AskButton;
