import { Text, Table, Button } from "gestalt";
import { useAutoQuery } from "../../../uitls/query";
import { heightUser } from "../api";
import dayjs from "dayjs";
require("dayjs/locale/zh-cn");
var utc = require("dayjs/plugin/utc");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

function TableCom() {
  let {
    data: { list },
    update,
    loading,
  } = useAutoQuery(heightUser);
  console.log(list);
  return (
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
            <Text weight="bold">次数</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">操作</Text>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {list?.map((item) => {
          return (
            <Table.Row>
              <Table.Cell>
                <Text>{item.name}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{dayjs.utc(item.duedate).local().fromNow(true)}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{item.user_num}</Text>
              </Table.Cell>
              <Table.Cell>
                <Button text="封号" size={"sm"} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default TableCom;
