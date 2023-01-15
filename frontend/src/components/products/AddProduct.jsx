import React from "react";

const AddProduct = () => {
  return (
    <>
      <div className="flex-1">
        <h3 className="h-16 ml-6 flex items-center text-xl">បន្ថែមផលិតផល</h3>
        <div className="grid grid-cols-4 gap-4 border-t-4 ml-6 mr-6 border-t-blue-400 bg-[#DDDDDD] h-[630px]">
          <div className="col-span-2">
            <h3 className="text-md m-2 text-gray-600">
              សូមបញ្ចូលពត៍មានខាងក្រោម
            </h3>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                ប្រភេទ
              </label>
              <select
                name=""
                id=""
                className="text-sm outline-none border h-9 rounded-sm"
              >
                <option>All</option>
                <option value="">Home</option>
                <option value="">About</option>
                <option value="">Skill</option>
                <option value="">Content</option>
                <option value="">Product</option>
              </select>
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                ឈ្មោះផលិតផល
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                កូដផលិតផល
              </label>
              <input type="select" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                Product-Unit
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                Product-Price
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                Product-Qty
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                Expried-Date
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
          </div>
          <div className="col-span-2 mt-8">
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                Description
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                រូបភាប
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
