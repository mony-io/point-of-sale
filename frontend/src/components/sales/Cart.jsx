import React, { useState, useEffect, useRef } from "react";
import { GoPlus } from 'react-icons/go'
import { HiMinus } from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'
import { Modal, Button } from "antd";
import { useQuery } from 'react-query'
import axios from 'axios'
import { useAuth } from "../../utls/auth";
import { useReactToPrint } from "react-to-print";
import PrintPayment from "./PrintPayment";
import { FaRegMoneyBillAlt } from 'react-icons/fa'



const fetchPayment = async () => {
  const { data } = await axios.get('http://localhost:3001/api/payments')
  return data
}

const Cart = (props) => {
  const currentdate = new Date();
  let datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + "/"
    + currentdate.getHours() + "/"
    + currentdate.getMinutes() + "/"
    + currentdate.getSeconds();
  // PAYMENT
  //console.log(datetime)
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${datetime}/pssinvoice`,
    // onAfterPrint: () => alert("Your Payment Printed Successfully!"),
  });

  const auth = useAuth()

  const { data } = useQuery('paymentType', fetchPayment)
  const [payemntType, setPaymentType] = useState('')

  const { cartItems, onAdd, onRemove, onChangeHandler, deleteHandler, customerId, setCustomerId, RemoveAll } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  const totalPrice = itemsPrice;

  const [paid, setPaid] = useState(0);
  const [remain, setRemain] = useState(0);
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false);
  const [paymentMsg, setPaymentMsg] = useState('');
  const [invoice, setInvoice] = useState([])

  const calcPayment = () => {
    if (paid === 0 || paid === '') {
      setRemain(-totalPrice)
    } else {
      setRemain(Number(paid - totalPrice))
    }

  }

  const clear_data = () => {
    RemoveAll();
    setCustomerId(1)
  }
  // total item
  const totalItem = cartItems.reduce((pre, cur) => pre + cur.qty, 0)
  //console.log(cartItems)

  //console.log(localStorage.getItem('cartItems') || '[]')
  // open modal function
  const showModal = () => {
    if (totalItem > 0) {
      setOpen(true);
    }
    setPaid(itemsPrice)
    calcPayment()
    setPaymentType('')
  };

  const onClose = () => {
    setOpen(false)
    setPaid(0)
    setRemain(0)
    setPaymentMsg('')
  }

  const addSaleID = async (id) => {
    products.map((item) => {
      item.sale_id = id
    })
  }

  // ===========
  const handleSubmit = async () => {
    try {
      if (payemntType === '') {
        setPaymentMsg("សូម! ជ្រើសរើសការបង់ប្រាក់")
      } else {
        setPaymentMsg('')
        const invoice = await axios.post('http://localhost:3001/api/invoice', { amount: paid, payment_id: payemntType, remain: remain })
        const sale = await axios.post('http://localhost:3001/api/sale', { user_id: auth.id, invoice_id: invoice.data.id, customer_id: customerId })
        await addSaleID(sale.data.id)
        const saleDetail = await axios.post('http://localhost:3001/api/sale_detail', products)
        if (saleDetail.data.success) {
          const res = await axios.get(`http://localhost:3001/api/saleInvoice/${sale.data.id}`);
          setInvoice(res.data[0])
          setOpen(false)
          RemoveAll()
          setCustomerId(1)
          localStorage.removeItem('cartItems')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setProducts(cartItems.map((item) => {
      return ({
        product_id: item.product_id,
        qty: item.qty,
      })
    }))
    setPaid(itemsPrice)
    calcPayment()
  }, [open, totalItem])

  useEffect(() => {
    if (invoice.length !== 0) {
      handlePrint();
      setInvoice([])
    }
  }, [invoice])

  return (

    <>
      <div className="col-span-4 overflow-auto scrollbar h-[500px] select-none">
        <div>
          {cartItems.length === 0 && (
            <div className="text-center mt-4 text-slate-500 font-semibold">
              គ្មានការលក់
            </div>
          )}
        </div>
        {cartItems.map((item) => (
          <div
            key={item.product_id}
            className="flex justify-between items-center m-[2px] text-slate-600 bg-blue-100 p-1 rounded-sm"
          >
            <div className="text-sm w-[70px] ml-6 whitespace-nowrap text-black">{item.product_name}</div>
            <div className="flex items-center">
              <GoPlus className="text-blue-500 mr-1 cursor-pointer" onClick={() => onAdd(item)} />
              <input
                value={item.qty !== '' ? parseInt(item.qty) : ''}
                className="w-9 border outline-none border-gray-300 text-center text-sm"
                type={"text"}
                onChange={(e) => onChangeHandler(item, e.target.value)}
                onKeyDown={(e) => {
                  if (e.code === "Space") {
                    e.preventDefault();
                  }
                }}
              />
              <HiMinus className="ml-2 text-red-500 cursor-pointer" onClick={() => {
                if (cartItems.length === 1) {
                  localStorage.removeItem('cartItems')
                }
                onRemove(item)
              }} />
            </div>

            <span className="text-sm w-6">${item.price * item.qty}</span>
            <div className="text-center" >
              <RxCross2 className="text-red-500 mr-8 cursor-pointer text-xl" onClick={() => {
                if (cartItems.length === 1) {
                  localStorage.removeItem('cartItems')
                }
                deleteHandler(item)
              }} />
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-4 row-span-2 h-24">
        <div className="grid grid-cols-4 gap-1">
          <div className="border col-span-4 text-sm flex justify-between pt-1 pb-1 bg-blue-200 rounded">
            <span className="font-semibold ml-2">ចំនួនសរុប</span>
            <span className="mr-2">{totalItem}</span>
          </div>
          <div className="border col-span-4 text-sm flex justify-between pt-1 pb-1 bg-blue-200 rounded">
            <span className="font-semibold mx-2 inline-block">ទឹកប្រាក់សរុប</span>
            <span className="mr-2">${totalPrice.toFixed(2)}</span>

          </div>
          <div className="col-span-4 flex pr-1 justify-end items-center mt-3">
            <button onClick={clear_data}>
              <span className="bg-red-500 w-full px-6 hover:bg-red-600 duration-200 text-[#fff] rounded shadow-sm text-center cursor-pointer py-[2px]">
                សម្អាត
              </span>
            </button>
            <button onClick={showModal}>
              <span className={`bg-blue-500 w-full px-7 ml-1 hover:bg-blue-600 duration-200 text-[#fff] rounded shadow-sm text-lg text-center cursor-pointer`}>
                <FaRegMoneyBillAlt size={30} className='inline-block' />
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* payment */}
      <Modal title={<h1 className="text-blue-500 text-xl">ការទូទាត់ប្រាក់</h1>} width={800} className="modal-fonts" open={open} onCancel={onClose} footer={[
        <Button
          key="cancel"
          type="button"
          className="bg-red-500 text-white leading-tight rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md" onClick={onClose}
        >
          បេាះបង់
        </Button>,
        <Button
          key="submit"
          onClick={handleSubmit}
          type="button"
          className="bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
        >
          យល់ព្រម
        </Button>
      ]}>
        {/* ======== content ======== */}
        <div className="grid grid-cols-2 bg-blue-500 pb-4 rounded-lg justify-items-center mt-5">
          <div className="mt-4 flex justify-around w-1/2">
            <h3 className="text-lg text-white">ទំនិញសរុប</h3>
            <span className="text-lg text-white">{totalItem}</span>
          </div>
          <div className="mt-4 flex justify-around w-1/2 whitespace-nowrap">
            <h3 className="text-lg mr-3 text-white">ប្រាក់ត្រូវបង់សរុប</h3>
            <span className="text-lg text-white">{totalPrice}$</span>
          </div>
          <div className="mt-4 flex justify-around w-1/2 whitespace-nowrap">
            <h3 className="text-lg mr-3 text-white">ទឹកប្រាក់សរុប</h3>
            <span className="text-lg text-white">{paid}$</span>
          </div>
          <div className="mt-4 flex justify-around w-1/2 whitespace-nowrap">
            <h3 className="text-lg mr-2 text-white">នៅសល់</h3>
            <span className="text-lg text-white">{remain}$</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5 mb-8">
          <div>
            <label
              htmlFor="amount"
              className="form-label inline-block text-gray-700 mb-2 text-lg"
            >
              ចំនួនទឹកប្រាក់
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
              id="amount"
              name="amount"
              type={"number"}
              value={paid}
              onChange={(e) => { setPaid(e.target.value) }}
              onKeyUp={() => {
                calcPayment()
              }}
            />
          </div>
          <div>
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label inline-block text-gray-700 mb-2 text-lg"
            >
              បង់ដោយ
            </label>
            <select className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-2
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
            
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" defaultValue={""}
              onChange={(e) => {
                setPaymentType(e.target.value)
              }}
              value={payemntType}
            >
              <option value={''}>ការបង់ប្រាក់</option>
              {data && data.map((item) =>
                <option value={item.id} key={item.id}>{item.payment_type}</option>
              )}
            </select>
            {paymentMsg && <span className="text-red-500">{paymentMsg}</span>}
          </div>
          <div>
            <label
              htmlFor="note"
              className="form-label inline-block text-gray-700 mb-2 text-lg"
            >
              ចំណាំ
            </label>
            <textarea
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
              id="exampleFormControlInput1"
              name="newPassword"
              type={"text"}

            />
          </div>
        </div>

        {/* ========= end of content ==== */}
      </Modal>
      <div className="hidden mr-16">
        {invoice.length !== 0 && <PrintPayment componentRef={componentRef} data={invoice} />}
      </div>
      {/* end of payemnt */}
    </>
  );
};

export default Cart;
