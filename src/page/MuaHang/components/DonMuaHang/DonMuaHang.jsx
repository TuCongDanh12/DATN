import React, { useEffect } from "react";
import { Flex } from "antd";
import TableMuahang from "../../../../component/Table/table-muahang";
import SearchInput from "../../../../component/Search";
import muahangService from "../../../../services/muahang.service";
import { useDispatch, useSelector } from "react-redux";
import { getListDonMuahang, muahangSelector } from "../../../../store/features/muahangSlice";
// import MuahangChungtu from '../../../../component/Chungtu/Muahang/chungtu'
const DonMuaHang = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(muahangSelector);

  useEffect(()=>{
    dispatch(getListDonMuahang());
  }, [])
  
  // const fetchData = async() => {
  //   const don = await muahangService.getListDonMuahang();
  //   console.log(don);
  // }
  // useEffect(() => {
  //    fetchData();
  // },[]);

  return (
    <div className="mx-5 my-5">
      <Flex vertical className=" bg-white py-5 px-5">
        {/* <TableMuahang/> */}
        <SearchInput />
        <TableMuahang />
      </Flex>
    </div>
  );
};

export default DonMuaHang;
