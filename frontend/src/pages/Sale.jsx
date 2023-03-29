import React, { useState, useEffect } from 'react';
import { AiFillDelete, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import Cart from '../components/sales/Cart';
import Main from '../components/sales/Main';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Space, Spin } from 'antd';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select, Modal, Button } from 'antd';
//import useScanDetection from 'use-scan-detection';

// popover
import { Popover } from 'antd';

const fetchProducts = async () => {
  const { data } = await axios.get('http://localhost:3001/product_card');
  return data;
};

const Sale = () => {
  const [cartItems, setCartItems] = useState([]);
  const { data, isLoading } = useQuery('products_card', fetchProducts);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [cusId, setCusId] = useState(1);
  const [productCode, setProductCode] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  //console.log(selectCategory)

  console.log(productCode);

  // useScanDetection({
  //   onComplete: setProductCode,
  //   minLength: 4
  // })

  const text = <span>ស្វែងរក</span>;
  const text2 = <span>ប្រភេទ</span>;
  const content = (
    <div>
      <input
        type="search"
        placeholder="ស្វែងរក"
        className="p-2 outline-none h-8 w-64 text-sm text-center bg-gray-50 border rounded-md border-gray-300 shadow-sm"
      />
    </div>
  );

  const content2 = (
    <div>
      <div className="flex">
        <Select
          style={{ width: '15vw' }}
          showSearch
          optionFilterProp="children"
          defaultValue={'All'}
          onChange={(value) => {
            setSelectCategory(value);
          }}>
          <Select.Option key={0} value="">
            All
          </Select.Option>
          {categories.map((item, index) => (
            <Select.Option key={index + 2} value={item.id}>
              {item.categoryName}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );

  const buttonWidth = 70;

  // hook for add customer
  const [customer, setCustomer] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    address: '',
  });
  // message
  const [cusMsg, setCusMsg] = useState('');

  // handle Change
  const handleChange = (e) => {
    setCustomer((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  // clear data
  const clear = () => {
    setCusMsg('');
    setCustomer({
      customerName: '',
      phoneNumber: '',
      email: '',
      address: '',
    });
  };

  const setCustomerId = (id) => {
    setCusId(id);
  };
  // add customer
  const addCustomerHandler = async () => {
    try {
      if (customer.customerName !== '') {
        const res = await axios.post(
          'http://localhost:3001/api/customer',
          customer
        );
        if (res.data.success) {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.success(`🦄 ${res.data.message}`, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setOpen(false);
          fetchAllCustomer();
        } else {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.error(`🦄 ${res.data.message}`, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } else {
        setCusMsg('សូម! បញ្ចូលឈ្មោះអតិថិជន');
      }
    } catch (err) {
      console.log(err);
    }
  };

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }
  // open modal function
  const openModal = () => {
    clear();
    setOpen(true);
  };
  // close modal
  const onClose = () => {
    setOpen(false);
  };

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.product_id === product.product_id && x.qty < x.old_qty
            ? { ...exist, qty: parseInt(exist.qty + 1) }
            : x
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, qty: 1, old_qty: product.qty },
      ]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist.qty === 1 || exist.qty === '') {
      setCartItems(
        cartItems.filter((x) => x.product_id !== product.product_id)
      );
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.product_id === product.product_id
            ? { ...exist, qty: exist.qty - 1 }
            : x
        )
      );
    }
  };
  // remove all
  const RemoveAll = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
  };

  const onChangeHandler = (product, qty) => {
    console.log(product);
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.product_id === product.product_id && qty <= x.old_qty
            ? { ...exist, qty: qty }
            : x
        )
      );

      if (qty > exist.old_qty) {
        playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
        toast.error('🦄 សូមអភ័យទោស!ចំនួនផលិតផលរបស់អ្នកមិនគ្រប់គ្រាន់ទេ', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      setCartItems([
        ...cartItems,
        { ...product, qty: qty, old_qty: product.qty },
      ]);
    }
  };

  const deleteHandler = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist) {
      setCartItems(
        cartItems.filter((x) => x.product_id !== product.product_id)
      );
    }
  };

  const handleSearch = async (productCode) => {
    try {
      if (productCode !== '') {
        const { data } = await axios.get(
          'http://localhost:3001/api/procode/' + productCode
        );
        if (data.length > 0) {
          if (data[0].qty > 0) {
            onAdd(data[0]);
          } else {
            playAudio(
              'http://localhost:3001/audio/audio-notification-sound.mp3'
            );
            toast.error('🦄 សូមអភ័យទោស! ផលិតផលមិនមាននៅក្នុងស្តុកទេ', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // fetch customer from api
  const fetchAllCustomer = async () => {
    const cus = await axios.get('http://localhost:3001/api/customers');
    setCustomers(cus.data[0]);
  };

  // fetch all category from api
  const fetchAllCategories = async () => {
    const res = await axios.get('http://localhost:3001/categories');
    setCategories(res.data.result);
  };

  // set cart items to localStorage
  if (cartItems.length > 0) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  //console.log(cartItems.length)

  useEffect(() => {
    fetchAllCustomer();
    fetchAllCategories();
    let localStorageCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );
    //console.log(localStorageCartItems)
    if (localStorageCartItems.length !== null) {
      setCartItems([...localStorageCartItems]);
    }
  }, []);

  useEffect(() => {
    if (productCode !== '') {
      handleSearch(productCode);
    }
  }, [productCode]);

  //console.log(categories)
  return (
    <>
      <div className="flex-1 h-screen overflow-auto">
        <Navbar className="fixed top-0" />
        <div className="grid grid-cols-6 gap-2 pt-2">
          <div className="col-span-2 bg-blue-50 h-[830px]">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 h-[42px] mt-[4px] px-1">
                <div className="flex items-center justify-items-stretch">
                  <Select
                    style={{ width: '100%' }}
                    showSearch
                    value={cusId}
                    optionFilterProp="children"
                    defaultValue={1}
                    onChange={(value) => {
                      if (value !== 0) {
                        setCusId(value);
                      }
                    }}>
                    {customers.map((item, index) => (
                      <Select.Option key={index + 1} value={item.id}>
                        {item.customerName}
                      </Select.Option>
                    ))}
                  </Select>
                  <div
                    className="rounded-md ml-1 cursor-pointer overflow-hidden"
                    onClick={openModal}>
                    <AiOutlinePlus
                      size={33}
                      className="bg-blue-500 text-white p-[5px] pr-2 hover:shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center overflow-hidden mt-[1px]">
                  <input
                    value={productCode.trim()}
                    onChange={(e) => {
                      setProductCode(e.target.value);
                      console.log(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.code === 'Space') {
                        e.preventDefault();
                      }
                    }}
                    type="search"
                    placeholder="ស្វែងរក"
                    className="rounded-md p-[5px] outline-none w-full text-sm text-center bg-gray-50 border border-gray-300 shadow-sm"
                  />
                  <div className="rounded-md ml-1 overflow-hidden">
                    <AiOutlineSearch
                      size={33}
                      className="bg-blue-500 text-white p-[7px] hover:shadow-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-4 mt-3">
                <div className="grid grid-cols-4 gap-4 px-1">
                  <div className="col-span-4 flex justify-between rounded-md pt-2 shadow bg-[#333] p-1 items-center text-[#fff]">
                    <span className="ml-6">ផលិតផល</span>
                    <span className="ml-3">ចំនួន</span>
                    <span className="ml-3">តម្លៃ</span>
                    <span className="text-slate-300 mr-8">
                      <AiFillDelete size={22} />
                    </span>
                  </div>
                  <Cart
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onChangeHandler={onChangeHandler}
                    deleteHandler={deleteHandler}
                    customerId={cusId}
                    setCustomerId={setCustomerId}
                    RemoveAll={RemoveAll}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 relative overflow-auto scrollbar h-[830px] bg-blue-50">
            <div className="h-12 fixed top-[50%] -right-6 flex justify-end items-center">
              {/* <div className="flex items-center rounded-sm overflow-hidden">
                <input
                  type="search"
                  placeholder="ស្វែងរក"
                  className="p-2 outline-none w-64 text-sm text-center bg-gray-50 border rounded-sm border-gray-300 shadow-sm"
                />
              </div>
              <div className="flex">
                <Select
                  style={{ width: '15vw' }}
                  showSearch
                  optionFilterProp="children"
                  defaultValue={'All'}
                  onChange={(value) => {
                    setSelectCategory(value);
                  }}>
                  <Select.Option key={0} value="">
                    All
                  </Select.Option>
                  {categories.map((item, index) => (
                    <Select.Option key={index + 2} value={item.id}>
                      {item.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              </div> */}
              {/* start pop */}
              <div className="overflow-hidden rounded-md rotate-90">
                <div
                  style={{
                    width: buttonWidth,
                    float: 'left',
                    color: 'black',
                    backgroundColor: '#47B5FF',
                  }}>
                  <Popover
                    placement="left"
                    title={text}
                    content={content}
                    trigger="click">
                    <Button className='text-white'>ស្វែងរក</Button>
                  </Popover>
                </div>
              </div>
              {/* end pop */}
            </div>
            <div className="h-12 fixed top-[58%] -right-6 flex justify-end items-center">
              <div className="overflow-hidden rounded-md rotate-90">
                <div
                  style={{
                    width: buttonWidth,
                    float: 'left',
                    color: 'black',
                    backgroundColor: '#47B5FF',
                  }}>
                  <Popover
                    placement="left"
                    title={text2}
                    content={content2}
                    trigger="click">
                    <Button className='text-white'>ប្រភេទ</Button>
                  </Popover>
                </div>
              </div>
            </div>
            {!isLoading ? (
              <Main products={data} onAdd={onAdd} select={selectCategory} />
            ) : (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space className="grid items-center mt-[300px]">
                  <Spin tip="Loading" size="large" className="text-black">
                    <div className="content" />
                  </Spin>
                </Space>
              </Space>
            )}
          </div>
        </div>
        {/* add customer modal */}
        <Modal
          title={
            <h1 className="text-blue-500 text-lg border-b-[3px] pb-3 border-blue-300">
              បន្ថែមអតិថិជន
            </h1>
          }
          width={900}
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
              onClick={addCustomerHandler}
              key="submit"
              type="button"
              className="bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
              យល់ព្រម
            </Button>,
          ]}>
          {/* ======== content ======== */}
          <div>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div>
                <label
                  htmlFor="customerName"
                  className="form-label inline-block text-gray-700 mb-2 text-lg">
                  ឈ្មោះអតិថិជន
                </label>
                <input
                  className="form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder=""
                  id="customerName"
                  name="customerName"
                  type={'text'}
                  onChange={handleChange}
                  value={customer.customerName}
                />
                {cusMsg && <span className="text-red-500">{cusMsg}</span>}
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="form-label inline-block text-gray-700 mb-2 text-lg">
                  លេខទូរស័ព្ទ
                </label>
                <input
                  className="form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder=""
                  id="phoneNumber"
                  name="phoneNumber"
                  type={'text'}
                  onChange={handleChange}
                  value={customer.phoneNumber}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="form-label inline-block text-gray-700 mb-2 text-lg">
                  អ៊ីមែល
                </label>
                <input
                  className="form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder=""
                  id="email"
                  name="email"
                  type={'email'}
                  onChange={handleChange}
                  value={customer.email}
                />
              </div>
            </div>
            <div className="mb-8">
              <label
                htmlFor="address"
                className="form-label inline-block text-gray-700 mb-2 text-lg mt-3">
                អាសយដ្ឋាន
              </label>
              <textarea
                className="form-control
                                block
                                w-full
                                px-4
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder=""
                id="address"
                name="address"
                onChange={handleChange}
                value={customer.address}
              />
            </div>
          </div>
          {/* ========= end of content ==== */}
        </Modal>
      </div>
    </>
  );
};

export default Sale;
