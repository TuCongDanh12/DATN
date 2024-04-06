import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const items = [
  {
    label: "Năm nay",
    key: "0",
  },
  {
    label: "2023",
    key: "1",
  },
  {
    label: "2022",
    key: "2",
  },
];

const data = [
  {
    name: "Tháng 1",
    loinhuan: 4000,
    chiphi: 2400,
  },
  {
    name: "Tháng 2",
    loinhuan: 3000,
    chiphi: 1398,
  },
  {
    name: "Tháng 3",
    loinhuan: 2000,
    chiphi: 9800,
  },
  {
    name: "Tháng 4",
    loinhuan: 2780,
    chiphi: 3908,
  },
  {
    name: "Tháng 5",
    loinhuan: 1890,
    chiphi: 4800,
  },
  {
    name: "Tháng 6",
    loinhuan: 2390,
    chiphi: 3800,
  },
  {
    name: "Tháng 7",
    loinhuan: 3490,
    chiphi: 4300,
  },
  {
    name: "Tháng 8",
    loinhuan: 3490,
    chiphi: 4300,
  },
  {
    name: "Tháng 9",
    loinhuan: 3490,
    chiphi: 4300,
  },
  {
    name: "Tháng 10",
    loinhuan: 3490,
    chiphi: 4300,
  },
  {
    name: "Tháng 11",
    loinhuan: 3490,
    chiphi: 4300,
  },
  {
    name: "Tháng 12",
    loinhuan: 3490,
    chiphi: 4300,
  },
];
const TongQuan = () => {
  return (
    <div className="ml-5">
      <h1 className="font-bold text-3xl ">Tổng quan</h1>
      <div>
        <p className="text-xl">Doanh thu</p>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Năm nay
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <ResponsiveContainer className="!w-[800px] !h-[300px]">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="chiphi"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            {/* <Bar
            dataKey="uv"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="text-xl">Lợi nhuận</p>
        <ResponsiveContainer className="!w-[800px] !h-[300px]">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="chiphi" stroke="#8884d8" />
            <Line type="monotone" dataKey="loinhuan" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TongQuan;
