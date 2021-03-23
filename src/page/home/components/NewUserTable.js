import { Text, Table, Box, Spinner, IconButton } from "gestalt";
import { useAutoQuery } from "../../../uitls/query";
import { newUser } from "../api";
import dayjs from "dayjs";
import Page from "../../../components/Page";
import TableLoading from "../../../components/TableLoading";

require("dayjs/locale/zh-cn");
var utc = require("dayjs/plugin/utc");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

function TableCom() {
  let {
    data: { list, page, total_page, page_size },
    update,
    fetchMore,
    loading,
  } = useAutoQuery(newUser);
  let typeName = ["用户", "代理"];
  return (
    <Box position="relative">
      <TableLoading loading={loading} update={update} />
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">用户</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">兑换码</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">类型</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">备注</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">注册时间</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">到期时间</Text>
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
                  <Text>{item.code}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text color={item.type == 0 ? "" : "red"}>{typeName[item.type]}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{item.remarks}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{dayjs.utc(item.add_time).local().fromNow()}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{dayjs.utc(item.duedate).local().fromNow(true)}</Text>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Page page={page} page_size={page_size} total_page={total_page} onChange={fetchMore} />
    </Box>
  );
}

export default TableCom;
