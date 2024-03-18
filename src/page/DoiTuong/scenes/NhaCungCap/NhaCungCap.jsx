import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Divider, Table, Dropdown, Space, DatePicker, Select, Button, Modal, Form, Flex, Input, TreeSelect, Pagination } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Search from 'antd/es/input/Search';
import { SiMicrosoftexcel } from 'react-icons/si';
import { TfiReload } from 'react-icons/tfi';
import { Add } from '@mui/icons-material';
import { MdOutlineSearch } from 'react-icons/md';
import { MenuItem } from 'react-pro-sidebar';
import Item from 'antd/es/list/Item';

const NhaCungCap = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const [open, setOpen] = useState(false);
    const [dataSelected, setDataSelected] = useState({});
    console.log("dataSelected",dataSelected);
    const items = [
        {
            key: "xem",
            label: (<Link className="!text-black">
                Xem
            </Link>),
        },
        {
            key: "chinh-sua",
            label: (<Link className="!text-black">
                Chỉnh sửa
            </Link>)
        },
        {
            key: "xoa",
            label: (<Link className="!text-black">
                Xóa
            </Link>)
        },
    ];

    const handleDropdownItemClick = (e, record) => {
        console.log("e.key", e.key);
        console.log("record", record);
        if (e.key === "xoa") {
            setDataSelected(record);
            setOpen(true);
        }
        else {
            navigate(`${e.key}/${record.key}`, { state: { id: record.key } });
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const columns = [
        {
            title: "Nhà cung cấp",
            dataIndex: "nhacungcap",
            sorter: (a, b) => a.nhacungcap.localeCompare(b.nhacungcap),
        },
        {
            title: "Địa chỉ",
            dataIndex: "diachi",
        },
        {
            title: "Liên hệ",
            dataIndex: "lienhe",
        },
        {
            title: "Ghi chú",
            dataIndex: "ghichu",
        },
        {
            title: "Chức năng",
            dataIndex: "chucnang",
            width: "10%",
            render: (_, record) => (
                <Space size="middle">
                    <Dropdown
                        menu={{
                            onClick: (e) => handleDropdownItemClick(e, record),
                            items: items,
                        }}>
                        <Link to={`xem/${record.key}`} state={{ id: record.key }} className="!text-black">
                            Xem
                            <DownOutlined />
                        </Link>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: 1,
            nhacungcap: 'ABC Company',
            diachi: '123 Main St, CityA',
            lienhe: '123-456-7890',
            ghichu: 'Preferred supplier for widgets',
            chucnang: 'Admin'
        },
        {
            key: 2,
            nhacungcap: 'XYZ Corporation',
            diachi: '456 Elm St, CityB',
            lienhe: '987-654-3210',
            ghichu: 'Specializes in tech products',
            chucnang: 'User'
        },
        {
            key: 3,
            nhacungcap: 'Smith & Co.',
            diachi: '789 Oak St, CityC',
            lienhe: '555-123-4567',
            ghichu: 'Family-owned business',
            chucnang: 'User'
        },
        {
            key: 4,
            nhacungcap: 'Tech Solutions Ltd.',
            diachi: '321 Pine St, CityD',
            lienhe: '444-789-1234',
            ghichu: 'Provides IT services',
            chucnang: 'Admin'
        },
        {
            key: 5,
            nhacungcap: 'Global Foods Inc.',
            diachi: '567 Maple St, CityE',
            lienhe: '222-555-8888',
            ghichu: 'Imports exotic food products',
            chucnang: 'User'
        },
        {
            key: 6,
            nhacungcap: 'Johnson Manufacturing',
            diachi: '876 Cedar St, CityF',
            lienhe: '666-999-3333',
            ghichu: 'Manufactures industrial equipment',
            chucnang: 'Admin'
        },
        {
            key: 7,
            nhacungcap: 'Sunshine Retailers',
            diachi: '234 Birch St, CityG',
            lienhe: '111-222-3333',
            ghichu: 'Specializes in outdoor gear',
            chucnang: 'User'
        },
        {
            key: 8,
            nhacungcap: 'Smithsonian Enterprises',
            diachi: '432 Walnut St, CityH',
            lienhe: '777-888-9999',
            ghichu: 'Operates museum gift shops',
            chucnang: 'User'
        },
        {
            key: 9,
            nhacungcap: 'GreenTech Solutions',
            diachi: '987 Cherry St, CityI',
            lienhe: '333-666-9999',
            ghichu: 'Focuses on eco-friendly tech',
            chucnang: 'Admin'
        },
        {
            key: 10,
            nhacungcap: 'Elite Pharmaceuticals',
            diachi: '654 Apple St, CityJ',
            lienhe: '888-444-2222',
            ghichu: 'Produces high-quality medicines',
            chucnang: 'User'
        },
        {
            key: 11,
            nhacungcap: 'Ace Auto Parts',
            diachi: '789 Orange St, CityK',
            lienhe: '999-111-7777',
            ghichu: 'Supplies automotive components',
            chucnang: 'User'
        },
        {
            key: 12,
            nhacungcap: 'Golden Harvest Farms',
            diachi: '345 Grape St, CityL',
            lienhe: '555-888-4444',
            ghichu: 'Produces organic fruits and vegetables',
            chucnang: 'Admin'
        },
        {
            key: 13,
            nhacungcap: 'Starlight Technologies',
            diachi: '876 Lemon St, CityM',
            lienhe: '222-666-7777',
            ghichu: 'Innovative tech solutions provider',
            chucnang: 'User'
        },
        {
            key: 14,
            nhacungcap: 'Blue Ocean Consulting',
            diachi: '123 Peach St, CityN',
            lienhe: '111-444-5555',
            ghichu: 'Offers management consulting services',
            chucnang: 'Admin'
        },
        {
            key: 15,
            nhacungcap: 'Silver Screen Studios',
            diachi: '234 Plum St, CityO',
            lienhe: '777-333-1111',
            ghichu: 'Produces independent films',
            chucnang: 'User'
        },
        {
            key: 16,
            nhacungcap: 'Peak Performance Gym',
            diachi: '876 Berry St, CityP',
            lienhe: '333-777-5555',
            ghichu: 'Provides fitness training services',
            chucnang: 'Admin'
        },
        {
            key: 17,
            nhacungcap: 'Dreamland Toys',
            diachi: '987 Kiwi St, CityQ',
            lienhe: '888-222-6666',
            ghichu: 'Sells educational toys for children',
            chucnang: 'User'
        },
        {
            key: 18,
            nhacungcap: 'Tropical Travels Agency',
            diachi: '456 Mango St, CityR',
            lienhe: '555-777-8888',
            ghichu: 'Organizes vacations to exotic destinations',
            chucnang: 'User'
        },
        {
            key: 19,
            nhacungcap: 'Happy Homes Realty',
            diachi: '321 Pineapple St, CityS',
            lienhe: '444-111-6666',
            ghichu: 'Specializes in residential real estate',
            chucnang: 'Admin'
        },
        {
            key: 20,
            nhacungcap: 'Rainbow Catering Services',
            diachi: '765 Papaya St, CityT',
            lienhe: '999-444-3333',
            ghichu: 'Caters events of all sizes',
            chucnang: 'User'
        }
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


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div className='m-4'>
            <div className='px-[20px] w-full flex justify-between py-7 bg-white'>
                <div className='flex gap-[5px] items-center'>
                    <Form
                        form={form}
                        layout='inline'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name='type'
                            className='w-[200px] !me-[5px]'
                        >
                            <Select placeholder='Lọc'>
                                <Select.Option value="nhacungcap">Nhà cung cấp</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='keyword'
                            className='w-[300px] !me-0'
                        >
                            <Input
                                className='rounded-tr-none rounded-br-none'
                                placeholder="Tìm kiếm"
                            />
                        </Form.Item>

                        <Button
                            className='!bg-[#FAFAFA] font-bold m-0 p-0 w-[32px] h-[32px] flex justify-center items-center rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md'
                            htmlType="submit"
                        // onClick={() => navigate(-1)}
                        >
                            <MdOutlineSearch size={20} color='#898989' />
                        </Button>

                    </Form>

                    {/* <Select
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
                                value: 'nhacungcap',
                                label: 'Nhà cung cấp',
                            },
                            // {
                            //     value: '2',
                            //     label: 'Closed',
                            // },
                        ]}
                        onChange={onChange}
                        onSearch={onSearch}
                    />

                    <Search
                        placeholder="Tìm kiếm"
                        onSearch={onSearch}
                        style={{
                            width: 300,
                        }}
                    /> */}

                    <SiMicrosoftexcel size={30} className='p-2 bg-white border border-black cursor-pointer' />
                    <TfiReload size={30} className='p-2 bg-white border border-black cursor-pointer'
                        onClick={() => { console.log("reload") }}
                    />

                </div>

                <Button
                    className='!bg-[#7A77DF] font-bold text-white flex items-center gap-1'
                    type='link'
                    onClick={() => navigate("them")}
                >
                    <Add />Thêm
                </Button>

                <Modal
                    title=""
                    centered
                    open={open}
                    width={500}
                    footer=''
                    onCancel={handleCancel}
                >
                    <div className='m-8 mt-10 text-center'>Bạn muốn xóa nhà cung cấp <strong>"{dataSelected.nhacungcap}"</strong>?</div>

                    <div className='flex justify-end gap-2 mb-0'>
                        <Button
                            className='bg-[#FF7742] font-bold text-white mr-2'
                            onClick={() => {
                                setDataSelected({});
                                setOpen(false);
                            }}
                        // onClick={() => navigate(-1)}
                        >
                            Hủy
                        </Button>
                        <Button
                            className='!bg-[#67CDBB] font-bold text-white'
                            onClick={() => {
                                //dispatch(deleteNhaCungCap({id:dataSelected.key}));
                                setDataSelected({});
                                setOpen(false);
                            }}
                        // onClick={() => navigate(-1)}
                        >
                            Xác nhận
                        </Button>
                    </div>
                    {/* <Form form={form} labelCol={{ span: 10 }} className='mb-4' layout="vertical" onFinish={onFinish}>

                        <Form.Item className='flex justify-end gap-2 mb-0'>
                            <Button
                                className='bg-[#FF7742] font-bold text-white mr-2'
                                htmlType="reset"
                                onClick={() => setOpen(false)}
                            // onClick={() => navigate(-1)}
                            >
                                Hủy
                            </Button>
                            <Button
                                className='!bg-[#67CDBB] font-bold text-white'
                                htmlType="submit"
                                onClick={() => setOpen(false)}
                            // onClick={() => navigate(-1)}
                            >
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form> */}
                </Modal>
            </div>

            <Table
                // rowSelection={{
                //     type: "checkbox",
                //     ...rowSelection,
                // }}
                columns={columns}
                dataSource={data}
                pagination={{
                    total: 20,
                    defaultPageSize: 10,
                    // pageSize: 20,
                    position: ['bottomRight'],
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                }}
                onChange={onChange}
            />
        </div>
    )
}

export default NhaCungCap