import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // access state and updater func in useCOntext
  const [order, setOrder] = useContext(OrderContext);
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
