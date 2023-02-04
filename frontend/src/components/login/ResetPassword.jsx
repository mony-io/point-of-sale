import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [spin, setSpin] = useState(false);
  const [color, setColor] = useState(false);

  const [validEmail, setValidEmail] = useState(false);

  const EMAIL_REX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const emailRef = useRef();

  const antIcon = <LoadingOutlined style={{ fontSize: 25 }} spin />;

  //play sound 
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  const handleClicked = async (e) => {
    try {
      setMsg("")
      e.preventDefault();
      if (email !== "") {
        if (validEmail) {
          setSpin(true)
          const res = await axios.post("http://localhost:3001/reset_password_mail", {
            email: email,
          });

          console.log(res)
          setMsg(res.data.message);
          if (res.data.success) {
            playAudio('http://localhost:3001/audio/message-send.mp3')
            setColor('text-green-600')
            setEmail("")
            setSpin(false)
          } else {
            setColor('text-red-500');
            setEmail("")
            setSpin(false)
          }
        } else {
          setEmail("")
          setMsg("Email not valid.Please! try another once.");
          setColor('text-red-500')
        }

      } else {
        setColor('text-red-500');
        setMsg("Please! Enter your email.")
        emailRef.current?.focus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, [])
  return (
    <section className="bg-[#ddd] w-full absolute top-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-[#fff] rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-bold leading-tight text-center tracking-tight text-gray-900">
              Reset-Password
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded p-3 w-full outline-none"
                  placeholder="name@company.com"
                  onChange={(e) => {
                    setEmail(e.target.value.trim())
                  }}
                  onKeyDown={(e) => {
                    if (e.code === "Space") {
                      e.preventDefault();
                    }
                  }}
                  required
                  onKeyUp={() => {
                    if (email !== "") {
                      if (!EMAIL_REX.test(email.trim())) {
                        setValidEmail(false)
                        setMsg("Email not valid.");
                        setColor("text-red-500");
                      } else {
                        setMsg("")
                        setValidEmail(true)
                      }
                    }
                  }}
                  value={email.trim()}
                />
                {msg && <span className={`flex ${color} text-sm mt-1`}>{msg}</span>}
              </div>
              <button
                type="submit"
                className="w-full text-md text-gray-900 bg-blue-500 hover:bg-blue-400 p-3 rounded"
                onClick={handleClicked}
              >
                {spin ? <span><Spin indicator={antIcon} className="text-blue-100" /> Loading...</span> : "send"}
              </button>
            </form>
          </div>

        </div>
        <div style={{ marginLeft: "-19vw", marginTop: "5px" }}>
          <span className="text-blue-700 font-bold hover:underline">
            <Link to="/login">Go Back!!</Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
