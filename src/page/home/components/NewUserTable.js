import { Text, Table } from "gestalt";

function TableCom() {
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
            <Text weight="bold">操作</Text>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Text>Luna Lovegood</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>Ravenclaw</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>June 25, 1993</Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text>Draco Malfoy</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>Slytherin</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>December 3, 1992</Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text>Hermione Granger</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>Gryffindor</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>September 19, 1979</Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text>Neville Longbottom</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>Gryffindor</Text>
          </Table.Cell>
          <Table.Cell>
            <Text>July 30, 1980</Text>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default TableCom;
