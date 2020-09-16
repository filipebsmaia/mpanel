import styled from 'styled-components';

interface CardProps {
  color?: string;
}

export const CardContainer = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
  border-radius: 5px;

  width: 300px;
  min-width: 300px;
  height: 128px;
  background: ${props => props.color || props.theme.colors.spotlight};

  margin: 0 32px 32px 0;

  @media (max-width: 930px) {
    margin-right: 0;
    flex: 1;
    width: 100%;
  }
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
