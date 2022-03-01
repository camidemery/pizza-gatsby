import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateTotal from './calculateTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // access state and updater func in useContext
  const [order, setOrder] = useContext(OrderContext);
  // define default state
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  // run when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    // gather data that needs to be sent
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    // send this data to serverless func when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      // if things broke
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
