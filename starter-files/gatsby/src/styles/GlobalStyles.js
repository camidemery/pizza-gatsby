// import { createGlobalStyle } from 'styled-components';
import React from "react";
import { Global, css } from '@emotion/react';
import bg from '../assets/images/bg.svg';
import stripes from '../assets/images/stripes.svg';
import font from '../assets/fonts/frenchfries.woff';

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          --red: #ff4949;
          --black: #2e2e2e;
          --yellow: #ffc600;
          --white: #fff;
          --grey: #efefef;
        }
        html {
          background-image: url(${bg});
          background-size: 450px;
          background-attachment: fixed;
          font-size: 10px;
        }

        body {
          font-size: 2rem;
        }

        fieldset {
          border-color: rgba(0, 0, 0, 0.1);
          border-width: 1px;
        }

        button {
          background: var(--red);
          color: white;
          border: 0;
          padding: 0.6rem 1rem;
          border-radius: 2px;
          cursor: pointer;
          --cast: 2px;
          box-shadow: var(--cast) var(--cast) 0 var(--grey);
          text-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
          &:hover {
            --cast: 4px;
          }
        }

        .gatsby-image-wrapper img[src*='base64\\,'] {
          image-rendering: -moz-crisp-edges;
          image-rendering: pixelated;
        }

        /* Scrollbar Styles */
        body::-webkit-scrollbar {
          width: 12px;
        }
        html {
          scrollbar-width: thin;
          scrollbar-color: var(--red) var(--white);
        }
        body::-webkit-scrollbar-track {
          background: var(--white);
        }
        body::-webkit-scrollbar-thumb {
          background-color: var(--red);
          border-radius: 6px;
          border: 3px solid var(--white);
        }

        hr {
          border: 0;
          height: 8px;
          background-image: url(${stripes});
          background-size: 1500px;
        }

        img {
          max-width: 100%;
        }

        .tilt {
          transform: rotate(-2deg);
          position: relative;
          display: inline-block;
        }
        @font-face {
          font-family: FrenchFries;
          src: url(${font});
        }
        html {
          font-family: FrenchFries, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
            sans-serif;
          color: var(--black);
        }
        p,
        li {
          letter-spacing: 0.5px;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: normal;
          margin: 0;
        }
        a {
          color: var(--black);
          text-decoration-color: var(--red);
          /* Chrome renders this weird with this font, so we turn it off */
          text-decoration-skip-ink: none;
        }
        mark,
        .mark {
          background: var(--yellow);
          padding: 0 2px 2px 2px;
          margin: 0;
          display: inline;
          line-height: 1;
        }

        .center {
          text-align: center;
        }
      `}
    />
  );
}
