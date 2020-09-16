import React, { useMemo } from 'react';
import { MdHome, MdApps } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container, Content, Title, Item } from './styles';

interface MenuProps {
  pagePath: string;
}

interface ActiveItemInterface {
  cat: string;
  pag: string;
}

const Menu: React.FC<MenuProps> = ({ pagePath }) => {
  const parsedPagePath = useMemo(() => {
    if (pagePath.startsWith('/')) {
      return pagePath.substring(1);
    }
    return pagePath;
  }, [pagePath]);

  const isRoute = (itemPath: string): boolean => {
    const parsedItemPath = itemPath.startsWith('/')
      ? itemPath.substring(1)
      : itemPath;

    return parsedPagePath.startsWith(parsedItemPath);
  };
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
            <Item active={isRoute('dashboard/home')}>
              <Link to="/dashboard/home">
                <span>Home</span>
              </Link>
            </Item>
          </ul>
        </section>
        <section>
          <div>
            <Title>
              <MdApps size={20} />
              Aplicações
            </Title>
          </div>
          <ul>
            <Item active={isRoute('applications/')}>
              <Link to="/applications/id">
                <span>127.0.0.1:25565</span>
              </Link>
            </Item>
          </ul>
        </section>
      </Content>
    </Container>
  );
};

export default Menu;
