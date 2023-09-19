import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useEffect } from "react";
import axios from "axios";
import { getApiDomain } from "../../../config";
import Search from "./Search";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const manageToggle = (e) => {
    e.preventDefault();
    setOpenNav(!openNav);
  };
  const navigate = useNavigate();

  const signout = async () => {
    await signOut();
    window.location.href = "/auth";
  };

  let userId = useSessionContext().userId;

  console.log(userId ? userId : "oii", "userId");

  // useEffect(()=>{
  //   async function callSession (){
  //     const response = await axios.get(getApiDomain() + "/sessioninfo")
  //     console.log(response?JSON.stringify(response.data,null,2):'nop resppo');
  //   }
  //   callSession()
  // },[])
  return (
    <div>
      <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 left-0 border-b border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-yellow-300">
              shopIt
            </span>
          </a>
          <div className="flex md:order-2">
            <div className="mr-2">
              {/* <Search /> */}
            </div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-00 font-medium rounded-lg text-sm px-4  text-center  md:mr-0 dark:bg-blue-600 dark::hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                navigate("/cart");
              }}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                // stroke-width="1.5"
                stroke="currentColor"
                class="file: w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                navigate("/sell");
              }}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-00 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 ml-2 md:mr-0 dark:bg-blue-600 dark::hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sell
            </button>
            <button
              onClick={() => {
                signout();
              }}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-00 font-medium rounded-lg text-sm px-4 py-2 text-center  mr-3 ml-2 md:mr-0 dark:bg-blue-600 dark::hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>

            <button
              type="button"
              data-collapse-toggle="navbar-sticky"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring:gray-600"
              onClick={manageToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`items-center ${
              openNav ? "" : "hidden"
            } justify-between  w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li
                onClick={() => {
                  navigate("/");
                }}
              >
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
