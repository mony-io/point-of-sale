import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import Clock from "../components/date-time/Clock"
import Dates from "../components/date-time/Dates"

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);

  const toggleHandler = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className="flex h-14 bg-[#35589A] items-center justify-between font-bold text-slate-300">
      <div className="ml-12">Dashboard</div>
      <div className="flex">
        <Clock />
        <Dates />
      </div>
      <div onClick={toggleHandler} className="mr-6 flex justify-between relative items-center bg-[#333] p-1 pr-2 pl-2 rounded cursor-pointer">
        <FaUserCircle size={22} className="mr-2" />
        <h3 className="text-sm">Admin</h3>
        {isToggle &&
          <div className="bg-[#333] absolute h-96 w-80 top-9 right-0 rounded">
            <h2>Hello</h2>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;

