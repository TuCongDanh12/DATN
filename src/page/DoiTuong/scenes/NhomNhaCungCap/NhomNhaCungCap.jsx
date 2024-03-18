import React from 'react'
import { Link, Navigate } from "react-router-dom";
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
        label: (<Link to="chinh-sua" className="!text-black">
            Chỉnh sửa
        </Link>)
    },
];

const columns = [
    {
        title: "Nhóm nhà cung cấp",
        dataIndex: "nhomnhacungcap",
    },
    {
        title: "Số nhà cung cấp trong nhóm",
        dataIndex: "sonhacungcaptrongnhom",
    },
    {
        title: "Ghi chú",
        dataIndex: "ghichu",
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
        nhomnhacungcap: "23/10/2023",
        sonhacungcaptrongnhom: "ĐĐH00001",
        ghichu: "SIÊU THỊ CÀ MAU",
        chucnang: "Xem",
    },
    {
        key: "2",
        nhomnhacungcap: "23/10/2023",
        sonhacungcaptrongnhom: "ĐĐH00001",
        ghichu: "SIÊU THỊ CÀ MAU",
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

const NhomNhaCungCap = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    return (
        <div className='m-4'>
            {/* <Divider /> */}
            <div className='px-[20px] w-full flex justify-between py-7 bg-white'>
                <div className='flex gap-[5px] items-center'>
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
        <Button
          className='!bg-[#7A77DF] font-bold text-white flex items-center gap-1'
          type='link'
        //   onClick={() => Navigate("")}
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

export default NhomNhaCungCap