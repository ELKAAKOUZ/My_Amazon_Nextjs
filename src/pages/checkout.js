import React from "react";
import Image from "next/image";
import Header from "../components/Header";
// import { calculateTotalPrice } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
  // selectItems,
  selectTotalItems,
  selectTotalPrice,
} from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import CheckOutProducts from "../components/CheckOutProducts";
import { loadStripe } from "@stripe/stripe-js";
const axios = require("axios").default;

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const darkmode = useSelector((state) => state.darkMode.onDarkMode);
  const items = useSelector((state) => state.basket.items);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  const { data: session, status } = useSession();
  // console.log(totalPrice);
  // console.log(items);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      // email: session.user.email,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className={darkmode && "dark"}>
      <div className="bg-gray-100 dark:bg-gray-900 ">
        <Header />
        <main className="lg:flex max-w-screen-2xl mx-auto">
          {/* left  */}
          <div className="flex-grow m-5 shadow-sm ">
            <Image
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
            />
            <div className="flex flex-col p-5 space-y-10 bg-white ">
              <h1 className="border-b text-3xl pb-4">
                {items.length === 0
                  ? "Your Shopping Card is Empty"
                  : "Your Shopping Basket"}{" "}
              </h1>
              {/* grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto */}
              <div className="space-y-10">
                {items.map((item, i) => (
                  <CheckOutProducts
                    key={item.id}
                    id={item.id}
                    hasPrime={item.hasPrime}
                    quantity={item.quantity}
                    totalPrice={item.totalPrice}
                    rating={item.rating}
                    image={item.image}
                    price={item.price}
                    category={item.category}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* right */}
          <div className="flex flex-col  shadow-md">
            {items.length > 0 && (
              <div className="bg-white p-12 ">
                <h2 className="whitespace-nowrap">
                  Subtotal ({totalItems} items ) :
                  <span className="font-bold">
                    <Currency quantity={totalPrice} currency="GBP" />
                  </span>
                </h2>

                <button
                  role="link"
                  onClick={createCheckoutSession}
                  disabled={status !== "authenticated"}
                  className={`button mt-2 ml-5 ${
                    status !== "authenticated" &&
                    "from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  {status === "authenticated"
                    ? "Click to Proceed"
                    : "Sign IN to Proceed"}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Checkout;
