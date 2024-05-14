import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Table,
    Dropdown,
    Space,
    Select,
    Button,
    Modal,
    Form,
    Input,
    message as msg,
    notification,
    DatePicker,
    Typography,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaRegFilePdf } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import { Add } from "@mui/icons-material";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
    banHangSelector,
    clearState,
    getListChungTuBan,
    hoaDonSelected,
} from "../../../../store/features/banHangSlice";
import moment from "moment/moment";
import { doiTuongSelector, getListProduct } from "../../../../store/features/doiTuongSilce";
import { VND } from "../../../../utils/func";
import { congNoSelector, getListCongNo } from './../../../../store/features/congNoSlice';
import InTongHopNoPhaiThu from "../../../../component/InTongHopNoPhaiThu/InTongHopNoPhaiThu";
import { useReactToPrint } from "react-to-print";
const { Text } = Typography;


const { RangePicker } = DatePicker;
const TongHopNoPhaiThu = ({ checkbox = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [dataSelected, setDataSelected] = useState({});

    const [messageApi, contextHolderMes] = msg.useMessage();

    const [api, contextHolder] = notification.useNotification();

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const {
        isSuccessGetListCongNo,

        isError,
        message,

        listCongNo,
    } = useSelector(congNoSelector);

    useEffect(() => {
        dispatch(getListCongNo());
    }, []);

    const [chungTuBan, setChungTuBan] = useState([]);
    const [dataConvert, setDataConvert] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterday, setFilterday] = useState([]);
    const [valueRangepicker, setValueRangepicker] = useState([])
    const handleSearch = (value) => {
        setSearchText(value);
    };
    const handleFilterday = (dates) => {
        if (dates && dates.length === 2) {
            const startTimestamp = dates[0].valueOf();
            const endTimestamp = dates[1].valueOf();
            console.log("Start Timestamp:", startTimestamp, typeof (startTimestamp));
            console.log("End Timestamp:", endTimestamp, typeof (endTimestamp));
            setFilterday([startTimestamp, endTimestamp]);
            setValueRangepicker(dates);
        } else {
            setFilterday([]);
            setValueRangepicker([]);
        }
    };

    useEffect(() => {
        if (isSuccessGetListCongNo) {
            // messageApi.open({
            //   key: "updatable",
            //   type: "success",
            //   content: "Tải dữ liệu thành công!",
            //   duration: 2,
            // });
            const dataConvertCurrent = listCongNo.map(congNo => {
                let tong = 0;
                let dathu = 0;
                congNo.forEach(chungTuBanData => {
                    console.log("chungTuBanData", chungTuBanData)

                    chungTuBanData.productOfCtban.forEach(productOfCt => {
                        tong += productOfCt.count * productOfCt.price;
                        tong += productOfCt.count * productOfCt.price * (productOfCt.product.productGroup.tax / 100);
                    })
                    //continue ...
                })

                let chuathu = tong - dathu;
                return {
                    ...congNo[0],
                    makhachhang: congNo[0].donBanHang.customer.id,
                    customer: congNo[0].donBanHang.customer.name,
                    tong,
                    dathu,
                    chuathu
                }
            })

            console.log("dataConvertCurrent", dataConvertCurrent)
            setDataConvert(dataConvertCurrent);
            setChungTuBan(dataConvertCurrent);
            dispatch(clearState());
        }
        else if (isError) {
            api.error({
                message: message,
                placement: "bottomLeft",
                duration: 2,
            });

            dispatch(clearState());
        }
    }, [isSuccessGetListCongNo, isError]);

    // useEffect(() => {
    //   console.log(searchText);
    //   if (searchText.trim() === "" && filterday.length === 0) {
    //     if (!dataConvert || (Array.isArray(dataConvert) && !dataConvert.length)) {
    //       setChungTuBan([]);
    //     } else {
    //       setChungTuBan(dataConvert);
    //     }
    //   } else {
    //     const filteredData = dataConvert.filter((data) => {
    //       const createdAtMoment = moment(data.createdAt);
    //       return (
    //         data.customer.toLowerCase().includes(searchText.toLowerCase()) &&
    //         (!filterday[0] || createdAtMoment.valueOf() >= filterday[0]) &&
    //         (!filterday[1] || createdAtMoment.valueOf() <= filterday[1])
    //       );
    //     });
    //     setChungTuBan(filteredData);
    //   }
    // }, [searchText, dataConvert, filterday]);

    const items = [
        {
            key: "xem",
            label: <Link className="!text-black">Xem</Link>,
        },
        {
            key: "thu-tien",
            label: <Link className="!text-black">Thu tiền</Link>,
        },
    ];

    const handleDropdownItemClick = (e, record) => {
        console.log("e.key", e.key);
        console.log("record", record);
        if (e.key === "xoa") {
            setDataSelected(record);
            setOpen(true);
        } else {
            navigate(`${e.key}/${record.key}`, { state: { id: record.key } });
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    let columns = [
        {
            title: "ID khách hàng",
            dataIndex: "makhachhang",
            key: "makhachhang",
            sorter: (a, b) => a.makhachhang - b.makhachhang,
            sortOrder: sortedInfo.columnKey === "makhachhang" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "Khách hàng",
            dataIndex: "customer",
            key: "customer",
            ellipsis: true,
        },
        // {
        //     title: "Ngày hóa đơn",
        //     dataIndex: "createdAt",
        //     key: "createdAt",
        //     render: (val, record) => new Date(val).toLocaleDateString("vi-VN"),
        //     sorter: (a, b) =>
        //         moment(a.createdAt, "DD-MM-YYYY") - moment(b.createdAt, "DD-MM-YYYY"),
        //     sortOrder: sortedInfo.columnKey === "createdAt" ? sortedInfo.order : null,
        //     // fixed: 'left',
        // },

        // {
        //     title: "Hạn thanh toán",
        //     dataIndex: "paymentTerm",
        //     key: "paymentTerm",
        //     render: (val, record) => new Date(val).toLocaleDateString("vi-VN"),
        //     sorter: (a, b) =>
        //         moment(a.paymentTerm, "DD-MM-YYYY") - moment(b.paymentTerm, "DD-MM-YYYY"),
        //     sortOrder: sortedInfo.columnKey === "paymentTerm" ? sortedInfo.order : null,
        //     // fixed: 'left',
        // },
        // {
        //   title: "Nội dung",
        //   dataIndex: "content",
        //   key: "content",
        //   ellipsis: true,
        // },
        {
            title: "Tổng",
            dataIndex: "tong",
            key: "tong",
            render: (val, record) => VND.format(val),
            sorter: (a, b) => a.tong - b.tong,
            sortOrder: sortedInfo.columnKey === "tong" ? sortedInfo.order : null,
        },
        {
            title: "Đã thu",
            dataIndex: "dathu",
            key: "dathu",
            render: (val, record) => VND.format(val),
            sorter: (a, b) => a.dathu - b.dathu,
            sortOrder: sortedInfo.columnKey === "dathu" ? sortedInfo.order : null,
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
        //   title: "Tình trạng thanh toán",
        //   dataIndex: "paymentStatus",
        //   key: "paymentStatus",
        //   fixed: "right",
        //   render: (val, record) => {
        //     switch (val) {
        //       case "NOT_PAID":
        //         return "Chưa thanh toán";
        //       case "BEING_PAID":
        //         return "Thanh toán 1 phần";
        //       case "PAID":
        //         return "Đã thanh toán";
        //       default:
        //         return "Lỗi";
        //     }
        //   },
        //   filters: [
        //     {
        //       value: "NOT_PAID",
        //       text: "Chưa thanh toán",
        //     },
        //     {
        //       value: "BEING_PAID",
        //       text: "Thanh toán 1 phần",
        //     },
        //     {
        //       value: "PAID",
        //       text: "Đã thanh toán",
        //     },
        //   ],
        //   onFilter: (value, record) => record.paymentStatus.indexOf(value) === 0,
        //   filteredValue: filteredInfo.paymentStatus || null,
        // },
        // {
        //   title: "Tình trạng giao hàng",
        //   dataIndex: "deliveryStatus",
        //   key: "deliveryStatus",
        //   render: (val, record) => {
        //     switch (val) {
        //       case "NOT_DELIVERED":
        //         return "Chưa giao";
        //       case "DELIVERING":
        //         return "Đang giao";
        //       case "DELIVERED":
        //         return "Đã giao đủ";
        //       default:
        //         return "Lỗi";
        //     }
        //   },
        //   filters: [
        //     {
        //       value: "NOT_DELIVERED",
        //       text: "Chưa giao",
        //     },
        //     {
        //       value: "DELIVERING",
        //       text: "Đang giao",
        //     },
        //     {
        //       value: "DELIVERED",
        //       text: "Đã giao đủ",
        //     },
        //   ],
        //   onFilter: (value, record) => record.deliveryStatus.indexOf(value) === 0,
        //   filteredValue: filteredInfo.deliveryStatus || null,
        // },
        // {
        //     title: "Chức năng",
        //     dataIndex: "chucnang",
        //     fixed: "right",
        //     width: "10%",
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Dropdown
        //                 menu={{
        //                     onClick: (e) => handleDropdownItemClick(e, record),
        //                     items: items,
        //                 }}
        //             >
        //                 <Link
        //                     to={`xem/${record.key}`}
        //                     state={{ id: record.key }}
        //                     className="!text-black"
        //                 >
        //                     Xem
        //                     <DownOutlined />
        //                 </Link>
        //             </Dropdown>
        //         </Space>
        //     ),
        // },
    ];

    if (checkbox) {
        columns = columns.filter(item => item.dataIndex !== "chucnang");
    }

    // useEffect(() => {
    //   if (isErrorHoaDonSelected) {
    //     api.error({
    //       message: "Chỉ thu tiền các hóa đơn của 1 khách hàng!",
    //       placement: "bottomLeft",
    //       duration: 2,
    //     });

    //     dispatch(clearState());
    //   } 
    // }, [isErrorHoaDonSelected]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length >= 2 && selectedRows[0].donBanHang.customer.id === selectedRows[selectedRows.length - 1].donBanHang.customer.id) {
                setSelectedRowKeys(selectedRowKeys);
                dispatch(hoaDonSelected(selectedRows));
            }
            else if (selectedRows.length === 1) {
                setSelectedRowKeys(selectedRowKeys);
                dispatch(hoaDonSelected(selectedRows));
            }
            else if (selectedRows.length === 0) {
                setSelectedRowKeys([]);
                dispatch(hoaDonSelected([]));
            }
            else {
                api.error({
                    message: "Chỉ thu tiền các hóa đơn của 1 khách hàng!",
                    placement: "bottomLeft",
                    duration: 2,
                });
            }

            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };

    // const onSelectChange = (newSelectedRowKeys) => {
    //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    //   setSelectedRowKeys(newSelectedRowKeys);
    // };

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
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

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };


    //Xuat file pdf, in file
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="m-4">
            <div className={`px-[20px] w-full flex justify-between pb-7 ${!checkbox && "bg-white py-7"}`}>
                <div className="flex gap-[5px] items-center">
                    <Form form={form} layout="inline" onFinish={onFinish}>
                        <RangePicker
                            value={valueRangepicker}
                            format='DD-MM-YYYY'
                            onChange={(dates) => handleFilterday(dates)}
                            className="!me-[5px]"
                        />
                        <Form.Item name="keyword" className="w-[300px] !me-0">
                            <Input
                                className="rounded-tr-none rounded-br-none"
                                placeholder="Nhập tên khách hàng"
                                value={searchText}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </Form.Item>

                        <Button
                            className="!bg-[#FAFAFA] font-bold m-0 p-0 w-[32px] h-[32px] flex justify-center items-center rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md"
                            htmlType="submit"
                        >
                            <MdOutlineSearch size={20} color="#898989" />
                        </Button>
                    </Form>

                    {contextHolderMes}
                    {contextHolder}

                    <FaRegFilePdf
                        title="Xuất file pdf"
                        onClick={handlePrint}
                        size={30}
                        className="p-2 bg-white border border-black cursor-pointer"
                    />
                    <TfiReload
                        title="Cập nhật dữ liệu"
                        size={30}
                        className="p-2 bg-white border border-black cursor-pointer"
                        onClick={() => {
                            dispatch(getListChungTuBan());
                            messageApi.open({
                                key: "updatable",
                                type: "loading",
                                content: "Loading...",
                            });
                            form.resetFields();
                            clearAll();
                            setValueRangepicker([]);
                            setFilterday([]);
                            setSelectedRowKeys([]);
                            checkbox && setFilteredInfo({
                                "paymentStatus": [
                                    "NOT_PAID",
                                    "BEING_PAID"
                                ]
                            });
                        }}
                    />
                </div>

                {
                    checkbox ?
                        <Button
                            className="!bg-[#7A77DF] font-bold text-white flex items-center gap-1"
                            type="link"
                            disabled={!selectedRowKeys.length}
                            onClick={() => {

                                navigate(`/ban-hang/thu-tien-theo-hoa-don/timkiem/thutien`, { state: { id: selectedRowKeys } });
                            }}
                        >
                            Thu tiền
                        </Button>
                        :
                        <></>
                }

                <Modal
                    title=""
                    centered
                    open={open}
                    width={500}
                    footer=""
                    onCancel={handleCancel}
                >
                    <div className="m-8 mt-10 text-center">
                        Bạn muốn xóa khách hàng
                        <br /> <strong>"{dataSelected.name}"</strong>?
                    </div>

                    <div className="flex justify-end gap-2 mb-0">
                        <Button
                            className="bg-[#FF7742] font-bold text-white mr-2"
                            onClick={() => {
                                setDataSelected({});
                                setOpen(false);
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            className="!bg-[#67CDBB] font-bold text-white"
                            onClick={() => {
                                //dispatch(deleteNhaCungCap({id:dataSelected.key}));
                                setDataSelected({});
                                setOpen(false);
                            }}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </Modal>
            </div>

            <Table
                columns={columns}
                dataSource={chungTuBan}
                onChange={onChange}
                scroll={{
                    x: 1300,
                }}
                className="overflow-x-visible	overflow-y-visible mb-3"

                pagination={false}
                bordered
                summary={(pageData) => {
                    let totalTong = 0;
                    let totalDaThu = 0;
                    let totalChuaThu = 0;
                    pageData.forEach(({ tong, dathu, chuathu }) => {
                        totalTong += tong;
                        totalDaThu += dathu;
                        totalChuaThu += chuathu;
                    });
                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} colSpan={2} className="font-medium">Tổng</Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                    <Text className="font-medium">{VND.format(totalTong)}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>
                                    <Text className="font-medium">{VND.format(totalDaThu)}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                    <Text className="font-medium">{VND.format(totalChuaThu)}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    );
                }}
            />

            <div
            className='hidden'
            >
                <div ref={componentRef}>
                    <InTongHopNoPhaiThu
                        form={form}
                        // components={components}
                        dataSource={chungTuBan}
                        columns={columns}
                    // idHoaDon={chungTuBanData?.id}
                    // idCustomer={chungTuBanData?.donBanHang?.customer?.id}
                    />
                </div>
            </div>

        </div>
    );
};

export default TongHopNoPhaiThu;
