import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./layout/Sidebar/Sidebar";
import { useState } from "react";
import React from 'react'
import { ColorModeContext, useMode } from "./utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { FaBars } from "react-icons/fa";
import TongQuan from './page/TongQuan/TongQuan';
import MuaHang from './page/MuaHang/MuaHang';
import QuyTrinhMuaHang from './page/MuaHang/components/QuyTrinhMuaHang/QuyTrinhMuaHang';
import BanHang from './page/BanHang/BanHang';
import QuyTrinhBanHang from './page/BanHang/components/QuyTrinhBanHang/QuyTrinhBanHang';
import DonDatHang from './page/BanHang/components/DonDatHang/DonDatHang';
import ChungTuBanHang from './page/BanHang/components/ChungTuBanHang/ChungTuBanHang';
import HoaDonBanHang from './page/BanHang/components/HoaDonBanHang/HoaDonBanHang';
import ThuTienTheoHoaDon from './page/BanHang/components/ThuTienTheoHoaDon';
import TienMat from './page/TienMat/TienMat';
import TienGui from './page/TienGui/TienGui';
import CongNo from './page/CongNo/CongNo';
import BaoCao from './page/BaoCao/BaoCao';
import ThongBao from './page/ThongBao/ThongBao';
import HoTro from './page/HoTro/HoTro';
import CaiDat from './page/CaiDat/CaiDat';


function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);


  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handleIsCollapsed = (value) => {
    setIsCollapsed(value);
  };
  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`app ${toggled ? 'toggled' : ''}`}>
          <Sidebar
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            isCollapsed={isCollapsed}
            handleIsCollapsed={handleIsCollapsed}
          />

          <main className="content">
            <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
              <FaBars size={20} />
            </div>
            <Routes>
              <Route path="/" element={<TongQuan />} />
              <Route path="/mua-hang" element={<MuaHang />}>
                <Route path="quy-trinh" element={<QuyTrinhMuaHang />} />
              </Route>
              <Route path="/ban-hang" element={<BanHang />}>
                <Route path="quy-trinh" element={<QuyTrinhBanHang />} />
                <Route path="don-dat-hang" element={<DonDatHang />} />
                <Route path="chung-tu-ban-hang" element={<ChungTuBanHang />} />
                <Route path="hoa-don-ban-hang" element={<HoaDonBanHang />} />
                <Route path="thu-tien-theo-hoa-don" element={<ThuTienTheoHoaDon />} />
              </Route>
              <Route path="/tien-mat" element={<TienMat />} />
              <Route path="/tien-gui" element={<TienGui />} />
              <Route path="/cong-no" element={<CongNo />} />
              <Route path="/bao-cao" element={<BaoCao />} />
              <Route path="/thong-bao" element={<ThongBao />} />
              <Route path="/ho-tro" element={<HoTro />} />
              <Route path="/cai-dat" element={<CaiDat />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >

  );
}

export default App;
