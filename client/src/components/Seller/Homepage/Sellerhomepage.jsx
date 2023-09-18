import React, { useRef, useState } from "react";
import { addImage, addProduct } from "../../../services/Seller";

const Sellerhomepage = () => {
  const productNameRef = useRef();
  const productDetailsRef = useRef();
  const productPriceRef = useRef();

  const [image, setImage] = useState();
  const [uploadImageError, setUploadImageError] = useState(false);
  // const [imageCloudinaryUrl, setImageCloudinaryUrl] = useState();

  const preset_key = "ecommerce";
  const cloud_name = "dkht5n4ty";

  const handleImage = (e) => {
    setUploadImageError(false);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    setImage(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const prodName = productNameRef.current.value;
      const prodDetails = productDetailsRef.current.value;
      const prodPrice = productPriceRef.current.value;
      if (image) {
        console.log(image, "working");
        const imageResponse = await addImage(image, cloud_name);
        if (imageResponse.data) {
          // setImageCloudinaryUrl(imageResponse.data.secure_url);

          const ImageCloudUrl = imageResponse.data.secure_url;

          console.log(ImageCloudUrl, "imagecloudd");
          const response = await addProduct(
            prodName,
            prodDetails,
            prodPrice,
            ImageCloudUrl
          );
          if (response.data.success) {
            console.log(response, "jjjj");
            setImage(null)
            productNameRef.current.value = "";
            productDetailsRef.current.value = "";
            productPriceRef.current.value = "";
            
            // console.log(response,"response");
          }
        }
      } else {
        console.log("nottp");
        setUploadImageError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <form
          class="flex items-center space-x-6 ml-10 mt-10 md:max-lg:flex"
          onSubmit={handleSubmit}
        >
          <div class="shrink-0">
            <img
              class="h-16 w-16 object-cover rounded-full"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
              alt="Current profile photo"
            />
          </div>
          {/* product name */}
          <label class="block">
            <span class="block text-sm font-medium text-slate-700">
              Prduct Name
            </span>
            <input type="text" class="peer ..." ref={productNameRef} />
            <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
              Please provide a valid email address.
            </p>
            {/* productdetails */}
            <span class="block text-sm font-medium text-slate-700">
              Product Details
            </span>
            <input type="text" class="peer ..." ref={productDetailsRef} />
            <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
              Please provide a valid email address.
            </p>
            {/* product price */}
            <span class="block text-sm font-medium text-slate-700">
              Prouduct Price
            </span>
            <input type="Number" class="peer ..." ref={productPriceRef} />
            <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
              Please provide a valid email address.
            </p>
            {/* product imgage */}
            <span class="sr-only">Choose profile photo</span>
            <input
              type="file"
              name="image"
              onChange={handleImage}
              class="block w-full text-sm text-slate-500
      file:mr-3 file:py-2 file:px-3
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
            />
            {uploadImageError ? (
              <p class="mt-2   text-pink-600 text-sm">Please upload image.</p>
            ) : (
              ""
            )}
            <button class="mt-5 ml-5 rounded-full bg-emerald-900 w-40 h-10 text-yellow-50">
              Save Changes
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Sellerhomepage;
