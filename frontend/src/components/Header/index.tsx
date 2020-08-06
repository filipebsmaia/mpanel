import React from 'react';

import logoImg from '../../assets/logo.svg';

import { Container, Content } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="MPanel" />
        <a href="##">
          <img
            src="https://crafatar.com/avatars/e7b269e1-9f09-42d4-bf42-bfbe33c1ddf1"
            alt="UserImage"
          />
        </a>
      </Content>
    </Container>
  );
};

export default Header;
