import React from 'react'
import HoaDon from './../../../../../component/Form/BanHang/HoaDon';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const XemHoaDonBanHang = () => {
    const navigate = useNavigate();

    return (
        <div className='m-4'>
            <h1 className="mx-[30px] font-bold text-[32px] mb-2">
                Hóa đơn bán hàng HĐ00001
            </h1>
            <HoaDon />

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

export default XemHoaDonBanHang