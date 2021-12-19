import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { useSelector } from "react-redux";

export default function Home(props) {
  const darkmode = useSelector((state) => state.darkMode.onDarkMode);
  console.log(darkmode);
  return (
    <div className={darkmode && "dark"}>
      <div className="bg-white-100  dark:bg-gray-900">
        <Head>
          <title>Amazon 2.0</title>
        </Head>
        <Header />
        <main className="mx-auto max-w-screen-2xl">
          {/* Banner */}
          <Banner />
          <ProductFeed products={props.products} />
        </main>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products");
  const data = await products.json();
  console.log(data);
  return {
    props: {
      products: data,
    },
  };
}
