import Navbar from "../pages/Navbar";
import { Outlet } from "react-router-dom";

const WithHeaderLayOut = () => {
  return (
    <>
      <div className="top-0 z-[100] left-0 w-full absolute">
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default WithHeaderLayOut;