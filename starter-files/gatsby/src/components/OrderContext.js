import React, { useState } from 'react';

// create order context
const OrderContext = React.createContext();

// create provider
export function OrderProvider({ children }) {
  // create state
  const [order, setOrder] = useState([]);
  return (
    // must set value to state to be able to surface at higher level
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
