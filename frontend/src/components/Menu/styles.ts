import styled, { css } from 'styled-components';

interface MenuItemProps {
  active?: boolean; // number
}
export const Container = styled.div`
  /* height: 100%; */
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  padding-left: 16px;

  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.colors.text};
`;

export const Content = styled.div`
  min-width: 200px;
  height: 100%;
  background: ${props => props.theme.colors.background2};

  section {
    div {
      height: 38px;
      display: flex;
      align-items: center;

      padding: 8px;
      background: ${props => props.theme.colors.spotlight};

      h1 {
        svg {
          margin-right: 8px;
        }
      }
    }

    ul {
      margin-bottom: 12px;
      > li {
      }
    }
  }
`;

export const Item = styled.li<MenuItemProps>`
  display: flex;
  align-items: center;
  padding: 4px;
  transition: background-color 0.3s;

  &:hover {
    background: ${props => props.theme.colors.backgroundselection};
  }

  ${props =>
    props.active &&
    css`
      background: ${props.theme.colors.backgroundselection};
    `};

  a {
    flex: 1;
    text-decoration: none;

    span {
      font-size: 16px;
      font-weight: 400;
      padding-left: 24px;
    }
  }
`;
