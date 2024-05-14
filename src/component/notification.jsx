import React from "react";
import { Flex, Button, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { notification } from "./../services/notification.service";

function NotificationComponent(props) {
  const DetailAnnouncement = (entityId, type) => {
    return type === "THU" ? (
      <Link to={`/ban-hang/don-dat-hang/xem/${entityId}`}>Xem chi tiết</Link>
    ) : (
      <Link to={`/ban-hang/chung-tu-ban-hang/xem/${entityId}`}>Xem chi tiết</Link>
    );
  };

  const confirm = async () => {
    try {
      const res = await notification.updateResolve(props.id);
      console.log(res);
      message.success("Cập nhật thành công");
    } catch (err) {
      console.error(err);
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <Flex
      justify="space-between"
      className={`border border-gray-300 shadow-md rounded-lg bg-pink-100 p-2 ${props.className}`}
    >
      <p>{props.message}</p>
      <Flex gap={10} align="center" className="text-blue-500">
        {console.log(props.id,props.entityId)}
        {DetailAnnouncement(props.entityId, props.type)}
        {props.resolved ? (
          <Button disabled>Đã xử lý</Button>
        ) : (
          <Popconfirm
            title="Bạn chắc chắn đã xử lý thông báo này?"
            onConfirm={confirm}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button className="bg-pink-200">Xác nhận xử lý</Button>
          </Popconfirm>
        )}
      </Flex>
    </Flex>
  );
}

export default NotificationComponent;
