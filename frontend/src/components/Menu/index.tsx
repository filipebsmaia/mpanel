import React from 'react';
import { MdHome } from 'react-icons/md';
import { useRouteMatch } from 'react-router-dom';
import { Container, Content, Title, Item } from './styles';

interface RepositoryParams {
  page: string;
}

const Menu: React.FC = () => {
  const { page } = useRouteMatch<RepositoryParams>().params;

  return (
    <Container>
      <Content>
        <section>
          <div>
            <Title>
              <MdHome size={20} />
              Dashboard
            </Title>
          </div>
          <ul>
            <Item>
              <span>Home</span>
            </Item>
            <Item active>
              <span>Home</span>
            </Item>
            <Item>
              <span>Home</span>
            </Item>
          </ul>
        </section>
        <section>
          <div>
            <Title>
              <MdHome size={20} />
              Servidores
            </Title>
          </div>
          <ul>
            <Item>
              <span>127.0.0.1:25565</span>
            </Item>
            <Item active>
              <span>127.0.0.1:25566</span>
            </Item>
            <Item>
              <span>127.0.0.1:25567</span>
            </Item>
          </ul>
        </section>
      </Content>
    </Container>
  );
};

export default Menu;
