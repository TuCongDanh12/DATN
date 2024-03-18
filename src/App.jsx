import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./layout/Sidebar/Sidebar";
import { useState } from "react";
import React from "react";
import { ColorModeContext, useMode } from "./utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { FaBars } from "react-icons/fa";
import TongQuan from './page/TongQuan/TongQuan';
import MuaHang from './page/MuaHang/MuaHang';
import QuyTrinhMuaHang from './page/MuaHang/components/QuyTrinhMuaHang/QuyTrinhMuaHang';
import BanHang from './page/BanHang/BanHang';
import QuyTrinhBanHang from './page/BanHang/scenes/QuyTrinhBanHang/QuyTrinhBanHang';
import DonDatHang from './page/BanHang/scenes/DonDatHang/DonDatHang';
import ChungTuBanHang from './page/BanHang/scenes/ChungTuBanHang/ChungTuBanHang';
import HoaDonBanHang from './page/BanHang/scenes/HoaDonBanHang/HoaDonBanHang';
import ThuTienTheoHoaDon from './page/BanHang/scenes/ThuTienTheoHoaDon/ThuTienTheoHoaDon';
import TienMat from './page/TienMat/TienMat';
import TienGui from './page/TienGui/TienGui';
import CongNo from './page/CongNo/CongNo';
import BaoCao from './page/BaoCao/BaoCao';
import ThongBao from './page/ThongBao/ThongBao';
import HoTro from './page/HoTro/HoTro';
import CaiDat from './page/CaiDat/CaiDat';
import XemDonDatHang from './page/BanHang/scenes/DonDatHang/scenes/XemDonDatHang/XemDonDatHang';
import XemChungTuBanHang from "./page/BanHang/scenes/ChungTuBanHang/scenes/XemChungTuBanHang";
import XemHoaDonBanHang from "./page/BanHang/scenes/HoaDonBanHang/scenes/XemHoaDonBanHang";
import TimKiemThuTien from "./page/BanHang/scenes/ThuTienTheoHoaDon/scenes/TimKiemThuTien";
import ThuTien from "./page/BanHang/scenes/ThuTienTheoHoaDon/scenes/ThuTien";
import DonMuaHang from './page/MuaHang/components/DonMuaHang/DonMuaHang';
import ListChungtu from './component/Table/table-chungtu';
import MuahangChungtu from "./component/Chungtu/Muahang/chungtu";
import TablePhieuChi from './component/Table/table-phieuchi';
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import DoiTuong from "./page/DoiTuong/DoiTuong";
import NhaCungCap from './page/DoiTuong/scenes/NhaCungCap/NhaCungCap';
import NhomNhaCungCap from './page/DoiTuong/scenes/NhomNhaCungCap/NhomNhaCungCap';
import KhachHang from './page/DoiTuong/scenes/KhachHang/KhachHang';
import NhomKhachHang from './page/DoiTuong/scenes/NhomKhachHang/NhomKhachHang';
import SanPham from './page/DoiTuong/scenes/SanPham/SanPham';
import TaiChinh from './page/DoiTuong/scenes/TaiChinh/TaiChinh';
import ThemNhaCungCap from "./page/DoiTuong/scenes/NhaCungCap/scenes/ThemNhaCungCap/ThemNhaCungCap";


function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handleIsCollapsed = (value) => {
    setIsCollapsed(value);
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`app ${toggled ? "toggled" : ""}`}>
          {!isLogin && <Sidebar
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
            isCollapsed={isCollapsed}
            handleIsCollapsed={handleIsCollapsed}
          />}

          <main className="content">
            {!isLogin && <div
              className="btn-toggle"
              onClick={() => handleToggleSidebar(true)}
            >
              <FaBars size={20} />
            </div>}
            <Routes>
              <Route path="/dang-nhap" element={<Login />} />
              <Route path="/dang-ky" element={<Signup />} />
              <Route path="/" element={<TongQuan />} />
              <Route path="doi-tuong" element={<DoiTuong />}>
                <Route path="nha-cung-cap" element={<NhaCungCap />} />
                <Route path="nhom-nha-cung-cap" element={<NhomNhaCungCap />} />
                <Route path="khach-hang" element={<KhachHang />} />
                <Route path="nhom-khach-hang" element={<NhomKhachHang />} />
                <Route path="san-pham" element={<SanPham />} />
                <Route path="tai-chinh" element={<TaiChinh />} />

              </Route>
              <Route path="doi-tuong/nha-cung-cap/them" element={<ThemNhaCungCap disabled={false} />} />
              <Route path="doi-tuong/nha-cung-cap/xem/:id" element={<ThemNhaCungCap disabled={true} />} />
              <Route path="doi-tuong/nha-cung-cap/chinh-sua/:id" element={<ThemNhaCungCap disabled={false} />} />

              <Route path="/mua-hang" element={<MuaHang />}>
                <Route path="quy-trinh" element={<QuyTrinhMuaHang />} />
                <Route path="don-mua-hang" element={<DonMuaHang />} />
                <Route
                  path="chung-tu-mua-hang"
                  element={<ListChungtu />}
                ></Route>
                <Route
                  path="chung-tu-mua-hang/id"
                  element={<MuahangChungtu />}
                />

                <Route path="phieu-chi" element={<TablePhieuChi />} />
                {/* <Route path="tra-tien" element={<Tratien />} /> */}
              </Route>
              <Route path="/ban-hang" element={<BanHang />}>
                <Route path="quy-trinh" element={<QuyTrinhBanHang />} />
                <Route path="don-dat-hang" element={<DonDatHang />} />
                <Route path="chung-tu-ban-hang" element={<ChungTuBanHang />} />
                <Route path="hoa-don-ban-hang" element={<HoaDonBanHang />} />
                <Route
                  path="thu-tien-theo-hoa-don"
                  element={<ThuTienTheoHoaDon />}
                />
              </Route>
              <Route path="ban-hang/don-dat-hang/xem" element={<XemDonDatHang />} />
              <Route path="ban-hang/chung-tu-ban-hang/xem" element={<XemChungTuBanHang />} />
              <Route path="ban-hang/hoa-don-ban-hang/xem" element={<XemHoaDonBanHang />} />
              <Route path="ban-hang/thu-tien-theo-hoa-don/timkiem" element={<TimKiemThuTien />} />
              <Route path="ban-hang/thu-tien-theo-hoa-don/timkiem/thutien" element={<ThuTien />} />
              <Route path="ban-hang/thu-tien-theo-hoa-don/xem" element={<ThuTien />} />
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
    </ColorModeContext.Provider>
  );
}

export default App;
