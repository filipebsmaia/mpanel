// eslint-disable-next-line import/no-unresolved
import 'styled-componets';

declare module 'styled-components' {
  export interface DefaultTheme {
    theme: string;

    colors: {
      background: string;
      background2: string;
      background3: string;
      backgroundselection: string;

      text: string;
      darkText: string;
      lightText: string;

      spotlight: string;

      cyan: string;
      darkCyan: string;

      green: string;
      darkGreen: string;

      orange: string;
      darkOrange: string;

      pink: string;
      darkPink: string;

      purple: string;
      darkPurple: string;

      red: string;
      darkRed: string;

      yellow: string;
      darkYellow: string;

      placeholder: string;

      success: string;
      error: string;
      info: string;
    };
  }
}
