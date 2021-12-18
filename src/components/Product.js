import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { addToBasket } from "../slices/basketSlice";
import Currency from "react-currency-formatter";

const Max_Rating = 5;
const Min_Rating = 2;
const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

function Product(props) {
  const { id, title, price, description, category, image } = props;
  const quantity = 1;
  const totalPrice = quantity * price;
  const [rating] = useState(
    Math.floor(Math.random() * (Max_Rating - Min_Rating + 1)) + Min_Rating
  );
  const [hasPrime] = useState(Math.random() < 0.5); //Generate True , False Randomly
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      rating,
      title,
      quantity: 1,
      hasPrime,
      totalPrice,
      price,
      category,
      image,
      description,
    };

    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {props.category}
      </p>
      <Image
        src={props.image}
        height={200}
        width={200}
        objectFit="contain"
        alt=""
      />
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-10 w-6 text-yellow-400  " />
          ))}
      </div>

      <h4>{props.title}</h4>

      {hasPrime && <p>has prime delivery</p>}
      <p className="text-xs mt-2 mb-2 "> {truncate(props.description, 100)}</p>
      <div className="mb-5">
        <Currency quantity={props.price} currency="GBP" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt=" prime pic "
          />
          <p className="text-xs text-gray-500">FREE Next Day Delivery</p>
        </div>
      )}

      <button className="mt-auto button" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
