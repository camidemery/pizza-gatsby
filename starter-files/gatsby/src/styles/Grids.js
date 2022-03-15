// didn't have to import react?
import styled from '@emotion/styled';

export const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

// single grid item for homepage
export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  img {
    height: auto;
    // takes away img ghost space
    font-size: 0;
  }
  p {
    transform: rotate(-2deg) translatey(-50%);
    position: absolute;
    width: 100%;
    left: 0;
  }
  .mark {
    display: inline;
  }
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--background) 0px,
      var(--shine) 40px,
      var(--background) 80px
    );
    background-size: 500px;
    animation: shine 1s infinite linear;
  }
`;
