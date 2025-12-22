import React from "react";
import increase from "../../assets/increase.png";
const ViewCard = ({ label, value, Icon, color }) => {
  return (
    // card
    <div
      className={`bg-secondary p-4 rounded-xl flex flex-col sm:flex-row  items-center gap-2 relative z-10`}
    >
      <figure className="hidden sm:block absolute top-0 right-0 w-full h-full -z-10">
        <img
          src={increase}
          alt=""
          className="w-full h-full object-contain object-right opacity-10"
        />
      </figure>

      <div
        className={`${color} rounded-lg h-full aspect-square flex items-center justify-center z-10`}
      >
        <Icon size={25} />
      </div>
      <div className="text-center sm:text-left">
        <p className="text-gray-400 text-sm text-nowrap">{label}</p>
        <h5 className="text-2xl font-semibold">{value}</h5>
      </div>
    </div>
  );
};

export default ViewCard;
