import styled from 'styled-components';
import Link from 'next/link';
import DeleteEntry from './DeleteEntry';

const EntryStyles = styled.div`
  border: 1px solid #666;
  padding: 20px 20px 80px;
  position: relative;
  margin: 0 0 40px;

  &:first-of-type {
    margin-top: 40px;
  }

  h2 {
    margin: 0 0 0.5rem;
  }

  p {
    margin-bottom: 0;
    font-size: 16px;
  }

  .buttonList {
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  a,
  button {
    background: var(--green);
    color: white;
    font-weight: 500;
    border: 0;
    border-radius: 0;
    text-transform: uppercase;
    margin: 20px 0 0 auto;
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
    display: inline-block;
    transition: all 0.5s;
    cursor: pointer;

    &[disabled] {
      opacity: 0.5;
    }
  }

  button {
    background: red;
    margin-left: 20px;
  }
`;

const TagStyles = styled.div`
  font-style: italic;
  line-height: 1.2;
  font-size: 20px;
`;

export default function Entry({ entry }) {
  return (
    <EntryStyles>
      <h2>{entry.title}</h2>

      <TagStyles className="tag">{entry.tag.name}</TagStyles>
      <p>{entry.notes}</p>

      <div className="buttonList">
        <Link
          className="updateButton"
          href={{
            pathname: 'update',
            query: {
              id: entry.id,
            },
          }}
        >
          Edit &#9998;
        </Link>
        <DeleteEntry id={entry.id} type="button">
          Delete
        </DeleteEntry>
      </div>
    </EntryStyles>
  );
}
