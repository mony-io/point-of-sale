import React from "react";
import SaleItem from "./SaleItem";

const Main = (props) => {
  const { products, onAdd } = props;
  return (
    <div className="grid grid-cols-8 grid-rows-1 gap-1 m-2">
      {products.map((product) => (
        <SaleItem key={product.product_id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default Main;