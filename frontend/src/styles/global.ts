import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    html, body, #root {
      min-height: 100vh;
      height: 100%;
    }

    div#root {
      display: flex;
    }

    body {
      background: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.text};
      -webkit-font-smoothing: antialiased;
    }

    body, input, button {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
    }

    h1, h2, h3, h4, h5, h6, strong {
      font-weight: 500;
    }

    button {
      cursor: pointer;
    }
}
`;