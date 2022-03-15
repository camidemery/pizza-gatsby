import { graphql } from 'gatsby';
import SanityImage from 'gatsby-plugin-sanity-image';
import React from 'react';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePrice from '../utils/calculatePrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateTotal from '../utils/calculateTotal';

export default function OrderPage({ data }) {
  const { values, updateValue } = useForm({
    // explicitly setting default values
    name: '',
    email: '',
    mapleSyrup: '',
  });
  const pizzas = data.pizzas.nodes;
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }

  return (
    // fieldsets allow you to enable/disable as groups
    <>
      <SEO title="Order a Pizza" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset className="info" disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">
            name
            <input
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            email
            <input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={updateValue}
            />
            <input
              id="mapleSyrup"
              type="mapleSyrup"
              name="mapleSyrup"
              value={values.mapleSyrup}
              onChange={updateValue}
              className="mapleSyrup"
            />
          </label>
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <SanityImage
                {...pizza.image}
                alt={pizza.name}
                className="pizza-pic"
                width={100}
                height={100}
              />
              <h2>{pizza.name}</h2>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          {/* removeFromOrder needs to be passed in because the state is
          bound to this component. If imported to the PO component too,
          it would create 2 dift Pizza states */}
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>Your total is {formatMoney(calculateTotal(order, pizzas))}</h3>
          <div>{error ? <p>Error: ${error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order....' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          ...ImageWithPreview
        }
      }
    }
  }
`;
