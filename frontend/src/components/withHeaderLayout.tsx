import Navbar from "../pages/Navbar";
import { Outlet } from "react-router-dom";

const WithHeaderLayOut = () => {
  return (
    <>
    {/* <Navbar/> */}
      <Outlet />
    </>
  );
};

export default WithHeaderLayOut;