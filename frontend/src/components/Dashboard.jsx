import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { BsInboxes, BsBarChartFill } from "react-icons/bs";
import { VscInbox } from "react-icons/vsc";
import { HiShoppingCart } from "react-icons/hi";
import { TbReportSearch } from "react-icons/tb";
import { RiShareCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const dashboard = () => {
  return (
    <div className="h-screen flex-1">
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-blue-300 mt-3">250</h2>
              <span className="text-slate-500 mb-1">ចំនួនការលក់</span>
            </div>
            <div className="bg-blue-300 h-24 flex items-center w-32 justify-center">
              <FiShoppingCart size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-green-300 mt-3">60</h2>
              <span className="text-slate-500 mb-1">អតិថិជន</span>
            </div>
            <div className="bg-green-300 h-24 flex items-center w-32 justify-center">
              <FaUsers size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-red-300 mt-3">25</h2>
              <span className="text-slate-500 mb-1">ផលិតផល</span>
            </div>
            <div className="bg-red-300 h-24 flex items-center w-32 justify-center">
              <BsInboxes size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-orange-300 mt-3">
                12
              </h2>
              <span className="text-slate-500 mb-1">ប្រភេទ</span>
            </div>
            <div className="bg-orange-300 h-24 flex items-center w-32 justify-center">
              <VscInbox size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-2 cursor-pointer">
        <Link to="/sale">
          <div className="bg-slate-100 h-12 flex justify-start items-center m-2 rounded-sm hover:bg-blue-300">
            <div className="border-gray-400 border-r-2 pr-3">
              <HiShoppingCart size={24} className="ml-4 text-slate-500" />
            </div>
            <span className="text-slate-500 text-sm ml-8">
              ការលក់
            </span>
          </div>
        </Link>
        </div>
        <div className="col-span-2">
          <div className="bg-slate-100 h-12 flex justify-start items-center m-2 rounded-sm hover:bg-blue-300">
            <div className="border-gray-400 border-r-2 pr-3">
              <RiShareCircleFill size={24} className="ml-4 text-slate-500" />
            </div>
            <span className="text-slate-500 text-sm ml-8">
              Start A New recieving
            </span>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-slate-100 h-12 flex justify-start items-center m-2 rounded-sm hover:bg-blue-300">
            <div className="border-gray-400 border-r-2 pr-3">
              <TbReportSearch size={24} className="ml-4 text-slate-500" />
            </div>
            <span className="text-slate-500 text-sm ml-8">
              Today's detail sales report
            </span>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-slate-100 h-12 flex justify-start items-center m-2 rounded-sm hover:bg-blue-300">
            <div className="border-gray-400 border-r-2 pr-3">
              <BsBarChartFill size={24} className="ml-4 text-slate-500" />
            </div>
            <span className="text-slate-500 text-sm ml-8">
              Today's summary items report
            </span>
          </div>
        </div>
        <div className="col-span-4 bg-white h-[400px] m-2 mb-4">
          <h2 className="text-center text-xl mt-3 text-slate-600">របាយការណ៍នៃការលក់</h2>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
