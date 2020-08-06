import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip/index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.backgroundselection};
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid ${props => props.theme.colors.backgroundselection};
  color: ${props => props.theme.colors.placeholder};

  transition: color 0.3s, border-color 0.3s;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }


  ${props =>
    props.isErrored &&
    css`
      border-color: ${props.theme.colors.green};
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${props.theme.colors.green};
      border-color: ${props.theme.colors.green};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${props.theme.colors.green};
    `}

  input {
    flex: 1;
    background: transparent !important;
    border: 0;
    color: ${props => props.theme.colors.text};

    &:-webkit-autofill {
      -webkit-text-fill-color: ${props => props.theme.colors.text};
      -webkit-box-shadow: 0 0 0px 1000px ${props =>
        props.theme.colors.backgroundselection} inset;

    }

    &::placeholder {
      color: ${props => props.theme.colors.placeholder};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin-right: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
