import React from 'react'
import Header from '../../component/Header/Header'
import { Outlet } from 'react-router-dom';

const CongNo = () => {
  const titlez = "Công nợ";
    const process = [
      // {
      //   url: 'quy-trinh',
      //   content: "Quy trình"
      // },
      {
        url: 'tong-hop-no-phai-thu',
        content: "Tổng hợp nợ phải thu"
      },
      {
        url: 'chi-tiet-no-phai-thu',
        content: "Chi tiết nợ phải thu"
      },
      {
        url: 'bao-cao',
        content: "Báo cáo"
      },
    ]
  return (
    <div>
      <Header title="Công nợ" titlez={titlez} process={process} />
      <Outlet />
    </div>
  )
}

export default CongNo