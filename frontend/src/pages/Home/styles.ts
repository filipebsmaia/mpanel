import styled from 'styled-components';

interface CardProps {
  color?: string;
}

export const Content = styled.div`
  margin: 32px;
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
`;

export const Card = styled.div<CardProps>`
  margin: 0 32px 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
  border-radius: 5px;

  width: 280px;
  height: 128px;
  background: ${props => props.color || props.theme.colors.spotlight};
`;

export const CardSide = styled.div`
  display: flex;
  flex-direction: row;
  div {
    strong {
      font-size: 16px;
    }
  }

  div + div {
    width: 50%;
  }
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  height: 56px;
  flex: 1;

  span {
    font-size: 12px;
    font-weight: 400;
  }
  strong {
    font-size: 24px;
    font-weight: 500;
  }
`;

export const CardGraph = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
  height: 56px;
`;
