import React, { useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useAuth } from '../../utls/auth';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ReactPaginate from 'react-paginate';
import Navbar from '../Navbar';

const ListCustomer = () => {
  return (
    <>
      <div className="h-screen overflow-auto bg-gray-100 flex-1">
        <Navbar />
        <div className="p-5 mt-3 h-screen">
          <h1 className="text-xl mb-3 text-left">បញ្ជីអតិថិជន</h1>
          <div className="w-full h-1 bg-blue-400 shadow-sm mb-5"></div>
          <div className="flex justify-between mb-3">
            <div className="flex">
              <Link to="/addcustomer">
                <button className="hidden md:block ml-1 px-6 py-1.5 rounded-sm font-medium tracking-wider bg-teal-400 hover:bg-teal-500 duration-200 text-white hover:shadow">
                  បន្ថែម
                </button>
              </Link>
              <div className="ml-5">
                <span className="text-bold">Show</span>
                <select
                  className=" border bg-transparent rounded ml-2 mr-2 outline-none px-3 shadow py-[2px]"
                  // onChange={(e) => {
                  //   setLimit(e.target.value);
                  // }}
                >
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
              type="text"
              style={{ width: '20rem' }}
              // onChange={(e) => {
              //   setKeyword(e.target.value);
              // }}
            />
          </div>
          <div className="rounded-sm overflow-auto h-[600px] shadow-sm">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-gray-200">
                <tr className="border-b-2 border-gray-100">
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    №
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ឈ្មោះអតិថិជន
                  </th>
                  <th>លេខទូរស័ព្ទ</th>
                  <th>អុីមែល</th>
                  <th>អាសយដ្ឋាន</th>
                  <th>ប្រតិបត្តិការ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="text-center bg-white border-b-2 border-gray-100"
                  // key={index + 1}
                >
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {/* {user.username} */}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {/* {user.role_name} */}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {/* {user.email} */}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {/* {user.phone_number} */}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {/* {user.status} */}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <>
                      <button
                        className="mx-2 px-3 py-1.5 rounded font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow"
                        // onClick={async () => {
                        //   await fetchOne(user.id);
                        //   setId(user.id);
                        //   showUpdateModal(true);
                        // }}
                      >
                        <BsPencilSquare size={20} />
                      </button>
                      <button
                        className="px-3 py-1.5 rounded font-medium tracking-wider text-red-600 bg-red-200 hover:shadow"
                        // onClick={() => {
                        //   showModal();
                        //   setId(user.id);
                        //   setName(user.username);
                        // }}
                      >
                        <AiTwotoneDelete size={20} />
                      </button>
                    </>
                  </td>
                </tr>

                {/* delete user modal */}
                <Modal
                  title="លុបអ្នកប្រើប្រាស់"
                  className="modal-fonts"
                  // open={open}
                  // onCancel={onClose}
                  footer={[
                    <Button
                      key="cancel"
                      type="button"
                      className="bg-red-500 text-white leading-tight rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md"
                      // onClick={onClose}
                    >
                      បេាះបង់
                    </Button>,
                    <Button
                      key="submit"
                      // loading={loading}
                      type="button"
                      className="bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      // onClick={deleteMutaion.mutate}
                    >
                      យល់ព្រម
                    </Button>,
                  ]}>
                  <h1 className="text-lg text-center p-10">
                    អ្នកប្រើប្រាស់ {name} និងត្រូវលុបចេញពីប្រព័ន្ធ?
                  </h1>
                </Modal>
                {/* end off delete user model */}

                {/* update user modal */}
                <Modal
                  title="កែប្រែអ្នកប្រើប្រាស់"
                  width={900}
                  className="modal-fonts"
                  // open={updateModal}
                  // onCancel={onClose}
                  footer={[
                    <Button
                      key="cancel"
                      type="button"
                      className="bg-red-500 text-white leading-tight rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md"
                      // onClick={onClose}
                    >
                      បេាះបង់
                    </Button>,
                    <Button
                      key="submit"
                      // loading={loading}
                      type="button"
                      className="bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      // onClick={updateMutation.mutate}
                    >
                      កែប្រែ
                    </Button>,
                  ]}>
                  {/* ======== content ======== */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mt-4">
                      <label
                        htmlFor="username"
                        className="form-label inline-block text-gray-700 mt-5 text-sm mb-2">
                        ឈ្មោះ​អ្នកប្រើប្រាស់
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
                        id="username"
                        name="username"
                        type={'text'}
                        // onChange={handleChange}
                        // value={user.username}
                      />
                      {/* ============= message ============= */}
                      {/* {msg && <span className="text-red-500 text-xs">{msg}</span>} */}
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="email"
                        className="form-label inline-block text-gray-700 mt-5 text-sm mb-2">
                        អុីមែល
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
                        // onChange={handleChange}
                        // value={user.email}
                      />
                    </div>
                    <div className="mt-4">
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
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                      </select>
                    </div>
                    <div className="mt-4 mb-5">
                      <label
                        htmlFor="phone_number"
                        className="form-label inline-block text-gray-700 mt-5​ text-sm mb-2">
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
                        id="phone_number"
                        name="phone_number"
                        type={'text'}
                        // onChange={handleChange}
                        // value={user.phone_number}
                      />
                    </div>
                    <div className="">
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
                        <option value={1}>Enable</option>
                        <option value={2}>Disable</option>
                      </select>
                    </div>
                  </div>
                  {/* ========= end of content ==== */}
                </Modal>
                {/* end of update user model */}

                {/* change password user modal */}
                <Modal
                  // title={<span>ផ្លាស់ប្ដូរពាក្យសម្ងាត់({name})</span>}
                  width={800}
                  className="modal-fonts"
                  // onCancel={closeChangePasswordModal}
                  // open={changePasswordModal}
                  footer={[
                    <Button
                      key="cancel"
                      type="button"
                      className="bg-red-500 text-white leading-tight rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md"
                      // onClick={closeChangePasswordModal}
                    >
                      បោះបង់
                    </Button>,
                    <Button
                      key="submit"
                      // loading={loading}
                      type="button"
                      className="bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      // onClick={handleChagePassword}
                    >
                      បញ្ជូន
                    </Button>,
                  ]}>
                  {/* ======== content ======== */}
                  <div className="grid grid-cols-1">
                    <div className="">
                      <label
                        htmlFor="username"
                        className="form-label inline-block text-gray-700 mt-5 text-sm mb-2">
                        ពាក្យសម្ងាត់ថ្មី
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
                        id="password"
                        name="password"
                        type={'password'}
                        // onChange={(e) => {
                        //   setPassword((prev) => ({
                        //     ...prev,
                        //     [e.target.name]: e.target.value,
                        //   }));
                        // }}
                        // value={password.password}
                      />
                      {/* ============= message ============= */}
                      {/* {msgPwd && (
                      <span className="text-red-500 text-xs">{msgPwd}</span>
                    )} */}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="form-label inline-block text-gray-700 mt-5 text-sm mb-2">
                        ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់
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
                        id="cpassword"
                        name="cpassword"
                        type={'password'}
                        // onChange={(e) => {
                        //   setPassword((prev) => ({
                        //     ...prev,
                        //     [e.target.name]: e.target.value,
                        //   }));
                        // }}
                        // value={password.cpassword}
                      />
                      {/* {msgcpwd && (
                      <span className="text-red-500 text-xs">{msgcpwd}</span>
                    )} */}
                    </div>
                  </div>
                  {/* ========= end of content ==== */}
                </Modal>

                {/* end of change password modal */}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          {/* <p className="my-3 text-xs text-gray-500">{`ជួរដេកសរុប : ${rows} ទំព័រ: ${
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
            nextLinkClassName={'border ml-3 px-2 text-gray-800 border-gray-400'}
            activeLinkClassName={'bg-blue-500 border border-gray-400'}
            disabledLinkClassName={
              'text-gray-300 cursor-auto border-gray-300 border'
            }
          />
        </nav> */}
        </div>
      </div>
    </>
  );
};

export default ListCustomer;
