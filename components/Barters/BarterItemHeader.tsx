import React from "react";
import { BarterItemHeaderProps } from "../../ts/interfaces/barters";

const BarterItemHeader = ({ icon, barterType }: BarterItemHeaderProps) => {
  return (
    <div
      className="
            barter-icon
            rounded-3 shadow
            bg-secondary text-light
            h2
            p-3
            mt-2 ms-2
            d-flex justify-content-center align-items-center 
            position-absolute
            top-0 start-0 translate-middle
        "
        data-bs-toggle="tooltip" 
        data-bs-placement="right" 
        title={barterType[0].toUpperCase() + barterType.slice(1,barterType.length)}
        data-testid='BarterItem'
    >
      <span
        className="
            d-flex justify-content-center align-items-center 
        "
      >
        {icon}
      </span>
    </div>
  );
};

export default BarterItemHeader;
