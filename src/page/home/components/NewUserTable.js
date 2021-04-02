import { useEffect, useState } from "react";
import { Text, Table, Box, Heading, IconButton, SearchField } from "gestalt";
import { useAutoQuery } from "../../../uitls/query";
import { userStatus } from "../../../uitls/tools";
import { newUser } from "../api";
import dayjs from "dayjs";
import Page from "../../../components/Page";
import TableLoading from "../../../components/TableLoading";
import useDebounce from "../../../hooks/useDebounce";
import UserInfo from "./UserInfo";
require("dayjs/locale/zh-cn");
var utc = require("dayjs/plugin/utc");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

function useDebounceState(changeValue) {
  let [value, setValue] = useState(changeValue);
  //节流
  let debounce = useDebounce((v) => {
    setValue(v);
  }, 500);
  useEffect(() => {
    debounce(changeValue);
  }, [changeValue]);
  return value;
}

function TableCom() {
  let [keyword, setKeyword] = useState("");
  let search = useDebounceState(keyword);
  let {
    data: { list, page, total_page, page_size },
    update,
    fetchMore,
    loading,
  } = useAutoQuery(newUser, { keyword: search, page_size: 8 });
  let typeName = ["用户", "代理"];
  let stateName = ["正常", "已注销", "已封号"];

  return (
    <Box position="relative">
      <Box display="flex" justifyContent="between">
        <Heading size="sm">最新增加会员</Heading>
        <Box display="flex">
          <SearchField accessibilityLabel="通过用户名或兑换码搜索" id="searchField" onChange={({ value }) => setKeyword(value)} placeholder="搜索用户名/兑换码" value={keyword} />
          <TableLoading loading={loading} update={update} isFix={false} />
        </Box>
      </Box>
      <Box>
        <Box>
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
                  <Text weight="bold">状态</Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text weight="bold">日上限</Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text weight="bold">注册时间</Text>
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
              {list?.map((item, key) => {
                return (
                  item.name && (
                    <Table.Row key={key}>
                      <Table.Cell>
                        <Text>{item.name}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>{item.code}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text color={item.type == 0 ? "darkGray" : "red"}>{typeName[item.type]}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>{item.remarks}</Text>
                      </Table.Cell>
                      <Table.Cell>{userStatus(item.status)}</Table.Cell>
                      <Table.Cell>
                        <Text>{item.daynum}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>{dayjs.utc(item.add_time).local().fromNow()}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>{dayjs.utc(item.duedate).local().fromNow(true)}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <UserInfo id={item.id} show={true} />
                      </Table.Cell>
                    </Table.Row>
                  )
                );
              })}
            </Table.Body>
          </Table>
          <Page page={page} page_size={page_size} total_page={total_page} onChange={fetchMore} />
        </Box>
      </Box>
    </Box>
  );
}

export default TableCom;
