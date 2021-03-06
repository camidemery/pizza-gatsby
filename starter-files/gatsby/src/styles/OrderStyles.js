import styled from '@emotion/styled';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: start;
    &.info {
      input {
        margin: 0 1rem;
        width: 75%;
        border: none;
        border-bottom: 2px solid black;
      }
    }
    &.order,
    &.menu {
      grid-column: span 1;
    }
  }
  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
  .mapleSyrup {
    display: none;
  }
`;

export default OrderStyles;
