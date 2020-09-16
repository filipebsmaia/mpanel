import React from 'react';

import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

import { CardContainer, CardSide, CardItem, CardGraph } from './styles';

import { useTheme } from '../../hooks/theme';

interface ItensInterface {
  title?: string;
  value?: string | number | number[];
}

interface CardInterface {
  type: 'single' | 'graph' | 'side';
  color: string;
  itens: ItensInterface[];
}

const Card: React.FC<CardInterface> = ({ type, color, itens }) => {
  const { theme } = useTheme();

  return (
    <CardContainer color={color}>
      <CardItem>
        <span>{itens[0].title}</span>
        <strong>{itens[0].value}</strong>
      </CardItem>

      {type === 'graph' && (
        <CardGraph>
          <Sparklines data={itens[1].value as number[]} limit={100}>
            <SparklinesLine color={theme.colors.text} />
            <SparklinesSpots />
          </Sparklines>
        </CardGraph>
      )}

      {type === 'side' && (
        <CardSide>
          <CardItem>
            <span>{itens[1].title}</span>
            <strong>{itens[1].value}</strong>
          </CardItem>
          <CardItem>
            <span>{itens[2].title}</span>
            <strong>{itens[2].value}</strong>
          </CardItem>
        </CardSide>
      )}
    </CardContainer>
  );
};

export default Card;
