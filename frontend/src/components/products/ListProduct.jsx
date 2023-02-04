import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
const ListProduct = () => {

  const fetchProducts = async () => {

  }

  return (
    <>
      <div className="p-5 h-screen bg-gray-100 flex-1">
        <h1 className="text-xl mb-5 font-bold text-center">Your Books</h1>
        <div className="flex justify-between mb-3">
          <button className="hidden md:block ml-1 px-4 py-1.5 rounded-lg font-medium tracking-wider bg-teal-400 text-neutral-900 hover:text-white hover:shadow">
            Add Books
          </button>
          <input
            className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl shadow-sm text-center p-2.5 hover:shadow mr-2"
            placeholder="Search..."
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
                  image
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  Code
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  Name
                </th>
                <th>
                  Brand
                </th>
                <th>
                  Category
                </th>
                <th>
                  Cost
                </th>
                <th>
                  Price
                </th>
                <th>
                  Quanity
                </th>
                <th>
                  unit
                </th>
                <th>
                  Alert Quanity
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className="text-center bg-white border-b-2 border-gray-100"
                key={"1"}
              >
                <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                  {"100"}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <div className="w-[40px] h-[50px] flex justify-center p-1 bg-white border rounded ">
                    <img src="http://localhost:3001/images/1675009127997code.png" className="object-cover w-[30px] h-[40px]" />
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {"err"}
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
                  <button
                    className="mx-2 px-3 py-1.5 rounded font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow"
                  >
                    <BsPencilSquare size={20} />
                  </button>
                  <button
                    className="px-3 py-1.5 rounded font-medium tracking-wider text-red-600 bg-red-200 hover:shadow"
                  >
                    <AiTwotoneDelete size={20} />
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
