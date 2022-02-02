import React from 'react';
import styled from '@emotion/styled';
import Footer from './Footer';
import Nav from './Nav';
import stripes from '../assets/images/stripes.svg';
import GlobalStyles from '../styles/GlobalStyles';

const ContentStyled = styled.div`
  background: white;
  padding: 2rem;
`;

const SiteBorderStyled = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  background: white url(${stripes});
  background-size: 1500px;
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
  border: 5px solid white;
  @:-moz-user-disabled (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <SiteBorderStyled>
        <ContentStyled>
          <Nav />
          {children}
          <Footer />
        </ContentStyled>
      </SiteBorderStyled>
    </div>
  );
}
