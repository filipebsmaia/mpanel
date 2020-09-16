import styled from 'styled-components';
import { shade } from 'polished';

interface ButtonContainerPorps {
  color?: string;
}

export const Container = styled.button<ButtonContainerPorps>`
  background: ${props =>
    props.color ? props.color : props.theme.colors.green};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: ${props => props.theme.colors.text};
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${props =>
      shade(0.2, props.color ? props.color : props.theme.colors.green)};
  }
`;
