import React from 'react'
import Navbar from '../Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment'
import { Image } from 'antd';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ======= formmat date time =========
function dateFormmat(date) {
    moment.locale("en");
    let formatDate = moment(date).format("YYYY-MM-DD");
    return formatDate;
}

const EditeProduct = () => {
    const location = useLocation();
    const product_id = parseInt(location.pathname.split("/")[2]);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [units, setUnits] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [status, setStatus] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false)
    const [product, setProduct] = useState({
        category_id: 0,
        brand_id: 0,
        sub_id: 0,
        unit_id: 0,
        product_code: "",
        product_name: "",
        qty: 0,
        unit_price: "",
        price: "",
        exp_date: '',
        product_image: "",
        desc: "",
        status: 1,
        reorder_number: 0
    })

    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    // fetch product from api function
    const fetchProductById = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/product/${product_id}`)
            console.log(data);
            setProduct({ ...data[0], exp_date: dateFormmat(data[0]) })

        } catch (err) {
            console.log(err)
        }
    }
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:3001/categories");
            setCategories(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchBrands = async () => {
        try {
            const res = await axios.get("http://localhost:3001/brands");
            setBrands(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // fetch units of product function
    async function fetchUnits() {
        try {
            const res = await axios.get("http://localhost:3001/product-units");
            setUnits(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchSupplies = async () => {
        try {
            const res = await axios.get("http://localhost:3001/supplier");
            setSupplies(res.data);
        } catch (err) {
            console.log(err)
        }


    }

    //play sound 
    function playAudio(url) {
        const audio = new Audio(url);
        audio.play();
    }

    const fetchStatus = async () => {
        try {
            const res = await axios.get('http://localhost:3001/status')
            setStatus(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let formData = new FormData();
            formData.append('category_id', product.category_id);
            formData.append('brand_id', product.brand_id);
            formData.append('sub_id', product.sub_id)
            formData.append('unit_id', product.unit_id)
            formData.append('product_code', product.product_code)
            formData.append('product_name', product.product_name)
            formData.append('qty', product.qty);
            formData.append('unit_price', product.unit_price)
            formData.append('price', product.price);
            formData.append('exp_date', product.exp_date);
            formData.append('product_image', product.product_image);
            formData.append('desc', product.desc);
            formData.append('status', product.status);
            formData.append('reorder_number', product.reorder_number);

            const result = await axios.put(`http://localhost:3001/product/${product_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })

            if (isDeleted) {
                await axios.put(`http://localhost:3001/image/${product_id}`)
            }

            if (result.data.success) {
                playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
                toast.success(`${result.data.message}`, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/listproduct");
            } else {
                playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
                toast.error(`${result.data.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            console.log(result);

        } catch (err) {
            console.log(err)
        }

    }


    useEffect(() => {
        fetchProductById()
        fetchCategories();
        fetchBrands()
        fetchUnits();
        fetchSupplies();
        fetchStatus();
    }, [])

    return (
        <>
            <div className="flex-1 h-screen bg-slate-50">
                <Navbar />
                <div className="p-5">
                    <h1 className="text-xl mb-4 text-left">កែប្រែផលិតផល</h1>
                    <div className="w-full h-1 bg-blue-400 mb-1 shadow-sm"></div>
                    <div className="shadow bg-white rounded-sm">
                        <h2 className="text-left ml-1 p-1">សូម! បំពេញពត៍មានខាងក្រោម</h2>
                        <div className="flex justify-around mt-5">
                            {/* column 1 */}
                            <div className="flex-col mt-5">
                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="category" className="form-label inline-block mb-2 text-gray-700">ប្រភេទផលិតផល</label>
                                    <select className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                                        name="category_id"
                                        value={product.category_id}
                                        onChange={handleChange}
                                    >
                                        {categories.map((item, inext) => {
                                            return (
                                                <option value={item.id} key={inext + 1}>{item.categoryName}</option>
                                            )
                                        })}
                                    </select>

                                </div>
                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="ProductName" className="form-label inline-block mb-2 text-gray-700">ឈ្មោះផលិតផល</label>
                                    <input
                                        type="text"
                                        className="
                                        form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        "
                                        id="ProductName"
                                        placeholder="ឈ្មោះ"
                                        name="product_name"
                                        value={product.product_name}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="ProductCode" className="form-label inline-block mb-2 text-gray-700">កូដផលិតផល</label>
                                    <input
                                        type="text"
                                        className="
                                            form-control
                                            block
                                            w-full
                                            px-3
                                            py-1.5
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        "
                                        id="ProductCode"
                                        placeholder="xxxx"
                                        name="product_code"
                                        disabled
                                        value={product.product_code}
                                        onChange={handleChange}
                                    />

                                </div>
                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="ProductBrand" className="form-label inline-block mb-2 text-gray-700">ម៉ាកផលិតផល(Optional)</label>
                                    <select className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                                        name="brand_id"
                                        value={product.brand_id}
                                        onChange={handleChange}
                                    >
                                        <option value={0}>ជ្រើសរើសម៉ាក</option>
                                        {
                                            brands.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={index + 1}>{item.brandName}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="ProductUnit" className="form-label inline-block mb-2 text-gray-700">ឯកតាផលិតផល</label>
                                    <select className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
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
                                        name="unit_id"
                                        value={product.unit_id}
                                        onChange={handleChange}
                                    >
                                        {units.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index + 1}>{item.unit}</option>
                                            )
                                        })}
                                    </select>

                                </div>
                            </div>
                            {/* end of column 1 */}

                            {/* start column 2 */}
                            <div className="flex-col mt-5">
                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="UnitPrice inline-block text-gray-700 mb-2">តម្លៃដើម</label>
                                    <input
                                        value={product.unit_price}
                                        onChange={handleChange}
                                        type="number"
                                        className="
                                        form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                        name="unit_price"
                                        id="UnitPrice"
                                        placeholder=""

                                    />

                                </div>
                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="outPrice" className="form-label inline-block mb-2 text-gray-700">តម្លៃលក់ចេញ</label>
                                    <input

                                        type="number"
                                        className="
                                        form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                        id="outPrice"
                                        placeholder=""
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="date" className="form-label inline-block mb-2 text-gray-700">ថ្ងៃខែផុតកំណត់(Optional)</label>
                                    <input type="date" className="
                                        form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                        name="exp_date"
                                        id="date"
                                        value={product.exp_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="status" className="form-label inline-block mb-2 text-gray-700">ស្ថានភាព</label>
                                    <select className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" defaultValue={""} id="status"
                                        name="status"
                                        value={product.status}
                                        onChange={handleChange}
                                    >
                                        {status.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index + 1}>{item.status}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="qty" className="form-label inline-block mb-2 text-gray-700">ចំនួន</label>
                                    <input
                                        type="number"
                                        className="
                                            form-control
                                            block
                                            w-full
                                            px-3
                                            py-1.5
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        "
                                        id="qty"
                                        name="qty"
                                        placeholder="Qty"
                                        value={product.qty}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {/* end of column 2 */}

                            {/* start column 3 */}
                            <div className="flex-col mt-5">

                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="qtyAlert" className="form-label inline-block mb-2 text-gray-700">ចំនួនដាស់តឿន(Optional)</label>
                                    <input
                                        type="number"
                                        className="
                                            form-control
                                            block
                                            w-full
                                            px-3
                                            py-1.5
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        "
                                        name="reorder_number"
                                        id="qtyAlert"
                                        placeholder="Quanity Alert"
                                        value={product.reorder_number}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="sup" className="form-label inline-block mb-2 text-gray-700">អ្នកផ្គត់ផ្គង់(Optional)</label>
                                    <select className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" defaultValue={""} id="sup"
                                        name="sub_id"
                                        value={product.sub_id}
                                        onChange={handleChange}
                                    >
                                        <option value={0}>ជ្រើសរើសអ្នកផ្គត់ផ្គង់</option>
                                        {
                                            supplies.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={index + 1}>{item.supName} {item.companyName && `(${item.companyName})`}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="desc" className="form-label inline-block mb-2 text-gray-700">ការបរិយាយ(Optional)</label>
                                    <textarea

                                        className="
                                        form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                        id="desc"
                                        rows="3"
                                        placeholder="Your message"
                                        name="desc"
                                        value={product.desc}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="mb-7 xl:w-96">
                                    <label htmlFor="photo" className="form-label inline-block mb-2 text-gray-700">រូបភាព(Optional)</label>
                                    <input className="form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="photo"
                                        name="product_image"
                                        onChange={(e) => {
                                            setProduct((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }))
                                        }}
                                    />
                                    {product.product_image &&
                                        <div className={`mt-2 flex-col w-[150px] border ${isDeleted && 'hidden'}`} >
                                            <button className='text-red-500 text-lg -mt-3' onClick={() => setIsDeleted(true)}>X</button>
                                            <Image
                                                width={150}
                                                src={product.product_image && `http://localhost:3001/${product.product_image}`}
                                            />
                                        </div>
                                    }

                                </div>

                            </div>
                            {/* end of column 3 */}

                        </div>
                        <div className="flex space-x-2 p-5 ml-[4rem]">
                            <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={handleSubmit}
                            >បញ្ជូន</button>
                            <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"

                            >សម្អាត</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditeProduct
