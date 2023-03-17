import React from "react";

function PrintPayment(props) {
    const { componentRef, data } = props;
    // total item
    const totalItem = data.reduce((pre, cur) => pre + cur.qty_sales, 0)
    const totalPrice = data.reduce((a, c) => a + c.price * c.qty_sales, 0)


    return (
        <>
            <div ref={componentRef} className="w-full h-[window.innerHeight]">
                <div className="flex justify-between my-3 py-9 px-6 flex-col border-b-2 mx-9 border-b-gray-800">
                    <h1 className="text-center text-3xl mb-9">
                        PSS <span className="text-2xl">គ្រឿងសំណង់</span>
                    </h1>
                    <h2 className="">កាលបរិច្ឆេទ: {data[0].sale_date}</h2>
                    <h2 className="">អាសយដ្ធាន: ផ្ទះលេខ​​​​​​ ៩៩.បុរី​ មហាទេព</h2>
                    <h2 className="">សង្កាត់ ស្វាយប៉ោ. ក្រុង បាត់ដំបង​​​​​​</h2>
                    <h2 className="">លេខ​​​​​វិក្កយបត្រ: {data[0].invoice_number}​</h2>
                    <p className="">Tel: 099 74 36 34 / 081 64 23 12</p>
                    <h3 className="text-center text-lg font-semibold mt-8">វិក្កយបត្រ</h3>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table
                                    className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                បរិយាយទំនិញ
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                បរិមាណ
                                            </th>
                                            <th scope="col" className="px-6 py-4 border-r dark:border-neutral-500">តម្លៃរាយ</th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500">
                                                តម្លៃសរុប
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => {
                                            return (
                                                <tr className="border-b dark:border-neutral-500" key={index + 1}>
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                                        {index + 1}
                                                    </td>
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                        {item.product_name}
                                                    </td>
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                        {item.qty}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 border-r">${item.price}.00</td>
                                                    <td className="whitespace-nowrap px-6 py-4">${item.subtotal}.00</td>
                                                </tr>
                                            )
                                        })}


                                        <tr className="border-b dark:border-neutral-500">
                                            <td
                                                colSpan={2}
                                                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 text-right">
                                                ចំនួនសរុប
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                                {totalItem}
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 text-right">
                                                សរុប
                                            </td>
                                            <td
                                                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                                ${totalPrice}.00
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800 h-[2px] mx-9 mt-4"></div>
                <div className="grid grid-cols-6 mt-3 gap-4 mx-9 text-sm">
                    <div className="col-span-2">
                        <h3>
                            បង់ដោយ: <span>{data[0].payment_type}</span>
                        </h3>
                    </div>
                    <div className="col-span-2">
                        <h3>
                            ប្រាក់បានបង់: <span>${data[0].amount}.00</span>
                        </h3>
                    </div>
                    <div className="col-span-2">
                        <h3>
                            ប្រាក់បានអាប់: <span>${data[0].money_change}.00</span>
                        </h3>
                    </div>
                </div>
                <h3 className="text-center text-lg mt-9">
                    Thank you ! Please come again
                </h3>
                <h3 className="text-center mt-1">ទំនិញទិញរួចមិនអាចដូរវិញបានទេ</h3>
                <h3 className="text-center text-xl mt-1">
                    Goods sold are not returnable
                </h3>
            </div>
        </>

    );
}

export default PrintPayment;