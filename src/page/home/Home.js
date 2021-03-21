import { Box, Heading, Column, Text } from "gestalt";

import { useAutoQuery } from "../../uitls/query";
import { webInfo } from "./api";
import IndexCard from "./components/IndexCard";

import CookiesTable from "./components/CookiesTable";
import NewUserTable from "./components/NewUserTable";
import HeightUserTable from "./components/HeightUserTable";
function Home() {
  let { data, update, loading } = useAutoQuery(webInfo);

  return (
    <Box padding={12}>
      <Box display="flex" direction="row" paddingY={2}>
        <Column span={2}>
          <IndexCard title="今日新增会员" value={data.day_user_num} subTitle="总会员" subValue={data.user_num} valueColor="red" />
        </Column>
        <Column span={2}>
          <IndexCard title="今日解析次数" value={data.day_parse_num} subTitle="总解析次数" subValue={data.parse_num} />
        </Column>
        <Column span={2}>
          <IndexCard title="今日退款人数" value={data.day_refund_num} subTitle="总退款数" subValue={data.refund_num} />
        </Column>
        <Column span={2}>
          <Box color={"lightGray"} margin={1} padding={2} rounding={3} height={120}>
            <Box>
              <Text align="left">今日兑换卡信息</Text>
            </Box>
            <Box display="flex">
              <Column span={3}>
                <Box margin={1}>
                  <Text size="md">终身</Text>
                  <Heading size="sm">{data.code_forever}</Heading>
                </Box>
              </Column>
              <Column span={3}>
                <Box margin={1}>
                  <Text size="md">年</Text>
                  <Heading size="sm">{data.code_365}</Heading>
                </Box>
              </Column>
              <Column span={3}>
                <Box margin={1}>
                  <Text size="md">月</Text>
                  <Heading size="sm">{data.code_30}</Heading>
                </Box>
              </Column>
              <Column span={3}>
                <Box margin={1}>
                  <Text size="md">周</Text>
                  <Heading size="sm">{data.code_7}</Heading>
                </Box>
              </Column>
            </Box>
          </Box>
        </Column>
      </Box>
      <Box borderStyle="lg" rounding={3} padding={2}>
        <Heading size="sm">最新增加会员</Heading>
        --
        {/* <NewUserTable /> */}
      </Box>
      <Box display="flex" direction="row" margin={-2} marginTop={4}>
        <Column span={6}>
          <Box borderStyle="lg" rounding={3} padding={2} margin={2}>
            <Heading size="sm">高频用户</Heading>
            <Box height="300px" overflow="scrollY">
              <HeightUserTable />
            </Box>
          </Box>
          <Box borderStyle="lg" rounding={3} padding={2} margin={2} marginTop={4}>
            <Heading size="sm">Cookies</Heading>
            <CookiesTable />
          </Box>
        </Column>
        <Column span={6}>
          <Box borderStyle="lg" rounding={3} padding={2} margin={2}>
            <Heading size="sm">日志</Heading>
            <Box color="lightGray" rounding={3} height={600} padding={2}>
              ---
            </Box>
          </Box>
        </Column>
      </Box>
      {/* <Heading align="center">主页正在开发中!</Heading> */}
    </Box>
  );
}

export default Home;
