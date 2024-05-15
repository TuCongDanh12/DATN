import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form, Input, Flex, Table, Button, Select, Typography, InputNumber, Modal, notification } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { doiTuongSelector, getListCustomerGroup, getCustomer, clearState } from '../../../../../../store/features/doiTuongSilce';
import { FaCheck } from "react-icons/fa";

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


const EditKhachHang = ({ disabled = false }) => {
    const dispatch = useDispatch();
    const params = useParams();
    console.log("params", params)
    console.log("params.id", params.id)
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const {
        customerData,
        listCustomerGroupData,
        isSuccessPostDieuKhoanThanhToan,
        isSuccessPostCktm,
        isError,
        message
    } = useSelector(doiTuongSelector);
    console.log("customerData", customerData);

    useEffect(() => {
        dispatch(getCustomer({ id: params.id }));
        dispatch(getListCustomerGroup());
    }, []);

    useEffect(() => {
        if (customerData) {
            form.setFieldsValue({
                ...customerData
            });
        }
    }, [customerData]);

    const [api, contextHolder] = notification.useNotification();


    useEffect(() => {
        if (isSuccessPostDieuKhoanThanhToan) {
            api.success({
                message: 'Thêm dữ liệu thành công!',
                placement: 'bottomLeft',
                duration: 2
            });

            dispatch(clearState());
            dispatch(getCustomer({ id: params.id }));
        }
        else if (isSuccessPostCktm) {
            api.success({
                message: 'Thêm dữ liệu thành công!',
                placement: 'bottomLeft',
                duration: 2
            });

            dispatch(clearState());
            dispatch(getCustomer({ id: params.id }));
        }
        if (isError) {
            api.error({
                message: message,
                placement: 'bottomLeft',
                duration: 2
            });

            dispatch(clearState());
        }
    }, [
        isSuccessPostCktm,
        isSuccessPostDieuKhoanThanhToan,
        isError,
        message
    ]);

    const nameValue = Form.useWatch('name', form);

    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            'id': '1',
            'tenchietkhau': 'Chiết khấu 1',
            'songayduocno': '20',
            'songayhuongchietkhau': '10',
            'phantramchietkhau': '2',
            'noidung': '...',
        }
    ]);

    const [dataSource2, setDataSource2] = useState([
        {
            key: '0',
            'id': '1',
            'tenchietkhau': 'Chiết khấu 1',
            'songayduocno': '20',
            'songayhuongchietkhau': '10',
            'phantramchietkhau': '2',
            'noidung': '...',
        }
    ]);

    const [count, setCount] = useState(1);

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            width: '10%',
        },
        {
            title: 'Tên điều khoản thanh toán',
            dataIndex: 'name',
            editable: !disabled,
            ellipsis: true,
        },
        {
            title: 'Số ngày được nợ',
            dataIndex: 'creditPeriod',
            editable: !disabled,
            ellipsis: true,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            editable: !disabled,
            ellipsis: true,
        },
        {
            title: 'Chỉnh sửa',
            dataIndex: 'operation',
            width: '100px',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Typography.Link onClick={() => handleDelete(record.key)} className='flex justify-center'>
                        <FaCheck size={20} color='#1E1E1E' />
                    </Typography.Link>
                ) : null,
        },
    ];


    const defaultColumns2 = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            width: '10%',
        },
        {
            title: 'Tên chiết khấu',
            dataIndex: 'name',
            editable: !disabled,
            ellipsis: true,
        },
        {
            title: 'Số tiền tối thiểu để nhận được chiết khấu',
            dataIndex: 'minProductValue',
            editable: !disabled,
            ellipsis: true,
        },
        {
            title: '% chiết khấu',
            dataIndex: 'discountRate',
            editable: !disabled,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            editable: !disabled,
            ellipsis: true,
        },
        {
            title: 'Chỉnh sửa',
            dataIndex: 'operation',
            width: '100px',
            render: (_, record) =>
                dataSource2.length >= 1 ? (
                    <Typography.Link onClick={() => handleDelete(record.key)} className='flex justify-center'>
                        <FaCheck size={20} color='#1E1E1E' />
                    </Typography.Link>
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData = {
            'key': count,
            'tenchietkhau': '.',
            'songayduocno': '.',
            'songayhuongchietkhau': '.',
            'discountRate': '.',
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
                inputType: ['creditPeriod'].includes(col.dataIndex) ? 'number' : 'text',
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const columns2 = defaultColumns2.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: ['discountRate', 'minProductValue'].includes(col.dataIndex) ? 'number' : 'text',
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


    //add dieu khoan thanh toan
    const [openAddDieuKhoanThanhToan, setOpenAddDieuKhoanThanhToan] = useState(false);
    const [formAddDieuKhoanThanhToan] = Form.useForm();

    const handleCancelAddDieuKhoanThanhToan = () => {
        setOpenAddDieuKhoanThanhToan(false);
    }

    const onFinishAddDieuKhoanThanhToan = (values) => {
        console.log('Received values of form: ', values);

        const dataConvert = {
            ...values,
            "customerId": customerData.id
        }
        // dispatch(postProductGroup({ values }));
        formAddDieuKhoanThanhToan.resetFields();
    };


    //add chiet khau thương mại
    const [openAddChietKhauThuongMai, setOpenAddChietKhauThuongMai] = useState(false);
    const [formAddChietKhauThuongMai] = Form.useForm();

    const handleCancelAddChietKhauThuongMai = () => {
        setOpenAddChietKhauThuongMai(false);
    }

    const onFinishAddChietKhauThuongMai = (values) => {
        console.log('Received values of form: ', values);

        const dataConvert = {
            ...values,
            "customerId": customerData.id
        }
        // dispatch(postProductGroup({ values }));
        formAddChietKhauThuongMai.resetFields();
    };

    return (
        <div className="m-6">
            <h1 className="font-bold text-[32px] mb-8">
                Khách hàng {nameValue || customerData.name}
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
                            label="Nhóm khách hàng"
                            name='customerGroup'
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
                                {
                                    listCustomerGroupData.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Tên khách hàng"
                            name='name'
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


                    </Flex>

                    <Flex vertical gap={5} className='w-[50%]'>
                        <Form.Item
                            label="Số điện thoại"
                            name='phone'
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
                            label="Email"
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường này là bắt buộc!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="abc@gmail.com"
                                disabled={disabled}

                            />
                        </Form.Item>


                        <Form.Item
                            label="Ghi chú"
                            name='note'
                        >
                            <Input
                                disabled={disabled}

                            />
                        </Form.Item>
                    </Flex>

                </Flex>


                <div>
                    <div className='flex gap-4'>
                        <Button
                            className='!bg-[#7A77DF] font-bold text-white flex items-center gap-1 mb-4'
                            onClick={() => setOpenAddDieuKhoanThanhToan(true)}
                            disabled={disabled}
                        >
                            Thêm điều khoản thanh toán
                        </Button>

                        <Modal
                            title="THÊM ĐIỀU KHOẢN THANH TOÁN"
                            centered
                            open={openAddDieuKhoanThanhToan}
                            width={700}
                            footer=''
                            onCancel={handleCancelAddDieuKhoanThanhToan}
                        >
                            <Form
                                form={formAddDieuKhoanThanhToan}
                                layout='horizontal'
                                onFinish={onFinishAddDieuKhoanThanhToan}
                                labelCol={{
                                    flex: '200px',
                                }}
                                labelAlign="left"
                                className='mt-4'
                            >
                                <Form.Item
                                    label="Tên điều khoản thanh toán"
                                    name='name'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Trường này là bắt buộc!',
                                        },
                                    ]}
                                >
                                    <Input
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Số ngày được nợ"
                                    name='creditPeriod'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Trường này là bắt buộc!',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        min={0}
                                        style={{
                                            width: '100%',
                                        }} />
                                </Form.Item>

                                <Form.Item
                                    label="Mô tả"
                                    name='description'
                                >
                                    <Input
                                    />
                                </Form.Item>

                                <Form.Item className='flex justify-end gap-2 mt-6 mb-0'>

                                    <Button
                                        className='bg-[#FF7742] font-bold text-white mr-2'
                                        htmlType="reset"
                                        onClick={() => setOpenAddDieuKhoanThanhToan(false)}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        className='!bg-[#67CDBB] font-bold text-white'
                                        htmlType="submit"
                                        onClick={() => setOpenAddDieuKhoanThanhToan(false)}
                                    >
                                        Xác nhận
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>

                        <Button
                            className='!bg-[#7A77DF] font-bold text-white flex items-center gap-1 mb-4'
                            onClick={() => setOpenAddChietKhauThuongMai(true)}
                            disabled={disabled}
                        >
                            Thêm chiết khấu thương mại
                        </Button>

                        <Modal
                            title="THÊM CHIẾT KHẤU THƯƠNG MẠI"
                            centered
                            open={openAddChietKhauThuongMai}
                            width={700}
                            footer=''
                            onCancel={handleCancelAddChietKhauThuongMai}
                        >
                            <Form
                                form={formAddChietKhauThuongMai}
                                layout='horizontal'
                                onFinish={onFinishAddChietKhauThuongMai}
                                labelCol={{
                                    flex: '200px',
                                }}
                                labelAlign="left"
                                className='mt-4'
                            >
                                <Form.Item
                                    label="Tên chiết khấu"
                                    name='name'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Trường này là bắt buộc!',
                                        },
                                    ]}
                                >
                                    <Input
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Số tiền tối thiểu"
                                    name='minProductValue'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Trường này là bắt buộc!',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        defaultValue={0}
                                        min={0}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ'}
                                        style={{
                                            width: '100%',
                                        }} />
                                </Form.Item>

                                <Form.Item
                                    label="% chiết khấu"
                                    name='discountRate'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Trường này là bắt buộc!',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        min={0}
                                        style={{
                                            width: '100%',
                                        }} />
                                </Form.Item>

                                <Form.Item
                                    label="Mô tả"
                                    name='description'
                                >
                                    <Input
                                    />
                                </Form.Item>

                                <Form.Item className='flex justify-end gap-2 mt-6 mb-0'>

                                    <Button
                                        className='bg-[#FF7742] font-bold text-white mr-2'
                                        htmlType="reset"
                                        onClick={() => setOpenAddChietKhauThuongMai(false)}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        className='!bg-[#67CDBB] font-bold text-white'
                                        htmlType="submit"
                                        onClick={() => setOpenAddChietKhauThuongMai(false)}
                                    >
                                        Xác nhận
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>

                    </div>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        className='mb-4'
                    />

                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource2}
                        columns={columns2}
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

export default EditKhachHang