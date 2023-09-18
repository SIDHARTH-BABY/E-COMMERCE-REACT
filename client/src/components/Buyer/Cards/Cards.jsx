import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/Buyer";
import { addProductCart } from "../../../services/Cart";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import toast from "react-hot-toast";

const Cards = () => {
  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchCards = async () => {
      const response = await getAllProducts();

      if (response.data.success) {
        console.log(response.data);
        setProduct(response.data.products);
        console.log(product ? product : "ooo", "prooo");
      }
    };

    fetchCards();
  }, []);

  let UserId = useSessionContext().userId;
  const addToCart = async (productId, prodName, prodPrice, prodImage) => {
    try {
      const prodId = productId;
      console.log(prodId, "proodidS");

      const response = await addProductCart(
        prodId,
        UserId,
        prodName,
        prodPrice,
        prodImage
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const slides = [
    {
      url: "Images/six.jpg",
    },
    {
      url: "Images/seven.jpg",
    },
    {
      url: "Images/six.jpg",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];
  return (
    <div>
      <div className="flex flex-wrap bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  sm:py-20 lg:py-20 ">
        {/* <div className="flex flex-wrap bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% py-16 sm:py-24 lg:py-16 px-20"> */}
        {product?.map((product, index) => (
          <div
            className="block max-w-sm rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700 mr-10 ml-12 mt-10"
            //   style=`background-image: url('...');
            //   style={{ backgroundImage: `url(${slides[1].url})` }}
          >
            {/* content image */}

            <div className="box-content h-32 w-40 border-4 ml-20">
              {/* <img src={`${slides[2].url}`} className="h-32 w-40" /> */}
              <img src={product.productImages} className="h-32 w-40" />
            </div>
            <h5
              className="mb-2 mt-4 text-xl font-medium leading-tight text-neutral-800 text-white dark:text-neutral-50"
              key={index}
            >
              {product.productName}
            </h5>

            <p className="mb-4 text-base text-neutral-600 text-white  dark:text-neutral-200">
            {product.productDetails}
            </p>
            <button
              type="button"
              className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
              onClick={() => {
                addToCart(
                  product._id,
                  product.productName,
                  product.price,
                  product.productImages
                );
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
