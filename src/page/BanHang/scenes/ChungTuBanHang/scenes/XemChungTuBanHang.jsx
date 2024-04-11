import React, { useState } from 'react'
import { Button, Checkbox, Flex, Select, Table, Tabs } from 'antd'
import PhieuXuat from '../../../../../component/Form/BanHang/PhieuXuat';
import PhieuThu from '../../../../../component/Form/BanHang/PhieuThu';
import HoaDon from '../../../../../component/Form/BanHang/HoaDon';
import { useNavigate } from 'react-router-dom';



const XemChungTuBanHang = () => {
    const navigate = useNavigate();

    const [phieuThuChecked, setPhieuThuChecked] = useState(true);
    const [selectedOption, setSelectedOption] = useState("Tiền mặt");


    const onChangePhieuThu = (e) => {
        setPhieuThuChecked(e.target.checked);
    };

    const itemsTienMat = [
        {
            key: "1",
            label: "Phiếu xuất",
            children: <PhieuXuat />,
        },
        phieuThuChecked && {
            key: "2",
            label: "Phiếu thu",
            children: <PhieuThu />,
        },
        {
            key: "3",
            label: "Hóa đơn",
            children: <HoaDon />,
        }
    ];

    const itemsTienGui = [
        {
            key: "1",
            label: "Phiếu xuất",
            children: <PhieuXuat />,
        },
        phieuThuChecked && {
            key: "2",
            label: "Phiếu thu",
            children: <PhieuThu tiengui={true} />,
        },
        {
            key: "3",
            label: "Hóa đơn",
            children: <HoaDon />,
        }
    ];

    const handleChangeSelectedOption = (e) => {
        console.log(e)
        setSelectedOption(e);
    }

    const renderItems = () => {
        if (selectedOption === "Tiền mặt") {
            return itemsTienMat;
        } else if (selectedOption === "Tiền gửi") {
            return itemsTienGui;
        }
    };



    return (
        <div className='m-4'>
            <h1 className="mx-[30px] font-bold text-[32px] mb-2">
                Chứng từ bán hàng NK00006
            </h1>
            <Flex gap={20} className='mx-[30px]'>
                <Flex gap={5} align="center" justify="center">
                    <p>Phương thức thanh toán</p>
                    <Select
                        className="!w-[200px]"
                        defaultValue="Tiền mặt"
                        style={{ width: 120 }}
                        onChange={handleChangeSelectedOption}
                        options={[
                            { value: "Tiền mặt", label: "Tiền mặt" },
                            { value: "Tiền gửi", label: "Tiền gửi" }
                        ]}
                    />
                </Flex>
                <Checkbox checked={phieuThuChecked} onChange={onChangePhieuThu}>
                    Phiếu thu
                </Checkbox>

            </Flex>

            <Tabs
                className="mx-[30px]"
                defaultActiveKey="1"
                items={renderItems()}
            />

            <div className='w-[300px] m-8'>
                <div className='flex justify-between'>
                    <p>Tổng tiền hàng</p>
                    <p>770.000.000</p>
                </div>
                <div className='flex justify-between border-b border-zinc-950'>
                    <p>Thuế GTGT</p>
                    <p>77.000.000</p>
                </div>
                <div className='flex justify-between font-bold'>
                    <p>TỔNG</p>
                    <p>847.000.000</p>
                </div>
            </div>

            <div className='w-full flex justify-end gap-5'>
                <Button
                    className='bg-[#FF7742] font-bold text-white'
                    type='link'
                    onClick={() => navigate(-1)}
                >
                    Thoát
                </Button>
                <Button
                    className='!bg-[#67CDBB] font-bold text-white'
                    type='link'
                    onClick={() => navigate(-1)}
                >
                    Xác nhận
                </Button>
            </div>

        </div>
    )
}

export default XemChungTuBanHang