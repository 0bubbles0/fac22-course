import React from "react";
import App from "./App.jsx";
import {DishList} from "./DishList.jsx";
import {PriceFilter} from "./PriceFilter.jsx";

//   Example
//   <label htmlFor="burger">
//   Burger
//   <input
//     type="radio"
//     name="categories"
//     id="burger"
//     value="burger"
//     checked={someStateVar === "burger"}
//     onChange={(event) => setSomeStateVar(event.target.value)}
//   />
// </label>

const categories = [
  "all",
  "burger",
  "hot dog",
  "sandwich",
  "fries",
  "topping",
  "drink",
  "extra",
];

function CategoryFilter(props) {

  return (
    <fieldset>
      <legend>Categories</legend>
      {categories.map(cat => (
        <label htmlFor={cat} key={cat}>
          {cat}
          <input
            type="radio"
            name="categories"
            id={cat}
            value={cat}
            checked={cat === props.category}
            onChange={(event) => props.setCategory(event.target.value)}
            />
        </label>
      ))}
    </fieldset>
  );
};


export {CategoryFilter};