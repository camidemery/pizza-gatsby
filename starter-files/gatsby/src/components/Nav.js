import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Logo from './Logo';

const NavStyled = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    justify-content: center;
    text-align: center;
    list-style: none;
    align-items: end;
    margin-top: -5rem;
  }
  .nav-link {
    margin-bottom: 2rem;
  }
  li {
    --rotate: 2deg;
    transform: rotate(var(--rotate));
    order: 1;
    /*  */
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
    display: block;
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
    @media (max-width: 800px) {
      font-size: 2rem;
    }
    &[aria-current='page'] {
      color: var(--red);
    }
  }
  @media (max-width: 600px) {
    --columns: 4;
    margin-bottom: 2rem;
    border-bottom: 2px solid var(--grey);
    ul {
      grid-template-rows: auto auto;
      grid-template-columns: repeat(var(--columns), 1fr);
      justify-items: center;
    }
    .logo-item {
      order: 0;
      grid-column: 1 / -1;
    }
    .logo {
      transform: none;
    }
  }
  @media (max-width: 500px) {
    --columns: 2;
  }
`;

function Nav() {
  return (
    <NavStyled>
      <ul>
        <li className="nav-link">
          <Link to="/">HOT NOW</Link>
        </li>
        <li className="nav-link">
          <Link to="/pizzas">PIZZA MENU</Link>
        </li>
        <li className="logo-item">
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/slice-masters">SliceMasters</Link>
        </li>
        <li className="nav-link">
          <Link to="/order">ORDER AHEAD!</Link>
        </li>
      </ul>
    </NavStyled>
  );
}

export default Nav;
