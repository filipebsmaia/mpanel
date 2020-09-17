import React, { useEffect, useState, useMemo } from 'react';
import { MdHome, MdApps } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container, Content, Title, Item } from './styles';
import api from '../../services/api';

interface MenuProps {
  pagePath: string;
}

interface ActiveItemInterface {
  cat: string;
  pag: string;
}

interface ServerInterface {
  id: string;
  name: string;
}

const Menu: React.FC<MenuProps> = ({ pagePath }) => {
  const [servers, setServers] = useState<ServerInterface[]>([]);

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

  useEffect(() => {
    api.get<ServerInterface[]>('/servers').then(response => {
      setServers(response.data);
    });
  }, []);

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
            {servers.map(server => {
              return (
                <Item key={server.id} active={isRoute('applications/')}>
                  <Link to={`/applications/${server.id}`}>
                    <span>{server.name}</span>
                  </Link>
                </Item>
              );
            })}
          </ul>
        </section>
      </Content>
    </Container>
  );
};

export default Menu;
