import React from "react";
import dishes from "../data";

function DishList(props) {
  //Effect: when min/max changes -> rerun filter
  // return dishes.filter(dish => dish.price > maxi && dish.price < mini)
  return (
  <ul className="grid">
    {dishes.length ? (
      dishes
      .filter(dish => props.category === "all" || dish.category === props.category)
      .filter(dish => dish.price >= props.min && dish.price <= props.max)
      .map(dish => (
        <li className="card" key={dish.id}>
          <h3>{dish.name}</h3>
          <p>{dish.description}</p>
          <div>£{dish.price.toFixed(2)}</div>
        </li>
      ))
    ): (
      <li className="card">No results found</li>
    )}
  </ul>
  );
}

export {DishList};