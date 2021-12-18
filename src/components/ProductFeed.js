import React from "react";
import Product from "./Product";

function ProductFeed(props) {
  const products_0to_4 = props.products
    .slice(0, 4)
    .map((product) => (
      <Product
        id={product.id}
        title={product.title}
        key={product.id}
        image={product.image}
        description={product.description}
        price={product.price}
        category={product.category}
      />
    ));
  const products_4to_5 = props.products
    .slice(4, 5)
    .map((product) => (
      <Product
        id={product.id}
        title={product.title}
        key={product.id}
        image={product.image}
        description={product.description}
        price={product.price}
        category={product.category}
      />
    ));
  const products_to_end = props.products
    .slice(5, props.products.length)
    .map((product) => (
      <Product
        id={product.id}
        title={product.title}
        key={product.id}
        image={product.image}
        description={product.description}
        price={product.price}
        category={product.category}
      />
    ));

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols- xl:grid-cols-4 md:-mt-52 mx-auto ">
      {products_0to_4}
      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />
      <div className="md:col-span-2">{products_4to_5}</div>
      {products_to_end}
    </div>
  );
}

export default ProductFeed;
