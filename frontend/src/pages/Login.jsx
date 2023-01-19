import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section class="bg-[#ddd] w-full h-[120vh] absolute top-0">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-[#fff] rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-3xl font-bold leading-tight text-center tracking-tight text-gray-900">
              Login
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
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded p-3 w-full outline-none"
                  // required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline ml-1"
                >
                  <Link to="/resetpassword">Reset Password</Link>
                </a>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 mr-2"
                >
                  Sign up
                </a>
              </div>
              <button
                type="submit"
                class="w-full text-md text-gray-900 bg-blue-500 hover:bg-blue-400 p-3 rounded"
              >
                <Link to="/">Sign in</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
