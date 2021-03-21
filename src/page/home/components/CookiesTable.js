import { Text, Table } from "gestalt";

function TableCom() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Text weight="bold">cookie</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">账号</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">使用次数</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">操作</Text>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Text>测试数据</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>Ravenclaw</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>June 25, 1993</Text>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default TableCom;
