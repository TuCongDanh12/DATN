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
import { Dropdown, Space, Flex, Progress, Table } from "antd";

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

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    className:'bg-[#FFF6D8]',
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Quanlity",
    dataIndex: "quanlity",
    key: "quanlity",
    className:'bg-[#FFF6D8]',
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    className:'bg-[#FFF6D8]',
  },
];
const TongQuan = () => {
  return (
    <div className="ml-5">
      <h1 className="font-bold text-3xl ">Tổng quan</h1>
      <Flex gap={50}>
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

          <ResponsiveContainer className="!w-[800px] !h-[300px] border border-gray-300 shadow-xl rounded-lg p-5">
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
        <div className='border border-gray-300 shadow-md rounded-lg p-5'>
          <p className="text-xl">Nợ phải thu theo hạn nợ</p>
          <p>
            <strong className="fon-bold text-2xl">0</strong> đồng
          </p>
          <p className="text-gray-500 mb-8">TỔNG</p>
          <Flex justify="space-between">
            <Flex vertical>
              <p className="text-orange-500">
                <strong className="fon-bold text-2xl">0</strong> đồng
              </p>
              <p className="text-gray-500 ">QUÁ HẠN</p>
            </Flex>
            <Flex vertical align="flex-end">
              <p>
                <strong className="fon-bold text-2xl">0</strong> đồng
              </p>
              <p className="text-gray-500 ">TRONG HẠN</p>
            </Flex>
          </Flex>
          <Progress
            percent={50}
            showInfo={false}
            strokeColor="#f00732"
            trailColor="blue"
          />
        </div>
      </Flex>
      <div className='mt-5'>
      <p className="text-xl">Lợi nhuận</p>
      <ResponsiveContainer className="!w-[800px] !h-[300px] border border-gray-300 shadow-xl rounded-lg p-5">
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
      <>
        <p className="text-xl">Hàng hóa tồn kho</p>
        <p>
          <strong className="fon-bold text-2xl">0</strong> đồng
        </p>
        <p className="text-gray-500 mb-8">TỔNG GIÁ TRỊ</p>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ y: 500 }}
          pagination={{
            // total: listDonBanHangData.length,
            defaultPageSize: 4,
            
            // // pageSize: 20,
            // defaultCurrent: 1,
            position: ["bottomRight"],
           
          }}
          className="!max-w-[500px] !bg-[#FFF6D8] border border-gray-300 shadow-2xl rounded-lg"
        />
      </>
    </div>
  );
};

export default TongQuan;
