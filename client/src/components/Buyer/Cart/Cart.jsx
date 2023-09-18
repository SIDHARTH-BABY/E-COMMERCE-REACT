import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../../Common/Navbar/Navbar";
import {
  addAddress,
  changeQuantityCart,
  fetchCartItems,
  removeAllCartItem,
  removeCartItems,
} from "../../../services/Cart";

import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { createOrderRazorpay } from "../../../services/razorpayOrder";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const _DEV_ = document.domain === "localhost";

export const fetchCart = async (
  userId,
  setCartItems,
  setCheckoutPrice,
  setUserAddress,
  setCartId
) => {
  const response = await fetchCartItems(userId);
  if (response.data.success) {
    setCartItems(response.data.productData);
    setUserAddress(response.data.address);
    setCheckoutPrice(response.data.checkoutPrice);
    setCartId(response.data._id);
    console.log(response, "addresss");
  }
};

//razorpay script
const loadScript = async (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
};

const Cart = () => {
  const [cartItems, setCartItems] = useState();
  const [cartUpdate, setCartUpdate] = useState();
  const [checkoutPrice, setCheckoutPrice] = useState();
  const [userAddress, setUserAddress] = useState();
  const [currentAddress, setCurrentAddress] = useState();
  const [cartId, setCartId] = useState();
  const addressRef = useRef();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const userId = "1234";
  //   const fetchCart = async () => {
  //     const response = await fetchCartItems(userId);
  //     if (response.data.success) {
  //       setCartItems(response.data.productData);
  //       console.log(response);
  //     }
  //   };
  //   fetchCart();
  // }, [cartUpdate]);

  let UserId = useSessionContext().userId;
  useEffect(() => {
    fetchCart(
      UserId,
      setCartItems,
      setCheckoutPrice,
      setUserAddress,
      setCartId
    );
  }, [cartUpdate]);

  const handleAddress = async (e) => {
    try {
      e.preventDefault();
      if (userAddress.length < 2) {
        const address = addressRef.current.value;
        console.log(address, "new address");
        const response = await addAddress(UserId, address);
        if (response.data.success) {
          toast.success(response.data.message);
          setCartUpdate(response.data);
        }
      } else {
        alert("address limit 2");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displayRazorpay = async (checkoutPrice) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load, Are you online");
      return;
    }
    const amount = checkoutPrice.checkoutPrice;
    console.log(currentAddress, "cuurent address");
    const currAddress = currentAddress ? currentAddress : "";
    const response = await createOrderRazorpay(
      amount,
      UserId,
      cartItems,
      currAddress
    );

    var options = {
      key: _DEV_ ? "rzp_test_HVPlTnDZYqCBkb" : "PRODUCTION_KEY", // Enter the Key ID generated from the Dashboard
      amount: response.data.orderCreated.amount,
      currency: response.data.orderCreated.currency, //100p = 1rupee
      order_id: response.data.orderCreated._id,
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",

      // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",

      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      handler: async function (response) {
        if (response.razorpay_payment_id) {
          // Payment was successful
          console.log("payment successssss");
          const deleteCartItems = await removeAllCartItem(cartId);
          if (deleteCartItems.data.success) {
            setCartUpdate(deleteCartItems.data);
          }
          toast.success("Payment Success");
          navigate("/paymentsuccess");
        } else {
          // Payment failed or was canceled
          console.error("Payment failed or was canceled");
          // You can handle the error or show a message to the user.
        }
      },
    };

    var paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  const removeCartItem = async (prodId) => {
    try {
      const response = await removeCartItems(prodId, UserId);
      if (response.data.success) {
        console.log(response.data.itemDeleted);
        setCartUpdate(response.data.itemDeleted);
        toast.success(response.data.message);
      }
    } catch (error) {}
  };

  const itemQuantityChange = async (prodId, val, currQuantity, itemPrice) => {
    try {
      const newQuantity = currQuantity + val;

      const response = await changeQuantityCart(
        UserId,
        prodId,
        newQuantity,
        itemPrice
      );
      if (response.data.success) {
        setCartUpdate(response.data.updatedCart);
      }
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{` ${cartItems?.length} Items`}</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {cartItems?.map((item, index) => (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={item.itemImage} alt="" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm" key={index}>
                      {item.itemName}
                    </span>
                    <span className="text-red-500 text-xs">Apple</span>
                    <a
                      href="#"
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      onClick={() => {
                        removeCartItem(item._id);
                      }}
                    >
                      Remove
                    </a>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  {item.quantity != 1 ? (
                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        itemQuantityChange(
                          item._id,
                          -1,
                          item.quantity,
                          item.itemPrice
                        );
                      }}
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  ) : (
                    ""
                  )}

                  <input
                    className="mx-2 border text-center w-10"
                    type="text"
                    value={`${item.quantity}`}
                  />
                  <svg
                    className="fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      itemQuantityChange(
                        item._id,
                        1,
                        item.quantity,
                        item.itemPrice
                      );
                    }}
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {item.itemPrice}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {item.totalQuantityPrice}
                </span>
              </div>
            ))}
            <a
              href="#"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
              onClick={() => {
                navigate("/");
              }}
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </a>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items 3</span>
              <span className="font-semibold text-sm">
                {checkoutPrice ? checkoutPrice : 0}
              </span>
            </div>
            <form onSubmit={handleAddress}>
              <div className="py-10">
                <label
                  for="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Shipping Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your Address"
                  className="p-2 text-sm w-full"
                  ref={addressRef}
                />
              </div>
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
              >
                Apply
              </button>
            </form>

            <div className="flex  flex-col mt-3">
              Select Address
              {userAddress?.map((item, index) => (
                <button
                  onClick={() => {
                    setCurrentAddress(item.userAddress);
                  }}
                  className={`border-solid border-2 mt-3 ${
                    currentAddress === item.userAddress
                      ? "border-rose-500"
                      : "border-sky-500"
                  }`}
                  key={index}
                >
                  {item.userAddress}
                </button>
              ))}
            </div>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>{checkoutPrice ? checkoutPrice : 0}</span>
              </div>
              <button
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                onClick={() => {
                  {
                    currentAddress
                      ? displayRazorpay({ checkoutPrice })
                      : toast.error("Select Address");
                  }
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
