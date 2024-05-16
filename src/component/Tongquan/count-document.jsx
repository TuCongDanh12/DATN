import React, { useEffect, useState } from "react";
import { Flex } from "antd";
import { DiffTwoTone, SnippetsTwoTone, CopyTwoTone } from "@ant-design/icons";
import axios from "axios";

import banHangService from "./../../services/banHang.service";
const initialItems = [
  {
    name: "Số đơn hàng",
    icon: <DiffTwoTone style={{ fontSize: "30px" }} />,
    backgroundColor: "#D4EAC7",
    number: null,
  },
  {
    name: "Số chứng từ",
    icon: <SnippetsTwoTone style={{ fontSize: "30px" }} />,
    backgroundColor: "#C7EAF4",
    number: null,
  },
  {
    name: "Số phiếu thu",
    icon: <CopyTwoTone style={{ fontSize: "30px" }} />,
    backgroundColor: "#F4C7E1",
    number: null,
  },
];

function Countdocument() {
  const [items, setItems] = useState(initialItems);
  const getCountDonhang = async () => {
    try {
      const response = await banHangService.getListDonBanHang();
      console.log(response.data.result.data);
      return response.data.result.data.length;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return 0;
    }
  };

  const getCountChungtu = async () => {
    try {
      const response = await banHangService.getListChungTuBan();
      console.log(response.data.result.data);
      return response.data.result.data.length;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return 0;
    }
  };

  const getCountPhieuthuTienmat = async () => {
    try {
      const response = await banHangService.getListPhieuThuTienMat();
      return response.data.result.data.length;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return 0;
    }
  };
  const getCountPhieuthuTiengui = async () => {
    try {
      const response = await banHangService.getListPhieuThuTienGui();
      return response.data.result.data.length;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchCounts = async () => {
      const donhang = await getCountDonhang();
      const chungtu = await getCountChungtu();
      const phieuthu =
        (await getCountPhieuthuTienmat()) + (await getCountPhieuthuTiengui());
      items[0].number = donhang;
      items[1].number = chungtu;
      items[2].number = phieuthu;
      const updateitems = items;

      setItems(updateitems);
    };

    fetchCounts();
  }, []);

  return (
    <Flex gap={50}>
      {items.map((item) => {
        return (
          <Flex
            gap={20}
            align="center"
            justify="center"
            className="p-5 rounded-md"
            style={{ backgroundColor: item.backgroundColor }}
          >
            <div>{item.icon}</div>
            <Flex vertical gap={10}>
              <p className="text-xl font-bold">{item.name}</p>
              <p className="text-lg">{item.number}</p>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default Countdocument;
