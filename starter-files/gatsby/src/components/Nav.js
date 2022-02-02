import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Logo from './Logo';

const NavStyled = styled.nav`
  margin-bottom: rrem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    text-align: center;
    list-style: none;
    align-items: center;
    margin-top: -6rem;
  }
  li {
    --rotate: 2deg;
    transform: rotate(var(--rotate));
    order: 1;
    :nth-of-type(1) {
      --rotate: 1deg;
    }
    :nth-of-type(2) {
      --rotate: -2.5deg;
    }
    :nth-of-type(4) {
      --rotate: 2.5deg;
    }
    :nth-of-type(5) {
      --rotate: -1deg;
    }
    &:hover {
      --rotate: -4deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
    /* &[aria-current='page'] {
      color: var(--red);
    } */
  }
`;

function Nav() {
  return (
    <NavStyled>
      <ul>
        <li>
          <Link to="/">HOT NOW</Link>
        </li>
        <li>
          <Link to="/pizzas">PIZZA MENU</Link>
        </li>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slice-masters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">ORDER AHEAD!</Link>
        </li>
      </ul>
    </NavStyled>
  );
}

export default Nav;
