import calculatePrice from './calculatePrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((pie) => pie.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image,
      price: formatMoney(calculatePrice(pizza.price, item.size)),
    };
  });
}
