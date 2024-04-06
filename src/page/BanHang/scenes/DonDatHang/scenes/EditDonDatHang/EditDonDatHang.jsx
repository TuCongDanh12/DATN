import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form, Input, Flex, Table, Button, Select, Typography, InputNumber } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { banHangSelector, getDonBanHang } from '../../../../../../store/features/banHangSlice';
import { clearState, doiTuongSelector, getListProduct } from './../../../../../../store/features/doiTuongSilce';

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
    const inputNode = inputType === 'number' ? <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} /> : <Input ref={inputRef} onPressEnter={save} onBlur={save} />;

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
                        message: `Please Input ${title}!`,
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


const EditDonDatHang = ({ disabled = false }) => {
    const dispatch = useDispatch();
    const params = useParams();
    console.log("params", params)
    console.log("params.id", params.id)
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const {
        donBanHangData,
        isSuccessGetDonBanHang
        
    } = useSelector(banHangSelector);

    console.log("donBanHangData", donBanHangData);

    useEffect(() => {
        dispatch(getDonBanHang({ id: params.id }));
        dispatch(getListProduct());
    }, []);

    useEffect(() => {
        if (donBanHangData) {
            const data = { ...donBanHangData };

            switch (donBanHangData.documentStatus) {
                case "UNDOCUMENTED":
                    data.documentStatus = "Chưa thực hiện";
                    break;
                case "DOCUMENTING":
                    data.documentStatus = "Đang thực hiện";
                    break;
                case "DOCUMENTED":
                    data.documentStatus = "Hoàn thành";
                    break;
                default:
                    data.documentStatus = "Lỗi";
                    break;
            }

            switch (donBanHangData.deliveryStatus) {
                case "NOT_DELIVERED":
                    data.deliveryStatus = "Chưa giao";
                    break;
                case "DELIVERING":
                    data.deliveryStatus = "Đang giao";
                    break;
                case "DELIVERED":
                    data.deliveryStatus = "Đã giao đủ";
                    break;
                default:
                    data.deliveryStatus = "Lỗi";
                    break;
            }


            form.setFieldsValue({
                ...data
            });
        }
    }, [donBanHangData]);


    const {
        listProductData,
        isSuccessGetListProduct,
        isSuccessPostProduct,
    } = useSelector(doiTuongSelector);

    const [productOfDonBanHangs, setProductOfDonBanHangs] = useState([]);

    // console.log("listProductData", listProductData);
    useEffect(() => {
        if (isSuccessGetListProduct && isSuccessGetDonBanHang) {
            const products = donBanHangData.productOfDonBanHangs.map(product => {
                console.log("product", product)
                const data = listProductData.filter(item => item.id === product.id);
                console.log("data", data);


                return {
                    ...product,
                    id: product.id,
                    productName: data[0].name,
                    unit: product.unit,
                    count: product.count,
                    soluongdaban: 1,
                    soluongdaxuat: 1,
                    price: product.price,
                    thanhtien: product.price * product.count,
                    phantramthuegtgt: data[0].productGroupInfo.tax,
                    tienthuegtgt: product.count * product.price * (data[0].productGroupInfo.tax / 100)
                }
            })



            console.log("products", products)

            setProductOfDonBanHangs(products);
            dispatch(clearState());
        }
    }, [isSuccessGetListProduct, isSuccessGetDonBanHang]);


    const nameValue = Form.useWatch('id', form);

    const [dataSource, setDataSource] = useState([
        // {
        //     key: '0',
        //     'tenchietkhau': 'Chiết khấu 1',
        //     'songayduocno': '20',
        //     'songayhuongchietkhau': '10',
        //     'phantramchietkhau': '2',
        //     'noidung': '...',
        // }
    ]);

    const [count, setCount] = useState(1);

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns = [
        {
            title: "Mã hàng",
            dataIndex: "id",
            editable: !disabled,
        },
        {
            title: "Tên hàng",
            dataIndex: "productName",
            editable: !disabled,
        },
        {
            title: "ĐVT",
            dataIndex: "unit",
            editable: !disabled,
        },
        {
            title: "Số lượng",
            dataIndex: "count",
            editable: !disabled,
        },
        {
            title: "Số lượng đã bán",
            dataIndex: "soluongdaban",
            editable: !disabled,
        },
        {
            title: "Số lượng đã xuất",
            dataIndex: "soluongdaxuat",
            editable: !disabled,
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            editable: !disabled,
        },
        {
            title: "Thành tiền",
            dataIndex: "thanhtien",
            editable: !disabled,
        },
        {
            title: "% thuế GTGT",
            dataIndex: "phantramthuegtgt",
            editable: !disabled,
        },
        {
            title: "Tiền thuế GTGT",
            dataIndex: "tienthuegtgt",
            editable: !disabled,
        },
        // {
        //     title: '',
        //     dataIndex: 'operation',
        //     width: '50px',
        //     render: (_, record) =>
        //         dataSource.length >= 1 ? (
        //             <Typography.Link onClick={() => handleDelete(record.key)} className='flex justify-center'>
        //                 <RiDeleteBin6Line size={20} color='#1E1E1E' />
        //             </Typography.Link>
        //         ) : null,
        // },
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
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
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
                inputType: ['songayduocno', 'songayhuongchietkhau', 'phantramchietkhau'].includes(col.dataIndex) ? 'number' : 'text',
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log(dataSource);
    };

    return (
        <div className="m-6">
            <h1 className="font-bold text-[32px] mb-8">
                Đơn đặt hàng {nameValue || donBanHangData.id}
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
                                disabled={disabled}

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
                                disabled={disabled}
                            />
                        </Form.Item>

                        {/* <Form.Item
                            label="Mã số thuế"
                            name="code"
                        >
                            <Input
                                disabled={disabled}
                            />
                        </Form.Item> */}

                        <Form.Item
                            label="Người nhận hàng"
                            name="namecCustomer"
                        >
                            <Input
                                disabled={disabled}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Nhân viên bán hàng"
                            name='salesperson'
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

                        <Form.Item
                            label="Nội dung"
                            name='content'
                        >
                            <Input
                                disabled={disabled}

                            />
                        </Form.Item>
                    </Flex>

                    <Flex vertical gap={5} className='w-[50%]'>
                        {/* <Form.Item
                            label="Số đơn hàng"
                            name='id'
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
                        </Form.Item> */}

                        <Form.Item
                            label="Ngày đặt hàng"
                            name='saleDate'
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

                        <Form.Item
                            label="Hạn giao hàng"
                            name='deliveryTerm'
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


                        <Form.Item
                            label="Điều khoản thanh toán"
                            name='x'
                        >
                            <Input
                                disabled={disabled}

                            />
                        </Form.Item>

                        <Form.Item
                            label="Tình trạng đơn hàng"
                            name='documentStatus'
                        >
                            <Input
                                disabled={disabled}

                            />
                        </Form.Item>

                        <Form.Item
                            label="Tình trạng giao hàng"
                            name='deliveryStatus'
                        >
                            <Input
                                disabled={disabled}

                            />
                        </Form.Item>
                    </Flex>

                </Flex>


                <div>
                    <Button
                        className='!bg-[#7A77DF] font-bold text-white flex items-center gap-1 mb-4'
                        onClick={handleAdd}
                        disabled={disabled}
                    >
                        Thêm 1 dòng
                    </Button>

                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={productOfDonBanHangs}
                        columns={columns}
                        pagination={false}
                    />
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

export default EditDonDatHang