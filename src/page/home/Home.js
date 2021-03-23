import React, { useState } from "react";
import { Box, Heading, Column, Text, Spinner } from "gestalt";
import { useAutoQuery } from "../../uitls/query";
import { webInfo } from "./api";
import IndexCard from "./components/IndexCard";

import CookiesTable from "./components/CookiesTable";
import NewUserTable from "./components/NewUserTable";
import HeightUserTable from "./components/HeightUserTable";
import DelCode from "./components/DelCode";
import CreateCode from "./components/CreateCode";
import TableLoading from "../../components/TableLoading";

import DatePicker from "gestalt-datepicker";
import "gestalt-datepicker/dist/gestalt-datepicker.css";
import { zhCN } from "date-fns/locale";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/zh-cn";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

function useDate() {}

function Home() {
  let [condition, setCondition] = useState({
    startTime: "",
    endTime: "",
  });
  let { data, update, loading } = useAutoQuery(webInfo, condition);

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

        <Column span={2}>
          <Box color={"lightGray"} margin={1} padding={2} rounding={3} height={120} position="relative">
            <TableLoading loading={loading} update={update} />
            <Box>
              <Text align="left">数据筛选</Text>
            </Box>

            <DatePicker
              id="example-basic"
              label="日期"
              value={dayjs().startOf("date").toDate()}
              minDate={new Date(2021, 2, 18)}
              maxDate={dayjs().endOf("date").toDate()}
              onChange={(e) => {
                setCondition({
                  startTime: dayjs(e.value).startOf("date").format(),
                  endTime: dayjs(e.value).endOf("date").format(),
                });
              }}
              localeData={zhCN}
            />
          </Box>
        </Column>
      </Box>

      <Box borderStyle="lg" rounding={3} padding={2}>
        <Heading size="sm">最新增加会员</Heading>
        <Box>
          <NewUserTable />
        </Box>
      </Box>
      <Box display="flex" direction="row" margin={-2} marginTop={4}>
        <Column span={6}>
          <Box borderStyle="lg" rounding={3} padding={2} margin={2}>
            <Heading size="sm">高频用户</Heading>
            <Box height="735px" overflow="scrollY">
              <HeightUserTable condition={condition} />
            </Box>
          </Box>
        </Column>
        <Column span={6}>
          <Box display="flex">
            <Column span={6}>
              <Box borderStyle="lg" rounding={3} padding={2} margin={2}>
                <Heading size="sm">生成兑换码</Heading>
                <Box marginTop={2}>
                  <CreateCode />
                </Box>
              </Box>
            </Column>
            <Column span={6}>
              <Box borderStyle="lg" rounding={3} padding={2} margin={2}>
                <Heading size="sm">注销兑换码</Heading>
                <Box marginTop={2}>
                  <DelCode />
                </Box>
              </Box>
            </Column>
          </Box>
          <Box borderStyle="lg" rounding={3} padding={2} margin={2} marginTop={4}>
            <Heading size="sm">Cookies</Heading>
            <Box height="300px" overflow="scrollY">
              <CookiesTable condition={condition} />
            </Box>
          </Box>
        </Column>
      </Box>
      {/* <Heading align="center">主页正在开发中!</Heading> */}
    </Box>
  );
}

export default Home;
