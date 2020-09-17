import styled from 'styled-components';
import { shade } from 'polished';

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  height: 100%;
`;

export const ConsoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  flex: 1;
  height: auto;

  background-color: ${props => props.theme.colors.background2};
  border-radius: 10px;
`;

export const ConsoleHeader = styled.header`
  margin: 0px 0 16px 0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 700px) {
    flex-direction: column;

    > div {
      margin-top: 16px;
    }
  }
`;

export const ConsoleButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 120px;
    height: 32px;
    border: 4px;
    margin-top: 0;
  }

  button + button {
    margin-left: 16px;
  }

  @media (max-width: 380px) {
    flex-direction: column;

    button + button {
      margin-top: 8px;
      margin-left: 0px;
    }
  }
`;

export const Console = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 1; */
  height: 100%;
`;

export const ConsoleMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  overflow-y: auto;
  height: 100px;

  background: ${props => props.theme.colors.background3};
  border-radius: 10px 10px 0 0;
  padding: 8px;

  /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => shade(0.1, props.theme.colors.backgroundselection)};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.spotlight};
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${props => shade(0.1, props.theme.colors.spotlight)};
    }
  }

  @media (max-width: 700px) {
    min-height: 600px;
  }
`;

export const ConsoleMessage = styled.span``;

export const ConsoleInputContainer = styled.div`
  background: ${props => props.theme.colors.background3};
  border-radius: 0 0 10px 10px;
  height: 32px;

  div {
    height: 32px;
  }
`;
