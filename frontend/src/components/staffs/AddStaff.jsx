import React from 'react';

const AddStaff = () => {
  return (
    <>
      <div className="h-screen overflow-auto bg-gray-100 flex-1">
        <Navbar />
        <div className="p-5 mt-5">
          <h1 className="text-xl mb-4 text-left">បន្ថែមអ្នកប្រើប្រាស់</h1>
          <div className="w-full h-1 bg-blue-400 mb-3 shadow-sm"></div>
          <h2 className="ml-3 text-lg">សូមបញ្ជូលពត៍មានខាងក្រោម</h2>
          <div className="grid grid-cols-4 gap-4 mt-7">
            <div className="col-span-2 px-9">
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  ឈ្មោះ​គណនី
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
                  ពាក្យសម្ងាត់
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
                  ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់
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
              <div className="mb-6">
                <label
                  htmlFor="roles"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  ប្រភេទអ្នកប្រើប្រាស់
                </label>
                <select
                  // onChange={handleChange}
                  id="rolse"
                  name="role_id"
                  // value={user.role_id}
                  className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-2.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example">
                  <option className="text-sm">ជ្រើសរើសតួនាទី</option>
                  {/* {data &&
                    data.map((item, index) => {
                      return (
                        <option value={item.role_id} key={index + 1}>
                          {item.role_name}
                        </option>
                      );
                    })} */}
                </select>
                {/* {roleMsg && (
                  <span className="text-red-500 text-sm">{roleMsg}</span>
                )} */}
              </div>
            </div>
            <div className="col-span-2 px-9">
              <div className="mb-6">
                <label
                  htmlFor="status_id"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  ស្ថានភាព
                </label>
                <select
                  // onChange={handleChange}
                  id="status_id"
                  name="status_id"
                  // value={user.status_id}
                  className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-2.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example">
                  {/* {res.data &&
                    res.data.map((item, index) => {
                      return (
                        <option value={item.status} key={index + 1}>
                          {item.status}
                        </option>
                      );
                    })} */}
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="phone_number"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  លេខទូរស័ព្ទ
                </label>
                <input
                  // onChange={handleChange}
                  type="text"
                  id="phone_number"
                  name="phone_number"
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
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  អុីមែល
                </label>
                <input
                  // onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
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
                />
              </div>
              <div className="mt-[54px]">
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
        <ToastContainer />
      </div>
    </>
  );
};

export default AddStaff;
