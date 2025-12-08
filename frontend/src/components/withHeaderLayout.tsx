import Navbar from "../pages/Navbar";
import { Outlet } from "react-router-dom";

const WithHeaderLayOut = () => {
  return (
    <>
      <div className="top-0 absolute z-[100] left-0 w-full">
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default WithHeaderLayOut;