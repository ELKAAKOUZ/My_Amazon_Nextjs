import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { selectTotalItems } from "../slices/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../slices/darkmode-slice";

function Header() {
  const [animationStarted, setAimationStarted] = useState(false);
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.darkMode.onDarkMode);
  const router = useRouter();
  const items = useSelector(selectTotalItems);
  const { data: session, status } = useSession();
  const onDarkmodeHandler = () => {
    dispatch(toggleDarkMode());
  };
  useEffect(() => {
    if (items === 0) {
      return;
    }
    setAimationStarted(true);
    const timer = setTimeout(() => {
      setAimationStarted(false);
    }, [300]);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const animationclass = `${
    animationStarted
      ? "relative flex items-center links animate-wiggle"
      : "relative flex items-center links"
  }`;
  return (
    <header>
      {/* top header */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/* image */}
        <div className="flex items-center mt-2 flex-grow sm:flex-grow-0">
          <Image
            src="https://links.papareact.com/f90"
            onClick={() => {
              router.push("/");
            }}
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* search */}
        <div className="hidden sm:flex items-center h-10 rounded-md cursor-pointer flex-grow bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow rounded-l-md flex-shrink focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-2" />
        </div>
        {/* right */}
        <div className="text-white flex text-xs space-x-6 mx-6 items-center whitespace-nowrap">
          <div
            className="cursor-pointer links"
            // onClick={signIn}
            onClick={status === "authenticated" ? signOut : signIn}
          >
            <p>
              {status === "authenticated"
                ? `Hello ${session.user.name}`
                : "Sign in"}
            </p>
            <p className="font-extrabold md:text-sm">Accounts&Lists</p>
          </div>
          <div className="links">
            <p>returns</p>
            <p className="font-extrabold md:text-sm">& orders</p>
          </div>
          <div
            className={animationclass}
            onClick={() => {
              router.push("/checkout");
            }}
          >
            <span className="absolute bg-yellow-500 text-center rounded-full text-black font-bold top-0 right-0 md:right-10 h-4 w-4 ">
              {items}
            </span>
            <ShoppingCartIcon className="h-10 items-center " />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* bottom header */}
      <div className="flex relative items-center p-2 pl-6 space-x-3 text-white text-sm bg-amazon_blue-light">
        <p className="flex items-center links">
          <MenuIcon className="h-6 mr-1" />
          all
        </p>
        <p className="links">Prime Video</p>
        <p className="links">Amazon Business</p>
        <p className="links">Todays Deal</p>
        <p className="links hidden lg:inline-flex">Electronics</p>
        <p className="links hidden lg:inline-flex">Food and Grocery</p>
        <p className="links hidden lg:inline-flex">Prime</p>
        <p className="links hidden lg:inline-flex">Buy Again</p>
        <p className="links hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="links hidden lg:inline-flex">Health & Personalcare</p>
        <div className="absolute  flex items-center gap-2 cursor-pointer  right-4 ">
          <p className="font-bold" onClick={onDarkmodeHandler}>
            {mode ? "Light mode" : "Dark mode"}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
