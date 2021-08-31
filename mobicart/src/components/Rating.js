import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
const Rating = ({ rating, onclick, style }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => {
        return (
          <span
            key={i}
            onClick={() => {
              onclick(i);
            }}
            style={style}
          >
            {rating > i ? (
              <AiFillStar fontSize="15px" />
            ) : (
              <AiOutlineStar fontSize="15px" />
            )}
          </span>
        );
      })}
    </>
  );
};
export default Rating;
