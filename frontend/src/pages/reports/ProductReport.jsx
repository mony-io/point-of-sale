import React from 'react'
import Navbar from '../../components/Navbar'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'
import { BsFillPrinterFill } from 'react-icons/bs'

const fetchProductReports = async () => {
    const { data } = await axios.get('http://localhost:3001/api/product-reports');
    return data;
}

const ProductReport = () => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `pss-product-reports`,
        // onAfterPrint: () => alert("Your Payment Printed Successfully!"),
    });
    // ============ report =============
    const { data, isLoading, error } = useQuery('product-reports', fetchProductReports);
    if (isLoading) return 'Loading'
    if (error) return 'An error has occured'

    return (
        <>
            <div className="h-screen bg-gray-100 overflow-auto flex-1">
                <Navbar />
                <div className="p-5 h-screen">
                    <h1 className="text-xl mb-2 text-left mt-3">របាយការណ៏ផលិតផល</h1>
                    <div className="w-full h-1 bg-blue-400 shadow-sm"></div>
                    <span className='text-sm mb-7 inline-block mt-1'>អ្នកអាចច្រោះទិន្នន័យដោយប្រើតារាងខាងក្រោម</span>
                    <div className='flex justify-between mb-2'>
                        <div className=''>
                            <span>Show</span>
                            <select className=" border bg-transparent rounded ml-2 mr-2 outline-none px-3 shadow ">
                                <option>5</option>
                                <option>15</option>
                                <option>20</option>
                            </select>
                            <span>Entities</span>
                        </div>

                        <button className='bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1 px-5'
                            onClick={handlePrint}
                        >
                            <BsFillPrinterFill />
                        </button>
                    </div>
                    <div className="rounded-lg shadow overflow-auto hidden md:block h-[600px]" ref={componentRef}>
                        <table className="w-full table-auto">
                            <thead className="bg-gray-50 border-gray-200">
                                <tr className="border-b-2 border-gray-100 bg-blue-100">
                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                        №
                                    </th>

                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                        លេខកូដ
                                    </th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                        ឈ្មោះ
                                    </th>
                                    <th>ចំនួនលក់ចេញ</th>
                                    <th>ថ្លៃដើម</th>
                                    <th>ចំណូល</th>
                                    <th>ចំណេញ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item, index) => {
                                        return (
                                            <tr
                                                className="text-center bg-white border-b-2 border-gray-100"
                                            >
                                                <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                                                    {index + 1}
                                                </td>

                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {item.product_code}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {item.product_name}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {item.qty_sales + ' ( ' + item.unit + ' )'}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {item.cost}.00$
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {item.revenue}.00$
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {item.profit}.00$
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductReport
