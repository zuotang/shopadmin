import { Text, Table, Spinner, Box } from "gestalt";
import { useAutoQuery, useQuery } from "../../../uitls/query";
import { heightUser, delUser } from "../api";
import AskButton from "../../../components/AskButton";
import React, { useState } from "react";
import ShowMessage from "../../../components/ShowMessage";
import TableLoading from "../../../components/TableLoading";

import dayjs from "dayjs";
require("dayjs/locale/zh-cn");
var utc = require("dayjs/plugin/utc");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

function TableCom({ condition }) {
  let [message, setMessage] = useState("");
  let {
    data: { list },
    update,
    loading,
  } = useAutoQuery(heightUser, condition);
  let { fetch } = useQuery(delUser, null, {
    onSuccess: (msg, data) => {
      setMessage(data.message);
      update();
    },
  });

  return (
    <Box position="relative">
      <TableLoading loading={loading} update={update} />
      <ShowMessage message={{ message }} time={10000} color="red" />
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">用户</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">到期时间</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">解析次数</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">登录次数</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">操作</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {list?.map((item) => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <Text>{item.name}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{dayjs.utc(item.duedate).local().fromNow(true)}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{item.parse_num}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{item.signin_num}</Text>
                </Table.Cell>
                <Table.Cell>
                  {item.status == 0 && (
                    <Box marginTop={-2} marginBottom={-2}>
                      <AskButton
                        text="封号"
                        size={"sm"}
                        title="是否禁封用户？"
                        content="该用户将无法使用！"
                        onConfirm={(e) => {
                          fetch({ id: item.id });
                        }}
                      />
                    </Box>
                  )}
                  {item.status == 1 && <Text>已注销</Text>}
                  {item.status == 2 && <Text color="red">已禁封</Text>}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Box>
  );
}

export default TableCom;
