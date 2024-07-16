import React from "react";

export default function Card({ productName,price,rating,discount,availability }) {
    return (
       <div>
         <h1 className="text-2xl">{productName}</h1>
            <h2 className="text-xl">{price}</h2>
            <h3 className="text-lg">{rating}</h3>
            <h4 className="text-md">{discount}</h4>
            <h5 className="text-sm">{availability}</h5>
       </div>
    );
}