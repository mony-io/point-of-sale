import React from "react";
import SaleItem from "./SaleItem";

const Main = (props) => {
  const { products, onAdd, select } = props;

  return (

    <div className="grid grid-cols-8 grid-rows-1 gap-1 m-2">
      {
        select !== '' ?
          products
            .filter((item) => item.category_id === select)
            .map((product) => (
              <SaleItem key={product.product_id} product={product} onAdd={onAdd} />
            )) : products.map((product) => <SaleItem key={product.product_id} product={product} onAdd={onAdd} />)
      }
    </div>
  );
};

export default Main;