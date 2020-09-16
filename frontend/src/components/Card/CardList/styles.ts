import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;

  @media (max-width: 930px) {
    flex-direction: column;
    margin-right: 0;
  }
`;
