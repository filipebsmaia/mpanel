import React, { useMemo } from 'react';

import { useRouteMatch } from 'react-router-dom';
import { Container, Content, Title } from './styles';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Home from '../Home';

interface RepositoryParams {
  page: string;
  category: string;
}

interface PagesInterface {
  [_: string]: {
    [_: string]: JSX.Element;
  };
}

const pages: PagesInterface = {
  dashboard: {
    home: <Home />,
  },
};

const Panel: React.FC = () => {
  const { page, category } = useRouteMatch<RepositoryParams>().params;

  const pageContent = useMemo(() => {
    return pages[category][page];
  }, [page, category]);

  const pageName = useMemo(() => {
    const name =
      page.substring(0, 1).toUpperCase() + page.substring(1, page.length);
    return name;
  }, [page]);

  return (
    <Container>
      <Header />
      <Content>
        <Menu />
        <aside>
          <header>
            <Title>{`Dashboard ${pageName && '/'} ${pageName}`}</Title>
          </header>
          {pageContent}
        </aside>
      </Content>
    </Container>
  );
};

export default Panel;
