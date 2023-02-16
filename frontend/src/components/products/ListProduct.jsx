import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import Navbar from '../Navbar'
const ListProduct = () => {
  return (
    <>
      <div className="h-screen bg-gray-100 flex-1">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-5 font-bold text-center">ផលិតផលរបស់អ្នក</h1>
          <div className="flex justify-between mb-3">
            <button className="hidden md:block ml-1 px-6 py-1.5 rounded-sm font-medium tracking-wider bg-teal-400 hover:bg-teal-500 duration-200 text-white hover:shadow">
              បន្ថែម
            </button>
            <input
              className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2.5 hover:shadow mr-2"
              placeholder="ស្វែងរក..."
              type="text"
              style={{ width: "20rem" }}
            />
          </div>
          <div className="rounded-lg shadow overflow-auto hidden md:block">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-gray-200">
                <tr className="border-b-2 border-gray-100">
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    №
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    រូបភាព
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    កូដ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ឈ្មោះ
                  </th>
                  <th>ម៉ាក</th>
                  <th>ប្រភេទ</th>
                  <th>ការចំណាយ</th>
                  <th>តម្លៃ</th>
                  <th>បរិមាណ</th>
                  <th>ឯកតា</th>
                  <th>បរិមាណជូនដំណឹង</th>
                  <th>សកម្មភាព</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="text-center bg-white border-b-2 border-gray-100"
                  key={"1"}
                >
                  <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                    {"1"}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <div className="w-[40px] h-[50px] flex justify-center p-1 bg-white border rounded ">
                      <img
                        src="http://localhost:3001/images/1675009127997code.png"
                        className="object-cover w-[30px] h-[40px]"
                      />
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    012
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    date
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    date
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    date
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    123
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    123
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    123
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    123
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    123
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button className="mx-2 px-3 py-1.5 rounded font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow">
                      <BsPencilSquare size={20} />
                    </button>
                    <button className="px-3 py-1.5 rounded font-medium tracking-wider text-red-600 bg-red-200 hover:shadow">
                      <AiTwotoneDelete size={20} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
