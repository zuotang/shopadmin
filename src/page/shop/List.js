import React, { useState } from "react";
import { useAutoQuery, useQuery } from "../../uitls/query";
import { shops, delShop } from "./api";
import { Table, Text, Image, Mask, Box, IconButton, SearchField, Spinner } from "gestalt";
import { Link } from "react-router-dom";
import { getImgSrc } from "../../uitls/tools";
import Page from "../../components/Page";

let pDatas = {};
function List(props) {
  let key = props.location.pathname;

  let params = new URLSearchParams(props.location.search);

  let [keyword, setKeyword] = useState("");
  let { data, update, loading, fetchMore } = useAutoQuery(shops, { status: params.get("status") || 0, keyword }, { defaultData: props.history.action == "POP" && pDatas[key] });
  let { fetch: delFetch } = useQuery(delShop, {}, { onSuccess: () => update() });

  pDatas[key] = data;
  let { list, page, total_page, page_size } = data;

  return (
    <Box>
      <Box padding={2}>
        <Box width={250} marginStart="auto">
          <SearchField accessibilityLabel="搜索" id="searchField" onChange={({ value }) => setKeyword(value)} placeholder="搜索" value={keyword} />
        </Box>
      </Box>

      <Table>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">图片</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">商品名</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">价格</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">代理商品名</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">代理价格</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">编辑</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {list?.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <Box display="flex" alignItems="center">
                  <Box width={80}>
                    {item.photo && (
                      <Mask rounding={2} wash>
                        <Image alt="Luna" src={getImgSrc(item.photo[0]?.url)} naturalHeight={50} naturalWidth={50} />
                      </Mask>
                    )}
                  </Box>
                  <Box paddingX={1}>
                    <Text>+{item.photo.length}</Text>
                  </Box>
                </Box>
              </Table.Cell>
              <Table.Cell>
                <Text>{item.name}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{item.price}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{item.proxy_name}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{item.proxy_price}</Text>
              </Table.Cell>
              <Table.Cell>
                <Box display="flex">
                  <Link to={`/shop/edit/${item.id}`}>
                    <IconButton icon="edit" />
                  </Link>

                  {item.status === 0 && (
                    <IconButton
                      icon="cancel"
                      onClick={(e) => {
                        delFetch({ id: item.id });
                      }}
                    />
                  )}
                </Box>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Spinner show={loading} accessibilityLabel="加载中" size="sm" />
      <Page page={page} page_size={page_size} total_page={total_page} onChange={fetchMore} />
    </Box>
  );
}
export default List;
