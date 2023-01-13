import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";

const ListProduct = () => {
  return (
    <>
        <div className="flex-1">
          <div className="grid w-full grid-cols-4 gap-4">
            <table class="col-span-4 mt-20 mx-4 text-sm text-left">
              <thead class="bg-gray-50 h-14 dark:bg-[#fff]">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Product unit
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-[#bbb] h-14">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td class="px-6 py-4">Sliver</td>
                  <td class="px-6 py-4">Laptop</td>
                  <td class="px-6 py-4">$2999</td>
                  <td class="px-6 py-4">
                    <div className="flex items-center">
                      <div className="bg-blue-400 p-1 mr-2 rounded-md text-blue-100 cursor-pointer">
                        <HiOutlinePencilAlt size={20} />
                      </div>
                      <AiFillDelete
                        size={28}
                        className="bg-red-400 p-[4px] text-[#ffffff] rounded-md cursor-pointer"
                      />
                    </div>
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
