import React, { useContext, useEffect, useRef, useState } from 'react'
import { Tabs, Form, Input, Flex, Table, Button, InputNumber, Select, Checkbox, DatePicker } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { banHangSelector, getDonBanHang, postChungTuBan } from '../../../../../../store/features/banHangSlice';
import { clearState, doiTuongSelector, getListProduct } from './../../../../../../store/features/doiTuongSilce';
import { VND } from '../../../../../../utils/func';

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from 'moment';

const dateFormat = "YYYY-MM-DD";
dayjs.extend(customParseFormat);


const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    inputType,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    const inputNode = inputType === 'number' ? <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} min={0} max={record.chuathu} /> : <Input ref={inputRef} onPressEnter={save} onBlur={save} />;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={[
                    {
                        required: true,
                        message: `Vui lòng nhập Input ${title}!`,
                    },
                ]}
            >
                {inputNode}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};


const ThemThuTien = ({ disabled = false }) => {
    const dispatch = useDispatch();
    const params = useParams();
    console.log("params", params)
    console.log("params.id", params.id)
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const {
        // donBanHangData,
        // isSuccessGetDonBanHang,
        listHoaDonSelected

    } = useSelector(banHangSelector);

    console.log("listHoaDonSelected", listHoaDonSelected);


    const [dataHoaDonSelected, setDataHoaDonSelected] = useState([]);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    // console.log("listProductData", listProductData);
    useEffect(() => {
        // const products = donBanHangData.dataHoaDonSelected.map(product => {

        //     let soluongdaban = 0;
        //     donBanHangData.ctban.forEach(chungtuban => {
        //         chungtuban.productOfCtban.forEach(productOfCtbanItem => {
        //             if (productOfCtbanItem.product.id === product.product.id) {
        //                 console.log("...", productOfCtbanItem.count)
        //                 soluongdaban += productOfCtbanItem.count;
        //             }
        //         })
        //     })

        //     return {
        //         ...product,
        //         key: product.id,
        //         id: product.product.id,
        //         productName: product.product.name,
        //         unit: product.product.unit,
        //         count: product.count - soluongdaban,
        //         soluongchuadat: product.count - soluongdaban,
        //         // soluongdaxuat: 1,
        //         price: product.price,
        //         thanhtien: product.price * product.count,
        //         phantramthuegtgt: product.product.productGroup.tax,
        //         tienthuegtgt: product.count * product.price * (product.product.productGroup.tax / 100)
        //     }
        // })



        // console.log("products", products)

        if (listHoaDonSelected.length !== 0) {
            const convertData = listHoaDonSelected.map(hoaDon => {
                return {
                    ...hoaDon,
                    xxx: hoaDon.chuathu
                }
            })

            setDataHoaDonSelected(convertData);




            const data = {
                // ...listHoaDonSelected[0].donBanHang,
                // receiver: donBanHangData.namecCustomer,
                paymentMethod: "CASH",
                address: listHoaDonSelected[0].donBanHang.customer.address,
                salespersonID: "sss",
                submitter: "",
                bankAccountId: "sss",
                createdAt: dayjs(new Date().toISOString().slice(0, 10), dateFormat),
                receiveDate: dayjs(new Date().toISOString().slice(0, 10), dateFormat),
                taxCode: listHoaDonSelected[0].donBanHang.customer.taxCode,
                namecCustomer: listHoaDonSelected[0].donBanHang.customer.name
                // paymentTerm: dayjs(new Date().toISOString().slice(0, 10), dateFormat),
                // deliveryDate: dayjs(new Date().toISOString().slice(0, 10), dateFormat)
            };


            console.log("dataa", data)

            form.setFieldsValue({
                ...data
            });
        }
    }, [listHoaDonSelected]);


    const nameValue = Form.useWatch('id', form);


    const [count, setCount] = useState(1);

    const handleDelete = (key) => {
        const newData = dataHoaDonSelected.filter((item) => item.key !== key);
        setDataHoaDonSelected(newData);
    };
    const defaultColumns = [
        {
            title: "Ngày hóa đơn",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (val, record) => new Date(val).toLocaleDateString("vi-VN"),
            sorter: (a, b) =>
                moment(a.createdAt, "DD-MM-YYYY") - moment(b.createdAt, "DD-MM-YYYY"),
            sortOrder: sortedInfo.columnKey === "createdAt" ? sortedInfo.order : null,
            // fixed: 'left',
            editable: false,
        },
        {
            title: "Khách hàng",
            dataIndex: "customer",
            key: "customer",
            ellipsis: true,
            editable: false,
        },
        {
            title: "Giá trị hóa đơn",
            dataIndex: "tong",
            key: "tong",
            render: (val, record) => VND.format(val),
            sorter: (a, b) => a.tong - b.tong,
            sortOrder: sortedInfo.columnKey === "tong" ? sortedInfo.order : null,
        },
        {
            title: "Chưa thu",
            dataIndex: "chuathu",
            key: "chuathu",
            render: (val, record) => VND.format(val),
            sorter: (a, b) => a.chuathu - b.chuathu,
            sortOrder: sortedInfo.columnKey === "chuathu" ? sortedInfo.order : null,
        },
        // {
        //     title: "Số lượng chưa đặt",
        //     dataIndex: "soluongchuadat",
        //     editable: false,
        // },
        // {
        //     title: "Số lượng đã xuất",
        //     dataIndex: "soluongdaxuat",
        //     editable: !disabled,
        // },
        {
            title: "Số thanh toán",
            dataIndex: "xxx",
            key: "xxx",
            render: (val, record) => VND.format(val),
            editable: true,
        },
    ];


    const handleAdd = () => {
        const newData = {
            'key': count,
            'tenchietkhau': '.',
            'songayduocno': '.',
            'songayhuongchietkhau': '.',
            'phantramchietkhau': '.',
            'noidung': '.',
        };
        setDataHoaDonSelected([...dataHoaDonSelected, newData]);
        setCount(count + 1);
    };

    const handleSave = (row) => {
        console.log("row", row);
        row.thanhtien = row.price * row.count;
        row.tienthuegtgt = row.price * row.count * (row.phantramthuegtgt / 100);

        const newData = [...dataHoaDonSelected];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataHoaDonSelected(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: ['xxx'].includes(col.dataIndex) ? 'number' : 'text',
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    //End
    const onFinish = (values) => {
        // values.createdAt = `${values.createdAt.$y}-${values.createdAt.$M + 1}-${values.createdAt.$D}`;
        // values.deliveryDate = `${values.deliveryDate.$y}-${values.deliveryDate.$M + 1}-${values.deliveryDate.$D}`;
        console.log('Received values of form: ', values);
        console.log(dataHoaDonSelected);

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        let dataConvert = {
            // "deliveryDate": formatDate(values.deliveryDate.$d),
            "warehouseKeeperId": values.warehouseKeeperId,
            "content": values.content,
            "receiver": values.receiver,
            // "paymentTerm": formatDate(values.paymentTerm.$d),
            // "donBanHangId": donBanHangData.id,
            "products": dataHoaDonSelected.map(product => {
                return {
                    productId: product.id,
                    count: product.count
                }
            })

        };

        dispatch(postChungTuBan({ values: dataConvert }));
        navigate(-2);
    };


    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('onChange params', pagination, filters, sorter, extra);
        console.log("onChange params pagination", pagination);
        console.log("onChange params filters", filters);
        console.log("onChange params sorter", sorter);
        console.log("onChange params extra", extra);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    return (
        <div className="m-6">
            <h1 className="font-bold text-[32px] mb-4">
                Phiếu thu tiền
                {/* {nameValue || donBanHangData.id} */}
            </h1>


            <Form
                form={form}
                // labelCol={{ span: 10 }}
                className='mb-4'
                labelCol={{
                    flex: '150px',
                }}
                labelAlign="left"
                labelWrap
                onFinish={onFinish}
            >


                <Flex gap={100} justify='center' className='w-[100%] align-left'>
                    <Flex vertical gap={5} className='w-[50%]'>
                        <Form.Item
                            label="Tên khách hàng"
                            name='namecCustomer'
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <Input
                                disabled={true}

                            />
                        </Form.Item>

                        <Form.Item
                            label="Mã số thuế"
                            name='taxCode'
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <Input
                                disabled={true}

                            />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name='address'
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <Input
                                disabled={true}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Phương thức thanh toán"
                            name='paymentMethod'
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <Select
                                disabled={disabled}
                            >
                                <Select.Option value={"CASH"}>Tiền mặt</Select.Option>
                                <Select.Option value={"TRANSFER"}>Tiền gửi</Select.Option>
                            </Select>
                        </Form.Item>


                        <Form.Item
                            label="Nhân viên bán hàng"
                            name='salespersonID'
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <Input
                                disabled={true}

                            />
                        </Form.Item>
                    </Flex>

                    <Flex vertical gap={5} className='w-[50%]'>


                        <Form.Item
                            label="Ngày hạch toán"
                            name="createdAt"
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <DatePicker
                                className='!w-full'
                                disabled={true}
                            // format={dateFormat}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Ngày chứng từ"
                            name="receiveDate"
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <DatePicker
                                className='!w-full'
                                disabled={disabled}
                            // format={dateFormat}
                            />
                        </Form.Item>

                        {Form.useWatch('paymentMethod', form) === "TRANSFER" &&
                            <Form.Item
                                label="Ngân hàng"
                                name='bankName'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Trường này là bắt buộc!',
                                    },
                                ]}
                            >
                                <Input
                                    disabled={disabled}
                                />
                            </Form.Item>
                        }

                        {Form.useWatch('paymentMethod', form) === "TRANSFER" &&
                            <Form.Item
                                label="Chủ tài khoản"
                                name='accountName'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Trường này là bắt buộc!',
                                    },
                                ]}
                            >
                                <Input
                                    disabled={disabled}

                                />
                            </Form.Item>}
                        {Form.useWatch('paymentMethod', form) === "TRANSFER" &&
                            <Form.Item
                                label="Số tài khoản"
                                name='bankAccountId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Trường này là bắt buộc!',
                                    },
                                ]}
                            >
                                <Input
                                    disabled={disabled}

                                />
                            </Form.Item>
                        }



                        {Form.useWatch('paymentMethod', form) === "CASH" &&
                            <Form.Item
                            label="Người nộp"
                            name='submitter'
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <Input
                                disabled={disabled}

                            />
                        </Form.Item>
                        }


                        
                    </Flex>

                </Flex>
                <div>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataHoaDonSelected}
                        columns={columns}
                        pagination={false}
                        onChange={onChange}
                    />
                </div>

                <div className='flex justify-end'>
                    <div className='w-[300px] my-8'>
                        {/* <div className='flex justify-between'>
                            <p>Tổng tiền hàng</p>
                            <p>
                                {
                                    VND.format(dataHoaDonSelected.map(product => product.thanhtien).reduce((total, currentValue) => {
                                        return total + currentValue;
                                    }, 0))
                                }
                            </p>
                        </div>
                        <div className='flex justify-between border-b border-zinc-950'>
                            <p>Thuế GTGT</p>
                            <p>
                                {
                                    VND.format(dataHoaDonSelected.map(product => product.tienthuegtgt).reduce((total, currentValue) => {
                                        return total + currentValue;
                                    }, 0))
                                }
                            </p>
                        </div> */}
                        <div className='flex justify-between font-bold text-xl'>
                            <p>TỔNG</p>
                            <p>
                                {
                                    VND.format(dataHoaDonSelected.map(hoaDon => hoaDon.xxx).reduce((total, currentValue) => {
                                        return total + currentValue;
                                    }, 0)
                                        // +
                                        // dataHoaDonSelected.map(product => product.tienthuegtgt).reduce((total, currentValue) => {
                                        //     return total + currentValue;
                                        // }, 0)
                                    )
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {disabled ?
                    <div className='w-full flex justify-end mt-6 mb-0'>
                        <Button
                            className='bg-[#FF7742] font-bold text-white'
                            type='link'
                            onClick={() => navigate(-1)}
                        >
                            Thoát
                        </Button>
                    </div> :
                    <Form.Item className='flex justify-end gap-2 mt-6 mb-0'>

                        <Button
                            className='bg-[#FF7742] font-bold text-white mr-2'
                            htmlType="reset"
                            onClick={() => navigate(-1)}
                        >
                            Hủy
                        </Button>
                        <Button
                            className='!bg-[#67CDBB] font-bold text-white'
                            htmlType="submit"
                        // onClick={() => navigate(-1)}
                        >
                            Xác nhận
                        </Button>
                    </Form.Item>
                }
            </Form>
        </div>
    )
}

export default ThemThuTien