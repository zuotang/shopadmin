import { Text, Table, Button, Box, Spinner } from "gestalt";
import { useAutoQuery } from "../../../uitls/query";
import { cookies } from "../api";
import dayjs from "dayjs";
import TableLoading from "../../../components/TableLoading";
require("dayjs/locale/zh-cn");
var utc = require("dayjs/plugin/utc");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

function TableCom({ condition }) {
  let {
    data: { list },
    update,
    loading,
  } = useAutoQuery(cookies, condition);
  return (
    <Box position="relative">
      <TableLoading loading={loading} update={update} />
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">ID</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">账号</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">使用次数</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">错误次数</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">更新时间</Text>
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
                  <Box width="200px">
                    <Text truncate>{item.cid}</Text>
                  </Box>
                </Table.Cell>
                <Table.Cell>
                  <Text>{item.name}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{item.use_number}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{item.error_number}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{dayjs(item.update_time).fromNow()}</Text>
                </Table.Cell>
                <Table.Cell>{item.error_number >= 10 && <Button text="启用" size="sm" />}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Box>
  );
}

export default TableCom;
