import calculatePrice from './calculatePrice';

export default function calculateTotal(order, pizzas) {
  // loop over items in order
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    // clac total for that pizza
    // add total to running total
    return runningTotal + calculatePrice(pizza.price, singleOrder.size);
  }, 0);
  return total;
}

// reduce array of things into one item
