import SanityImage from 'gatsby-plugin-sanity-image';
import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePrice from '../utils/calculatePrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <SanityImage
              {...pizza.image}
              className="pizza-pic"
              alt={pizza.name}
              width={100}
              height={100}
            />
            <h2>
              {singleOrder.size} {pizza.name}
            </h2>
            <p>
              {formatMoney(calculatePrice(pizza.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
