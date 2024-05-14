import React, { useEffect } from 'react'
import { Form, Input, DatePicker, Flex, Table,Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector, useDispatch } from 'react-redux';
import { doiTuongSelector } from '../../../store/features/doiTuongSilce';
import { banHangSelector, getListEmployeeWarehouseKeeper } from '../../../store/features/banHangSlice';

const dateFormat = "YYYY/MM/DD";
dayjs.extend(customParseFormat);


const PhieuXuat = ({ components, dataSource, columns, form, disabled, onFinish }) => {
    const dispatch = useDispatch();

    const columsFilter = columns
    // .filter(item=> (item.dataIndex!=="phantramthuegtgt"&&item.dataIndex!=="tienthuegtgt"))

    const { 
        isSuccessGetListEmployeeWarehouseKeeper,
        listEmployeeWarehouseKeeperData
    } = useSelector(banHangSelector);

    useEffect(() => {
        dispatch(getListEmployeeWarehouseKeeper());
    }, []);

    return (
        <div
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
                        name="receiver"
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
                        label="Ngày giao hàng"
                        name="deliveryDate"
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

                    <Form.Item
                        label="Người giữ kho"
                        name="warehouseKeeperId"
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
                            {listEmployeeWarehouseKeeperData.map(employee=>
                            <Select.Option value={employee.id} key={employee.key}>{employee.name}</Select.Option>
                            )}
                        </Select>
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

            </Flex>
            <div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columsFilter}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default PhieuXuat