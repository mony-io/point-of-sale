import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';
import Navbar from '../Navbar';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');

  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  // fetch data
  const fetchAllProducts = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/products?search=${keyword}&page=${page}&limit=${limit}`
    );
    return data;
  };

  const { data } = useQuery(
    ['getProducts', keyword, page, limit],
    fetchAllProducts
  );
  const queryClient = useQueryClient();

  //console.log(data)

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');

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
    setOpen(false);
    setId('');
    setName('');
    setLoading(false);
  };

  // handle delete
  const handleDelete = async () => {
    try {
      if (id !== '') {
        setLoading(true);
        const res = await axios.delete(`http://localhost:3001/product/${id}`);
        if (res.data.success) {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.success(`${res.data.message}`, {
            position: 'top-center',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setOpen(false);
          setLoading(false);
          setId('');
        } else {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.error(`${res.data.message}`, {
            position: 'top-center',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setOpen(false);
          setLoading(false);
          setId('');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // ======== delete  =========
  const deleteMutaion = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(['getProducts']);
    },
  });

  useEffect(() => {
    if (data) {
      setProducts(data.result);
      setPage(data.page);
      setPages(data.totalPage);
      setRows(data.totalRows.TotalRows);
    }
  }, [data]);

  return (
    <>
      <div className="h-screen bg-gray-100 overflow-auto flex-1">
        <Navbar />
        <div className="p-5 h-screen">
          <h1 className="text-xl mb-2 text-left mt-3">បញ្ជីផលិតផល</h1>
          <div className="w-full h-1 bg-blue-400 mb-7 shadow-sm"></div>
          <div className="flex justify-between mb-3">
            <div className="flex">
              <Link to={'/addproduct'}>
                <button className="hidden md:block ml-1 px-6 py-1.5 rounded-sm font-medium tracking-wider bg-teal-400 hover:bg-teal-500 duration-200 text-white hover:shadow">
                  បន្ថែម
                </button>
              </Link>
              <div className="ml-5">
                <span className="text-bold">Show</span>
                <select
                  className=" border bg-transparent rounded ml-2 mr-2 outline-none px-3 shadow py-[2px]"
                  onChange={(e) => {
                    setLimit(e.target.value);
                  }}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
                <span>Entities</span>
              </div>
            </div>

            <input
              className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2.5 hover:shadow mr-2"
              placeholder="ស្វែងរក..."
              type="search"
              style={{ width: '20rem' }}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
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
                {products.map((item, index) => {
                  return (
                    <tr
                      className="text-center bg-white border-b-2 border-gray-100"
                      key={index + 1}>
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
                        {item.brandName ? item.brandName : 'គ្មាន'}
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
                        <button
                          className="px-3 py-1.5 rounded font-medium tracking-wider text-red-600 bg-red-200 hover:shadow"
                          onClick={() => {
                            showModal();
                            setId(item.product_id);
                            setName(item.product_name);
                          }}>
                          <AiTwotoneDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {/* delete user modal */}
                <Modal
                  title="លុបអ្នកប្រើប្រាស់"
                  className="modal-fonts"
                  open={open}
                  onCancel={onClose}
                  footer={[
                    <Button
                      key="cancel"
                      type="button"
                      className="bg-red-500 text-white leading-tight rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md"
                      onClick={onClose}>
                      បេាះបង់
                    </Button>,
                    <Button
                      key="submit"
                      loading={loading}
                      onClick={deleteMutaion.mutate}
                      type="button"
                      className="bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                      យល់ព្រម
                    </Button>,
                  ]}>
                  <h1 className="text-lg text-center p-10">
                    អ្នកប្រើប្រាស់ {name} និងត្រូវលុបចេញពីប្រព័ន្ធ?
                  </h1>
                </Modal>
                {/* end off delete user model */}
              </tbody>
            </table>
          </div>
          <p className="my-3 text-xs text-gray-500">{`ជួរដេកសរុប : ${rows} ទំព័រ: ${
            rows ? page : 1
          } នែ ${pages}`}</p>
          <nav role="navigation" aria-label="pagination" key={rows}>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={pages}
              onPageChange={changePage}
              containerClassName={'flex my-3'}
              pageLinkClassName={'border text-gray-600 px-3 border-gray-400'}
              previousLinkClassName={
                'border mr-3 px-2 text-gray-800 border-gray-400'
              }
              nextLinkClassName={
                'border ml-3 px-2 text-gray-800 border-gray-400'
              }
              activeLinkClassName={'bg-blue-500 border border-gray-400'}
              disabledLinkClassName={
                'text-gray-300 cursor-auto border-gray-300 border'
              }
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
