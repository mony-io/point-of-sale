import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { BsInboxes, BsBarChartFill } from 'react-icons/bs';
import { VscInbox } from 'react-icons/vsc';
import { HiShoppingCart } from 'react-icons/hi';
import { TbReportSearch } from 'react-icons/tb';
import { RiShareCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const dashboard = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Sales $',
          data: [18127, 22201, 19490, 17938, 24182, 17842, 22475],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgb(53, 162, 235, 0.4',
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Daily Revenue',
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <div className="flex-1 h-screen overflow-auto">
      <Navbar />
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-blue-400 mt-3">250</h2>
              <span className="text-slate-500 mb-1">ចំនួនការលក់</span>
            </div>
            <div className="bg-blue-400 h-24 flex items-center w-32 justify-center">
              <FiShoppingCart size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-green-400 mt-3">60</h2>
              <span className="text-slate-500 mb-1">អតិថិជន</span>
            </div>
            <div className="bg-green-400 h-24 flex items-center w-32 justify-center">
              <FaUsers size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-red-400 mt-3">25</h2>
              <span className="text-slate-500 mb-1">ផលិតផល</span>
            </div>
            <div className="bg-red-400 h-24 flex items-center w-32 justify-center">
              <BsInboxes size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-orange-400 mt-3">
                12
              </h2>
              <span className="text-slate-500 mb-1">ប្រភេទ</span>
            </div>
            <div className="bg-orange-400 h-24 flex items-center w-32 justify-center">
              <VscInbox size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-2 cursor-pointer">
          <Link to="/sale">
            <div className="bg-slate-100 h-12 flex justify-start text-slate-500 items-center m-2 rounded-sm hover:bg-blue-400 duration-200 hover:text-[#fff]">
              <div className="border-gray-400 border-r-2 pr-3">
                <HiShoppingCart size={24} className="ml-4 " />
              </div>
              <span className="text-sm ml-8">បញ្ជាការលក់</span>
            </div>
          </Link>
        </div>
        <div className="col-span-2">
          <div className="bg-slate-100 h-12 flex justify-start items-center text-slate-500 m-2 cursor-pointer rounded-sm hover:bg-blue-400 duration-200 hover:text-[#fff]">
            <div className="border-gray-400 border-r-2 pr-3">
              <RiShareCircleFill size={24} className="ml-4" />
            </div>
            <span className="text-sm ml-8">ចាប់ផ្តើមការទទួលថ្មី</span>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-slate-100 h-12 flex justify-start items-center text-slate-500 m-2 cursor-pointer rounded-sm hover:bg-blue-400 duration-200 hover:text-[#fff]">
            <div className="border-gray-400 border-r-2 pr-3">
              <TbReportSearch size={24} className="ml-4" />
            </div>
            <span className="text-sm ml-8">របាយការណ៍លក់លម្អិតថ្ងៃនេះ</span>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-slate-100 h-12 flex justify-start items-center text-slate-500 m-2 cursor-pointer rounded-sm hover:bg-blue-400 duration-200 hover:text-[#fff]">
            <div className="border-gray-400 border-r-2 pr-3">
              <BsBarChartFill size={24} className="ml-4" />
            </div>
            <span className="text-sm ml-8">របាយការណ៍សង្ខេបធាតុថ្ងៃនេះ</span>
          </div>
        </div>
        <div className="col-span-4 m-2 mb-4 bg-white">
          <h2 className="text-center text-xl mt-3 py-9 text-slate-600">
            របាយការណ៍នៃការលក់
          </h2>
          <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
