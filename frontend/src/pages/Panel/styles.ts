import styled from 'styled-components';

interface CardProps {
  color?: string;
}

interface CardProgressProps {
  progress?: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  padding-left: 16px;

  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.text};
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: row;
  height: 100%;

  aside {
    flex: 1;

    header {
      display: flex;
      align-items: center;
      background: ${props => props.theme.colors.background2};
      padding: 8px;
      height: 38px;

      h1 {
        svg {
          margin-right: 8px;
        }
      }
    }
  }
`;
