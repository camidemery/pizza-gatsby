import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // crete state to hold order
  // default state is empty array
  const [order, setOrder] = useState([]);
  // func to add things to order
  function addToOrder(orderedPizza) {
    // taking all already ordered pizzas and adding orderedPizza to it
    setOrder([...order, orderedPizza]);
  }
  // func to remove things to order
  function removeFromOrder(index) {
    setOrder([
      // everyting before item to be removed
      ...order.slice(0, index),
      // everyting after item to be removed
      ...order.slice(index + 1),
    ]);
  }
  // send this data to serverless func when they check out
  // TODO
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
