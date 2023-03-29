import Navbar from '../Navbar';
import React from 'react';

const AddCustomer = () => {
  return (
    <>
      <div className="h-screen overflow-auto bg-gray-100 flex-1">
        <Navbar />
        <div className="p-5 mt-5">
          <h1 className="text-xl mb-4 text-left">បន្ថែមអតិថិជន</h1>
          <div className="w-full h-1 bg-blue-400 mb-3 shadow-sm"></div>
          <h2 className="ml-3 text-lg">សូមបញ្ជូលពត៍មានខាងក្រោម</h2>
          <div className="grid grid-cols-4 gap-4 mt-7">
            <div className="col-span-2 px-9">
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  ឈ្មោះអតិថិជន
                </label>
                <input
                  // onKeyDown={(e) => {
                  //   if (e.code === 'Space') {
                  //     e.preventDefault();
                  //   }
                  // }}
                  // onChange={handleChange}
                  // value={user.username}
                  // ref={usernameRef}
                  type="text"
                  id="username"
                  name="username"
                  className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
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
                  placeholder=""
                />
                {/* {userMsg && (
                  <span className="text-red-500 text-sm">{userMsg}</span>
                )} */}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  លេខទូរសព្ទ
                </label>
                <input
                  // onKeyDown={(e) => {
                  //   if (e.code === 'Space') {
                  //     e.preventDefault();
                  //   }
                  // }}
                  // onChange={handleChange}
                  // ref={pwdRef}
                  // value={user.password}
                  type="password"
                  id="password"
                  name="password"
                  className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
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
                  placeholder=""
                />
                {/* {pwdMsg && (
                  <span className="text-red-500 text-sm">{pwdMsg}</span>
                )} */}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="comfirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  អ៊ីមែល
                </label>
                <input
                  // onKeyDown={(e) => {
                  //   if (e.code === 'Space') {
                  //     e.preventDefault();
                  //   }
                  // }}
                  type="password"
                  id="comfirmPassword"
                  name="comfirmPassword"
                  className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
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
                  placeholder=""
                />
                {/* {pwdMsg && (
                  <span className="text-red-500 text-sm">{pwdMsg}</span>
                )} */}
              </div>
            </div>
            <div className="col-span-2 px-9">
              <div className="">
                <label
                  htmlFor="comfirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  អាសយដ្ឋាន
                </label>
                <textarea
                  name=""
                  id=""
                  className="h-36 p-3 w-full nt-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  rounded
                  transition
                  ease-in-out
                  m-0
                  border border-solid border-gray-300 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></textarea>
              </div>

              <div className="mt-[52px]">
                <button
                  // onClick={clear_data}
                  type="submit"
                  className="text-white bg-red-700 mr-4 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:focus:ring-red-800">
                  សម្អាត
                </button>
                <button
                  // onClick={handleSubmit}
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
                  បញ្ជូន
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
};

export default AddCustomer;
