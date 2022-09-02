import React from "react";
import { FaRegGrinStars } from "react-icons/fa";

const SingleItem = ({ item }) => {
  return (
    <div className="shadow bg-gradient-to-r from-pink-800 via-pink-500 to-pink-200 px-10 py-10 rounded-xl w-10/12 md:w-6/12 flex justify-between text-white mb-10">
      <div className="">
        <div className="text-2xl font-bold">{item.name}</div>
        <div className="pt-5">{item.description}</div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="text-lg font-bold">BDT. {item.price}</div>
        <div className={`flex text-pink-600 text-2xl`}>
          {[...Array(item.want)].map((_, index) => (
            <FaRegGrinStars key={index} className="ml-1" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
