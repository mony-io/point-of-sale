import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md"
import Clock from "../components/date-time/Clock";
import { AiOutlineMenu } from 'react-icons/ai'
import Dates from "../components/date-time/Dates";
import { useAuth } from "../utls/auth";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from 'antd';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useAuth();
  //  hooks
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [match, setMatch] = useState(false);
  // message
  const [msg, setMsg] = useState("");
  const [msgNewPassword, setMsgNewPassword] = useState("");
  const [msgComfirm, setMsgComfirm] = useState("");
  const [color, setColor] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
    clearFormData()
    setValidPwd(false)
    setMatch(false)
  };

  // match password 
  function matchPassword() {
    if (newPassword !== "" && comfirmPassword !== "") {
      if (newPassword === comfirmPassword) {
        setMatch(true)
        setMsgComfirm("")
      } else {
        setMsgComfirm("ពាក្យសម្ងាត់មិនផ្ទៀងផ្ទាត់!")
        setMatch(false)
      }
    }
  }

  // fetch product name



  // regular expressions
  const PWD_REX = /^(?=.*).{4,}$/

  //play sound 
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  const handleUpdate = async () => {
    matchPassword()
    if (password === "") {
      setMsg("សូម! បញ្ចូលពាក្យសម្ងាត់របស់អ្នក")
    } else if (newPassword === "") {
      setMsgNewPassword("សូម! បញ្ចូលពាក្យសម្ងាត់ថ្មី")
    } else if (comfirmPassword === "") {
      setMsgComfirm('សូម! ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់របស់អ្នក')
    } else {
      try {
        if (validPwd !== false && match !== false) {
          const res = await axios.put(`http://localhost:3001/change-password/${auth.id}`, { password: password, newPassword: newPassword })
          if (res.data.success) {
            clearFormData()
            playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
            toast.success(`🦄${res.data.message}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            clearFormData()
            playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
            toast.error(`🦄${res.data.message}`, {
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
        }
      } catch (err) {
        console.log(err)
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3001/logout", {
        withCredentials: true,
      });
      //console.log(res)
      auth.logout();
    } catch (error) {
      console.log(error);
    }

  }
  // clear data function 
  function clearFormData() {
    setPassword("")
    setNewPassword("")
    setComfirmPassword("")
    setMsg("");
    setMsgNewPassword("")
    setMsgComfirm("")
    setColor("")

  }

  return (
    <>
      {
        auth.isLoggedIn && (
          <>
            <nav
              className="
        relative
        w-full
        flex flex-wrap
        items-center
        justify-between
        py-4
        bg-gray-100
        text-gray-500
        hover:text-gray-700
        focus:text-gray-700
        shadow-lg
        navbar navbar-expand-lg navbar-light"

            >
              <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">

                <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">

                  {/* <!-- Left links --> */}
                  <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">

                    <div
                      className="nav-item py-2 pr-2 cursor-pointer"
                      onClick={() => auth.setOpen(!auth.open)}
                    >
                      <AiOutlineMenu size={24} color="black" />
                    </div>

                    <li className="nav-item p-2">
                      <a className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#">Dashboard</a>
                    </li>
                  </ul>
                  {/* <!-- Left links --> */}
                </div>
                {/* date time */}

                <div className="flex items-center relative">
                  <span className="mr-1"><Dates /></span>
                  <Clock />
                </div>

                {/* <!-- Right elements --> */}
                <div className="flex items-center">
                  {/* <!-- Icon --> */}
                  <div className="dropdown relative mr-1 cursor-pointer">
                    {/* notification icon */}
                    <a className="
               text-gray-500
               hover:text-gray-700
               focus:text-gray-700
               mr-4
               dropdown-toggle
               hidden-arrow
               flex items-center
              " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell"
                        className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor"
                          d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z">
                        </path>
                      </svg>
                      <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5">1</span>
                    </a>
                    {/* end of notification  */}

                  </div>

                  <div className="dropdown relative">
                    <a className="dropdown-toggle flex items-center hidden-arrow" id="dropdownMenuButton2" role="button"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <FaUserCircle size={22} className="mr-1" />
                      <span className="text-gray-500 hover:text-gray-700 focus:text-gray-700 mt-1">{auth.username}</span>
                    </a>
                    <ul className="
                dropdown-menu
                min-w-max
                absolute
                hidden
                bg-white
                text-base
                z-50
                float-left
                py-2
                list-none
                text-left
                rounded-lg
                shadow-lg
                mt-1
                
                m-0
                bg-clip-padding
                border-none
                left-auto
                right-0
              " aria-labelledby="dropdownMenuButton2">
                      <li>
                        <a className="
                          dropdown-item
                          text-sm
                          py-2
                          px-4
                          font-normal
                          block
                          w-full
                          whitespace-nowrap
                          bg-transparent
                          text-gray-700
                          hover:bg-gray-100
                          cursor-pointer
                        "
                          onClick={showModal}
                        >Change password?</a>

                        {/* change password modal */}
                        <Modal title="Change Password" open={isModalOpen} width={800} onCancel={handleCancel}
                          footer={[
                            <button
                              type="button"
                              className="inline-block px-6 py-2.5 bg-red-600 text-white leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1
                              text-md
                              "
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>,
                            <button
                              type="button"
                              className="inline-block px-6 py-2.5 bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                              onClick={handleUpdate}
                            >
                              update
                            </button>
                          ]}
                          className={"modal-font"}
                        >
                          <div className="mb-4">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label inline-block text-gray-700 mt-5​ text-lg mb-2"
                            >
                              ពាក្យសម្ងាត់
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
                              placeholder="••••••••"
                              id="exampleFormControlInput1"
                              name="password"
                              type={"password"}
                              onChange={(e) => setPassword(e.target.value)}
                              value={password.trim()}
                              onKeyUp={() => {
                                if (password === "") {
                                  setMsg("សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក!")
                                  setColor("text-red-500")
                                } else {
                                  if (PWD_REX.test(password)) {
                                    setMsg("");
                                    setValidPwd(true);
                                  } else {
                                    setValidPwd(false)
                                    setColor("text-red-500")
                                    setMsg("បញ្ជាក់!​ ពាក្យសម្ងាត់មិនត្រូវដកឃ្លានិងមានចំនួនចាប់ពី៤ខ្ទង់ឡើងទៅ!")
                                  }
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.code === "Space") {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {msg && <span className={`text-sm mt-2 text-red-500`}>{msg}</span>}
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label inline-block text-gray-700 mb-2 text-lg"
                            >
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
                              placeholder="••••••••"
                              id="exampleFormControlInput1"
                              name="newPassword"
                              type={"password"}
                              onChange={(e) => setNewPassword(e.target.value)}
                              value={newPassword.trim()}
                              onKeyUp={() => {
                                if (newPassword === "") {
                                  setMsgNewPassword("សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី!")
                                } else {
                                  if (PWD_REX.test(newPassword)) {
                                    setMsgNewPassword("");
                                    setValidPwd(true);
                                  } else {
                                    setValidPwd(false)
                                    setColor("text-red-500")
                                    setMsgNewPassword("បញ្ជាក់!​ ពាក្យសម្ងាត់មិនត្រូវដកឃ្លានិងមានចំនួនចាប់ពី៤ខ្ទង់ឡើងទៅ!")
                                  }
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.code === "Space") {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {msgNewPassword && <span className={`text-sm mt-2 ${color}`}>{msgNewPassword}</span>}
                          </div>
                          <div>
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label inline-block mb-2 text-gray-700​ text-lg"
                            >
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
                              placeholder="••••••••"
                              id="exampleFormControlInput1"
                              name="ComfirmPassword"
                              type={"password"}
                              onChange={(e) => setComfirmPassword(e.target.value)}
                              value={comfirmPassword.trim()}
                              onKeyUp={() => {
                                if (comfirmPassword === "") {
                                  setMsgComfirm('សូម​! ផ្ទៀងផ្ទាត់លេខសម្ងាត់!')
                                  setColor("text-red-500")
                                } else {
                                  setMsgComfirm("")
                                  matchPassword()
                                }

                              }}
                              onKeyDown={(e) => {
                                if (e.code === "Space") {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {msgComfirm && <span className={`text-sm mt-2 ${color}`}>{msgComfirm}</span>}
                          </div>

                          {/* end of change password modal */}
                        </Modal>

                      </li>
                      <li>
                        <span className="
                    flex
                    dropdown-item
                    text-sm
                    py-2
                    px-4
                    font-normal
                    items-center
                    w-full
                    whitespace-nowrap
                    bg-transparent
                    text-gray-700
                    hover:bg-gray-100
                    cursor-pointer
                    "
                          onClick={logoutHandler}
                        ><MdOutlineLogout size={20} style={{ marginRight: "5px" }} />Logout</span>
                      </li>
                      <li>
                        <a className="
                dropdown-item
                text-sm
                py-2
                px-4
                font-normal
                block
                w-full
                whitespace-nowrap
                bg-transparent
                text-gray-700
                hover:bg-gray-100
      ">Something else here</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <!-- Right elements --> */}
              </div>
            </nav>

            {/* Offcanvas */}
            <div className="offcanvas offcanvas-end fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-96" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
              <div className="offcanvas-header flex items-center justify-between p-4">
                <button type="button" className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <h5 className="offcanvas-title mb-0 leading-normal font-semibold" id="offcanvasRightLabel">Offcanvas right</h5>
              </div>
              <div className="offcanvas-body flex-grow p-4 overflow-y-auto">
                ...
              </div>
            </div>
          </>
        )
      }
      {/* toast message */}
      <ToastContainer />
    </>
  );

};

export default Navbar;
