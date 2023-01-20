import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <section class="bg-[#ddd] w-full absolute top-0">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-[#fff] rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-3xl font-bold leading-tight text-center tracking-tight text-gray-900">
              Reset-Password
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded p-3 w-full outline-none"
                  placeholder="name@company.com"
                  // required=""
                />
              </div>
              <button
                type="submit"
                class="w-full text-md text-gray-900 bg-blue-500 hover:bg-blue-400 p-3 rounded"
              >
                <Link to="/login">Send</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
