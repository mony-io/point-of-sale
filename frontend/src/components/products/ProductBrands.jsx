import React from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsPencilSquare } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import axios from 'axios'
const ProductBrands = () => {

    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState({ brandName: "", desc: "", id: "" });

    const [msg, setMsg] = useState("")
    const [colorStyle, setColorStle] = useState("")

    const handleChange = (e) => {
        setBrand((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    // clear function 
    function clearData() {
        setBrand({ brandName: "", desc: "" })
    }

    const fetchBrands = async () => {
        try {
            const res = await axios.get("http://localhost:3001/brands");
            setBrands(res.data)
        } catch (err) {
            console.log(err)
        }

    }

    const createBrand = async () => {
        try {
            if (brand.brandName.trim() !== "") {
                const res = await axios.post("http://localhost:3001/brands", brand);
                console.log(res)
                if (res.data.success) {
                    setMsg(res.data.message);
                    setColorStle("bg-green-100 text-green-700")
                } else {
                    clearData();
                    setColorStle("bg-red-100 text-red-700")
                    setMsg(res.data.message);
                }
            } else {
                setMsg("Please! Enter brand name.")
                setColorStle("bg-red-100 text-red-700")
            }
        } catch (err) {
            console.log(err);
        }
    }

    console.log(brand)

    useEffect(() => {
        fetchBrands();
    }, [])

    return (
        <>
            <div className="p-5 h-screen bg-gray-100 flex-1">
                <h1 className="text-xl mb-5 font-bold text-center">Product Brands</h1>
                <div className="flex justify-between mb-3">
                    <button className="hidden md:block ml-1 px-4 py-1.5 rounded-lg font-medium tracking-wider bg-teal-400 text-neutral-900 hover:text-white hover:shadow" data-bs-toggle="modal" data-bs-target="#addBrand">
                        Add Brand
                    </button>
                    <input
                        className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl shadow-sm text-center p-2.5 hover:shadow mr-2"
                        placeholder="Search..."
                        type="text"
                        style={{ width: "20rem" }}
                    />
                    {/* add unit model */}
                    <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="addBrand" tabIndex="-1" aria-labelledby="exampleModalLgLabel" aria-modal="true" role="dialog" onClick={
                        (e) => {
                            if (e.target.id === "addBrand") {
                                clearData();
                            }
                        }
                    }>
                        <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                    <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLgLabel">
                                        Add Brand
                                    </h5>
                                    <button type="button"
                                        className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                        data-bs-dismiss="modal" aria-label="Close" onClick={clearData}></button>
                                </div>
                                <div className="modal-body relative p-4 mt-5 mb-5">

                                    <label htmlFor="unit" className="form-label inline-block mb-2 text-gray-700"
                                    >Brand name</label>
                                    {/* ====== alert message ===== */}
                                    {msg &&
                                        <div className={`rounded py-1 text-center text-base mt-1 ${colorStyle}`} role="alert">
                                            {msg}
                                        </div>
                                    }
                                    <input className="form-control
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
                                        focus:text-gray-700 
                                        focus:bg-white focus:border-blue-600 
                                        focus:outline-none"
                                        placeholder="brand name"
                                        id="brand" type="text"
                                        name="brandName"
                                        onChange={handleChange}
                                        value={brand.brandName}
                                    />

                                    <label htmlFor="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700 mt-5">
                                        Description
                                    </label>
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
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        placeholder="Your message"
                                        name='desc'
                                        onChange={handleChange}
                                        value={brand.desc}
                                    ></textarea>

                                </div>
                                <div
                                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-gray-200 rounded-b-md">
                                    <button type="button"
                                        className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                        data-bs-dismiss="modal" onClick={clearData}>Close</button>

                                    {/* spin button */}

                                    <button type="button"
                                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" onClick={createBrand}>
                                        submit
                                    </button>

                                    {/* end of spin button */}

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end of add model */}
                </div>
                <div className="rounded-lg shadow overflow-auto hidden md:block">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-50 border-gray-200">
                            <tr className="border-b-2 border-gray-100">
                                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                    ID
                                </th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                    Brand Name
                                </th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                    Description
                                </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                brands.map((item, index) => {
                                    return (
                                        <tr className="text-center bg-white border-b-2 border-gray-100" key={index + 1}>
                                            <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                {item.brandName}
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                {item.desc}
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                <button className="mx-2 px-5 py-1.5 rounded-lg font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow" data-bs-toggle="modal" data-bs-target="#updateUnit">
                                                    <BsPencilSquare size={20} />
                                                </button>
                                                <button
                                                    className="px-5 py-1.5 rounded-lg font-medium tracking-wider text-red-600 bg-red-200 hover:shadow" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"
                                                >
                                                    <AiTwotoneDelete size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProductBrands
