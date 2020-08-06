import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100vh;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 375px;
  width: 100%;
  border-radius: 10px;

  background: ${props => props.theme.colors.background2};
  padding: 48px 40px 64px;

  > img {
    width: 96px;
    margin-bottom: 48px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 295px;

    h1 {
      color: ${props => props.theme.colors.text};
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 24px;
    }
    button {
      margin: 32px 0 24px;
    }
    > a {
      font-size: 16px;
      text-decoration: none;

      color: ${props => props.theme.colors.text};
    }
  }
`;
