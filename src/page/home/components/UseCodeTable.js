import { useEffect, useState } from "react";
import { Text, Table, Box, Heading, IconButton, SearchField } from "gestalt";
import { useAutoQuery } from "../../../uitls/query";
import { userStatus } from "../../../uitls/tools";
import { newUseCode } from "../api";
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
  } = useAutoQuery(newUseCode, { keyword: search, page_size: 8 });
  let typeName = ["用户", "代理"];
  console.log(list);
  function showTime(time, fromNow) {
    if (!time) return "--";
    return dayjs.utc(time).local().fromNow(fromNow);
  }
  return (
    <Box position="relative">
      <Box display="flex" justifyContent="between">
        <Heading size="sm">最新使用兑换信息</Heading>
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
                  <Text weight="bold">兑换码生成时间</Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text weight="bold">兑换码使用时间</Text>
                </Table.HeaderCell>

                <Table.HeaderCell>
                  <Text weight="bold">兑换码状态</Text>
                </Table.HeaderCell>

                <Table.HeaderCell>
                  <Text weight="bold">用户状态</Text>
                </Table.HeaderCell>

                <Table.HeaderCell>
                  <Text weight="bold">用户到期时间</Text>
                </Table.HeaderCell>

                <Table.HeaderCell>
                  <Text weight="bold">操作</Text>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {list?.map((item, key) => {
                return (
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

                    <Table.Cell>
                      <Text>{showTime(item.c_add_time)}</Text>
                    </Table.Cell>

                    <Table.Cell>
                      <Text>{showTime(item.c_use_time)}</Text>
                    </Table.Cell>
                    <Table.Cell>{userStatus(item.c_status)}</Table.Cell>
                    <Table.Cell>{userStatus(item.u_status)}</Table.Cell>

                    <Table.Cell>
                      <Text>{showTime(item.u_duedate, true)}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <UserInfo id={item.id} show={true} />
                    </Table.Cell>
                  </Table.Row>
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
