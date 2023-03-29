import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { RiHome3Fill, RiCustomerServiceFill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { RxDot } from "react-icons/rx";
import { MdAddShoppingCart } from "react-icons/md";
//import { FaUserAlt } from "react-icons/fa";
import { TbReport } from "react-icons/tb"
import { Link } from "react-router-dom";
import { useAuth } from "../utls/auth";
import { FaUsers } from "react-icons/fa";
import { Popconfirm, Modal, Button } from 'antd';
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
import { MdOutlineLogout } from "react-icons/md"
const Sidebar = () => {

  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [dbbackup, setdbBackup] = useState({
    dbbackup: ''
  });

  const [confirmLoading, setConfirmLoading] = useState(false);
  const inputFileRef = useRef();

  // logout
  const [popLogout, setPopLogout] = useState(false)

  const showPopLogout = () => {
    setPopLogout(true)
  }

  const closePopLogout = () => {
    setPopLogout(false)
  }

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3001/logout", {
        withCredentials: true,
      });
      //console.log(res)
      auth.logout();
      setPopLogout(false)
    } catch (error) {
      console.log(error);
    }

  }
  // ============== end of logout code ==============

  //play sound 
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  // clear data function
  function clear_data() {
    setModalOpen(false)
    inputFileRef.current.value = ''
    setFileName('')
    setLoading(false)
    setdbBackup({
      dbbackup: ''
    })
  }

  const handleRestore = async () => {
    try {
      const formData = new FormData();
      formData.append('dbbackup', dbbackup.dbbackup)
      console.log(dbbackup)
      if (dbbackup.dbbackup !== '') {
        setLoading(true)
        const { data } = await axios.post('http://localhost:3001/api/restore', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })

        if (data.success) {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.success(`${data.message}`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          clear_data()
        } else {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.error(`${data.message}`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          clear_data()
        }
      } else {
        playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
        toast.error(`សូម! ជ្រើសរើស File សម្រាប់ Restore.`, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    } catch (err) {
      console.log(err);
    }
  }

  const showPopconfirm = () => {
    setOpen(true);
  };


  // backup function
  const handleBackup = async () => {
    let currentdate = new Date();
    let datetime = currentdate.getDate() + ""
      + (currentdate.getMonth() + 1) + ""
      + currentdate.getFullYear() + ""
      + currentdate.getHours() + ""
      + currentdate.getMinutes() + ""
      + currentdate.getSeconds();
    try {
      const res = await axios.get('http://localhost:3001/api/backup');
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${datetime}pssbackup.sql`)
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      console.log(err)
    }
  }

  const handleOk = async () => {
    setConfirmLoading(true);
    await handleBackup()
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
    inputFileRef.current.value = ''
    setFileName('')
  };

  return (
    <>
      {
        auth.isLoggedIn && (<>
          <div
            className={`flex-2 ${auth.open ? "w-56" : "w-12"
              } bg-[#222] scrollbar h-[100vh] overflow-auto relative duration-200 shadow-lg font-bold`}
            id="sidebar"
          >

            <ul className="relative text-[#fff]">
              <Link to="/">
                <li className="relative mt-20 flex items-center text-sm py-4 px-[12px] h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer">
                  <span className="block float-left mr-[6px]">
                    <RiHome3Fill size={18} color="white" />
                  </span>
                  <span
                    className={`flex-1 ${!auth.open && "hidden"} duration-200 mt-[5px]`}
                  >
                    ផ្ទាំងគ្រប់គ្រង
                  </span>
                </li>
              </Link>
              <Link to="/sale">
                <div>
                  <li className="relative flex items-center text-sm py-4 px-[12px] h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer">
                    <span className="block float-left mr-[6px]">
                      <FiShoppingCart size={18} color="white" />
                    </span>
                    <span
                      className={`flex-1 ${!auth.open && "hidden"} duration-200 mt-[5px]`}
                    >
                      បញ្ជាលក់
                    </span>
                  </li>
                </div>
              </Link>
              <Link to="/category">
                <li className="relative flex items-center text-sm py-4 px-[12px] h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer">
                  <span className="block float-left mr-[6px]">
                    <BiCategoryAlt size={18} color="white" />
                  </span>
                  <span
                    className={`flex-1 ${!auth.open && "hidden"} duration-200 mt-[5px]`}
                  >
                    ក្រុមផលិតផល
                  </span>
                </li>
              </Link>
              <li id="sidenavEx1">
                <div
                  className="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer"
                  // data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  data-bs-target="#collapseSidenavEx1"
                  aria-controls="collapseSidenavEx1"
                >
                  <span
                    aria-hidden="true"
                    //   focusable="false"
                    data-prefix="fas"
                    className="w-3 h-5 mr-3"
                  >
                    <MdAddShoppingCart size={18} />
                  </span>
                  <span className={`flex-1 ${!auth.open && "hidden"} duration-200 `}>
                    ផលិតផល
                  </span>
                  {auth.open && (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      className="w-3 h-3 ml-auto"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      ></path>
                    </svg>
                  )}
                </div>
                {auth.open && (
                  <ul
                    className="relative accordion-collapse collapse"
                    id="collapseSidenavEx1"
                    aria-labelledby="sidenavEx1"
                    data-bs-parent="#sidenavExample"
                  >
                    <Link to="/productunit">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          ឯកតាផលិតផល
                        </span>
                      </li>
                    </Link>
                    <Link to="/addproduct">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          បន្ថែមផលិតផល
                        </span>
                      </li>
                    </Link>
                    <Link to="/listproduct">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          បញ្ជីផលិតផល
                        </span>
                      </li>
                    </Link>
                    <Link to="/product-brands">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          ម៉ាកផលិតផល
                        </span>
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
              {
                auth.isAdmin && (
                  <li className="relative" id="sidenavEx4">
                    <div
                      className="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer"
                      // data-mdb-ripple="true"
                      data-mdb-ripple-color="dark"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      data-bs-target="#collapseSidenavEx4"
                      aria-controls="collapseSidenavEx4"
                    >
                      <span
                        aria-hidden="true"
                        //   focusable="false"
                        data-prefix="fas"
                        className="w-3 h-5 mr-3"
                      >
                        <FaUsers size={18} />
                      </span>
                      <span
                        className={`flex-1 ${!auth.open && "hidden"
                          } duration-200 mt-[2px]`}
                      >
                        អ្នក​ប្រើប្រាស់
                      </span>
                      {auth.open && (
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          className="w-3 h-3 ml-auto"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                          ></path>
                        </svg>
                      )}
                    </div>
                    {auth.open && (
                      <ul
                        className="relative accordion-collapse collapse"
                        id="collapseSidenavEx4"
                        aria-labelledby="sidenavEx4"
                        data-bs-parent="#sidenavExample"
                      >
                        <Link to="/adduser">
                          <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                            <span className="pl-6">
                              <RxDot size={20} />
                            </span>
                            <span
                              className="mt-[2px]"
                              // data-mdb-ripple="true"
                              data-mdb-ripple-color="dark"
                            >
                              បន្ថែមប្រើប្រាស់
                            </span>
                          </li>
                        </Link>
                        <Link to="/listuser">
                          <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                            <span className="pl-6">
                              <RxDot size={20} />
                            </span>
                            <span
                              className="mt-[2px]"
                              // data-mdb-ripple="true"
                              data-mdb-ripple-color="dark"
                            >
                              បញ្ជីប្រើប្រាស់
                            </span>
                          </li>
                        </Link>
                      </ul>
                    )}
                  </li>
                )
              }

              <li className="relative" id="sidenavEx2">
                <div
                  className="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer"
                  // data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  data-bs-target="#collapseSidenavEx2"
                  aria-controls="collapseSidenavEx2"
                >
                  <span
                    aria-hidden="true"
                    //   focusable="false"
                    data-prefix="fas"
                    className="w-3 h-5 mr-3"
                  >
                    <RiCustomerServiceFill size={18} />
                  </span>
                  <span className={`flex-1 ${!auth.open && "hidden"} duration-200 `}>
                    អ្នក​ពាក់ព័ន្ធ
                  </span>
                  {auth.open && (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      className="w-3 h-3 ml-auto"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      ></path>
                    </svg>
                  )}
                </div>
                {auth.open && (
                  <ul
                    className="relative accordion-collapse collapse"
                    id="collapseSidenavEx2"
                    aria-labelledby="sidenavEx2"
                    data-bs-parent="#sidenavExample"
                  >
                    <Link to="/addcustomer">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          បន្ថែមអតិថិជន
                        </span>
                      </li>
                    </Link>
                    <Link to="/listcustomer">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          បញ្ជីអតិថិជន
                        </span>
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
              <li className="relative" id="sidenavEx3">
                <div
                  className="flex items-center text-sm py-3 px-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer"
                  // data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  data-bs-target="#collapseSidenavEx3"
                  aria-controls="collapseSidenavEx3"
                >
                  <span
                    aria-hidden="true"
                    //   focusable="false"
                    data-prefix="fas"
                    className="w-3 h-5 mr-3"
                  >
                    <TbReport size={18} />
                  </span>
                  <span className={`flex-1 ${!auth.open && "hidden"} duration-200 `}>
                    របាយការណ៏
                  </span>
                  {auth.open && (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      className="w-3 h-3 ml-auto"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      ></path>
                    </svg>
                  )}
                </div>
                {auth.open && (
                  <ul
                    className="relative accordion-collapse collapse"
                    id="collapseSidenavEx3"
                    aria-labelledby="sidenavEx3"
                    data-bs-parent="#sidenavExample"
                  >

                    <li className="cursor-pointer relative flex items-center text-[14px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                      <span className="pl-6">
                        <RxDot size={20} />
                      </span>
                      <span
                        className="mt-[2px]"
                        //data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                      >
                        របាយការណ៏ការលក់
                      </span>
                    </li>
                    <Link to={'/productReport'}>
                      <li className="cursor-pointer relative flex items-center text-[14px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          របាយការណ៏ផលិតផល
                        </span>
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
              <li className="relative" id="sidenavEx5">
                <div
                  className="flex items-center text-sm py-3 px-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer"
                  // data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  data-bs-target="#collapseSidenavEx5"
                  aria-controls="collapseSidenavEx5"
                >
                  <span
                    aria-hidden="true"
                    //   focusable="false"
                    data-prefix="fas"
                    className="w-3 h-5 mr-3"
                  >
                    <AiFillSetting size={18} />
                  </span>
                  <span className={`flex-1 ${!auth.open && "hidden"} duration-200 `}>
                    ការកំណត់
                  </span>
                  {auth.open && (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      className="w-3 h-3 ml-auto"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      ></path>
                    </svg>
                  )}
                </div>
                {auth.open && (
                  <ul
                    className="relative accordion-collapse collapse"
                    id="collapseSidenavEx5"
                    aria-labelledby="sidenavEx5"
                    data-bs-parent="#sidenavExample"
                  >
                    {auth.isAdmin && (
                      <>
                        <Popconfirm
                          placement="left"
                          title="Backup"
                          description="Do you want to backup ?"
                          open={open}
                          onConfirm={handleOk}
                          okButtonProps={{ loading: confirmLoading }}
                          onCancel={handleCancel}
                        >
                          <li className="relative flex items-center text-[14px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer" onClick={showPopconfirm}>
                            <span className="pl-6">
                              <RxDot size={20} />
                            </span>
                            <span
                              className="mt-[2px]"
                              // data-mdb-ripple="true"
                              data-mdb-ripple-color="dark"
                            >

                              <button className="outline-none text-white p-0 border-none font-bold button">Backup</button>
                            </span>
                          </li>
                        </Popconfirm>
                        <li className="relative flex items-center text-[14px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer" onClick={() => { setModalOpen(true) }}>
                          <span className="pl-6">
                            <RxDot size={20} />
                          </span>
                          <span
                            className="mt-[2px]"
                            // data-mdb-ripple="true"
                            data-mdb-ripple-color="dark"
                          >
                            Restore
                          </span>
                        </li>
                      </>

                    )}
                    <Popconfirm
                      placement="left"
                      title="Logout"
                      description="Do you want to logout?"
                      open={popLogout}
                      onConfirm={logoutHandler}
                      okButtonProps={{ loading: confirmLoading }}
                      onCancel={closePopLogout}
                    >
                      <li className="relative flex items-center text-[14px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer" onClick={showPopLogout}>
                        <span className="pl-6">
                          <MdOutlineLogout size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          ចាកចេញ
                        </span>
                      </li>
                    </Popconfirm>

                  </ul>
                )}
              </li>
            </ul>
            {/* restore modal */}
            <Modal
              title="Restore Data"
              centered
              onCancel={() => {
                clear_data()
              }}
              open={modalOpen}
              footer={[
                <Button
                  key="cancel"
                  type="button"
                  className="bg-red-500 text-white leading-tight rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md" onClick={() => {
                    clear_data()
                  }}
                >
                  បេាះបង់
                </Button>,
                <Button
                  onClick={handleRestore}
                  key="submit"
                  loading={loading}
                  type="button"
                  className="bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                >
                  បញ្ជូន
                </Button>
              ]}
            >
              <div className="flex items-center justify-center bg-grey-lighter mt-8 mb-8">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer">
                  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  {!fileName && <span className="mt-2 text-base leading-normal">Select a file</span>}
                  <input type='file' accept=".sql" name='dbbackup' className="hidden" ref={inputFileRef} onChange={(e) => {
                    setFileName(`${e.target.files[0].name} Size: ${e.target.files[0].size}kb`)
                    setdbBackup((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }))
                  }} />
                  <span className="">{fileName}</span>
                </label>
              </div>
            </Modal>
          </div>

        </>)
      }
    </>
  );
};

export default Sidebar;
