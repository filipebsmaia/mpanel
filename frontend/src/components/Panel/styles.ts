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
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 550px) {
    flex-direction: column;
  }

  aside {
    display: flex;
    flex-direction: column;
    flex: 1;

    width: 200px;

    @media (max-width: 550px) {
      width: 100%;
    }

    > div {
      display: flex;
      flex: 1;
      margin: 32px;
    }

    > header {
      display: flex;

      align-items: center;
      background: ${props => props.theme.colors.background2};
      padding: 8px;
      height: 38px;

      @media (max-width: 550px) {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      h1 {
        svg {
          margin-right: 8px;
        }
      }
    }
  }
`;

export const Title = styled.h1`
  display: flex;

  align-items: center;
  padding-left: 16px;

  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.text};
`;
