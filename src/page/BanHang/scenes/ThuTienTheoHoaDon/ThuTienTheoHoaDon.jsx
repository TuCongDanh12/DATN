import React from "react";
import {
  Tabs,
} from "antd";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ThuTienMat from "./components/ThuTienMat/ThuTienMat";
import ThuTienGui from "./components/ThuTienGui/ThuTienGui";

const ThuTienTheoHoaDon = () => {
  return (
    <div className="my-4 mr-4">
      <Tabs
        defaultActiveKey="1"
        tabPosition={'left'}
        items={[
          {
            key: 1,
            label: `Tiền mặt`,
            children: <ThuTienMat />,
            icon: <LocalAtmIcon />,
          },
          {
            key: 2,
            label: `Tiền gửi`,
            children: <ThuTienGui />,
            icon: <AccountBalanceIcon />,
          }
        ]}
      />
    </div>
  );
};

export default ThuTienTheoHoaDon;
