import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import Navbar from '../Navbar'
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { Modal, Button } from "antd";
import { useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const fetchAllProducts = async () => {
  const { data } = await axios.get('http://localhost:3001/products');
  return data
}

const ListProduct = () => {

  const { data } = useQuery('getProducts', fetchAllProducts);
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('')

  //play sound 
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  // open modal function
  const showModal = () => {
    setOpen(true);
  };

  // handle close
  const onClose = () => {
    setOpen(false)
    setId('')
    setName('')
    setLoading(false)
  }

  // handle delete
  const handleDelete = async () => {
    try {
      if (id !== '') {
        setLoading(true)
        const res = await axios.delete(`http://localhost:3001/product/${id}`);
        if (res.data.success) {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.success(`${res.data.message}`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setOpen(false)
          setLoading(false)
          setId('')
        } else {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.error(`${res.data.message}`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setOpen(false)
          setLoading(false)
          setId('')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  // ======== delete  =========
  const deleteMutaion = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(['getProducts'])
    }
  });

  return (
    <>
      <div className="h-screen bg-gray-100 overflow-auto flex-1">
        <Navbar />
        <div className="p-5 h-screen">
          <h1 className="text-xl mb-2 text-left mt-3">បញ្ជីផលិតផល</h1>
          <div className="w-full h-1 bg-blue-400 mb-7 shadow-sm"></div>
          <div className="flex justify-between mb-3">
            <Link to={'/addproduct'}>
              <button className="hidden md:block ml-1 px-6 py-1.5 rounded-sm font-medium tracking-wider bg-teal-400 hover:bg-teal-500 duration-200 text-white hover:shadow">
                បន្ថែម
              </button>
            </Link>
            <input
              className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2.5 hover:shadow mr-2"
              placeholder="ស្វែងរក..."
              type="text"
              style={{ width: "20rem" }}
            />
          </div>
          <div className="rounded-lg shadow overflow-auto hidden md:block h-[600px]">
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
                {data && data.map((item, index) => {
                  return (
                    <tr
                      className="text-center bg-white border-b-2 border-gray-100"
                      key={index + 1}
                    >
                      <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <div className="w-[40px] h-[50px] flex justify-center p-1 bg-white border rounded ">
                          <img
                            src={item.product_image && `${item.product_image}`}
                            className="object-cover w-[30px] h-[40px]"
                          />

                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.product_code}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.product_name}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.brandName}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.categoryName}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.unit_price}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.qty}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.unit}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.reorder_number}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <Link to={`/update-product/${item.product_id}`}>
                          <button className="mx-2 px-3 py-1.5 rounded font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow">
                            <BsPencilSquare size={20} />
                          </button>
                        </Link>
                        <button className="px-3 py-1.5 rounded font-medium tracking-wider text-red-600 bg-red-200 hover:shadow" onClick={
                          () => {
                            showModal()
                            setId(item.product_id)
                            setName(item.product_name)
                          }
                        }>
                          <AiTwotoneDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {/* delete user modal */}
                <Modal title="លុបអ្នកប្រើប្រាស់" className="modal-fonts" open={open} onCancel={onClose} footer={[
                  <Button
                    key="cancel"
                    type="button"
                    className="bg-red-500 text-white leading-tight rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md" onClick={onClose}
                  >
                    បេាះបង់
                  </Button>,
                  <Button
                    key="submit"
                    loading={loading}
                    onClick={deleteMutaion.mutate}
                    type="button"
                    className="bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  >
                    យល់ព្រម
                  </Button>
                ]}>
                  <h1 className="text-lg text-center p-10">អ្នកប្រើប្រាស់ {name} និងត្រូវលុបចេញពីប្រព័ន្ធ?</h1>
                </Modal>
                {/* end off delete user model */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
