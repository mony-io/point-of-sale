import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import Clock from "../components/date-time/Clock";
import Dates from "../components/date-time/Dates";

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
      <div className="flex items-center">
        <button
          id="dropdownNotificationButton"
          data-dropdown-toggle="dropdownNotification"
          className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
          type="button"
        >
          <svg
            class="w-6 h-8"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
          <div class="relative flex">
            <div class="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
          </div>
        </button>
        <div
          onClick={toggleHandler}
          className="mr-6 flex justify-between relative items-center bg-[#333] p-2 px-3 cursor-pointer"
        >
          <FaUserCircle size={22} className="mr-2" />
          <h3 className="text-sm">Admin</h3>
          {isToggle && (
            <div className="bg-[#333] absolute h-96 w-80 top-9 right-0 rounded">
              <h2>Hello</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
