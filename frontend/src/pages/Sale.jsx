import React, { useState } from "react";
import { AiFillDelete, AiOutlineSearch } from "react-icons/ai";
import Cart from "../components/sales/Cart";
import data from "../data.js";
import Main from "../components/sales/Main";

const Sale = () => {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <>
      <div className="flex-1">
        <div className="grid grid-cols-5 gap-4 ml-4 mr-4 h-screen">
          <div className="col-span-2 mr-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 h-12">
                <div className="flex mt-4">
                  <select
                    name=""
                    id=""
                    className="w-full h-9 outline-none border"
                  >
                    <option value="all">លក់ដុំ</option>
                    <option value="all">លក់រាយ</option>
                  </select>
                </div>
              </div>
              <div className="col-span-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4 flex justify-between bg-[#333] p-2 items-center text-slate-300">
                    <span className="ml-6">ផលិតផល</span>
                    <span>ចំនួន</span>
                    <span>តម្លៃ</span>
                    <span className="text-slate-300 mr-8">
                      <AiFillDelete size={22} />
                    </span>
                  </div>
                  <Cart
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 -ml-6 mt-1 overflow-auto scrollbar h-[700px]">
            <div className="h-9 mt-3 px-1 flex justify-between items-center bg-white mx-3">
              <div className="flex items-center rounded-sm overflow-hidden">
                <input
                  type="search"
                  placeholder="search"
                  className="p-1 outline-none w-32 bg-[#ddd]"
                />
                <div className="bg-[#333] text-[#fff] p-[6px]">
                  <AiOutlineSearch size={20} />
                </div>
              </div>
              <div className="flex">
                <select
                  id="default"
                  class="bg-gray-50 border rounded-sm w-32 border-gray-300 text-gray-900 text-sm px-2 py-[2px] block dark:bg-[#333] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option selected>អំពូល</option>
                  <option value="US">ការោ</option>
                  <option value="CA">ដែក</option>
                  <option value="FR">សុីម៉ង់</option>
                  <option value="DE">ថ្នាំលាប់</option>
                </select>
              </div>
            </div>
            <Main products={products} onAdd={onAdd} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sale;
