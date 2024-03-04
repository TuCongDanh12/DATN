import React from 'react'
import { Link } from "react-router-dom";
import { Divider, Table, Dropdown, Space, DatePicker, Select } from "antd";
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
  { key: "2",
   label: (<Link to="lapchungtu" className="!text-black">
   Lập chứng từ 
 </Link>) },
];

const columns = [
  {
    title: "Ngày đặt hàng",
    dataIndex: "ngaydathang",
  },
  {
    title: "Số đơn hàng",
    dataIndex: "sodonhang",
  },
  {
    title: "Khách hàng",
    dataIndex: "khachhang",
  },
  {
    title: "Tổng",
    dataIndex: "tong",
  },
  {
    title: "Đã thu",
    dataIndex: "dathu",
  },
  {
    title: "Chưa thu",
    dataIndex: "chuathu",
  },
  {
    title: "Tình trạng",
    dataIndex: "tinhtrang",
  },
  {
    title: "Tình trạng giao hàng",
    dataIndex: "tinhtranggiaohang",
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
    ngaydathang: "23/10/2023",
    sodonhang: "ĐĐH00001",
    khachhang: "SIÊU THỊ CÀ MAU",
    tong: "847.000.000",
    dathu: "0",
    chuathu: "847.000.000",
    tinhtrang: "Chưa thực hiện",
    tinhtranggiaohang: "Chưa giao",
    chucnang: "Lập chứng từ",
  },
  {
    key: "2",
    ngaydathang: "23/10/2023",
    sodonhang: "ĐĐH000002",
    khachhang: "SIÊU THỊ CÀ MAU",
    tong: "847.000.000",
    dathu: "247.000.000",
    chuathu: "600.000.000",
    tinhtrang: "Đang thực hiện",
    tinhtranggiaohang: "Đang giao",
    chucnang: "Lập chứng từ",
  },
  {
    key: "3",
    ngaydathang: "23/10/2023",
    sodonhang: "ĐĐH000003",
    khachhang: "SIÊU THỊ CÀ MAU",
    tong: "847.000.000",
    dathu: "247.000.000",
    chuathu: "600.000.000",
    tinhtrang: "Đang thực hiện",
    tinhtranggiaohang: "Đã giao đủ",
    chucnang: "Xem",
  },
  {
    key: "4",
    ngaydathang: "23/10/2023",
    sodonhang: "ĐĐH000004",
    khachhang: "SIÊU THỊ CÀ MAU",
    tong: "847.000.000",
    dathu: "847.000.000",
    chuathu: "0",
    tinhtrang: "Hoàn thành",
    tinhtranggiaohang: "Đã giao đủ",
    chucnang: "Xem",
  },
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const DonDatHang = () => {
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
        {/* <Link
          className='!bg-[#7A77DF] px-4 py-auto font-bold text-white rounded-[2px] flex items-center'
          type='link'
          to='timkiem'
        >
          <Add />Thêm
        </Link> */}
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

export default DonDatHang