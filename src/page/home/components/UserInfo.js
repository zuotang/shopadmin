import { useState } from "react";
import { Box, Button, Layer, Heading, Table, IconButton, Modal, ButtonGroup, Text } from "gestalt";
import AskButton from "../../../components/AskButton";
import { delUser, getUserInfo, delCode } from "../api";
import { useQuery, useAutoQuery } from "../../../uitls/query";
import ShowMessage from "../../../components/ShowMessage";
import { formatTime, userStatus } from "../../../uitls/tools";

function UserInfo({ id, onCancel }) {
  let [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  let { data, loading, update } = useAutoQuery(getUserInfo, { id }, { stop: !showModal });

  let { fetch } = useQuery(delUser, null, {
    onSuccess: (msg, data) => {
      setMessage(data.message);
      update();
    },
  });

  let { fetch: delCodeFetch, loading: delCodeLoading } = useQuery(delCode, null, {
    onSuccess: (msg, data) => {
      setMessage(data.message);
      update();
    },
  });

  function handleConcel() {
    if (onCancel) onCancel();
    setShowModal(false);
  }

  return (
    <Box marginStart={-1} marginEnd={-1}>
      <Box padding={1}>
        <IconButton
          accessibilityLabel="edit"
          icon="edit"
          size="sm"
          onClick={() => {
            setShowModal(true);
          }}
        />
        {showModal && (
          <Layer>
            <Modal
              accessibilityModalLabel="用户详细信息"
              heading="用户信息"
              onDismiss={() => {
                handleConcel();
              }}
              size="lg"
            >
              <Box padding={8}>
                <ShowMessage message={{ message }} time={10000} color="red" />
                <Box display="flex">
                  <Text>账号: </Text>
                  <Text>{data.name}</Text>
                </Box>

                <CodeTable list={data.codes} />

                <Box display="flex">
                  <Text>类型: {data.codes && data.codes[0]?.day}</Text>
                </Box>

                <Box display="flex">
                  <Text>状态:</Text>
                  <Text>{userStatus(data.status)}</Text>
                </Box>
                <Box display="flex">
                  <Text>注册时间:</Text>
                  <Text>{formatTime(data.add_time)}</Text>
                </Box>
                <Box display="flex">
                  <Text>到期时间:</Text>
                  <Text>{formatTime(data.duedate)}</Text>
                </Box>
                <Box display="flex">
                  <Text>今日登录:</Text>
                  <Text>{data.day_signins?.num}</Text>
                </Box>
                <Box display="flex">
                  <Text>今日解析:</Text>
                  <Text>{data.day_parses?.num}</Text>
                </Box>
                <Box display="flex">
                  <Text>总登录:</Text>
                  <Text>{data.signins?.num}</Text>
                </Box>

                <Box display="flex">
                  <Text>总解析:</Text>
                  <Text>{data.parses?.num}</Text>
                </Box>
                <Box marginTop={2}>
                  {data.status == 0 && (
                    <AskButton
                      text="封 号"
                      size={"md"}
                      title="是否禁封用户？"
                      content="该用户将无法使用！"
                      onConfirm={(e) => {
                        fetch({ id: data.id });
                      }}
                    />
                  )}
                  {data.status == 1 && <Text>已注销</Text>}
                  {data.status == 2 && <Text color="red">已禁封</Text>}
                </Box>
                <Box marginTop={2}>
                  {data.status == 0 && (
                    <AskButton
                      text="注 销"
                      size={"md"}
                      title="是否注销用户？"
                      content="该用户将无法使用！"
                      onConfirm={(e) => {
                        let code = data.codes && data.codes[0].code;
                        if (code) {
                          delCodeFetch({ list: [code] });
                        }
                      }}
                    />
                  )}
                </Box>
                <Box marginTop={2}>
                  <Button
                    text="取 消"
                    color="red"
                    onClick={() => {
                      handleConcel();
                    }}
                  />
                </Box>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
    </Box>
  );
}

function CodeTable({ list }) {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Text weight="bold">兑换码</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">类型</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">兑换时间</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">生成时间</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">备注</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">状态</Text>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {list?.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>
              <Text>{item.code}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{item.day}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{formatTime(item.use_time)}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{formatTime(item.add_time)}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{item.remarks}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{item.status == 1 ? "注销" : "正常"}</Text>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default UserInfo;
