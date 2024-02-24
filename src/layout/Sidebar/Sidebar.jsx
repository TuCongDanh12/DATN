import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SidebarFooter } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../utils/theme";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FaCoins } from "react-icons/fa";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { MdOutlineDashboard } from "react-icons/md";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SellIcon from '@mui/icons-material/Sell';
import { ShoppingCart } from "@mui/icons-material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import "./Sidebar.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({toggled, handleToggleSidebar, isCollapsed, handleIsCollapsed}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Tổng quan");

  return (
   <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          // color: "#6870fa !important",
          bgcolor: "#FFF6D8 !important",
        },
        "& .pro-menu-item": {
          // margin: "0 5px !important",
          // borderRadius: "8px !important",
        },
        "& .pro-menu-item.active .pro-item-content>p":{
          fontWeight: 'bold',
        }, 
        "& .css-1l8icbj":{
          paddingLeft: "5% !important"
        }, 
      }}
    >
      <ProSidebar collapsed={isCollapsed}
   toggled={toggled}
   onToggle={handleToggleSidebar}
   breakPoint="md"
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => handleIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  <FaCoins /> Big Ledger
                </Typography>
                <IconButton onClick={() => handleIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Chung
            </Typography>

            <Item
              title="Tổng quan"
              to="/"
              icon={<MdOutlineDashboard />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Mua hàng"
              to="/mua-hang"
              icon={<SellIcon />}
              selected={selected}
              setSelected={setSelected}
              />
            <Item
              title="Bán hàng"
              to="/ban-hang"
              icon={<ShoppingCart />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tiền mặt"
              to="/tien-mat"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Tiền gửi"
              to="/tien-gui"
              icon={<AccountBalanceIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Công nợ"
              to="/cong-no"
              icon={<FaCoins />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Báo cáo"
              to="/bao-cao"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Hỗ trợ
            </Typography>
            <Item
              title="Thông báo"
              to="/thong-bao"
              icon={<NotificationsNoneIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Hỗ trợ"
              to="/ho-tro"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Cài đặt"
              to="/cai-dat"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>

        <SidebarFooter>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <div className="side-menu-footer">
              <div className="avatar">
                <img src={"/assets/user.jpg"} alt="user" />
              </div>
              <div className="user-info">
                <Typography variant="h5" color={colors.grey[100]} hidden={isCollapsed}>
                  Vecfonds
                </Typography>
                <Typography variant="h5" color={colors.grey[100]} hidden={isCollapsed}>
                  vecfonds@gmail.com
                </Typography>

              </div>
            </div>
          </Box>
        </SidebarFooter>


        {/* {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )} */}
      </ProSidebar>
    </Box> 
  );
};

export default Sidebar;
