import React, { useMemo, useCallback } from 'react';

import { Container, Content, Title } from './styles';
import Header from '../Header';
import Menu from '../Menu';

interface PanelParams {
  getPath: () => string;
}

const Panel: React.FC<PanelParams> = ({ children, getPath }) => {
  const pagePath = useMemo(() => {
    return getPath();
  }, [getPath]);

  const capitalize = useCallback((text: string): string => {
    return text.substring(0, 1).toUpperCase() + text.substring(1, text.length);
  }, []);

  const title = useMemo(() => {
    const splitedPagePath = pagePath.split('/');

    return capitalize(
      splitedPagePath.reduce((last, current) => {
        return `${last} / ${capitalize(current)}`;
      }),
    );
  }, [capitalize, pagePath]);

  return (
    <Container>
      <Header />
      <Content className="page-content">
        <Menu pagePath={pagePath} />
        <aside>
          <header>
            <Title>{title}</Title>
          </header>
          <div>{children}</div>
        </aside>
      </Content>
    </Container>
  );
};

export default Panel;
