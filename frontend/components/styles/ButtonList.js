import styled from 'styled-components';

const ButtonList = styled.div`
  display: grid;
  width: 100%;
  border-top: 1px solid var(--lightGray);
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 1px;
  background: var(--lightGray);

  button {
    font-size: 1rem;
    cursor: pointer;
    &.clear {
      background: red;
    }
  }

  & > * {
    background: white;
    border: 0;
    font-size: 1rem;
    padding: 1rem;
  }
`;

export default ButtonList;
