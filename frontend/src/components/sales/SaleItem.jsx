import React from "react";

const SaleItems = (props) => {
  const { product, onAdd } = props;
  return (
    <div
      className="row-span-1 border border-slate-500 cursor-pointer overflow-hidden rounded-sm shadow-md"
      onClick={() => onAdd(product)}
    >
      <img
        src={product.image}
        alt="img"
        className="bg-[#555] rounded-sm object-cover h-[180px] w-[300px] hover:scale-105 duration-300"
      />
      <div className="bg-[#555] p-1 mt-[2px] rounded-sm flex justify-center overflow-hidden z-20">
        <span className="font-semibold text-[#fff]">{product.name}</span>
      </div>
    </div>
  );
};

export default SaleItems;
