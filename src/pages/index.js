import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home(props) {
  return (
    <div className="bg-green-100">
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
