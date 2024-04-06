import React, { useState } from "react";
import { Modal, Button } from "antd";

function Notification(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className={`border border-gray-300 shadow-md rounded-lg bg-pink-100 p-2 ${props.className}`}
    >
      <p className="font-bold">Tới hạn thanh toán</p>
      <p>
        <i>Thông báo</i>: Sắp tới hạn thanh toán cho hóa đơn{" "}
        <strong onClick={showModal} className="cursor-pointer">
          HĐ0001
        </strong>
      </p>
      <Modal
        title="Thông báo cho hóa đơn HĐ0001"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          <i>Nhà cung cấp:</i> <strong>Từ Công Danh</strong>
        </p>
        <p>
          <i>
            Thời hạn thanh toán: còn <strong>5</strong> ngày
          </i>
        </p>
        <p>
          <i>Số tiền phải thanh toán:</i> <strong>5 000 000</strong> đồng
        </p>
        <a className='text-blue-500' href='#'>Xem chi tiết hóa đơn</a>
      </Modal>
    </div>
  );
}

export default Notification;
