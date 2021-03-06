import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
  /* font-size: 4rem; */
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: var(--green);
  transform: skew(-7deg);
  text-align: center;
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  font-size: 16px;
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Activities Journal</Link>
        </Logo>
        <Nav />
      </div>
    </HeaderStyles>
  );
}
