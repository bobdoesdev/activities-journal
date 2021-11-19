import styled from 'styled-components';

const ButtonStyles = styled.button`
  background: var(--green);
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 1rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  cursor: pointer;

  &[disabled] {
    opacity: 0.5;
  }
`;

export default ButtonStyles;
