import React from "react";
import { Flex } from "antd";
import Notification from "../../component/notification";

const ThongBao = () => {
  return (
    <div className="ml-5 ">
      <h1 className="font-bold text-3xl mb-3">Thông báo</h1>
      <Flex vertical gap={20}>
        <Notification className="!w-3/4" />
        <Notification className="!w-3/4" />
        <Notification className="!w-3/4" />
        <Notification className="!w-3/4" />
        <Notification className="!w-3/4" />
        <Notification className="!w-3/4" />
      </Flex>
    </div>
  );
};

export default ThongBao;
