import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Currency from "react-currency-formatter";
import { StarIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckOutProducts(props) {
  // const items = useSelector((state) => state.basket.items);

  const {
    id,
    rating,
    hasPrime,
    quantity,
    totalPrice,
    image,
    title,
    price,
    description,
    category,
  } = props;
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    // const totalPrice = quantity * price;
    const product = {
      id,
      rating,
      hasPrime,
      quantity: 1,
      totalPrice,
      image,
      title,
      price,
      description,
      category,
    };
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5 ">
      <Image src={image} width={200} height={200} objectFit="contain" alt="" />
      <div className="col-span-3 mx-5">
        <h1>{title}</h1>
        <div className="flex pb-2">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-10 w-6 text-yellow-400  " />
            ))}
        </div>
        <p className="line-clamp-3 text-xs mb-2">{description}</p>
        <h5 className="text-gray-500 italic my-2"> {category}</h5>

        <Currency quantity={price} currency="GBP" />
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
      </div>
      <div className="col-span-1 flex flex-col  space-y-2 my-auto justify-self-end">
        <p className="text-center font-bold">
          {quantity} <span className="text-xs text-gray-500">items</span>{" "}
        </p>
        <button onClick={addItemToBasket} className=" button">
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className=" button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckOutProducts;
