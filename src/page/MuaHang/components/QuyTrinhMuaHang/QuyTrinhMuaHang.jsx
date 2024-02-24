import React from 'react'
import Process from '../../../../component/Process/Process'

const QuyTrinhMuaHang = () => {
  const process = [
    {
      url: 'don-mua-hang',
      content: "Đơn mua hàng"
    },
    {
      url: 'chung-tu-mua-hang',
      content: "Chứng từ mua hàng"
    },
    {
      url: 'phieu-chi',
      content: "Phiếu chi"
    },

  ]
      return (
        <Process process={process} />
      )
}

export default QuyTrinhMuaHang