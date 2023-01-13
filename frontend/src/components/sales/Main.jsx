import React from "react";
import SaleItem from "./SaleItem";

const Main = (props) => {
  const { products, onAdd } = props;
  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-4 m-3">
      {products.map((product) => (
        <SaleItem key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default Main;