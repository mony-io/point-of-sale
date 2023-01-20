import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";

const AddProduct = () => {

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);

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

  useEffect(() => {
    fetchCategories();
    fetchBrands()
    fetchUnits();
  }, [])
  return (
    <>

      <div className="flex-1 h-screen bg-gray-100 p-5">
        <h1 className="text-xl mb-4 text-left">បន្ថែមផលិតផល</h1>

        <div className="w-full h-1 bg-blue-400 mb-1 shadow-sm"></div>
        <div className="shadow bg-white rounded-sm">
          <h2 className="text-left ml-1 p-1">សូម!​ បំពេញពត៍មានខាងក្រោម</h2>
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
                >
                  <option>select category</option>
                  {categories.map((item, inext) => {

                    return (
                      <option value={item.id} key={inext + 1}>{item.categoryName}</option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">ឈ្មោះផលិតផល</label>
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
                  id="exampleFormControlInput1"
                  placeholder="Product Name"
                />
              </div>
              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">កូដផលិតផល</label>
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
                  id="exampleFormControlInput1"
                  placeholder="Product Code"
                />
              </div>
              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">ម៉ាកផលិតផល</label>
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                  <option>select brand</option>
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
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">ឯកតាផលិតផល</label>
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" defaultValue={""}>
                  <option selected>select product units</option>
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
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">តម្លៃដើម</label>
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
                  id="exampleFormControlInput1"
                  placeholder="Example label"
                />
              </div>
              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">តម្លៃលក់ចេញ</label>
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
                  id="exampleFormControlInput1"
                  placeholder="Example label"
                />
              </div>

              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">ថ្ងៃខែផុតកំណត់</label>
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
                "/>

              </div>
              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Status</label>
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" defaultValue={""}>
                  <option selected>product status</option>
                  <option>enable</option>
                  <option>disable</option>
                </select>
              </div>
              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Alert message</label>
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
                  id="exampleFormControlInput1"
                  placeholder="Example label"
                />
              </div>
            </div>
            {/* end of column 2 */}

            {/* start column 3 */}
            <div className="flex-col mt-5">

              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">ចំនួន</label>
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
                  id="exampleFormControlInput1"
                  placeholder="Example label"
                />
              </div>
              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">អ្នកផ្គត់ផ្គង់</label>
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" defaultValue={""}>
                  <option selected>product status</option>
                  <option>enable</option>
                  <option>disable</option>
                </select>
              </div>
              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">ការបរិយាយ</label>
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
                ></textarea>
              </div>
              <div className="mb-7 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">រូបភាព</label>
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
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFileMultiple" multiple />
              </div>
            </div>
            {/* end of column 3 */}
          </div>
          <div className="flex space-x-2 p-5 ml-[4rem]">
            <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
            <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Clear</button>
          </div>
        </div>

      </div>
    </>
  );
};

export default AddProduct;
