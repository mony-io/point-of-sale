import React, { useState } from "react";
import { AiFillDelete, AiOutlineSearch } from "react-icons/ai";
import Cart from "../components/sales/Cart";
import Main from "../components/sales/Main";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { Space, Spin } from 'antd';
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const fetchProducts = async () => {
  const { data } = await axios.get('http://localhost:3001/product_card');
  return data
}



const Sale = () => {

  const [cartItems, setCartItems] = useState([]);
  const { data, isLoading } = useQuery('products_card', fetchProducts);
  //console.log(cartItems)

  //play sound 
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.product_id === product.product_id && x.qty < x.old_qty ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
      if (exist.qty >= exist.old_qty) {
        playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
        toast.error("🦄 សូមអភ័យទោស! ចំនួនផលិតផលរបស់អ្នកមិនគ្រប់គ្រាន់ទេ", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      setCartItems([...cartItems, { ...product, qty: 1, old_qty: product.qty }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist.qty === 1 || exist.qty === '') {
      setCartItems(cartItems.filter((x) => x.product_id !== product.product_id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.product_id === product.product_id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const onChangeHandler = (product, qty) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.product_id === product.product_id && qty <= x.old_qty ? { ...exist, qty: qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: qty, old_qty: product.qty }]);
    }
  }

  return (
    <>
      <div className="flex-1">
        <Navbar />
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
                    onChangeHandler={onChangeHandler}
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
            {!isLoading ? <Main products={data} onAdd={onAdd} /> : <Space direction="vertical" style={{ width: '100%' }}>
              <Space className="grid items-center mt-[300px]">
                <Spin tip="Loading" size="large" className="text-black">
                  <div className="content" />
                </Spin>
              </Space>
            </Space>
            }
          </div>
        </div>
        {/* toast message */}
        <ToastContainer />
      </div>

    </>
  );
};

export default Sale;
