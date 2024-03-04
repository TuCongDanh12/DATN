import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Divider, Table, Dropdown, Space, DatePicker, Select, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Search from 'antd/es/input/Search';
import { SiMicrosoftexcel } from 'react-icons/si';
import { TfiReload } from 'react-icons/tfi';
import { Add } from '@mui/icons-material';

const items = [
  {
    key: "1",
    label: (<Link to="xem" className="!text-black">
      Xem
    </Link>)
  },
  {
    key: "2",
    label: (<Link to="thutien" className="!text-black">
      Thu tiền
    </Link>)
  },
];

const columns = [
  {
    title: "Ngày hóa đơn",
    dataIndex: "ngayhoadon",
  },
  {
    title: "Số hóa đơn",
    dataIndex: "sohoadon",
  },
  {
    title: "Khách hàng",
    dataIndex: "khachhang",
  },
  {
    title: "giá trị hóa đơn",
    dataIndex: "giatrihoadon",
  },
  {
    title: "Chưa thu",
    dataIndex: "chuathu",
  },
  {
    title: "TT thanh toán",
    dataIndex: "ttthanhtoan",
  },
  {
    title: "Chức năng",
    dataIndex: "chucnang",
    render: () => (
      <Space size="middle">
        <Dropdown menu={{ items }}>
          <Link to="xem" className="!text-black">
            Xem <DownOutlined />
          </Link>
        </Dropdown>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    ngayhoadon: "23/10/2023",
    sohoadon: "HĐ00001",
    khachhang: "SIÊU THỊ CÀ MAU",
    giatrihoadon: "847.000.000",
    chuathu: "0",
    ttthanhtoan: "Đã thanh toán",
    chucnang: "Xem",
  },
  {
    key: "2",
    ngayhoadon: "23/10/2023",
    sohoadon: "HĐ00002",
    khachhang: "SIÊU THỊ CÀ MAU",
    giatrihoadon: "847.000.000",
    chuathu: "325.825.000",
    ttthanhtoan: "Thanh toán 1 phần",
    chucnang: "Xem",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const HoaDonBanHang = () => {
  const navigate = useNavigate();

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className='m-4'>
      {/* <Divider /> */}
      <div className='px-[20px] w-full flex justify-between py-7 bg-white'>
        <div className='flex gap-[5px] items-center'>
          <DatePicker onChange={onChange} />
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Lọc"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: '1',
                label: 'Not Identified',
              },
              {
                value: '2',
                label: 'Closed',
              },
              {
                value: '3',
                label: 'Communicated',
              },
              {
                value: '4',
                label: 'Identified',
              },
              {
                value: '5',
                label: 'Resolved',
              },
              {
                value: '6',
                label: 'Cancelled',
              },
            ]}
          />

          <Search
            placeholder="Tìm kiếm"
            onSearch={onSearch}
            style={{
              width: 300,
            }}
          />

          <SiMicrosoftexcel size={30} className='p-2 bg-white border border-black' />
          <TfiReload size={30} className='p-2 bg-white border border-black' />

        </div>
        <Button
          className='!bg-[#7A77DF] font-bold text-white flex items-center gap-1'
          type='link'
          onClick={() => navigate("xem")}
        >
          <Add />Thêm
        </Button>
      </div>

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default HoaDonBanHang